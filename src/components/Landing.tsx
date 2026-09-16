import { useState } from "react";
import type { Language } from "../types";
import Icon from "./Icon";
import Buddy from "./Buddy";

export default function Landing({ lang, onStart }: { lang: Language; onStart: () => void }) {
  const ml = lang === "ml";
  const [guess, setGuess] = useState<"cricket" | "animal" | null>(null);
  return <main className="landing kid-landing">
    <section className="landing-hero" aria-labelledby="welcome-title">
      <div className="landing-copy">
        <div className="buddy-greeting"><Buddy /><span>{ml ? "ഹായ്! ഒരു കളി കളിച്ചാലോ?" : "Hi! Ready for a word adventure?"}</span></div>
        <div className="eyebrow">{ml ? "കുട്ടികൾക്കുള്ള AI കളിക്കളം" : "An AI playground for kids"}</div>
        <h1 id="welcome-title" tabIndex={-1}>{ml ? "വാക്കുകൾ കൊണ്ട്" : "Little words."}<br /><em>{ml ? "AI എന്താണ് ചെയ്യുന്നത്?" : "Big AI discoveries!"}</em></h1>
        <p>{ml ? "വാക്കുകൾ തൊടാം. കഷണങ്ങളാക്കാം. അടുത്ത വാക്ക് ഊഹിക്കാം. കളിച്ചുകൊണ്ട് AI എങ്ങനെ പ്രവർത്തിക്കുന്നു എന്ന് പഠിക്കാം!" : "Tap words. Break them into pieces. Guess what comes next. Learn how AI works by trying it yourself!"}</p>
        <p className="kid-translation" lang={ml ? "en" : "ml"}>{ml ? "Learn how AI works with words. One little activity at a time." : "ചെറിയ കളികളിലൂടെ AI-യെ അറിയാം."}</p>
        <button className="primary landing-start" onClick={onStart}>{ml ? "നമുക്ക് തുടങ്ങാം!" : "Let’s play & learn!"}<Icon name="arrow" /></button>
        <p className="landing-note">{ml ? "5 ചെറിയ ചുവടുകൾ · കോഡിംഗ് അറിയേണ്ടതില്ല" : "5 little steps · No coding needed"}</p>
      </div>
      <section className="landing-preview guessing-game" aria-labelledby="guess-title">
        <span className="game-badge">{ml ? "ആദ്യം ഒരു കുഞ്ഞു കളി" : "Try a tiny challenge"}</span>
        <h2 id="guess-title">{ml ? "ഇവിടെ “bat” ആരാണ്?" : "Which bat is this?"}</h2>
        <p className="guess-sentence" lang="en">The <b>bat</b> flew away.</p>
        <p>{ml ? "“flew” എന്നാൽ പറന്നു. ചിത്രം തിരഞ്ഞെടുത്തോളൂ!" : "“Flew” is your clue. Tap a picture!"}</p>
        <div className="guess-choices">
          <button aria-pressed={guess === "cricket"} onClick={() => setGuess("cricket")}><span aria-hidden="true">🏏</span>{ml ? "ക്രിക്കറ്റ് ബാറ്റ്" : "Cricket bat"}</button>
          <button aria-pressed={guess === "animal"} onClick={() => setGuess("animal")}><span aria-hidden="true">🦇</span>{ml ? "വവ്വാൽ" : "Flying animal"}</button>
        </div>
        <div className={`guess-feedback ${guess === "animal" ? "solved" : ""}`} aria-live="polite" aria-atomic="true">
          {guess === "animal" ? (ml ? "കണ്ടുപിടിച്ചു! ⭐ “പറന്നു” എന്ന വാക്കാണ് സഹായിച്ചത്. AI-യും ചുറ്റുമുള്ള വാക്കുകൾ ഉപയോഗിക്കുന്നു." : "You found it! ⭐ “Flew” helped you decide. AI uses nearby words too.") : guess === "cricket" ? (ml ? "വീണ്ടും നോക്കാം! ഏതിനാണ് ചിറകുള്ളത്?" : "Let’s try again! Which one has wings?") : (ml ? "തെറ്റിയാലും കുഴപ്പമില്ല. വീണ്ടും ശ്രമിക്കാം." : "It’s okay to try. You can always choose again.")}
        </div>
      </section>
    </section>
    <section className="landing-learn" aria-labelledby="learn-title">
      <div className="eyebrow">{ml ? "നിന്റെ കണ്ടെത്തലുകൾ" : "Your discoveries"}</div>
      <h2 id="learn-title">{ml ? "ഇനി എന്തൊക്കെ ചെയ്യാം?" : "What will you try next?"}</h2>
      <div className="landing-cards">
        {[{icon:"🧩", ml:"വാക്കുകളുടെ പസിൽ", en:"Word puzzles", textMl:"വാക്യം ചെറിയ കഷണങ്ങളാകുന്നത് കാണാം.", textEn:"See a sentence turn into little pieces."}, {icon:"🗺️", ml:"അർത്ഥത്തിന്റെ മാപ്പ്", en:"A meaning map", textMl:"വാക്കുകൾക്ക് അക്കങ്ങൾ കൊണ്ട് വിലാസം നൽകാം.", textEn:"Explore how numbers can represent words."}, {icon:"🔎", ml:"വാക്കുകളുടെ കൂട്ടുകാർ", en:"Word detectives", textMl:"കൂടെയുള്ള വാക്കുകൾ എന്ത് സൂചന നൽകുന്നു?", textEn:"Find clues in the words nearby."}].map(card => <article key={card.en}><span className="kid-card-icon" aria-hidden="true">{card.icon}</span><h3>{ml ? card.ml : card.en}</h3><p>{ml ? card.textMl : card.textEn}</p></article>)}
      </div>
    </section>
    <details className="grownup-notes"><summary>{ml ? "രക്ഷിതാക്കൾക്കും അധ്യാപകർക്കും" : "For parents & teachers"}</summary>
      <p>{ml ? "മലയാളത്തിലും ലളിതമായ ഇംഗ്ലീഷിലും പഠിക്കാം. തയ്യാറായ പാഠങ്ങൾക്ക് അക്കൗണ്ടോ API key-യോ വേണ്ട. സ്വന്തം വാക്യങ്ങൾക്കുള്ള Gemini ക്രമീകരണം മുതിർന്ന ഒരാളുടെ സഹായത്തോടെ ഉപയോഗിക്കാം." : "Learn in Malayalam and simple English. Built-in lessons need no account or API key. An adult can help set up Gemini for custom sentences."}</p>
      <p>{ml ? "ഇവ ആശയം പഠിപ്പിക്കുന്ന ചെറിയ മാതൃകകളാണ്; യഥാർത്ഥ AI-യുടെ ഉള്ളിലെ കണക്കുകളല്ല. പാഠങ്ങളിൽ NLP, LLM, ചരിത്രം, ഗവേഷണസ്രോതസ്സുകൾ എന്നിവയും ഉണ്ട്." : "These are small teaching models, not measurements inside a real AI. Lessons also include NLP, LLMs, research history and original sources."}</p>
      <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer">Attention Is All You Need · Original research ↗</a>
    </details>
  </main>;
}
