import type { Language } from "../../types";
import { t, list } from "../../i18n";
import { demos } from "../../lessons";
export default function Input({
  lang,
  sentence,
  setSentence,
  mode,
  onExample,
}: {
  lang: Language;
  sentence: string;
  setSentence: (s: string) => void;
  mode: string;
  onExample: (i: number) => void;
}) {
  return (
    <>
      <div className="input-card">
        <label htmlFor="sentence">{t(lang, "sentence")}</label>
        <textarea
          id="sentence"
          maxLength={300}
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          aria-describedby="input-count"
        />
        <div className="input-meta">
          <span>{t(lang, "languages")}</span>
          <span
            id="input-count"
            className={
              sentence.trim().split(/\s+/).length > 12 ? "invalid" : ""
            }
          >
            {sentence.trim() ? sentence.trim().split(/\s+/).length : 0} / 12
          </span>
        </div>
      </div>
      <p className="example-label">{t(lang, "examples")}</p>
      <div className="example-chips">
        {demos.map((l, i) => (
          <button
            aria-pressed={sentence === l.sentence}
            onClick={() => onExample(i)}
            key={l.id}
          >
            {l.sentence}
          </button>
        ))}
      </div>
      <div className="journey-preview">
        <span className="eyebrow">{t(lang, "sentenceJourney")}</span>
        <svg
          viewBox="0 0 660 115"
          role="img"
          aria-label={list(lang, "previewLabels").join(" → ")}
        >
          <path
            d="M55 40H605"
            stroke="currentColor"
            opacity=".2"
            strokeDasharray="4 6"
          />
          {["Aa", "[ ]", "2, 5", "✳", "…"].map((s, i) => (
            <g key={s} transform={`translate(${55 + i * 137.5},40)`}>
              <rect
                x="-28"
                y="-25"
                width="56"
                height="50"
                rx="13"
                fill={i === 0 ? "#c9f575" : "#e9efeb"}
              />
              <text textAnchor="middle" y="7" fill="#17372e" fontSize="20">
                {s}
              </text>
              <text
                textAnchor="middle"
                y="57"
                fill="currentColor"
                fontSize="16"
              >
                {list(lang, "previewLabels")[i]}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="offline-note">
        {t(lang, mode === "demo" ? "offline" : "live")}
      </div>
    </>
  );
}
