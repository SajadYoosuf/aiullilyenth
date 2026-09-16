import type { Language } from "../types";
const strings = {
  brand: ["AI ഉള്ളിൽ എന്താണ്?", "AI Ullil Enthaanu?"],
  tagline: ["A LITTLE AI LEARNING LAB", "A LITTLE AI LEARNING LAB"],
  journey: ["ഒരു ചെറിയ യാത്ര", "A little journey"],
  sidebar: [
    "വാക്കിൽ നിന്ന്\nമറുപടിയിലേക്ക്.",
    "From a sentence\nto a possibility.",
  ],
  sideNote: [
    "5 ചെറിയ ചുവടുകൾ.\nഒരു വലിയ ആശയം.",
    "5 little steps.\nOne big idea.",
  ],
  steps: [
    [
      "നിങ്ങളുടെ വാചകം",
      "കഷണങ്ങൾ (Tokens)",
      "അർത്ഥം (Embeddings)",
      "ശ്രദ്ധ (Attention)",
      "അടുത്ത വാക്ക്",
    ],
    [
      "Your sentence",
      "Tokens",
      "Embeddings",
      "Attention",
      "Next-word prediction",
    ],
  ],
  kickers: [
    [
      "ആദ്യം, ഒരു വാചകം",
      "ചെറിയ കഷണങ്ങൾ",
      "അർത്ഥത്തിന് ഒരു വിലാസം",
      "വാക്കുകൾ കേൾക്കട്ടെ",
      "ഇനി, എന്ത് വരും?",
    ],
    [
      "FIRST, A SENTENCE",
      "LITTLE BUILDING BLOCKS",
      "AN ADDRESS FOR MEANING",
      "LET WORDS LISTEN",
      "WHAT COMES NEXT?",
    ],
  ],
  titles: [
    [
      "AI-യുടെ ഉള്ളിലേക്ക്\nഒന്ന് നോക്കിയാലോ?",
      "വാക്കുകൾ\nകഷണങ്ങളാകുന്നു.",
      "വാക്കുകൾക്ക്\nഅക്കങ്ങളുടെ വിലാസം.",
      "കൂടെ നിൽക്കുന്ന\nവാക്കുകൾക്കും കാര്യമുണ്ട്.",
      "ഒരു വാക്ക് കൂടി.\nപിന്നെ, അടുത്തത്.",
    ],
    [
      "Let’s take a look\ninside AI.",
      "Big ideas.\nLittle pieces.",
      "A little map\nof meaning.",
      "Words make sense\ntogether.",
      "One more word.\nThen another.",
    ],
  ],
  comparisons: [
    [
      "നിങ്ങൾ എഴുതുന്ന വാക്കുകൾ ഒരു മറുപടിയാകുന്നത് എങ്ങനെ? നമുക്ക് കണ്ടറിയാം.",
      "പസിലിന്റെ കഷണങ്ങൾ പോലെ, AI വാചകത്തെ ചെറിയ ഭാഗങ്ങളാക്കുന്നു.",
      "ഒരു മാപ്പിലെ സ്ഥലം പോലെ, വാക്കിന്റെ അർത്ഥത്തിന് അക്കങ്ങൾ കൊണ്ട് ഒരു വിലാസം.",
      "ഒരു മുറിയിൽ മറ്റുള്ളവരെ കേൾക്കുന്നതുപോലെ, വാക്കുകൾ ചുറ്റുമുള്ള വാക്കുകളെ ശ്രദ്ധിക്കുന്നു.",
      "ഫോണിലെ കീബോർഡ് പോലെ, അടുത്ത് വരാൻ സാധ്യതയുള്ള വാക്കുകൾ AI കണക്കാക്കുന്നു.",
    ],
    [
      "How do the words you type turn into a reply? Let’s find out, one small step at a time.",
      "Like puzzle pieces, tokens are small parts that fit together to make a sentence.",
      "Like a place on a map, numbers give a word an address in meaning-space.",
      "Like listening to people in a room, each word pays attention to the words around it.",
      "Like your phone’s keyboard, AI scores what might come next.",
    ],
  ],
  details: [
    [
      "ഒരു ഭാഷാ മോഡൽ വാക്കുകളിലെ പാറ്റേണുകൾ പഠിക്കുന്നു. ഈ യാത്ര അത് എങ്ങനെ ഉപയോഗിക്കുന്നു എന്ന് കാണിക്കുന്നു.",
      "ഒരു token ഒരു വാക്കോ, വാക്കിന്റെ ഭാഗമോ, ചിഹ്നമോ ആകാം. ഇവിടെ കാണുന്ന വിഭജനം പഠിക്കാനുള്ള ഉദാഹരണമാണ്.",
      "ഇവിടെ ഓരോ വാക്കിനും രണ്ട് സവിശേഷതകൾ മാത്രം. യഥാർത്ഥ embedding-ൽ അനേകം അക്കങ്ങളുണ്ട്; ഓരോ അക്കത്തിനും ഇങ്ങനെ വ്യക്തമായ പേര് ഉണ്ടാകണമെന്നില്ല.",
      "ആദ്യം ഗുണിച്ച് കൂട്ടുന്നു. തുടർന്ന് score / 10-ന് softmax ഉപയോഗിച്ച് വിഹിതങ്ങൾ കണ്ടെത്തുന്നു. എല്ലാ വാക്കുകളും, തിരഞ്ഞെടുത്ത വാക്ക് ഉൾപ്പെടെ, പങ്കെടുക്കുന്നു. യഥാർത്ഥ AI പഠിച്ച Q, K, V വെക്ടറുകളും പല attention തലകളും ഉപയോഗിക്കുന്നു.",
      "ഒരു token തെരഞ്ഞെടുത്ത് വാചകത്തിൽ ചേർക്കുന്നു. പുതിയ വാചകം നോക്കി അടുത്ത token കണ്ടെത്തുന്നു. ഏറ്റവും കൂടുതൽ സാധ്യതയുള്ളത് എപ്പോഴും എടുക്കണമെന്നില്ല; ഉത്തരം ശരിയാകണമെന്നുമില്ല.",
    ],
    [
      "A language model learns patterns in text. This journey shows a small, simplified picture of how those patterns help it continue a sentence.",
      "A token can be a word, a word fragment, punctuation or another text unit. These teaching pieces are illustrative, not Gemini’s tokenizer output.",
      "We use only two named features. Real embeddings have many coordinates, and individual coordinates do not usually have neat human-readable labels.",
      "We multiply and add, then apply softmax to score / 10. Every word participates, including the selected word itself. Real transformers use learned query, key and value projections and multiple attention heads.",
      "A token is selected and added to the context, then the next token is scored. Models do not always select the highest probability option, and a likely continuation can still be wrong.",
    ],
  ],
  sentence: ["ഒരു വാചകം എഴുതൂ", "Write a sentence"],
  languages: ["മലയാളം · English · Manglish", "Malayalam · English · Manglish"],
  examples: [
    "അല്ലെങ്കിൽ, ഒന്ന് തിരഞ്ഞെടുത്തോളൂ",
    "Or, borrow a little inspiration",
  ],
  sentenceJourney: ["ഒരു വാചകത്തിന്റെ യാത്ര", "THE JOURNEY OF A SENTENCE"],
  previewLabels: [
    ["വാചകം", "കഷണങ്ങൾ", "അക്കങ്ങൾ", "ശ്രദ്ധ", "മറുപടി"],
    ["Sentence", "Tokens", "Numbers", "Attention", "Next word"],
  ],
  offline: [
    "ഡെമോ പാഠം · API key ആവശ്യമില്ല",
    "Demo lesson · No API key needed",
  ],
  live: ["തത്സമയ പാഠം · നിങ്ങളുടെ Gemini key", "Live lesson · Your Gemini key"],
  start: ["തുടങ്ങാം", "Let’s explore"],
  next: ["അടുത്തത്", "Next step"],
  back: ["പിന്നോട്ട്", "Back"],
  restart: ["വീണ്ടും തുടങ്ങാം", "Explore again"],
  footer: [
    "കണ്ടു പഠിക്കാം. ചെയ്തു പഠിക്കാം.",
    "Learn by looking. Learn by doing.",
  ],
  more: ["കൂടുതൽ അറിയാൻ", "A little more to know"],
  exampleOnly: ["ഉദാഹരണം മാത്രം", "Teaching example only"],
  demo: ["ഡെമോ", "Demo"],
  liveMode: ["സ്വന്തം വാചകം", "Live"],
  wordLimit: ["12 വാക്കുകൾ വരെ എഴുതാം.", "Use a sentence of up to 12 words."],
  empty: ["ഒരു ചെറിയ വാചകം എഴുതൂ.", "Write a short sentence first."],
  chooseDemo: [
    "ഈ ഡെമോകളിൽ ഒന്ന് തിരഞ്ഞെടുക്കൂ, അല്ലെങ്കിൽ സ്വന്തം വാചകത്തിന് Gemini key ചേർക്കൂ.",
    "Choose a demo below, or add a Gemini key for your own sentence.",
  ],
  tap: ["ഒരു കഷണം തൊട്ടു നോക്കൂ", "Tap a piece to explore"],
  token: ["കഷണം", "Token"],
  tokens: ["കഷണങ്ങൾ", "teaching tokens"],
  selected: ["തിരഞ്ഞെടുത്തത്", "Selected"],
  word: ["വാക്ക്", "Word"],
  coordinate: ["വാക്കിന്റെ വിലാസം", "Word’s address"],
  mapHint: [
    "ഒരു വാക്കിൽ തൊട്ടാൽ അതിന്റെ അക്കങ്ങൾ കാണാം.",
    "Tap a word to find its address.",
  ],
  context: ["സാഹചര്യം മാറ്റൂ", "Change the context"],
  cricket: ["ക്രിക്കറ്റ്", "Cricket"],
  flying: ["വവ്വാൽ", "Flying bat"],
  focus: ["ശ്രദ്ധിക്കുന്ന വാക്ക്", "Listening word"],
  listen: ["ശ്രദ്ധിക്കട്ടെ", "Let it pay attention"],
  reset: ["വീണ്ടും കാണാം", "Reset the movement"],
  before: ["മുമ്പ്", "Before"],
  after: ["ശ്രദ്ധിച്ച ശേഷം", "After attention"],
  total: ["ആകെ ശ്രദ്ധ", "Total attention"],
  rounding: [
    "ശതമാനങ്ങൾ 100 ആകാൻ വട്ടമിട്ടതാണ്. നീക്കത്തിന് കൃത്യമായ വിഹിതങ്ങൾ ഉപയോഗിക്കുന്നു.",
    "Percentages are rounded to total 100. The movement uses the full-precision weights.",
  ],
  genericInsight: [
    "ചുറ്റുമുള്ള വാക്കുകൾ ഈ വാക്കിന്റെ അർത്ഥം മാറ്റുന്നു.",
    "The surrounding words pull this word toward a more specific meaning.",
  ],
  predict: ["അടുത്ത വാക്ക് ചേർക്കൂ", "Add the next word"],
  replay: ["വീണ്ടും കാണിക്കൂ", "Replay"],
  reply: ["തുടരാൻ ഒരു സാധ്യത", "ONE POSSIBLE CONTINUATION"],
  loop: ["ഓരോ വാക്കും ഇങ്ങനെ", "Every word, like this"],
  others: ["മറ്റ് സാധ്യതകൾ: 9%", "Other possibilities: 9%"],
  predictionNote: [
    "ഇവ പഠിക്കാനുള്ള സാധ്യതകളാണ്; Gemini-യുടെ യഥാർത്ഥ probabilities അല്ല.",
    "These are teaching probabilities, not Gemini’s actual next-token probabilities.",
  ],
  settings: ["ക്രമീകരണങ്ങൾ", "Settings"],
  close: ["അടയ്ക്കുക", "Close"],
  theme: ["നിറം മാറ്റുക", "Switch color theme"],
  keyTitle: ["നിങ്ങളുടെ Gemini key", "Your Gemini key"],
  keyIntro: [
    "സ്വന്തം വാചകങ്ങൾ പരീക്ഷിക്കാൻ key ചേർക്കൂ. ഡെമോ പാഠങ്ങൾക്ക് key വേണ്ട.",
    "Add a key to explore your own sentences. Demo lessons always work without one.",
  ],
  keyLabel: ["Gemini API key ഇവിടെ ചേർക്കൂ", "Paste your Gemini API key"],
  show: ["കാണിക്കുക", "Show"],
  hide: ["മറയ്ക്കുക", "Hide"],
  remember: ["ഈ ഉപകരണത്തിൽ ഓർക്കുക", "Remember on this device"],
  notice: [
    "നിങ്ങളുടെ key ഈ ബ്രൗസറിൽ തന്നെ സൂക്ഷിക്കുന്നു. ഉപയോഗത്തിന്റെ ചെലവ് നിങ്ങളുടെ Google അക്കൗണ്ടിലാണ്.",
    "Your key stays in this browser. Usage is billed to your Google account.",
  ],
  createKey: [
    "Google AI Studio-യിൽ key ഉണ്ടാക്കാം",
    "Create a key in Google AI Studio",
  ],
  save: ["പരിശോധിച്ച് സൂക്ഷിക്കുക", "Validate and save"],
  saving: ["പരിശോധിക്കുന്നു…", "Checking…"],
  saved: ["Key തയ്യാറാണ് · Key validated", "Key validated · Key തയ്യാറാണ്"],
  removed: [
    "Key നീക്കം ചെയ്തു · Key removed",
    "Key removed · Key നീക്കം ചെയ്തു",
  ],
  remove: ["Key നീക്കം ചെയ്യുക", "Remove key"],
  textModel: ["പാഠം ഉണ്ടാക്കുന്ന മോഡൽ", "Text-generation model"],
  embeddingModel: ["അക്കങ്ങൾ കാണിക്കുന്ന മോഡൽ", "Embedding model"],
  noEmbedding: ["Embedding മോഡൽ ലഭ്യമല്ല", "No embedding model available"],
  noModel: [
    "അനുയോജ്യമായ മോഡൽ ലഭ്യമല്ല. വേറൊരു key ശ്രമിക്കൂ.",
    "No supported text model is available. Try another key.",
  ],
  demoFallback: ["ഡെമോ പാഠം പരീക്ഷിക്കൂ", "Try a demo lesson"],
  addKey: ["Gemini key ചേർക്കൂ", "Add a Gemini key"],
  loading: ["പാഠം ഒരുക്കുന്നു…", "Preparing your lesson…"],
  cancel: ["റദ്ദാക്കുക", "Cancel"],
  errorKey: [
    "ഈ key പ്രവർത്തിക്കുന്നില്ല. വീണ്ടും പരിശോധിക്കൂ. · Invalid API key",
    "Invalid API key. Check and try again. · Key പരിശോധിക്കൂ",
  ],
  errorQuota: [
    "ഇപ്പോൾ ഉപയോഗപരിധി കഴിഞ്ഞു. കുറച്ചു കഴിഞ്ഞ് ശ്രമിക്കൂ. · Quota exceeded",
    "Usage limit reached. Try again later. · ഉപയോഗപരിധി കഴിഞ്ഞു",
  ],
  errorNetwork: [
    "ബന്ധപ്പെടാൻ കഴിഞ്ഞില്ല. ഇന്റർനെറ്റ് പരിശോധിക്കൂ. · Connection error",
    "Could not connect. Check your connection. · ബന്ധപ്പെടാൻ കഴിഞ്ഞില്ല",
  ],
  errorBlocked: [
    "ഈ വാചകം പറ്റില്ല, വേറെ ഒന്ന് ശ്രമിക്കൂ",
    "ഈ വാചകം പറ്റില്ല, വേറെ ഒന്ന് ശ്രമിക്കൂ · Please try a different sentence.",
  ],
  errorData: [
    "പാഠം തയ്യാറായില്ല. ഒരു ഡെമോ പരീക്ഷിക്കാം.",
    "The lesson could not be prepared. Try a demo instead.",
  ],
  errorStorage: [
    "ബ്രൗസറിൽ സൂക്ഷിക്കാൻ കഴിഞ്ഞില്ല. സ്വകാര്യതാ ക്രമീകരണങ്ങൾ പരിശോധിക്കൂ.",
    "Browser storage is unavailable. Check your privacy settings.",
  ],
  real: ["യഥാർത്ഥ അക്കങ്ങൾ കാണാം", "See real numbers"],
  realIntro: [
    "ഇവ Google API-യിൽ നിന്നുള്ള അളവുകളാണ്. മുകളിലെ നിറമുള്ള മാപ്പ് പഠിക്കാനുള്ള ഉദാഹരണമാണ്.",
    "These measurements come from Google’s API. The colored map above is a teaching example.",
  ],
  loadReal: ["യഥാർത്ഥ അക്കങ്ങൾ കൊണ്ടുവരൂ", "Load real numbers"],
  realCount: ["യഥാർത്ഥ token എണ്ണം", "Real token count"],
  realCut: ["യഥാർത്ഥ AI വേറെ രീതിയിൽ മുറിക്കും", "Real AI cuts differently"],
  realDims: [
    "ഇവിടെ 2 dimension, യഥാർത്ഥ AI-യിൽ ഇത്രയും!",
    "Two dimensions here; this many in the real embedding!",
  ],
  firstNumbers: ["ആദ്യത്തെ 20 അക്കങ്ങൾ", "First 20 coordinates"],
  similarity: [
    "അർത്ഥങ്ങളുടെ സാമ്യം (Cosine similarity)",
    "Meaning similarity (cosine similarity)",
  ],
  realHint: [
    "0 എന്നാൽ സാമ്യമില്ല; 1 എന്നാൽ ഒരേ ദിശ; −1 എന്നാൽ എതിർദിശ. ഇവ ഒറ്റ വാക്കുകളുടെ embeddings ആണ്; ഉള്ളിലെ attention അല്ല.",
    "0 means unrelated directions; 1 means the same direction; −1 means opposite. These are standalone word embeddings, not internal attention.",
  ],
  offlineReady: ["ഓഫ്‌ലൈനിലും തയ്യാറാണ്", "Ready offline"],
  onlineOnly: [
    "ആദ്യമായി തുറക്കുമ്പോൾ ഇന്റർനെറ്റ് വേണം",
    "Connect once to save offline lessons",
  ],
  install: ["ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യൂ", "Install app"],
  position: ["സ്ഥാനം", "Position"],
  stepOf: ["ചുവട്", "Step"],
} as const;
export type TextKey = keyof typeof strings;
export const t = (lang: Language, key: TextKey) =>
  strings[key][lang === "ml" ? 0 : 1] as string;
export const list = (
  lang: Language,
  key:
    | "steps"
    | "kickers"
    | "titles"
    | "comparisons"
    | "details"
    | "previewLabels",
) => strings[key][lang === "ml" ? 0 : 1];
