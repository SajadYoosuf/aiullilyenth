import { useEffect, useRef, useState } from "react";
import type { Config, Language, Lesson } from "../types";
import Buddy from "./Buddy";
import { createSpeechGuide, type Playback } from "../engine/speechGuide";
import { attention } from "../engine/math";
import GeminiSpeech from "./GeminiSpeech";

export default function TeacherWalkthrough({ step, lang, lesson, config, onSettings }: { step: number; lang: Language; lesson: Lesson; config: Config; onSettings: () => void }) {
  const ml = lang === "ml";
  const [scene, setScene] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [playback, setPlayback] = useState<Playback>("idle");
  const [audioLang, setAudioLang] = useState(lang);
  const [rate, setRate] = useState(.85);
  const [voiceId, setVoiceId] = useState("");
  const [answer, setAnswer] = useState<number | null>(null);
  const [tokenPicked, setTokenPicked] = useState<number | null>(null);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [picked, setPicked] = useState(lesson.focus_word);
  const player = useRef<ReturnType<typeof createSpeechGuide> | null>(null);
  const focus = lesson.words.find(w => w.text === picked) || lesson.words[0];
  const available = voices.filter(v => v.lang.toLowerCase().startsWith(audioLang));
  const voice = available.find(v => v.voiceURI === voiceId) || available.find(v => v.localService) || available[0];
  const weights = attention(lesson.words, focus.text);
  const scripts = [
    [
      ["AI കൊണ്ട് പല ജോലികളും ചെയ്യാം. ഇവിടെ നമ്മൾ പഠിക്കുന്നത് ഭാഷാ മോഡലുകളെക്കുറിച്ചാണ്. ChatGPT, Gemini, Claude പോലുള്ളവ മറുപടി എഴുതാൻ ഇത്തരം മോഡലുകൾ ഉപയോഗിക്കുന്നു. വാ, ഒരു ചെറിയ വാക്യം നോക്കാം.", "AI can do many kinds of tasks. Here we explore language models, used by assistants such as ChatGPT, Gemini, and Claude to write replies. Let’s look at a little sentence."],
      ["ഇനി ഒരു വാക്കിൽ തൊട്ടുനോക്കൂ. കണ്ടോ? ആ വാക്ക് മാത്രം തെളിഞ്ഞു. ഇങ്ങനെ ഓരോ ഭാഗവും നമുക്ക് നോക്കാം.", "Now tap a word. See it light up? We can explore each part like this."],
      ["ഇതുപോലെ ധാരാളം എഴുത്തുകൾ കണ്ടാണ് ഭാഷാ മോഡൽ ക്രമങ്ങൾ പഠിക്കുന്നത്. ഇനി താഴെ ഒരു വാക്യം തിരഞ്ഞെടുത്ത് തുടങ്ങാം.", "A language model learns patterns from lots of text. Choose a sentence below, and let’s begin."],
    ],
    [
      ["ഈ വാക്യം നോക്കൂ. നമുക്ക് വായിക്കാം. പക്ഷേ മോഡൽ ഇതിനെ ചെറിയ ഭാഗങ്ങളാക്കിയാണ് ഉപയോഗിക്കുന്നത്.", "Look at this sentence. A model works with it by splitting it into smaller pieces."],
      ["ഇതാ, ചെറിയ കഷണങ്ങൾ! ഇവയെ ടോക്കണുകൾ എന്നു വിളിക്കും. ഒരു ടോക്കൺ മുഴുവൻ വാക്കാകാം, വാക്കിന്റെ ഭാഗവുമാകാം.", "Here are the pieces! They are called tokens. A token can be a word or part of a word."],
      ["ഇവ പഠിക്കാൻ ഉണ്ടാക്കിയ കഷണങ്ങളാണ്. ഇനി താഴെയുള്ള പസിലിൽ ഒരു കഷണം തൊട്ടുനോക്കൂ.", "These pieces are teaching examples. Try tapping a piece in the puzzle below."],
    ],
    [
      ["ഒരു സ്ഥലം കണ്ടെത്താൻ മാപ്പ് ഉപയോഗിച്ചിട്ടില്ലേ? രണ്ട് അക്കങ്ങൾ കൊണ്ട് മാപ്പിൽ ഒരു സ്ഥലം കാണിക്കാം.", "Have you used a map to find a place? Two coordinates can locate a place on a map."],
      [`നമ്മുടെ ചെറിയ മാപ്പിൽ ${focus.text} എന്ന വാക്കിന് ${focus.x}, ${focus.y} എന്ന അക്കങ്ങൾ കൊടുത്തിട്ടുണ്ട്. ഒരു വാക്കിൽ തൊട്ടാൽ അതിന്റെ അക്കവിലാസം കാണാം.`, `On our little map, ${focus.text} has the numbers ${focus.x} and ${focus.y}. Tap a word to see its number address.`],
      ["ഇത് ഭൂമിയിലെ സ്ഥലമല്ല കേട്ടോ! വാക്കുകളെ അക്കങ്ങളായി കാണിക്കുന്ന ഒരു മാതൃകയാണ്. യഥാർത്ഥ മോഡലിൽ ഇതിലും ഒരുപാട് അക്കങ്ങളുണ്ട്.", "This is not a place on Earth! It is an example of representing words with numbers. Real models use many more numbers."],
    ],
    [
      ["ഒരു വാക്ക് ഒറ്റയ്ക്ക് കണ്ടാൽ എല്ലാം മനസ്സിലാകുമോ? കൂടെയുള്ള വാക്കുകളും നോക്കിയാലോ?", "Can one word tell us everything? Let’s look at the words around it too."],
      ["അതിന് സഹായിക്കുന്ന രീതിയാണ് attention. ഓരോ വാക്കിൽ നിന്നുമുള്ള വിവരം എത്ര ചേർക്കണമെന്ന് അത് കണക്കാക്കുന്നു.", "Attention helps with this. It calculates how much information to mix in from each word."],
      ["ഇനി ഒരു വാക്ക് തിരഞ്ഞെടുക്കൂ. ബോർഡിലെ ശതമാനങ്ങൾ നോക്കൂ. കൂടുതൽ ശതമാനം എന്നാൽ ആ വാക്കിൽ നിന്ന് കൂടുതൽ വിവരം ചേർക്കുന്നു.", "Choose a word and look at the percentages on the board. A larger percentage means more information is mixed in from that word."],
    ],
    [
      ["വാക്യം ഇതുവരെ വായിച്ചു. ഇനി എന്തായിരിക്കും വരുന്നത്? നീ ഒന്ന് ഊഹിച്ചുനോക്കൂ!", "We have read the sentence so far. What might come next? Have a guess!"],
      ["മോഡലും സാധ്യതകൾ കണക്കാക്കും. ഇവിടെ കാണുന്ന ശതമാനങ്ങൾ പഠിക്കാനുള്ള ഉദാഹരണങ്ങളാണ്.", "The model calculates possibilities too. These percentages are examples for learning."],
      ["സാധ്യത കൂടുതലുള്ള ഉത്തരം പോലും തെറ്റാം. ഇനി താഴെ ഒരു വാക്ക് തിരഞ്ഞെടുത്ത് വാക്യം എങ്ങനെ മാറുന്നു എന്ന് നോക്കൂ.", "Even a likely answer can be wrong. Choose a word below and see how the sentence changes."],
    ],
  ];
  const questions = [
    { q: ["ഭാഷാ മോഡൽ എന്തിൽ നിന്നാണ് പഠിക്കുന്നത്?", "What does a language model learn from?"], options: [["ഒരുപാട് എഴുത്തുകളിൽ നിന്ന്", "From lots of text"], ["ഒരു വാക്ക് മാത്രം കണ്ടിട്ട്", "From just one word"]], correct: 0, hint: ["ഒരു ഉദാഹരണം മാത്രം പോരല്ലോ. ഒരുപാട് എഴുത്തുകൾ കണ്ടാണ് ഭാഷയിലെ ക്രമങ്ങൾ പഠിക്കുന്നത്.", "One example is not enough. It learns patterns from lots of text."] },
    { q: ["ഒരു ടോക്കൺ എപ്പോഴും ഒരു മുഴുവൻ വാക്കാണോ?", "Is a token always a whole word?"], options: [["അതെ, എപ്പോഴും", "Yes, always"], ["അല്ല, വാക്കിന്റെ ഭാഗവുമാകാം", "No, it can be part of a word"]], correct: 1, hint: ["പസിൽ ഓർത്തുനോക്കൂ. ഒരു വാക്കിൽ തന്നെ പല കഷണങ്ങൾ ഉണ്ടാകാം.", "Think of the puzzle. One word can contain several pieces."] },
    { q: ["വാക്കിന്റെ ഈ അക്കങ്ങൾ എന്താണ്?", "What are these word numbers?"], options: [["ഭൂമിയിലെ latitude, longitude", "Latitude and longitude on Earth"], ["പഠനമാപ്പിലെ രണ്ട് അളവുകൾ", "Two scales on our learning map"]], correct: 1, hint: ["മാപ്പിന്റെ ആശയം മാത്രമാണ് കടമെടുത്തത്. വാക്കുകൾക്ക് ഭൂമിയിൽ ഒരു സ്ഥലം കൊടുക്കുന്നില്ല.", "We borrowed the idea of a map. Words are not given a location on Earth."] },
    { q: ["കൂടുതൽ attention ഭാരം വന്നാൽ?", "What does a larger attention weight mean?"], options: [["ആ വാക്കിൽ നിന്ന് കൂടുതൽ വിവരം ചേർക്കും", "More information is mixed from that word"], ["ആ വാക്ക് എപ്പോഴും ശരിയാണ്", "That word is always correct"]], correct: 0, hint: ["ഭാരം എന്നത് എത്ര വിവരം ചേർക്കുന്നു എന്നാണ്. ശരിയോ തെറ്റോ എന്ന വിധിയല്ല.", "Weight says how much information to mix, not whether something is true."] },
    { q: ["കൂടുതൽ സാധ്യതയുള്ള ഉത്തരം എപ്പോഴും ശരിയാകുമോ?", "Is the most likely answer always correct?"], options: [["അല്ല, തെറ്റാനും സാധ്യതയുണ്ട്", "No, it can still be wrong"], ["അതെ, ഉറപ്പായും", "Yes, definitely"]], correct: 0, hint: ["നമ്മൾ ഊഹിക്കുമ്പോഴും തെറ്റാറില്ലേ? സാധ്യത കൂടുതലാണെന്നത് ശരിയാണെന്ന ഉറപ്പല്ല.", "Guesses can be wrong. A high probability is not a guarantee of truth."] },
  ];
  const quiz = questions[step];
  const narration = scripts[step][scene][audioLang === "ml" ? 0 : 1];
  function stop() {
    player.current?.stop();
  }
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    player.current = createSpeechGuide(synth);
    const update = () => setVoices(synth.getVoices());
    update();
    synth.addEventListener("voiceschanged", update);
    const voiceRefresh = window.setTimeout(update, 1200);
    window.addEventListener("focus", update);
    const hide = () => { if (document.hidden) player.current?.pause(); };
    document.addEventListener("visibilitychange", hide);
    return () => {
      synth.removeEventListener("voiceschanged", update);
      window.clearTimeout(voiceRefresh);
      window.removeEventListener("focus", update);
      document.removeEventListener("visibilitychange", hide);
      player.current?.dispose();
    };
  }, []);
  function listen(from = scene) {
    if (!voice) return;
    const index = audioLang === "ml" ? 0 : 1;
    const lines = scripts[step].slice(from).map((line, i) => line[index] + (i + from === 2 ? ` ${quiz.q[index]} ${quiz.options.map(o => o[index]).join(". ")}` : ""));
    player.current?.play(lines, voice, rate, i => setScene(from + i), setPlayback);
  }
  function feedback(index: number) {
    setAnswer(index);
    stop();
    if (voice) {
      const l = audioLang === "ml" ? 0 : 1;
      const text = (index === quiz.correct ? (l === 0 ? "അതെ, അതുതന്നെ! " : "Yes, that’s it! ") : (l === 0 ? "സാരമില്ല, ഒന്നുകൂടി നോക്കാം. " : "No worries, let’s think again. ")) + quiz.hint[l];
      player.current?.play([text], voice, rate, () => {}, setPlayback);
    }
  }
  function changeScene(next: number) {
    const continueAudio = playback === "playing";
    stop();
    setScene(next);
    if (continueAudio) listen(next);
  }
  return <section className="teacher-walkthrough" aria-labelledby="teacher-title">
    <div className="teacher-heading"><Buddy /><div><h2 id="teacher-title">{ml ? "വാ, ഞാൻ കാണിച്ചുതരാം!" : "Come, I’ll show you!"}</h2><p>{ml ? "കേൾക്കാം. കാണാം. പിന്നെ ചെയ്തുനോക്കാം." : "Listen. Watch. Then try it yourself."}</p></div></div>
    <div className="teacher-board" aria-label={ml ? "പഠനബോർഡ്" : "Learning board"}>
      <span className="board-label">{ml ? "നമ്മുടെ ബോർഡ്" : "Our board"} · {scene + 1}/3</span>
      {scene === 0 ? <p className="board-sentence">{lesson.sentence}</p> : step === 1 ? <><div className="board-pieces">{lesson.teaching_tokens.map((token, i) => <button key={i} aria-pressed={tokenPicked === i} style={{ animationDelay: `${i * 80}ms` }} onClick={() => { stop(); setTokenPicked(i); }}>{token}</button>)}</div>{tokenPicked !== null && <p role="status">{ml ? "ഈ കഷണം തിരഞ്ഞെടുത്തു: " : "You chose this piece: "}{lesson.teaching_tokens[tokenPicked]}</p>}</> : step === 4 ? <><div className="board-pieces">{lesson.next_word_options.map((option, i) => <button key={i} aria-pressed={prediction === i} onClick={() => { stop(); setPrediction(i); }}>{option.text} · {option.percent}%</button>)}</div>{prediction !== null && <p className="board-task" role="status">{lesson.sentence} <strong>{lesson.next_word_options[prediction].text}</strong></p>}</> : <>
        <div className="board-pieces">{lesson.words.map(w => <button key={w.text} aria-pressed={picked === w.text} onClick={() => { stop(); setPicked(w.text); }}>{w.text}</button>)}</div>
        {step === 2 && <><svg className="board-map" viewBox="0 0 300 205" role="img" aria-label={`${focus.text}: ${focus.x}, ${focus.y}`}>
          <path d="M40 15V165H265" stroke="#d0e2d8" strokeWidth="2" fill="none" />
          <path className="chalk-line" d={`M40 ${165-focus.y*13}H${40+focus.x*21}V165`} stroke="#ffe19a" strokeWidth="2" strokeDasharray="5 4" fill="none" />
          <circle cx={40+focus.x*21} cy={165-focus.y*13} r="7" fill="#ffe19a" />
          <text x="25" y="185" fill="#fffdf1" fontSize="12">0</text><text x="255" y="185" fill="#fffdf1" fontSize="12">10</text><text x="12" y="38" fill="#fffdf1" fontSize="12">10</text>
          <text x="155" y="202" fill="#fffdf1" fontSize="12" textAnchor="middle">{ml ? lesson.dimensions[0].name_ml : lesson.dimensions[0].name_en}</text>
          <text x="48" y="14" fill="#fffdf1" fontSize="12">{ml ? lesson.dimensions[1].name_ml : lesson.dimensions[1].name_en}</text>
        </svg><p className="board-equation" aria-live="polite">{focus.text} → [{focus.x}, {focus.y}]</p></>}
        {step === 3 && <div className="board-weights" aria-live="polite">{lesson.words.map((w,i) => <div key={w.text}><span>{w.text}</span><div><i style={{width:`${weights.percents[i]}%`}} /></div><b>{weights.percents[i]}%</b></div>)}</div>}
      </>}
      {scene === 2 && <p className="board-task">{ml ? "ഇനി നീ ചെയ്തുനോക്കൂ! ↓" : "Now it’s your turn! ↓"}</p>}
    </div>
    <p className={`teacher-caption ${playback === "playing" ? "is-speaking" : ""}`} lang={audioLang} aria-live={playback === "playing" ? "off" : "polite"}>{narration}</p>
    <div className="teacher-controls">
      {voice && <button className="primary" onClick={() => playback === "playing" ? player.current?.pause() : playback === "paused" ? player.current?.resume() : listen()}>{playback === "playing" ? (ml ? "ഒന്ന് നിർത്തൂ ⏸" : "Pause ⏸") : playback === "paused" ? (ml ? "ബാക്കി കേൾക്കാം ▶" : "Continue ▶") : (ml ? "ഉപകരണത്തിലെ ശബ്ദത്തിൽ കേൾക്കാം 🔊" : "Listen with device voice 🔊")}</button>}
      <button onClick={() => { stop(); setScene(0); setAnswer(null); if (voice) listen(0); }}>{ml ? "ആദ്യം മുതൽ വീണ്ടും ↻" : "Replay from the start ↻"}</button>
      <button disabled={scene === 0} onClick={() => changeScene(scene - 1)}>{ml ? "ഒന്നുകൂടി പിന്നിലേക്ക്" : "Previous"}</button>
      {scene < 2 ? <button onClick={() => changeScene(scene + 1)}>{ml ? "അടുത്തത് കാണിക്കൂ →" : "Show me next →"}</button> : <button onClick={() => { stop(); document.getElementById("lesson-activity")?.focus(); document.getElementById("lesson-activity")?.scrollIntoView({ block: "start" }); }}>{ml ? "ഞാൻ ചെയ്തുനോക്കാം ↓" : "Let me try ↓"}</button>}
    </div>
    <details className="cloud-speech-option" open={!voice || playback === "error"}>
      <summary>{ml ? "Gemini ശബ്ദം · ഉപകരണത്തിൽ voice വേണ്ട" : "Gemini audio · No device voice needed"}</summary>
      <GeminiSpeech text={narration} lang={lang} config={config} onSettings={onSettings} onPlay={stop} nativePlaying={playback === "playing"} />
    </details>
    {scene === 2 && <section className="teacher-check" aria-labelledby="teacher-question"><h3 id="teacher-question">{quiz.q[ml ? 0 : 1]}</h3><div>{quiz.options.map((option,i) => <button key={i} aria-pressed={answer === i} onClick={() => feedback(i)}>{option[ml ? 0 : 1]}</button>)}</div>{answer !== null && <p role="status">{answer === quiz.correct ? (ml ? "അതെ, അതുതന്നെ! ⭐ " : "Yes, that’s it! ⭐ ") : (ml ? "സാരമില്ല, ഒന്നുകൂടി നോക്കാം. " : "No worries, let’s think again. ")}{quiz.hint[ml ? 0 : 1]}</p>}</section>}
    <details className="teacher-audio-note"><summary>{ml ? "ശബ്ദവും വേഗവും മാറ്റാം" : "Voice & reading speed"}</summary><div className="voice-options">
      <label>{ml ? "കേൾക്കേണ്ട ഭാഷ" : "Spoken language"}<select value={audioLang} onChange={e => { stop(); setAudioLang(e.target.value as Language); setVoiceId(""); }}><option value="ml">മലയാളം</option><option value="en">English</option></select></label>
      <label>{ml ? "ശബ്ദം" : "Voice"}<select value={voice?.voiceURI || ""} disabled={!available.length} onChange={e => { stop(); setVoiceId(e.target.value); }}>{!available.length && <option value="">{ml ? "ശബ്ദം ലഭ്യമല്ല" : "No voice available"}</option>}{available.map(v => <option key={v.voiceURI} value={v.voiceURI}>{v.name}</option>)}</select></label>
      <label>{ml ? "വേഗം" : "Speed"}<select value={rate} onChange={e => { stop(); setRate(Number(e.target.value)); }}><option value="0.7">{ml ? "പതുക്കെ" : "Slower"}</option><option value="0.85">{ml ? "സാവധാനം" : "Gentle"}</option><option value="1">{ml ? "സാധാരണ" : "Normal"}</option></select></label>
    </div></details>
    {(!voice || playback === "error") && <div className="teacher-audio-note" role="status"><p>{playback === "error" ? (ml ? "ശബ്ദം വന്നില്ലല്ലോ. വീണ്ടും ശ്രമിക്കാം. ബോർഡിലെ ബട്ടണുകൾ ഉപയോഗിച്ചും തുടരാം." : "The audio did not play. Try again, or use the board controls.") : (ml ? "തിരഞ്ഞെടുത്ത ഭാഷയിൽ ഈ ഉപകരണത്തിൽ ശബ്ദം ലഭ്യമല്ല. ബോർഡിലെ ബട്ടണുകൾ ഉപയോഗിച്ച് തുടരാം." : "This device has no voice for the selected language. You can still use the board controls.")}</p>{audioLang === "ml" && voices.some(v => v.lang.toLowerCase().startsWith("en")) && <button onClick={() => { stop(); setAudioLang("en"); setVoiceId(""); }}>{ml ? "മലയാളം പേജ്, English ശബ്ദം" : "Use English audio"}</button>}</div>}
    <details className="teacher-audio-note"><summary>{ml ? "ശബ്ദത്തെക്കുറിച്ച്" : "About the voice"}</summary><p>{ml ? "ഇത് ഉപകരണത്തിലെ വായിച്ചുകേൾപ്പിക്കുന്ന ശബ്ദമാണ്; റെക്കോർഡ് ചെയ്ത അധ്യാപകശബ്ദമല്ല. ശബ്ദത്തിന്റെ ലഭ്യതയും ഉച്ചാരണവും ഉപകരണത്തെ ആശ്രയിക്കും. ചില ശബ്ദസേവനങ്ങൾ വായിക്കുന്ന വാക്കുകൾ അവരുടെ സേവനത്തിലേക്ക് അയയ്ക്കാം." : "This uses your device’s text-to-speech, not a recorded teacher. Voice availability and pronunciation vary. Some voice services may send the spoken text to their provider."}</p></details>
  </section>;
}
