import type { Language, Lesson } from "../types";
import { dimensionGlossary, t } from "../i18n";

export default function DimensionGuide({
  lesson,
  lang,
}: {
  lesson: Lesson;
  lang: Language;
}) {
  const languages: Language[] = lang === "ml" ? ["ml", "en"] : ["en", "ml"];
  return (
    <section className="dimension-guide">
      <h3>{t(lang, "dimensionHeading")}</h3>
      {languages.map((language) => (
        <p key={language} lang={language}>
          {t(language, "dimensionDefinition")}
        </p>
      ))}
      <div className="dimension-cards">
        {lesson.dimensions.map((d, i) => {
          const entry =
            dimensionGlossary[d.name_ml] ||
            dimensionGlossary[d.name_en.toLowerCase()];
          return (
            <article key={i}>
              <span className="dimension-number">{i + 1}</span>
              <h4>
                <span lang="ml">{d.name_ml}</span>
                <span lang="en">{d.name_en}</span>
              </h4>
              {languages.map((language) => (
                <p lang={language} key={language}>
                  {(language === "ml" ? d.meaning_ml : d.meaning_en) ||
                    entry?.[language] ||
                    t(language, "dimensionFallback")}
                </p>
              ))}
              <div className="dimension-scale">
                <span>0 · {t(lang, "less")}</span>
                <span>10 · {t(lang, "moreOf")}</span>
              </div>
            </article>
          );
        })}
      </div>
      {languages.map((language) => (
        <p className="dimension-caveat" lang={language} key={language}>
          {t(language, "dimensionCaveat")}
        </p>
      ))}
    </section>
  );
}
