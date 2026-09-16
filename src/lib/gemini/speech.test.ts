import { afterEach, describe, expect, it, vi } from "vitest";
import { generateSpeech } from "./index";
import { pcmToWave } from "../../engine/wave";
const json = (value:unknown,status=200) => new Response(JSON.stringify(value),{status});
const models = {models:[{name:"models/test-flash-tts",displayName:"Test speech",supportedGenerationMethods:["generateContent"]}]};
const sound = {candidates:[{content:{parts:[{inlineData:{mimeType:"audio/L16;codec=pcm;rate=24000",data:"AAD/fw=="}}]}}]};
afterEach(() => vi.unstubAllGlobals());
describe("Gemini speech", () => {
  it("discovers a speech model and sends the key only in headers", async () => {
    const fetch = vi.fn().mockResolvedValueOnce(json(models)).mockResolvedValueOnce(json(sound)); vi.stubGlobal("fetch",fetch);
    const result = await generateSpeech("നമസ്കാരം", "test-key");
    const [url,options] = fetch.mock.calls[1];
    expect(url).toContain("models/test-flash-tts:generateContent");
    expect(url).not.toContain("test-key"); expect(options.body).not.toContain("test-key");
    expect(options.headers["x-goog-api-key"]).toBe("test-key");
    expect(JSON.parse(options.body).generationConfig.responseModalities).toEqual(["AUDIO"]);
    expect(options.cache).toBe("no-store");
    expect(result.blob.type).toBe("audio/wav"); expect(result.blob.size).toBe(48);
  });
  it("reports missing TTS access without trying a regular text model", async () => {
    const fetch=vi.fn().mockResolvedValue(json({models:[{name:"models/text-only",supportedGenerationMethods:["generateContent"]}]})); vi.stubGlobal("fetch",fetch);
    await expect(generateSpeech("Hello","test-key")).rejects.toMatchObject({code:"noSpeechModel"});
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it("does not retry quota errors", async () => {
    const fetch=vi.fn().mockResolvedValueOnce(json(models)).mockResolvedValueOnce(json({},429)); vi.stubGlobal("fetch",fetch);
    await expect(generateSpeech("Hello","test-key")).rejects.toMatchObject({code:"errorQuota"});
    expect(fetch).toHaveBeenCalledTimes(2);
  });
  it("tries at most one other listed speech model on 404", async () => {
    const fetch=vi.fn().mockResolvedValueOnce(json({models:[...models.models,{name:"models/test-pro-tts",supportedGenerationMethods:["generateContent"]}]})).mockResolvedValueOnce(json({},404)).mockResolvedValueOnce(json(sound)); vi.stubGlobal("fetch",fetch);
    await expect(generateSpeech("Hello","test-key")).resolves.toHaveProperty("blob");
    expect(fetch).toHaveBeenCalledTimes(3);
  });
  it("rejects non-audio output rather than playing malformed bytes", async () => {
    vi.stubGlobal("fetch",vi.fn().mockResolvedValueOnce(json(models)).mockResolvedValueOnce(json({candidates:[{content:{parts:[{text:"Hello"}]}}]})));
    await expect(generateSpeech("Hello","test-key")).rejects.toMatchObject({code:"errorData"});
  });
  it("honors cancellation before requesting speech", async () => {
    const ac=new AbortController();
    vi.stubGlobal("fetch",vi.fn().mockImplementation(async () => { ac.abort(); return json(models); }));
    await expect(generateSpeech("Hello","test-key",ac.signal)).rejects.toMatchObject({name:"AbortError"});
  });
});
describe("PCM to browser audio", () => {
  it("writes a mono 16-bit WAV header and preserves sample bytes",async () => {
    const data=await pcmToWave("AAD/fw==","audio/L16;rate=24000").arrayBuffer(); const view=new DataView(data);
    expect(new TextDecoder().decode(data.slice(0,4))).toBe("RIFF");
    expect(view.getUint32(24,true)).toBe(24000); expect(view.getUint16(22,true)).toBe(1);
    expect(view.getUint16(34,true)).toBe(16); expect(view.getInt16(46,true)).toBe(32767);
  });
  it("rejects unsupported formats and truncated samples", () => {
    expect(() => pcmToWave("AA==","audio/L16;rate=24000")).toThrow();
    expect(() => pcmToWave("AAAA","text/plain")).toThrow();
    expect(() => pcmToWave("AAAA","audio/L16;rate=1")).toThrow();
  });
});
