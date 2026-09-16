import { useState } from "react";
import type { Language, Lesson } from "../../types";
import { t } from "../../i18n";
export default function Tokens({
  lesson,
  lang,
}: {
  lesson: Lesson;
  lang: Language;
}) {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <div className="sentence-strip">“{lesson.sentence}”</div>
      <div className="visual-card tokens-visual">
        <div className="token-pieces">
          {lesson.teaching_tokens.map((token, i) => (
            <button
              className={`token-piece tone-${i % 5} ${selected === i ? "selected" : ""}`}
              key={i}
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
              style={{ animationDelay: `${i * 55}ms` }}
            >
              <svg
                viewBox="0 0 110 82"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M12 4H46C40 21 67 21 62 4H98Q106 4 106 12V32C89 27 89 54 106 49V70Q106 78 98 78H65C71 62 43 62 49 78H12Q4 78 4 70V49C21 55 21 27 4 33V12Q4 4 12 4Z"
                  fill="currentColor"
                />
              </svg>
              <span>{token}</span>
            </button>
          ))}
        </div>
        <p className="visual-caption">{t(lang, "tap")}</p>
      </div>
      <div className="selection-card">
        <span>
          {t(lang, "token")} {selected + 1} / {lesson.teaching_tokens.length}
        </span>
        <strong>{lesson.teaching_tokens[selected]}</strong>
        <span>
          {lesson.teaching_tokens.length} {t(lang, "tokens")}
        </span>
      </div>
    </>
  );
}
