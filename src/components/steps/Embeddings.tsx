import { useState } from "react";
import type { Language, Lesson } from "../../types";
import { t } from "../../i18n";
import MeaningMap from "../MeaningMap";
import DimensionGuide from "../DimensionGuide";
import AddressExample from "../AddressExample";
export default function Embeddings({
  lesson,
  lang,
}: {
  lesson: Lesson;
  lang: Language;
}) {
  const [selected, setSelected] = useState(lesson.focus_word);
  const word = lesson.words.find((w) => w.text === selected) || lesson.words[0];
  return (
    <>
      <AddressExample lesson={lesson} lang={lang} />
      <details className="grownup-notes"><summary>{lang === "ml" ? "ഈ രണ്ട് അളവുകൾ എന്താണെന്ന് നോക്കാം" : "What do these two scales mean?"}</summary><DimensionGuide lesson={lesson} lang={lang} /></details>
      <div className="embedding-grid">
        <div className="number-table">
          <div className="number-row table-head">
            <span>{t(lang, "word")}</span>
            {lesson.dimensions.map((d) => (
              <span key={d.name_en}>
                <span lang="ml">{d.name_ml}</span>
                <span lang="en">{d.name_en}</span>
              </span>
            ))}
          </div>
          {lesson.words.map((w, i) => (
            <button
              key={w.text}
              className={`number-row ${selected === w.text ? "active-row" : ""}`}
              aria-pressed={selected === w.text}
              onClick={() => setSelected(w.text)}
            >
              <span>
                <i className={`color-dot tone-${i % 5}`} />
                {w.text}
              </span>
              <span>{w.x}</span>
              <span>{w.y}</span>
            </button>
          ))}
        </div>
        <div className="visual-card">
          <MeaningMap
            lesson={lesson}
            lang={lang}
            selected={word.text}
            onSelect={setSelected}
          />
        </div>
      </div>
      <div className="selection-card">
        <span>{t(lang, "coordinate")}</span>
        <strong>
          {word.text}{" "}
          <code>
            [ {word.x}, {word.y} ]
          </code>
        </strong>
        <span>{t(lang, "mapHint")}</span>
      </div>
    </>
  );
}
