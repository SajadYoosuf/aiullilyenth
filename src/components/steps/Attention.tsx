import { useState } from "react";
import type { Language, Lesson } from "../../types";
import { t } from "../../i18n";
import { attention } from "../../engine/math";
import MeaningMap from "../MeaningMap";
import Icon from "../Icon";
import PaperAttention from "../PaperAttention";
export default function Attention({
  lesson,
  lang,
}: {
  lesson: Lesson;
  lang: Language;
}) {
  const [focus, setFocus] = useState(lesson.focus_word);
  const [moved, setMoved] = useState(false);
  const [lines, setLines] = useState(true);
  const selected =
    lesson.words.find((w) => w.text === focus) || lesson.words[0];
  const a = attention(lesson.words, selected.text);
  function select(s: string) {
    setFocus(s);
    setMoved(false);
    setLines(true);
  }
  return (
    <>
      <div className="attention-toolbar">
        <span>{t(lang, "focus")}</span>
        <button
          className="focus-chip"
          onClick={() => setLines(!lines)}
          aria-pressed={lines}
        >
          {selected.text} <Icon name="spark" size={17} />
        </button>
      </div>
      <div className="visual-card attention-fan">
        <svg
          viewBox="0 0 320 150"
          role="img"
          aria-label={t(lang, "total") + " 100%"}
        >
          {lesson.words.map((w, i) => {
            const end = 28 + i * (264 / (lesson.words.length - 1));
            return (
              <g key={w.text}>
                <path
                  d={`M160 26 Q160 74 ${end} 121`}
                  fill="none"
                  stroke={`var(--color-${i % 5})`}
                  strokeWidth={lines ? 2 + a.weights[i] * 16 : 1}
                  opacity={lines ? 0.75 : 0.15}
                />
                <circle
                  cx={end}
                  cy="121"
                  r="8"
                  fill={`var(--color-${i % 5})`}
                />
                <text
                  x={end}
                  y="146"
                  textAnchor="middle"
                  fontSize="14"
                  fill="var(--ink)"
                >
                  {a.percents[i]}%
                </text>
              </g>
            );
          })}
          <circle
            cx="160"
            cy="26"
            r="20"
            fill="var(--accent)"
            stroke="var(--ink)"
          />
          <text x="160" y="32" textAnchor="middle" fontSize="18" fill="#193a30">
            ✳
          </text>
        </svg>
      </div>
      <div className="score-grid">
        {lesson.words.map((w, i) => (
          <button
            key={w.text}
            className={`score-card ${selected.text === w.text ? "active-row" : ""}`}
            onClick={() => select(w.text)}
            aria-pressed={selected.text === w.text}
          >
            <div>
              <strong>
                <i className={`color-dot tone-${i % 5}`} />
                {w.text}
              </strong>
              <b>{a.percents[i]}%</b>
            </div>
            <code>
              {selected.x}×{w.x} + {selected.y}×{w.y} = {a.scores[i]}
            </code>
            <div className="bar">
              <i
                className={`tone-${i % 5}`}
                style={{ width: `${a.percents[i]}%` }}
              />
            </div>
          </button>
        ))}
      </div>
      <div className="total-row">
        <span>{t(lang, "total")}</span>
        <strong>100%</strong>
      </div>
      <button className="primary listen" onClick={() => setMoved(!moved)}>
        <Icon name={moved ? "loop" : "spark"} />
        {t(lang, moved ? "reset" : "listen")}
      </button>
      {moved && (
        <div className="insight" role="status">
          {selected.text === lesson.focus_word
            ? lang === "ml"
              ? lesson.insight_ml
              : lesson.insight_en || t(lang, "genericInsight")
            : t(lang, "genericInsight")}
        </div>
      )}
      <div className="visual-card movement">
        <MeaningMap
          lesson={lesson}
          lang={lang}
          selected={selected.text}
          onSelect={select}
          position={moved ? a.position : undefined}
        />
        <div className="position-row">
          <span>
            {t(lang, "before")}
            <strong>
              [{selected.x}, {selected.y}]
            </strong>
          </span>
          <Icon name="arrow" />
          <span>
            {t(lang, "after")}
            <strong>
              [{a.position.x.toFixed(2)}, {a.position.y.toFixed(2)}]
            </strong>
          </span>
        </div>
      </div>
      <p className="fine-print">{t(lang, "rounding")}</p>
      <PaperAttention lang={lang} />
    </>
  );
}
