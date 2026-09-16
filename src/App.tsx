import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { Config, Language, Lesson } from "./types";
import { list, t, type TextKey } from "./i18n";
import { demos } from "./lessons";
import Input from "./components/steps/Input";
import Tokens from "./components/steps/Tokens";
import Embeddings from "./components/steps/Embeddings";
import Attention from "./components/steps/Attention";
import Prediction from "./components/steps/Prediction";
import Icon from "./components/Icon";
import {
  chooseModels,
  generateLesson,
  GeminiError,
  listModels,
  loadConfig,
  saveModels,
} from "./lib/gemini";
const Settings = lazy(() => import("./components/Settings"));
const RealNumbers = lazy(() => import("./components/RealNumbers"));
const readPref = (key: string, fallback: string) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};
type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
};
export default function App() {
  const [lang, setLang] = useState<Language>(
    readPref("ai-ullil-language", "ml") === "en" ? "en" : "ml",
  );
  const [dark, setDark] = useState(
    readPref(
      "ai-ullil-theme",
      matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    ) === "dark",
  );
  const [step, setStep] = useState(0);
  const [lesson, setLesson] = useState<Lesson>(demos[0]);
  const [sentence, setSentence] = useState(demos[0].sentence);
  const [mode, setMode] = useState<"demo" | "live">("demo");
  const [config, setConfig] = useState<Config>(loadConfig);
  const [settings, setSettings] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<TextKey | null>(null);
  const [offlineReady, setOfflineReady] = useState(false);
  const [install, setInstall] = useState<InstallPrompt | null>(null);
  const abort = useRef<AbortController | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("ai-ullil-language", lang);
    } catch {}
  }, [lang]);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#172c24" : "#c9f575");
    try {
      localStorage.setItem("ai-ullil-theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstall(e as InstallPrompt);
    };
    window.addEventListener("beforeinstallprompt", handler);
    if ("serviceWorker" in navigator && import.meta.env.PROD) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => navigator.serviceWorker.ready)
        .then(() => setOfflineReady(true))
        .catch(() => {});
    }
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      abort.current?.abort();
    };
  }, []);
  function go(n: number) {
    setStep(Math.max(0, Math.min(4, n)));
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() =>
      heading.current?.focus({ preventScroll: true }),
    );
  }
  function demo(i = 0) {
    abort.current?.abort();
    setBusy(false);
    setError(null);
    setMode("demo");
    setLesson(demos[i]);
    setSentence(demos[i].sentence);
    setSettings(false);
    go(0);
  }
  function cancel() {
    abort.current?.abort();
    setBusy(false);
  }
  async function start(targetStep = 1) {
    if (busy) return;
    setError(null);
    const input = sentence.trim();
    if (!input) {
      setError("empty");
      return;
    }
    if (input.split(/\s+/).length > 12) {
      setError("wordLimit");
      return;
    }
    if (mode === "demo") {
      const found = demos.find((d) => d.sentence === input);
      if (!found) {
        setError("chooseDemo");
        return;
      }
      setLesson(found);
      go(targetStep);
      return;
    }
    if (!config.key) {
      setSettings(true);
      return;
    }
    setBusy(true);
    const ac = new AbortController();
    abort.current = ac;
    try {
      let c = config;
      if (!c.models.length) {
        c = chooseModels(await listModels(c.key, ac.signal), c);
        saveModels(c);
        setConfig(c);
      }
      const result = await generateLesson(input, c, ac.signal);
      if (!ac.signal.aborted) {
        setLesson(result);
        go(targetStep);
      }
    } catch (e) {
      if (!ac.signal.aborted) {
        const code = e instanceof GeminiError ? e.code : "errorData";
        setError(code);
        if (code === "errorData") {
          setLesson(demos[0]);
          setSentence(demos[0].sentence);
          setMode("demo");
          go(1);
        }
      }
    } finally {
      if (!ac.signal.aborted) setBusy(false);
    }
  }
  function changeContext(i: number) {
    setLesson(demos[i]);
    setSentence(demos[i].sentence);
  }
  useEffect(() => {
    const context = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: unknown,
            opts: { signal: AbortSignal },
          ) => unknown;
        };
      }
    ).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      Promise.resolve(
        context.registerTool(
          {
            name: "start_demo_lesson",
            title: "Start an AI teaching demo",
            description:
              "Open the token step of a built-in lesson. Does not call Google or use an API key.",
            inputSchema: {
              type: "object",
              properties: {
                lesson: {
                  type: "string",
                  enum: ["malayalam", "cricket", "flying"],
                },
              },
              required: ["lesson"],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false, untrustedContentHint: false },
            execute: async (input: unknown) => {
              const id = (input as { lesson?: string })?.lesson;
              const found = demos.find((l) => l.id === id);
              if (!found) throw Error("Unknown demo");
              abort.current?.abort();
              setBusy(false);
              setError(null);
              setMode("demo");
              setLesson(found);
              setSentence(found.sentence);
              go(1);
              await new Promise((r) =>
                requestAnimationFrame(() => requestAnimationFrame(r)),
              );
              return { lesson: found.id, step: 2, sentence: found.sentence };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => {});
    } catch {}
    return () => lifecycle.abort();
  }, []);
  const titles = list(lang, "titles")[step].split("\n");
  return (
    <div className="app">
      <header>
        <a
          className="brand"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            demo();
          }}
        >
          <img src="/favicon.svg" alt="" width="48" height="48" />
          <span>
            {t(lang, "brand")}
            <small>{t(lang, "tagline")}</small>
          </span>
        </a>
        <div className="header-actions">
          <button
            className="language-button"
            onClick={() => setLang(lang === "ml" ? "en" : "ml")}
            lang={lang === "ml" ? "en" : "ml"}
          >
            {lang === "ml" ? "English" : "മലയാളം"}
          </button>
          <button
            className="icon-button theme-button"
            aria-label={t(lang, "theme")}
            onClick={() => setDark(!dark)}
          >
            <Icon name={dark ? "sun" : "moon"} />
          </button>
          <button
            className="icon-button"
            aria-label={t(lang, "settings")}
            onClick={() => setSettings(true)}
          >
            <Icon name="settings" />
          </button>
        </div>
      </header>
      <div className="workspace">
        <aside>
          <div className="eyebrow">{t(lang, "journey")}</div>
          <h2>{t(lang, "sidebar")}</h2>
          <nav aria-label={t(lang, "journey")}>
            {list(lang, "steps").map((s, i) => (
              <button
                className={step === i ? "current" : ""}
                key={s}
                onClick={() =>
                  i === 0 ? go(0) : step === 0 ? void start(i) : go(i)
                }
                disabled={busy}
                aria-current={step === i ? "step" : undefined}
              >
                <span className="step-dot">
                  {i < step ? <Icon name="check" size={15} /> : i + 1}
                </span>
                {s}
              </button>
            ))}
          </nav>
          <div className="side-note">{t(lang, "sideNote")}</div>
          <div className="sidebar-footer">
            <Icon name="wifi" size={17} />
            {t(lang, offlineReady ? "offlineReady" : "offline")}
            {install && (
              <button
                onClick={async () => {
                  await install.prompt();
                  setInstall(null);
                }}
              >
                {t(lang, "install")}
              </button>
            )}
          </div>
        </aside>
        <main
          onTouchStart={(e) => {
            if (
              (e.target as HTMLElement).closest(
                "button,input,textarea,select,summary,svg,.vector-strip",
              )
            )
              return;
            touch.current = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY,
            };
          }}
          onTouchEnd={(e) => {
            if (!touch.current || busy) return;
            const dx = e.changedTouches[0].clientX - touch.current.x;
            const dy = e.changedTouches[0].clientY - touch.current.y;
            touch.current = null;
            if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) {
              if (dx > 0 && step > 0) go(step - 1);
              else if (dx < 0 && step > 0 && step < 4) go(step + 1);
              else if (dx < 0 && step === 0) void start();
            }
          }}
        >
          <div className="progress-label">
            <span>
              {t(lang, "stepOf")} {step + 1} / 5
            </span>
            <span>{list(lang, "steps")[step]}</span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label={t(lang, "journey")}
            aria-valuenow={step + 1}
            aria-valuemin={0}
            aria-valuemax={5}
          >
            <i style={{ width: `${(step + 1) * 20}%` }} />
          </div>
          <section className="lesson">
            <div className="lesson-kicker">
              <div className="eyebrow">{list(lang, "kickers")[step]}</div>
              {step > 0 && (
                <span className="example-badge">{t(lang, "exampleOnly")}</span>
              )}
            </div>
            <h1 ref={heading} tabIndex={-1}>
              {titles[0]}
              <br />
              <em>{titles[1]}</em>
            </h1>
            <p className="intro">{list(lang, "comparisons")[step]}</p>
            {step === 0 && (
              <div
                className="mode-toggle"
                role="group"
                aria-label={t(lang, "settings")}
              >
                <button
                  aria-pressed={mode === "demo"}
                  onClick={() => {
                    setMode("demo");
                    setError(null);
                  }}
                >
                  {t(lang, "demo")}
                </button>
                <button
                  aria-pressed={mode === "live"}
                  onClick={() => {
                    setMode("live");
                    setError(null);
                  }}
                >
                  <Icon name="spark" size={15} />
                  {t(lang, "liveMode")}
                </button>
              </div>
            )}
            {step > 0 && ["cricket", "flying"].includes(lesson.id || "") && (
              <div className="context-switch">
                <span>{t(lang, "context")}</span>
                <div className="mode-toggle">
                  <button
                    aria-pressed={lesson.id === "cricket"}
                    onClick={() => changeContext(1)}
                  >
                    {t(lang, "cricket")}
                  </button>
                  <button
                    aria-pressed={lesson.id === "flying"}
                    onClick={() => changeContext(2)}
                  >
                    {t(lang, "flying")}
                  </button>
                </div>
              </div>
            )}
            {error && (
              <div className="error" role="alert">
                {t(lang, error)}
                <div className="error-actions">
                  <button onClick={() => demo()}>
                    {t(lang, "demoFallback")}
                  </button>
                  {!config.key && (
                    <button onClick={() => setSettings(true)}>
                      {t(lang, "addKey")}
                    </button>
                  )}
                </div>
              </div>
            )}
            {busy && (
              <div className="loading-notice" role="status">
                <span className="spinner" />
                {t(lang, "loading")}
                <button onClick={cancel}>{t(lang, "cancel")}</button>
              </div>
            )}
            {step === 0 ? (
              <Input
                lang={lang}
                sentence={sentence}
                setSentence={(s) => {
                  setSentence(s);
                  setError(null);
                }}
                mode={mode}
                onExample={(i) => demo(i)}
              />
            ) : step === 1 ? (
              <Tokens key={lesson.sentence} lesson={lesson} lang={lang} />
            ) : step === 2 ? (
              <Embeddings key={lesson.sentence} lesson={lesson} lang={lang} />
            ) : step === 3 ? (
              <Attention lesson={lesson} lang={lang} />
            ) : (
              <Prediction key={lesson.sentence} lesson={lesson} lang={lang} />
            )}
            <details className="learn-more" key={`details-${step}`}>
              <summary>{t(lang, "more")}</summary>
              <p>{list(lang, "details")[step]}</p>
            </details>
            {step > 0 && (
              <Suspense fallback={null}>
                <RealNumbers
                  key={
                    lesson.sentence +
                    config.textModel +
                    config.embeddingModel +
                    Boolean(config.key)
                  }
                  lesson={lesson}
                  lang={lang}
                  config={config}
                  onSettings={() => setSettings(true)}
                  onDemo={() => demo()}
                />
              </Suspense>
            )}
          </section>
        </main>
      </div>
      <footer>
        <span>{t(lang, "footer")}</span>
        <div className="footer-buttons">
          {step > 0 && (
            <button className="back-button" onClick={() => go(step - 1)}>
              <Icon name="back" />
              {t(lang, "back")}
            </button>
          )}
          <button
            className="primary"
            disabled={busy}
            onClick={() =>
              step === 0 ? void start() : step === 4 ? go(0) : go(step + 1)
            }
          >
            {t(lang, step === 0 ? "start" : step === 4 ? "restart" : "next")}
            <Icon name={step === 4 ? "loop" : "arrow"} />
          </button>
        </div>
      </footer>
      {settings && (
        <Suspense fallback={null}>
          <Settings
            lang={lang}
            config={config}
            onChange={setConfig}
            onClose={() => setSettings(false)}
            onDemo={() => demo()}
          />
        </Suspense>
      )}
    </div>
  );
}
