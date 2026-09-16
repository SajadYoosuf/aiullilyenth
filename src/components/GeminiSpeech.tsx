import { useEffect, useRef, useState } from "react";
import type { Config, Language } from "../types";
import { generateSpeech, GeminiError } from "../lib/gemini";
import { t } from "../i18n";

export default function GeminiSpeech({text, lang, config, onSettings, onPlay, nativePlaying}: {text:string; lang:Language; config:Config; onSettings:()=>void; onPlay:()=>void; nativePlaying:boolean}) {
  const ml = lang === "ml";
  const [busy,setBusy] = useState(false);
  const [url,setUrl] = useState("");
  const [error,setError] = useState("");
  const [model,setModel] = useState("");
  const abort = useRef<AbortController|null>(null);
  const objectUrl = useRef("");
  const audio = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const hide = () => { if (document.hidden) audio.current?.pause(); };
    document.addEventListener("visibilitychange",hide);
    return () => { document.removeEventListener("visibilitychange",hide); abort.current?.abort(); if (objectUrl.current) URL.revokeObjectURL(objectUrl.current); };
  },[]);
  useEffect(() => { if (nativePlaying) audio.current?.pause(); },[nativePlaying]);
  useEffect(() => {
    abort.current?.abort(); audio.current?.pause();
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = ""; setUrl(""); setError(""); setBusy(false);
  },[text,config.key]);
  async function prepare() {
    if (!config.key) { onSettings(); return; }
    if (busy) return;
    onPlay(); setError(""); setBusy(true);
    const controller = new AbortController(); abort.current = controller;
    try {
      const result = await generateSpeech(text,config.key,controller.signal);
      if (controller.signal.aborted) return;
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
      objectUrl.current = URL.createObjectURL(result.blob);
      setUrl(objectUrl.current); setModel(result.model);
    } catch(e) {
      if (!controller.signal.aborted) {
        const code = e instanceof GeminiError ? e.code : "errorData";
        setError(code === "errorData" || code === "errorRequest" ? (ml ? "Google-ൽ നിന്ന് പ്ലേ ചെയ്യാവുന്ന ശബ്ദം ലഭിച്ചില്ല. വീണ്ടും ശ്രമിക്കൂ; തുടർന്നും പ്രശ്നമുണ്ടെങ്കിൽ AI Studio-യിൽ TTS access പരിശോധിക്കൂ." : "Google did not return playable audio. Try again; if it continues, check TTS access in AI Studio.") : t(lang,code));
      }
    } finally { if (!controller.signal.aborted) setBusy(false); }
  }
  return <section className="gemini-speech" aria-labelledby="gemini-speech-title">
    <h3 id="gemini-speech-title">{ml ? "Gemini ഉപയോഗിച്ച് കേൾക്കാം 🔊" : "Listen with Gemini 🔊"}</h3>
    <p>{ml ? "ഉപകരണത്തിൽ മലയാളം voice ഇല്ലെങ്കിലും ഈ വഴി ശബ്ദം ഉണ്ടാക്കാം. താഴെയുള്ള ബട്ടൺ അമർത്തുമ്പോൾ ഈ ഭാഗത്തെ വാക്കുകൾ Google-ലേക്ക് അയയ്ക്കും. Saved API key ഉപയോഗിക്കും; Google-ന്റെ quota / നിരക്കുകൾ ബാധകമാണ്." : "This can generate speech without an installed device voice. Pressing the button sends this scene’s narration to Google using your saved API key. Google’s quota and charges apply."}</p>
    {!url && <button className="primary" disabled={busy} onClick={() => void prepare()}>{busy ? (ml ? "ശബ്ദം തയ്യാറാക്കുന്നു…" : "Preparing audio…") : config.key ? (ml ? "ഈ ഭാഗത്തിന്റെ ശബ്ദം തയ്യാറാക്കൂ" : "Generate this scene’s audio") : (ml ? "ശബ്ദത്തിനായി Gemini key ചേർക്കൂ" : "Add a Gemini key for audio")}</button>}
    {busy && <button onClick={() => { abort.current?.abort(); setBusy(false); }}>{ml ? "നിർത്താം" : "Cancel"}</button>}
    {url && <><p role="status">{ml ? "ശബ്ദം തയ്യാറായി. താഴെ ▶ Play അമർത്തൂ." : "Audio is ready. Press ▶ Play below."}</p><audio ref={audio} controls src={url} onPlay={onPlay} onError={() => setError(ml ? "ഈ ശബ്ദം പ്ലേ ചെയ്യാൻ കഴിഞ്ഞില്ല. മറ്റൊരു ബ്രൗസറിൽ ശ്രമിക്കൂ." : "This browser could not play the audio. Try another browser.")} aria-label={ml ? "പാഠത്തിന്റെ ശബ്ദം" : "Lesson narration"} /><small>{model} · {ml ? "AI ഉണ്ടാക്കിയ ശബ്ദം" : "AI-generated voice"}</small></>}
    {error && <p className="error" role="alert">{error}</p>}
    <p className="fine-print">{ml ? "ഒരു ബോർഡ് ഭാഗത്തിന്റെ ശബ്ദം വീതമാണ് ഉണ്ടാക്കുന്നത്. കേട്ടശേഷം ‘അടുത്തത് കാണിക്കൂ’ അമർത്താം." : "Audio is generated one board scene at a time. After listening, choose ‘Show me next’."}</p>
  </section>;
}
