import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import {
  generateLesson,
  listModels,
  realNumbers,
  saveConfig,
  loadConfig,
  removeKey,
  chooseModels,
  generateLessonWithRecovery,
} from "./index";
import { demos } from "../../lessons";
import type { Config } from "../../types";
const cfg: Config = {
  key: "test-only-not-a-real-key",
  remember: false,
  textModel: "models/test-text",
  embeddingModel: "models/test-embedding",
  models: [],
};
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
const generated = (data: unknown) =>
  json({
    candidates: [{ content: { parts: [{ text: JSON.stringify(data) }] } }],
  });
const fakeStorage = () => {
  const map = new Map<string, string>();
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => map.set(k, v),
    removeItem: (k: string) => map.delete(k),
  };
};
beforeEach(() => {
  vi.stubGlobal("sessionStorage", fakeStorage());
  vi.stubGlobal("localStorage", fakeStorage());
});
afterEach(() => vi.unstubAllGlobals());
describe("Gemini browser client", () => {
  it("sends keys only in headers to Google and never in URL or body", async () => {
    const fetch = vi.fn().mockResolvedValue(generated(demos[1]));
    vi.stubGlobal("fetch", fetch);
    await generateLesson("A bat flew", cfg);
    const [url, options] = fetch.mock.calls[0];
    expect(new URL(url).origin).toBe(
      "https://generativelanguage.googleapis.com",
    );
    expect(url).not.toContain(cfg.key);
    expect(options.body).not.toContain(cfg.key);
    expect(options.headers["x-goog-api-key"]).toBe(cfg.key);
    expect(options.redirect).toBe("error");
  });
  it("discovers all models using pagination", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(
        json({
          models: [
            {
              name: "models/a",
              supportedGenerationMethods: ["generateContent"],
            },
          ],
          nextPageToken: "page2",
        }),
      )
      .mockResolvedValueOnce(
        json({
          models: [
            { name: "models/b", supportedGenerationMethods: ["embedContent"] },
          ],
        }),
      );
    vi.stubGlobal("fetch", fetch);
    expect(await listModels(cfg.key)).toHaveLength(2);
    expect(fetch.mock.calls[1][0]).toContain("pageToken=page2");
  });
  it("retries invalid JSON once, then returns the validated lesson", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(generated({ safe: true }))
      .mockResolvedValueOnce(generated(demos[1]));
    vi.stubGlobal("fetch", fetch);
    expect((await generateLesson("The bat flew", cfg)).safe).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(2);
  });
  it("fails after exactly two invalid responses", async () => {
    const fetch = vi
      .fn()
      .mockImplementation(() => Promise.resolve(generated({ safe: true })));
    vi.stubGlobal("fetch", fetch);
    await expect(generateLesson("The bat flew", cfg)).rejects.toMatchObject({
      code: "errorData",
    });
    expect(fetch).toHaveBeenCalledTimes(2);
  });
  it("never retries or renders unsafe lessons", async () => {
    const fetch = vi.fn().mockResolvedValue(generated({ safe: false }));
    vi.stubGlobal("fetch", fetch);
    await expect(generateLesson("test sentence", cfg)).rejects.toMatchObject({
      code: "errorBlocked",
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it.each([
    [401, "errorKey"],
    [429, "errorQuota"],
    [404, "errorModelUnavailable"],
    [400, "errorRequest"],
    [500, "errorService"],
  ])("maps HTTP %s to a safe error", async (status, code) => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(json({}, status as number)),
    );
    await expect(generateLesson("test sentence", cfg)).rejects.toMatchObject({
      code,
    });
  });
  it("maps network and blocked-content failures", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("network")));
    await expect(listModels(cfg.key)).rejects.toMatchObject({
      code: "errorNetwork",
    });
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(json({ promptFeedback: { blockReason: "SAFETY" } })),
    );
    await expect(generateLesson("test sentence", cfg)).rejects.toMatchObject({
      code: "errorBlocked",
    });
  });
  it("uses session storage by default, opt-in persistence, and complete removal", () => {
    saveConfig(cfg);
    expect(sessionStorage.getItem("ai-ullil-key")).toBe(cfg.key);
    expect(localStorage.getItem("ai-ullil-key")).toBeNull();
    saveConfig({ ...cfg, remember: true });
    expect(sessionStorage.getItem("ai-ullil-key")).toBeNull();
    expect(loadConfig().remember).toBe(true);
    removeKey();
    expect(sessionStorage.getItem("ai-ullil-key")).toBeNull();
    expect(localStorage.getItem("ai-ullil-key")).toBeNull();
  });
  it("fetches actual token count and one vector per word", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockImplementation((url: string) =>
          Promise.resolve(
            url.includes(":countTokens")
              ? json({ totalTokens: 9 })
              : json({ embedding: { values: [0.1, 0.2, 0.3] } }),
          ),
        ),
    );
    const result = await realNumbers(demos[1], cfg);
    expect(result.count).toBe(9);
    expect(result.vectors).toHaveLength(4);
    expect(result.vectors[0].values).toHaveLength(3);
  });
  it("recognizes an invalid API key in a generation request", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          json({ error: { details: [{ reason: "API_KEY_INVALID" }] } }, 400),
        ),
    );
    await expect(generateLesson("A bat flew", cfg)).rejects.toMatchObject({
      code: "errorKey",
    });
  });
});
describe("model availability recovery", () => {
  const model = (name: string) => ({
    name,
    displayName: name,
    supportedGenerationMethods: ["generateContent"],
  });
  const old = model("models/gemini-2.5-flash");
  const current = model("models/gemini-3.1-flash-lite");
  const saved = { ...cfg, textModel: old.name, models: [old, current] };
  it("recovers when a listed model still returns 404, excluding the failed model", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(json({}, 404))
      .mockResolvedValueOnce(json({ models: [old, current] }))
      .mockResolvedValueOnce(generated(demos[1]));
    vi.stubGlobal("fetch", fetch);
    const onRecovery = vi.fn();
    const result = await generateLessonWithRecovery(
      "A bat flew",
      saved,
      undefined,
      onRecovery,
    );
    expect(result.switched).toBe(true);
    expect(result.config.textModel).toBe(current.name);
    expect(result.config.key).toBe(cfg.key);
    expect(result.lesson.sentence).toBe("A bat flew");
    expect(onRecovery).toHaveBeenCalledOnce();
    expect(fetch.mock.calls.map((c) => c[0])).toEqual([
      `https://generativelanguage.googleapis.com/v1beta/${old.name}:generateContent`,
      "https://generativelanguage.googleapis.com/v1beta/models?pageSize=1000",
      `https://generativelanguage.googleapis.com/v1beta/${current.name}:generateContent`,
    ]);
    expect(fetch.mock.calls[1][1].cache).toBe("no-store");
    for (const [url, options] of fetch.mock.calls) {
      expect(url).not.toContain(cfg.key);
      expect(options.headers["x-goog-api-key"]).toBe(cfg.key);
    }
  });
  it("keeps a working selected model without extra discovery or generation calls", async () => {
    const fetch = vi.fn().mockResolvedValue(generated(demos[1]));
    vi.stubGlobal("fetch", fetch);
    const result = await generateLessonWithRecovery("A bat flew", saved);
    expect(result.switched).toBe(false);
    expect(result.config.textModel).toBe(old.name);
    expect(fetch).toHaveBeenCalledOnce();
  });
  it("stops after one alternative and does not loop through billable models", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(json({}, 404))
      .mockResolvedValueOnce(
        json({ models: [old, current, model("models/other")] }),
      )
      .mockResolvedValueOnce(json({}, 404));
    vi.stubGlobal("fetch", fetch);
    await expect(
      generateLessonWithRecovery("A bat flew", saved),
    ).rejects.toMatchObject({ code: "errorModelUnavailable" });
    expect(fetch).toHaveBeenCalledTimes(3);
  });
  it("reports model availability when no other text model exists", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(json({}, 404))
      .mockResolvedValueOnce(
        json({ models: [old, model("models/gemini-image")] }),
      );
    vi.stubGlobal("fetch", fetch);
    await expect(
      generateLessonWithRecovery("A bat flew", saved),
    ).rejects.toMatchObject({ code: "errorModelUnavailable" });
    expect(fetch).toHaveBeenCalledTimes(2);
  });
  it.each([401, 429, 503])(
    "does not switch models for HTTP %s",
    async (status) => {
      const fetch = vi.fn().mockResolvedValue(json({}, status));
      vi.stubGlobal("fetch", fetch);
      await expect(
        generateLessonWithRecovery("A bat flew", saved),
      ).rejects.toBeInstanceOf(Error);
      expect(fetch).toHaveBeenCalledOnce();
    },
  );
  it("chooses current stable lightweight text models without fixed model IDs", () => {
    const models = [
      model("models/gemini-9.4-flash-image"),
      model("models/gemini-2.5-flash"),
      model("models/gemini-9.3-flash-lite"),
      model("models/gemini-9.4-flash-lite-preview"),
      model("models/gemini-8.9-flash-lite"),
    ];
    expect(chooseModels(models, { ...cfg, textModel: "" }).textModel).toBe(
      "models/gemini-9.3-flash-lite",
    );
    expect(
      chooseModels(models, { ...cfg, textModel: "models/gemini-2.5-flash" })
        .textModel,
    ).toBe("models/gemini-2.5-flash");
  });
});
