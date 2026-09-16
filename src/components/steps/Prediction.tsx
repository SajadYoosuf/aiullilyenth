import { useEffect, useState } from "react";
import type { Language, Lesson } from "../../types";
import { t } from "../../i18n";
import Icon from "../Icon";
export default function Prediction({
  lesson,
  lang,
}: {
  lesson: Lesson;
  lang: Language;
}) {
  const options = [...lesson.next_word_options].sort(
    (a, b) => b.percent - a.percent,
  );
  const [selected, setSelected] = useState(0);
  const [typed, setTyped] = useState("");
  const [run, setRun] = useState(0);
  useEffect(() => {
    const chars = Array.from(options[selected].text);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(chars.join(""));
      return;
    }
    setTyped("");
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTyped(chars.slice(0, i).join(""));
      if (i >= chars.length) clearInterval(timer);
    }, 150);
    return () => clearInterval(timer);
  }, [lesson, run, selected]);
  return (
    <>
      <div className="sentence-strip">
        {lesson.sentence}
        <span className="cursor-mark">│</span>
      </div>
      <div className="prediction-options">
        {options.map((o, i) => (
          <button
            key={i}
            className={`prediction-option ${i === selected ? "chosen" : ""}`}
            onClick={() => setSelected(i)}
            aria-pressed={i === selected}
          >
            <span className="option-rank">0{i + 1}</span>
            <div>
              <strong>{o.text}</strong>
              <div className="bar">
                <i style={{ width: `${o.percent}%` }} />
              </div>
            </div>
            <b>{o.percent}%</b>
          </button>
        ))}
      </div>
      {lesson.id === "malayalam" && (
        <p className="fine-print">{t(lang, "others")}</p>
      )}
      <div className="reply-bubble">
        <div className="eyebrow">{t(lang, "reply")}</div>
        <p>
          {lesson.sentence} <strong>{typed}</strong>
          <span className="typing-cursor" aria-hidden="true" />
        </p>
      </div>
      <div className="loop-note">
        <Icon name="loop" />
        <span>{t(lang, "loop")}</span>
        <button className="text-button" onClick={() => setRun(run + 1)}>
          {t(lang, "replay")}
        </button>
      </div>
      <p className="fine-print">{t(lang, "predictionNote")}</p>
    </>
  );
}
