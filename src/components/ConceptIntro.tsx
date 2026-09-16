import type { Language } from "../types";
import { concepts, t } from "../i18n";
import Buddy from "./Buddy";
const missions = [
  ["ഒരു വാക്യം തിരഞ്ഞെടുക്കൂ. അതിലെ വാക്കുകളെ നമുക്ക് പരിചയപ്പെടാം!", "Choose a sentence. Let’s meet its words!"],
  ["ഒരു കഷണം തൊട്ടു നോക്കൂ. വാക്യത്തിലെ ഏത് ഭാഗമാണത്?", "Tap a piece. Which part of the sentence is it?"],
  ["മാപ്പിലെ ഒരു വാക്ക് തൊടൂ. അതിന്റെ അക്കങ്ങൾ നോക്കൂ!", "Tap a word on the map. Look at its numbers!"],
  ["ഒരു വാക്ക് തിരഞ്ഞെടുക്കൂ. ഏത് വാക്കിനാണ് കൂടുതൽ ശ്രദ്ധ കിട്ടുന്നത്?", "Choose a word. Which word gets the most attention?"],
  ["അടുത്തത് ഏത് വാക്കായിരിക്കും? സാധ്യതകൾ നോക്കൂ!", "What word could come next? Explore the possibilities!"],
];

export default function ConceptIntro({
  step,
  lang,
}: {
  step: number;
  lang: Language;
}) {
  const concept = concepts[step];
  const languages: Language[] = lang === "ml" ? ["ml", "en"] : ["en", "ml"];
  return (
    <section className="mission-intro" aria-labelledby={`concept-${step}`}>
      <div className="mission-card"><Buddy /><div><h2 id={`concept-${step}`}>{lang === "ml" ? "ഇനി നിന്റെ ഊഴം!" : "Your turn!"}</h2><p>{missions[step][lang === "ml" ? 0 : 1]}</p></div></div>
      {step === 0 && <p className="kid-definition">{lang === "ml" ? "LLM എന്നത് ധാരാളം എഴുത്തുകളിൽ നിന്ന് ഭാഷയിലെ ക്രമങ്ങൾ പഠിച്ച ഒരു AI മോഡലാണ്. NLP എന്നാൽ കമ്പ്യൂട്ടറുകൾ ഭാഷ കൈകാര്യം ചെയ്യുന്ന പഠനമേഖല." : "An LLM is an AI model that learns language patterns from lots of text. NLP is the field of helping computers work with language."}</p>}
      <details className="concept-intro kid-extra">
      <summary>{lang === "ml" ? "ഈ ആശയം കുറച്ചുകൂടി അറിയാം" : "Tell me a little more"}</summary>
      <div className="eyebrow">{t(lang, "understandFirst")}</div>
      <h3>{concept.term}</h3>
      {languages.map((language) => (
        <div key={language} lang={language} className="concept-language">
          <p>{concept[language].meaning}</p>
          <p className="concept-example">{concept[language].example}</p>
        </div>
      ))}
      </details>
    </section>
  );
}
