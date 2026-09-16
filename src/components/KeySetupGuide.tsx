import type { Language } from "../types";
import { t } from "../i18n";

export default function KeySetupGuide({ lang }: { lang: Language }) {
  const ml = lang === "ml";
  return <details className="key-setup-guide" open>
    <summary>{ml ? "API key എങ്ങനെ ചേർക്കാം? ഘട്ടം ഘട്ടമായി" : "How do I add an API key? Step by step"}</summary>
    <p>{ml ? "രക്ഷിതാവിനോ അധ്യാപകനോ വേണ്ടിയുള്ള സഹായക്കുറിപ്പ്." : "A setup guide for a parent or teacher."}</p>
    <ol>
      <li><strong>{ml ? "Google AI Studio തുറക്കൂ" : "Open Google AI Studio"}</strong><p><a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer">Google AI Studio · API keys ↗</a> — {ml ? "നിങ്ങളുടെ Google അക്കൗണ്ടിൽ പ്രവേശിക്കൂ." : "Sign in with your Google account."}</p></li>
      <li><strong>{ml ? "ഒരു Gemini key ഉണ്ടാക്കൂ" : "Create a Gemini key"}</strong><p>{ml ? "നിലവിലുള്ള key ഉപയോഗിക്കാം, അല്ലെങ്കിൽ ‘Create API key’ തിരഞ്ഞെടുക്കൂ. കാണിക്കുന്ന നിർദ്ദേശങ്ങൾ അനുസരിച്ച് ഒരു project തിരഞ്ഞെടുക്കുകയോ ഉണ്ടാക്കുകയോ ചെയ്യൂ. Key പകർത്തൂ." : "Use an existing key or choose ‘Create API key’. Follow the prompts to select or create a project, then copy the key."}</p></li>
      <li><strong>{ml ? "ഈ വെബ്സൈറ്റിലേക്ക് മടങ്ങൂ" : "Come back to this website"}</strong><p>{ml ? `‘${t(lang, "keyLabel")}’ എന്ന ഇടത്ത് key ഒട്ടിക്കൂ. ‘${t(lang, "save")}’ അമർത്തൂ.` : `Paste it into ‘${t(lang, "keyLabel")}’ below and press ‘${t(lang, "save")}’.`}</p></li>
      <li><strong>{ml ? "ലഭ്യമായ മോഡൽ നോക്കൂ" : "Check the available model"}</strong><p>{ml ? "നിങ്ങളുടെ key-യ്ക്ക് ലഭ്യമായ മോഡലുകൾ ഈ app കണ്ടെത്തും. പട്ടികയിലെ തിരഞ്ഞെടുപ്പ് ഉപയോഗിക്കാം. Key പരിശോധിച്ചത് മാത്രം പാഠം ഉണ്ടാക്കാനുള്ള quota ഉറപ്പാക്കുന്നില്ല." : "The app loads models available to your key. Use the selected model. A successful key check does not guarantee generation quota."}</p></li>
      <li><strong>{ml ? "സ്വന്തം വാക്യം പരീക്ഷിക്കൂ" : "Try your own sentence"}</strong><p>{ml ? `‘സ്വന്തം വാക്യം പരീക്ഷിക്കാം’ അമർത്തി 12 വാക്കുകൾ വരെ മലയാളത്തിലോ ഇംഗ്ലീഷിലോ എഴുതൂ. ഉദാഹരണം: ‘പൂച്ച പാൽ കുടിക്കുന്നു’. തുടർന്ന് ‘${t(lang, "start")}’ അമർത്തൂ.` : `Press ‘Try my own sentence’, enter up to 12 words in Malayalam or English, then press ‘${t(lang, "start")}’. Try ‘The cat drinks milk.’`}</p></li>
    </ol>
    <p>{ml ? "സ്വന്തം വാക്യം Google-ലേക്ക് അയച്ചാണ് പാഠം ഉണ്ടാക്കുന്നത്. Key രഹസ്യമായി സൂക്ഷിക്കൂ. പങ്കിടുന്ന ഉപകരണത്തിൽ ‘ഓർത്തുവയ്ക്കുക’ തിരഞ്ഞെടുക്കാതിരിക്കാം. Google-ന്റെ ഉപയോഗപരിധികളും നിരക്കുകളും ബാധകമാണ്." : "Custom sentences are sent to Google to create a lesson. Keep your key private. Leave ‘Remember’ off on shared devices. Google’s usage limits and charges apply."}</p>
    <a href="https://ai.google.dev/gemini-api/docs/api-key" target="_blank" rel="noreferrer">{ml ? "Google-ന്റെ ഔദ്യോഗിക നിർദ്ദേശങ്ങൾ" : "Google’s official setup instructions"} ↗</a>
  </details>;
}
