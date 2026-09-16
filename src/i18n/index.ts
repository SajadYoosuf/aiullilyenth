import type { Language } from "../types";
const strings = {
  understandFirst: ["ഇതിന്റെ കാര്യം എന്താണെന്നോ?", "LET’S UNDERSTAND THE IDEA"],
  dimensionHeading: [
    "ഈ രണ്ട് പേരുകൾ എന്താണ്?",
    "What do these two labels mean?",
  ],
  dimensionDefinition: [
    "Dimension എന്നത് ഇവിടെ അർത്ഥം നോക്കാനുള്ള ഒരു അളവുകോലാണ്. ഒരു പഴത്തെ മധുരം, പുളിപ്പ് എന്നിങ്ങനെ നോക്കുന്നതുപോലെ, വാക്കുകളെ രണ്ട് ആശയങ്ങളുമായി താരതമ്യം ചെയ്യാം.",
    "A dimension is one scale for comparing meaning in this example. Just as we can compare fruit by sweetness and sourness, we can compare words using two ideas.",
  ],
  dimensionFallback: [
    "മുകളിലെ പേരുള്ള ആശയവുമായി ഒരു വാക്കിന് എത്ര ബന്ധമുണ്ടെന്ന് കാണിക്കാനുള്ള അളവുകോൽ.",
    "This scale shows how strongly a word relates to the idea named above.",
  ],
  dimensionCaveat: [
    "0 = ഈ ആശയവുമായി ബന്ധം കുറവ്; 10 = ബന്ധം കൂടുതൽ. ഇവ പഠിക്കാൻ ഉണ്ടാക്കിയ അക്കങ്ങളാണ്. യഥാർത്ഥ LLM-ൽ “സൗഹൃദം”, “ആവേശം” എന്നിങ്ങനെ പ്രത്യേകം പേരിട്ട അളവുകോലുകൾ ഉണ്ടെന്ന് അർത്ഥമില്ല.",
    "0 means less connection to this idea; 10 means more. These scores are made for learning. A real LLM does not have fixed, neatly named “friendliness” or “excitement” scales like this.",
  ],
  less: ["ബന്ധം കുറവ്", "Less connection"],
  moreOf: ["ബന്ധം കൂടുതൽ", "More connection"],
  brand: ["AI ഉള്ളിൽ എന്താണ്?", "AI Ullil Enthaanu?"],
  tagline: ["A LITTLE LLM LEARNING LAB", "A LITTLE LLM LEARNING LAB"],
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
      "വാക്കിനും ഒരു അക്കവിലാസം",
      "കൂട്ടുകാരായ വാക്കുകൾ",
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
      "വാ, ഒരു വാക്യം\nനോക്കിത്തുടങ്ങാം!",
      "വാക്കുകൾ\nകഷണങ്ങളാകുന്നു.",
      "ഈ വാക്ക് മാപ്പിൽ\nഎവിടെ വരും?",
      "ഈ വാക്കിനൊപ്പം\nആരൊക്കെയുണ്ട്?",
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
      "ഒരു വാക്യം എടുത്താലോ? അത് AI എങ്ങനെ ഉപയോഗിക്കുന്നു എന്ന് ഓരോ ചുവടായി നോക്കാം.",
      "പസിൽ കളിച്ചിട്ടില്ലേ? അതുപോലെ, ഈ വാക്യവും ചെറിയ കഷണങ്ങളാക്കി നോക്കാം.",
      "മാപ്പിൽ latitude, longitude ഒരു സ്ഥലം കാണിക്കുന്നു. അതുപോലെ, നമ്മുടെ പഠനമാപ്പിൽ രണ്ട് അക്കങ്ങൾ ഒരു വാക്കിന്റെ സ്ഥാനം കാണിക്കും. ഒരു ഉദാഹരണം നോക്കാം!",
      "‘bat’ എന്ന് മാത്രം പറഞ്ഞാൽ ബാറ്റാണോ വവ്വാലാണോ? കൂടെയുള്ള വാക്കുകൾ ഒരു സൂചന തരും!",
      "ഫോണിൽ എഴുതുമ്പോൾ അടുത്ത വാക്ക് കാണിച്ചുതരാറില്ലേ? അതുപോലെ ചില സാധ്യതകൾ നോക്കാം.",
    ],
    [
      "How do the words you type turn into a reply? Let’s find out, one small step at a time.",
      "Like puzzle pieces, tokens are small parts that fit together to make a sentence.",
      "Latitude and longitude locate a place on a map. On our learning map, two numbers locate a word. Let’s see an example!",
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
  sentence: ["എന്താണ് പരീക്ഷിക്കേണ്ടത്? ഇവിടെ എഴുതൂ", "What shall we explore? Type it here"],
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
  start: ["നമുക്ക് നോക്കാം", "Let’s explore"],
  next: ["അടുത്തത്", "Next step"],
  back: ["പിന്നോട്ട്", "Back"],
  restart: ["വീണ്ടും തുടങ്ങാം", "Explore again"],
  footer: [
    "കണ്ടു പഠിക്കാം. ചെയ്തു പഠിക്കാം.",
    "Learn by looking. Learn by doing.",
  ],
  more: ["ഇതെങ്ങനെയാണെന്ന് ഒന്നുകൂടി നോക്കാം", "Let’s look a little closer"],
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
  saved: [
    "Key സ്വീകരിച്ചു · മോഡൽ പട്ടിക ലഭിച്ചു",
    "Key accepted · Model list loaded",
  ],
  chooseModel: ["മറ്റൊരു മോഡൽ തിരഞ്ഞെടുക്കൂ", "Choose another model"],
  refreshModels: ["മോഡൽ പട്ടിക പുതുക്കൂ", "Refresh model list"],
  recommendedModel: [
    "ശുപാർശ ചെയ്യുന്ന മോഡൽ ഉപയോഗിക്കൂ",
    "Use recommended text model",
  ],
  modelsRefreshed: [
    "മോഡൽ പട്ടിക പുതുക്കി. ഇനി വീണ്ടും ശ്രമിക്കാം.",
    "Models refreshed. You can try your lesson again.",
  ],
  modelAccessNote: [
    "പട്ടികയിൽ ഉള്ള എല്ലാ മോഡലുകളും നിങ്ങളുടെ അക്കൗണ്ടിൽ പ്രവർത്തിക്കണമെന്നില്ല. 404 വന്നാൽ മറ്റൊരു മോഡൽ തിരഞ്ഞെടുക്കൂ.",
    "A listed model may still be unavailable to your account. If it returns 404, choose another text model. Listing models does not test lesson generation.",
  ],
  retryingModel: [
    "ഈ മോഡൽ ലഭ്യമല്ല. മറ്റൊരു മോഡൽ ശ്രമിക്കുന്നു…",
    "This model is unavailable. Trying another text model…",
  ],
  modelSwitched: [
    "പഴയ മോഡൽ ലഭ്യമല്ല. ഈ പാഠത്തിന് ഉപയോഗിച്ചത്:",
    "The previous model was unavailable. This lesson uses:",
  ],
  errorModelUnavailable: [
    "തിരഞ്ഞെടുത്ത മോഡൽ ഈ അക്കൗണ്ടിൽ ലഭ്യമല്ല (404). ക്രമീകരണങ്ങളിൽ പട്ടിക പുതുക്കി മറ്റൊരു മോഡൽ തിരഞ്ഞെടുക്കൂ.",
    "This model is unavailable to your account (404). Refresh the model list in Settings and choose another text model.",
  ],
  errorRequest: [
    "ഈ മോഡൽ പാഠത്തിന്റെ രൂപം സ്വീകരിച്ചില്ല. മറ്റൊരു text മോഡൽ തിരഞ്ഞെടുക്കൂ.",
    "This model could not accept the lesson format. Choose another text model in Settings.",
  ],
  errorService: [
    "Google സേവനം ഇപ്പോൾ ലഭ്യമല്ല. കുറച്ചു കഴിഞ്ഞ് വീണ്ടും ശ്രമിക്കൂ.",
    "Google’s service is temporarily unavailable. Try again shortly.",
  ],
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
  noSpeechModel: ["ഈ key-യ്ക്ക് speech മോഡൽ ലഭ്യമല്ല. Google AI Studio-യിൽ TTS access പരിശോധിക്കൂ; പാഠത്തിനുള്ള മോഡലും ശബ്ദത്തിനുള്ള മോഡലും വ്യത്യസ്തമാണ്.", "No speech model is available for this key. Check TTS access in Google AI Studio; lesson generation and speech use different models."],
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
    "ഈ വാക്യത്തിൽ നിന്ന് പാഠം ഉണ്ടാക്കാൻ കഴിഞ്ഞില്ല. ഒരു കളിയെക്കുറിച്ചോ മൃഗത്തെക്കുറിച്ചോ വേറൊരു വാക്യം നോക്കിയാലോ?",
    "We couldn’t make a lesson from this sentence. Try one about a game or an animal.",
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

export const concepts = [
  {
    term: "LLM · Large Language Model · വലിയ ഭാഷാ മോഡൽ",
    ml: {
      meaning:
        "LLM എന്നത് ധാരാളം എഴുത്തിൽ നിന്ന് ഭാഷയിലെ ബന്ധങ്ങൾ പഠിച്ച ഒരു കമ്പ്യൂട്ടർ സംവിധാനമാണ്. കൊടുത്ത വാചകത്തിന് ശേഷം എന്ത് വരാം എന്ന് അത് കണക്കാക്കി മറുപടി ഉണ്ടാക്കുന്നു.",
      example:
        "പഠിക്കൽ (Training): പല ഉദാഹരണങ്ങൾ കണ്ടാണ് ഇത് പഠിക്കുന്നത്. “ഞാൻ വെള്ളം…” എന്നു കണ്ടാൽ “കുടിച്ചു” എന്നു തുടരാം. ഇത് മനുഷ്യനെപ്പോലെ ചിന്തിക്കുന്നു എന്നോ മറുപടി എപ്പോഴും ശരിയാണ് എന്നോ അർത്ഥമില്ല.",
    },
    en: {
      meaning:
        "An LLM is a computer system trained on lots of text. It learns language patterns and builds a reply by predicting what text could come next.",
      example:
        "Training means learning from examples. “I drank…” could continue with “water”. A likely answer can still be wrong. In the next steps, we will explore tokens, embeddings, context, attention and prediction.",
    },
  },
  {
    term: "Token · എഴുത്തിന്റെ ചെറിയ കഷണം",
    ml: {
      meaning:
        "LLM എഴുത്ത് ചെറിയ കഷണങ്ങളായാണ് കൈകാര്യം ചെയ്യുന്നത്. ഓരോ കഷണത്തെയും token എന്നു പറയുന്നു. അത് ഒരു വാക്കോ, വാക്കിന്റെ ഭാഗമോ, ഒരു ചിഹ്നമോ ആകാം.",
      example:
        "ഉദാഹരണം: “മോനേ” എന്നത് ഇവിടെ “മോ” + “നേ” ആയി കാണിക്കുന്നു. ഇത് പഠിക്കാനുള്ള വിഭജനം മാത്രം; യഥാർത്ഥ മോഡൽ മറ്റൊരു രീതിയിൽ മുറിക്കാം.",
    },
    en: {
      meaning:
        "A token is a small piece of text that a model works with. It may be a word, part of a word, or punctuation.",
      example:
        "Like puzzle pieces: we show “മോനേ” as “മോ” + “നേ”. This teaching split is not the real model’s tokenizer.",
    },
  },
  {
    term: "Embedding · വാക്കിനെ സൂചിപ്പിക്കുന്ന അക്കങ്ങളുടെ പട്ടിക",
    ml: {
      meaning:
        "കമ്പ്യൂട്ടറിന് കണക്കുകൂട്ടാൻ, ഓരോ token-നെയും അക്കങ്ങളുടെ ഒരു പട്ടികയായി മാറ്റുന്നു. ഇതാണ് embedding. ഭാഷയിലെ ബന്ധങ്ങൾ ഈ അക്കങ്ങളിൽ പ്രതിഫലിക്കാം.",
      example:
        "ഒരു മാപ്പിലെ വിലാസം പോലെ ചിന്തിക്കൂ. ഇവിടെ [3, 4] എന്നാൽ ആദ്യ അളവുകോലിൽ 3, രണ്ടാമത്തേതിൽ 4. ഇവ എന്തിന്റെ അളവുകോലുകളാണെന്ന് ആദ്യം താഴെ വായിക്കാം.",
    },
    en: {
      meaning:
        "An embedding is a list of numbers representing a token. The model can calculate with these numbers, which can capture relationships in language.",
      example:
        "Think of an address on a map. Here, [3, 4] means 3 on the first scale and 4 on the second. Read what those scales mean before looking at the table.",
    },
  },
  {
    term: "Context + Attention · സാഹചര്യം + ശ്രദ്ധ",
    ml: {
      meaning:
        "Context എന്നത് കൂടെയുള്ള വാക്കുകളാണ്. Attention എന്നത് ആ വാക്കുകളിൽ നിന്ന് എത്ര വിവരം എടുക്കണമെന്ന് കണക്കാക്കുന്ന രീതിയാണ്. ഇവിടെ മുഴുവൻ വാചകവും ഉപയോഗിക്കുന്ന ഒരു ലളിതമായ ഉദാഹരണമാണ്.",
      example:
        "“bat hit the ball” എന്നതിൽ bat ക്രിക്കറ്റ് ബാറ്റാകാം. “bat flew” എന്നതിൽ അത് വവ്വാലാണ്. കൂടെയുള്ള വാക്കുകൾ അർത്ഥം വ്യക്തമാക്കുന്നു. ശതമാനം കാണിക്കുന്നത് ഈ ഉദാഹരണത്തിലെ ശ്രദ്ധയുടെ വിഹിതമാണ്; ഉത്തരം ശരിയാകാനുള്ള സാധ്യതയല്ല.",
    },
    en: {
      meaning:
        "Context is the surrounding text. Attention calculates how much information to take from available tokens. This lesson uses a simplified example with the whole sentence.",
      example:
        "“Bat hit the ball” suggests a cricket bat; “bat flew” suggests an animal. The attention percentages show shares of attention, not the chance that an answer is correct.",
    },
  },
  {
    term: "Prediction · അടുത്ത കഷണം എന്താകാം?",
    ml: {
      meaning:
        "അടുത്ത് വരാവുന്ന token-കൾക്ക് മോഡൽ സാധ്യതകൾ കണക്കാക്കുന്നു. ഒന്നിനെ തിരഞ്ഞെടുത്ത് വാചകത്തിൽ ചേർക്കുന്നു. പിന്നെ അടുത്ത token കണ്ടെത്തുന്നു. ഇങ്ങനെയാണ് മറുപടി വളരുന്നത്.",
      example:
        "ഫോണിൽ “സുഖം” എഴുതുമ്പോൾ “ആണോ?” എന്നു നിർദ്ദേശിക്കുന്നതുപോലെ. സാധ്യത കൂടുതലായതുകൊണ്ട് ഒരു വാചകം സത്യമായിരിക്കണമെന്നില്ല. ഇവിടെ കാണുന്ന ശതമാനങ്ങൾ പഠിക്കാൻ ഉണ്ടാക്കിയതാണ്.",
    },
    en: {
      meaning:
        "The model scores possible next tokens, selects one and adds it to the text. It repeats this process to build a reply.",
      example:
        "Like your phone suggesting “you?” after “How are”. A likely continuation is not necessarily true. The percentages here are made for teaching.",
    },
  },
];

const friendship = {
  ml: "കൂട്ടുകാരോട് അടുപ്പത്തോടെയും നല്ല മനസ്സോടെയും ഇടപെടുന്ന ഭാവം. ഉദാഹരണം: “നമുക്ക് ഒരുമിച്ച് കളിക്കാം.”",
  en: "Friendship or friendliness: being warm and kind to someone. Example: “Let’s play together.”",
};
const excitement = {
  ml: "എന്തെങ്കിലും ചെയ്യാനോ സംഭവിക്കാനോ ഉള്ള വലിയ ഉത്സാഹം. ഉദാഹരണം: “വാ, കളി തുടങ്ങാം!”",
  en: "Excitement or enthusiasm: feeling eager about something. Example: “Come on, let’s start the game!”",
};
const affection = {
  ml: "ഒരാളോട് തോന്നുന്ന ഇഷ്ടവും കരുതലും. ഉദാഹരണം: സ്നേഹത്തോടെ “മോനേ” എന്നു വിളിക്കുന്നത്.",
  en: "Affection: caring about someone and showing warmth, such as calling a child “dear”.",
};
const mocking = {
  ml: "ഒരാളെ കളിയാക്കുന്ന ഭാവം. അതേ വാക്ക് പറയുന്ന സാഹചര്യത്തിന് അനുസരിച്ച് സ്നേഹമായോ കളിയാക്കലായോ തോന്നാം.",
  en: "Mocking: teasing or making fun of someone. The same word can sound kind or teasing in different contexts.",
};
const sports = {
  ml: "ഒരു വാക്കിന് കളികളുമായി ഉള്ള ബന്ധം. ഇവിടെ Sachin, hit, ball എന്നിവ ക്രിക്കറ്റിനെ ഓർമ്മിപ്പിക്കുന്നു.",
  en: "Sports-ness: connection to sports. Sachin, hit and ball are clues about cricket.",
};
const animal = {
  ml: "ഒരു വാക്കിന് ജീവികളുമായി ഉള്ള ബന്ധം. ഇവിടെ flew, night എന്നിവ വവ്വാലിനെ തിരിച്ചറിയാൻ സഹായിക്കുന്നു.",
  en: "Animal-ness: connection to animals. Flew and night help us recognize a flying bat.",
};
export const dimensionGlossary: Record<string, { ml: string; en: string }> = {
  സൗഹൃദം: friendship,
  friendliness: friendship,
  friendship,
  ആവേശം: excitement,
  ഉത്സാഹം: excitement,
  excitement,
  enthusiasm: excitement,
  സ്നേഹം: affection,
  affection,
  പരിഹാസം: mocking,
  mocking,
  കളി: sports,
  "sports-ness": sports,
  ജീവി: animal,
  "animal-ness": animal,
};
