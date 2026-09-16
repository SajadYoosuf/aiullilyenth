import type { Language } from "../types";

export default function ProductScope({ lang }: { lang: Language }) {
  const ml = lang === "ml";
  return <section className="product-scope" aria-labelledby="scope-title">
    <div className="eyebrow">{ml ? "ഈ വെബ്സൈറ്റ് എന്തിനാണ്?" : "What is this website for?"}</div>
    <h2 id="scope-title">{ml ? "AI-യ്ക്ക് പല ജോലികളുണ്ട്. ഇവിടെ നമുക്ക് ഭാഷ നോക്കാം." : "AI does many things. Here, we explore language."}</h2>
    <p>{ml ? "ചിത്രത്തിൽ പൂച്ചയെ കണ്ടെത്താനും, ഒരു റോബോട്ടിനെ നീക്കാനും, ഇഷ്ടപ്പെടാവുന്ന പാട്ട് നിർദ്ദേശിക്കാനും AI ഉപയോഗിക്കാം. വാക്കുകൾ ഉപയോഗിച്ച് മറുപടി എഴുതുന്നത് അതിലെ ഒരു ഭാഗമാണ്." : "AI can help spot a cat in a picture, guide a robot, or suggest a song. Writing replies with words is one part of that bigger field."}</p>
    <div className="ai-overview" aria-label={ml ? "AI ഉപയോഗിക്കുന്ന ചില ജോലികൾ" : "Some uses of AI"}>
      <span>🖼️ {ml ? "ചിത്രങ്ങൾ തിരിച്ചറിയൽ" : "Recognizing images"}</span>
      <span>🤖 {ml ? "റോബോട്ടുകളെ നയിക്കൽ" : "Guiding robots"}</span>
      <span>🎵 {ml ? "ഇഷ്ടങ്ങൾക്കനുസരിച്ചുള്ള നിർദ്ദേശങ്ങൾ" : "Making recommendations"}</span>
      <strong>💬 {ml ? "ഭാഷാ മോഡലുകൾ · ഇവിടെ പഠിക്കുന്നത്" : "Language models · Our focus"}</strong>
    </div>
    <p className="scope-focus">{ml ? "LLM എന്നാൽ Large Language Model — വലിയ ഭാഷാ മോഡൽ. ഒരുപാട് എഴുത്തുകളിൽ നിന്ന് ഭാഷയിലെ ക്രമങ്ങൾ പഠിക്കുന്ന മോഡലാണിത്. അതിന്റെ അടിസ്ഥാന ആശയങ്ങളാണ് ഇവിടെ വാക്കുകളും ചിത്രങ്ങളും ഉപയോഗിച്ച് പഠിക്കുന്നത്." : "LLM means Large Language Model. It learns language patterns from lots of text. This website teaches its basic ideas with words, pictures, and small activities."}</p>
    <h3>{ml ? "ഈ പേരുകൾ കേട്ടിട്ടുണ്ടോ?" : "Have you heard these names?"}</h3>
    <div className="reference-cards">
      <article><h4>ChatGPT <small>OpenAI</small></h4><p>{ml ? "OpenAI-യുടെ AI assistant. മറുപടി എഴുതാൻ ഭാഷാ മോഡലുകൾ ഉപയോഗിക്കുന്നു. ChatGPT എന്നത് app-ന്റെ പേരാണ്; ഒരു മോഡലിന്റെ മാത്രം പേരല്ല." : "OpenAI’s AI assistant uses language models to write replies. ChatGPT names the app, rather than just one model."}</p><a href="https://developers.openai.com/api/docs/guides/text" target="_blank" rel="noreferrer">OpenAI · {ml ? "ഭാഷാ മോഡലുകളും എഴുത്തും" : "Language models & text"} ↗</a></article>
      <article><h4>Gemini <small>Google</small></h4><p>{ml ? "Google-ന്റെ മോഡൽ കുടുംബത്തിന്റെയും assistant-ന്റെയും പേര്. എഴുത്തിനൊപ്പം ചിത്രങ്ങളും മറ്റു വിവരങ്ങളും കൈകാര്യം ചെയ്യുന്ന മോഡലുകളും ഇതിലുണ്ട്." : "The name of Google’s model family and assistant. Its models can work with text and other kinds of information, such as images."}</p><a href="https://deepmind.google/models/gemini/" target="_blank" rel="noreferrer">Google DeepMind · Gemini ↗</a></article>
      <article><h4>Claude <small>Anthropic</small></h4><p>{ml ? "Anthropic-ന്റെ assistant-ഉം മോഡൽ കുടുംബവും. ഭാഷയുമായി ബന്ധപ്പെട്ട ജോലികൾ ചെയ്യുന്നു; ചില മോഡലുകൾ ചിത്രങ്ങളും കൈകാര്യം ചെയ്യുന്നു." : "Anthropic’s assistant and model family. They work with language; some models can also work with images."}</p><a href="https://www.anthropic.com/news/claude-3-family" target="_blank" rel="noreferrer">Anthropic · {ml ? "Claude മോഡലുകളെക്കുറിച്ച്" : "About Claude models"} ↗</a></article>
    </div>
    <p className="landing-note">{ml ? "ഈ ജോലികൾ തമ്മിൽ ബന്ധമുണ്ടാകാം; വേർതിരിച്ച അടച്ച പെട്ടികളല്ല. ഒരു assistant-ൽ മോഡലിനൊപ്പം മറ്റു ഉപകരണങ്ങളും ഉണ്ടാകും. ഇവിടെ പഠിക്കുന്നത് ഭാഷയുമായി ബന്ധപ്പെട്ട അടിസ്ഥാനങ്ങൾ മാത്രം; ഈ apps-ന്റെ എല്ലാ കഴിവുകളുമല്ല." : "These areas can overlap. An assistant combines models with other tools. Our lessons cover language-model basics, not every capability of these apps."}</p>
    <p className="scope-provider">{ml ? "ഇവിടെ നീ നൽകുന്ന വാക്യത്തിൽ നിന്ന് പാഠം ഉണ്ടാക്കുന്നത് Gemini API ആണ്. ChatGPT, Claude എന്നിവ പരിചിതമായ ഉദാഹരണങ്ങളാണ്; അവയുടെ key ഇവിടെ ഉപയോഗിക്കാനാവില്ല. കാണുന്ന ചെറിയ കണക്കുകൾ പഠനമാതൃകകളാണ്." : "This website uses the Gemini API to create lessons from your input. ChatGPT and Claude are familiar examples; their keys cannot be used here. The small calculations shown are teaching models."}</p>
    <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer">{ml ? "അടിസ്ഥാന ഗവേഷണം" : "Foundational research"}: Attention Is All You Need (2017) ↗</a>
  </section>;
}
