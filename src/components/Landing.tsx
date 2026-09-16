import { useState } from "react";
import type { Language } from "../types";
import Buddy from "./Buddy";
import ProductScope from "./ProductScope";

export default function Landing({ lang, onStart, onSetup, onCustom, hasKey }: { lang: Language; onStart: () => void; onSetup: () => void; onCustom: (text: string) => void; hasKey: boolean }) {
  const ml = lang === "ml";
  const [guess, setGuess] = useState<"cricket" | "animal" | null>(null);
  const [input, setInput] = useState("");
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  return <main className="landing kid-landing">
    <section className="landing-hero" aria-labelledby="welcome-title">
      <div className="landing-copy">
        <div className="buddy-greeting"><Buddy /><span>{ml ? "ഒരു വാക്ക് പറയൂ. നമുക്ക് നോക്കാം!" : "Bring a word. Let’s explore it!"}</span></div>
        <div className="eyebrow">{ml ? "കുട്ടികൾക്കുള്ള ഭാഷാ മോഡൽ പഠനശാല · LLM" : "A language-model learning lab for kids · LLM"}</div>
        <h1 id="welcome-title" tabIndex={-1}>{ml ? "ChatGPT പോലുള്ളവ" : "How do chat assistants"}<br /><em>{ml ? "മറുപടി എഴുതുന്നത് എങ്ങനെ?" : "write their replies?"}</em></h1>
        <p className="hero-product-intro">{ml ? "ChatGPT, Gemini, Claude — കേട്ടിട്ടില്ലേ? ഇവയുടെ ഭാഷാ കഴിവുകൾക്ക് പിന്നിലെ LLM ആശയങ്ങൾ ലളിതമായി പഠിക്കാനുള്ള ഇടമാണ് ‘AI ഉള്ളിൽ എന്താണ്?’. AI എന്ന വലിയ മേഖലയിലെ ഒരു ഭാഗമാണ് നമ്മൾ ഇവിടെ നോക്കുന്നത്." : "AI Ullil Enthaanu? helps children explore the LLM ideas behind the language abilities of ChatGPT, Gemini, and Claude. We focus on one part of the wider world of AI."}</p>
        <p>{ml ? "മലയാളത്തിലോ ഇംഗ്ലീഷിലോ ഒരു വാക്കോ വാക്യമോ എഴുതൂ. അതിലെ കഷണങ്ങളും അക്കങ്ങളും വാക്കുകൾ തമ്മിലുള്ള ബന്ധവും നമുക്ക് ബോർഡിൽ കണ്ടുപഠിക്കാം." : "Type a word or sentence in Malayalam or English. Explore its pieces, numbers, and word connections through a guided board lesson."}</p>
        <a className="scope-jump" href="#about-llms" onClick={e => { e.preventDefault(); document.getElementById("about-llms")?.scrollIntoView({block:"start"}); document.getElementById("about-llms")?.focus({preventScroll:true}); }}>{ml ? "AI, LLM, chat apps — വ്യത്യാസവും സ്രോതസ്സുകളും ↓" : "AI, LLMs & chat apps: see the difference and sources ↓"}</a>
        <ol className="hero-steps">
          <li><b>1</b>{ml ? "Gemini API key ചേർക്കൂ" : "Add a Gemini API key"}</li>
          <li><b>2</b>{ml ? "ഒരു വാക്കോ വാക്യമോ എഴുതൂ" : "Enter a word or sentence"}</li>
          <li><b>3</b>{ml ? "കണ്ടു പഠിക്കൂ, ചെയ്തുനോക്കൂ" : "Watch, listen & explore"}</li>
        </ol>
        <p className="landing-note">{ml ? "ഇത് പഠിക്കാനുള്ള മാതൃകയാണ്; Gemini-യുടെ ഉള്ളിലെ യഥാർത്ഥ കണക്കുകളല്ല. ശബ്ദം ഉപകരണത്തിലെ voice ലഭ്യത അനുസരിച്ചിരിക്കും." : "This is a teaching model, not Gemini’s actual internal calculations. Audio depends on voices available on your device."}</p>
      </div>
      <section className="hero-input-card" aria-labelledby="hero-key-title">
        <span className="game-badge">{ml ? "ഇവിടെ തുടങ്ങാം" : "Start here"}</span>
        <h2 id="hero-key-title">{ml ? "🔑 പരീക്ഷിക്കാൻ API key വേണം" : "🔑 An API key powers your lesson"}</h2>
        <p>{ml ? "ഈ വെബ്സൈറ്റിൽ നീ നൽകുന്ന വാക്കുകൾ പരീക്ഷിക്കാൻ Gemini API key ആവശ്യമാണ്. ആദ്യം ഒരു മുതിർന്ന ആളിന്റെ സഹായത്തോടെ അത് ചേർക്കാം." : "To explore words you enter on this website, you need a Gemini API key. Ask a grown-up to help with setup."}</p>
        {hasKey && <p className="success">{ml ? "ഒരു key സേവ് ചെയ്തിട്ടുണ്ട്. ഇനി വാക്യം നൽകി തുടരാം." : "A key is saved. Enter your sentence to continue."}</p>}
        <form onSubmit={e => { e.preventDefault(); if (wordCount <= 12) onCustom(input.trim()); }}>
          <label htmlFor="hero-sentence">{ml ? "എന്താണ് പരീക്ഷിക്കേണ്ടത്?" : "What would you like to explore?"}</label>
          <textarea id="hero-sentence" value={input} maxLength={300} onChange={e => setInput(e.target.value)} placeholder={ml ? "ഇവിടെ ഒരു വാക്കോ വാക്യമോ എഴുതൂ…" : "Type a word or sentence here…"} aria-describedby="hero-input-help" required={hasKey} />
          <p id="hero-input-help" className={wordCount > 12 ? "error" : "landing-note"}>{ml ? "മലയാളം / English · 12 വാക്കുകൾ വരെ" : "Malayalam / English · Up to 12 words"} · {wordCount}/12</p>
          <button type="submit" className="primary full-width" disabled={wordCount > 12}>{hasKey ? (ml ? "ഈ വാക്യവുമായി തുടരാം →" : "Continue with this input →") : (ml ? "API key ചേർക്കാം · ഘട്ടങ്ങൾ കാണൂ →" : "Set up API key · Show the steps →")}</button>
        </form>
        <p className="landing-note">{ml ? "നീ എഴുതിയത് key ചേർക്കുമ്പോഴും ഇവിടെ ഉണ്ടാകും. പാഠം തുടങ്ങുമ്പോൾ വാക്യം Google-ലേക്ക് അയയ്ക്കും." : "Your text stays here during setup. It is sent to Google when you start generating the lesson."}</p>
        {hasKey && <button onClick={onSetup}>{ml ? "API key ക്രമീകരണം" : "API key settings"}</button>}
        <div className="hero-demo-link"><button onClick={onStart}>{ml ? "ആദ്യം ഒരു തയ്യാറാക്കിയ ഉദാഹരണം കാണാം" : "Preview a ready-made example first"}</button><small>{ml ? "ഉദാഹരണങ്ങൾ കാണാൻ key വേണ്ട." : "Examples need no key."}</small></div>
      </section>
    </section>
    <div id="about-llms" tabIndex={-1}><ProductScope lang={lang} /></div>
    <details className="landing-sample"><summary>{ml ? "ഒരു ചെറിയ കളിയിലൂടെ നോക്കാം" : "Try a small sample activity"}</summary>
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
    </details>
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
