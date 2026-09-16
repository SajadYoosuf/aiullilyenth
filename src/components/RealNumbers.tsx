import { useEffect, useRef, useState } from "react";
import type { Config, Language, Lesson } from "../types";
import { t } from "../i18n";
import { GeminiError, realNumbers, type RealData } from "../lib/gemini";
import { cosine } from "../engine/math";
export default function RealNumbers({
  lesson,
  lang,
  config,
  onSettings,
  onDemo,
}: {
  lesson: Lesson;
  lang: Language;
  config: Config;
  onSettings: () => void;
  onDemo: () => void;
}) {
  const [data, setData] = useState<RealData | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState(0);
  const abort = useRef<AbortController | null>(null);
  useEffect(() => () => abort.current?.abort(), []);
  async function load() {
    setBusy(true);
    setError("");
    const ac = new AbortController();
    abort.current = ac;
    try {
      setData(await realNumbers(lesson, config, ac.signal));
    } catch (e) {
      if (!ac.signal.aborted)
        setError(t(lang, e instanceof GeminiError ? e.code : "errorData"));
    } finally {
      if (!ac.signal.aborted) setBusy(false);
    }
  }
  return (
    <details className="learn-more real-panel">
      <summary>{t(lang, "real")}</summary>
      <p>{t(lang, "realIntro")}</p>
      {!config.key || !config.textModel ? (
        <button onClick={onSettings}>{t(lang, "addKey")}</button>
      ) : (
        !data && (
          <button onClick={() => void load()} disabled={busy}>
            {t(lang, busy ? "loading" : "loadReal")}
          </button>
        )
      )}
      {error && (
        <div className="error" role="alert">
          {error}
          <button onClick={onDemo}>{t(lang, "demoFallback")}</button>
        </div>
      )}
      {data && (
        <>
          <div className="real-count">
            <span>
              {t(lang, "realCount")}
              <strong>{data.count}</strong>
            </span>
            <span>
              {t(lang, "tokens")}
              <strong>{lesson.teaching_tokens.length}</strong>
            </span>
          </div>
          <p>{t(lang, "realCut")}</p>
          {data.vectors.length > 0 ? (
            <>
              <div className="word-selector">
                {data.vectors.map((v, i) => (
                  <button
                    aria-pressed={selected === i}
                    onClick={() => setSelected(i)}
                    key={v.word}
                  >
                    {v.word}
                  </button>
                ))}
              </div>
              <p>
                {t(lang, "realDims")}{" "}
                <strong>{data.vectors[selected].values.length}</strong>
              </p>
              <p className="fine-print">{t(lang, "firstNumbers")}</p>
              <div
                className="vector-strip"
                tabIndex={0}
                aria-label={t(lang, "firstNumbers")}
              >
                {data.vectors[selected].values.slice(0, 20).map((n, i) => (
                  <code key={i}>{n.toFixed(4)}</code>
                ))}
              </div>
              <h3>{t(lang, "similarity")}</h3>
              {data.vectors
                .filter((_, i) => i !== selected)
                .map((v) => {
                  const similarity = cosine(
                    data.vectors[selected].values,
                    v.values,
                  );
                  return (
                    <div className="similarity" key={v.word}>
                      <div>
                        <span>
                          {data.vectors[selected].word} ↔ {v.word}
                        </span>
                        <strong>{similarity.toFixed(3)}</strong>
                      </div>
                      <div className="cosine-track">
                        <i
                          style={{
                            left:
                              similarity < 0
                                ? `${(similarity + 1) * 50}%`
                                : "50%",
                            width: `${Math.abs(similarity) * 50}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              <p className="fine-print">{t(lang, "realHint")}</p>
            </>
          ) : (
            <p>{t(lang, "noEmbedding")}</p>
          )}
        </>
      )}
    </details>
  );
}
