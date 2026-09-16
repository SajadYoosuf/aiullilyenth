import { useState } from "react";
import type { Language } from "../types";

const eras = [
  { year: "1990", title: "Patterns · ഭാഷയിലെ ക്രമങ്ങൾ", en: "Statistical translation learned probabilities from paired texts. Language tools could learn patterns from examples.", ml: "സ്ഥിതിവിവരക്കണക്കുകൾ ഉപയോഗിച്ച വിവർത്തനം, രണ്ടു ഭാഷകളിലെ എഴുത്തുകളിൽ നിന്ന് സാധ്യതകൾ പഠിച്ചു. ഉദാഹരണങ്ങളിൽ നിന്ന് ഭാഷയിലെ ക്രമങ്ങൾ പഠിക്കാം.", example: "Translated examples → likely translation · വിവർത്തന ഉദാഹരണങ്ങൾ → സാധ്യതയുള്ള വിവർത്തനം", url: "https://aclanthology.org/J90-2002/", source: "A Statistical Approach to Machine Translation" },
  { year: "2014/15", title: "Attention · ശ്രദ്ധ", en: "Neural translation learned to focus on relevant parts of an input sentence while producing a translation. Attention existed before the Transformer.", ml: "വിവർത്തനം എഴുതുമ്പോൾ മൂലവാക്യത്തിലെ വേണ്ട ഭാഗങ്ങൾക്ക് കൂടുതൽ പ്രാധാന്യം നൽകാൻ ന്യൂറൽ മോഡലുകൾ പഠിച്ചു. Transformer-ന് മുമ്പേ attention ഉണ്ടായിരുന്നു.", example: "Translate a word → look at relevant input words · ഒരു വാക്ക് വിവർത്തനം ചെയ്യാൻ → ബന്ധപ്പെട്ട വാക്കുകൾ നോക്കുക", url: "https://arxiv.org/abs/1409.0473", source: "Neural Machine Translation by Jointly Learning to Align and Translate" },
  { year: "2017", title: "Transformer · ബന്ധങ്ങൾ കണ്ടെത്താം", en: "The Transformer connected token positions through attention and made training more parallel. The original model had an encoder and a decoder for translation.", ml: "Transformer, attention വഴി ടോക്കണുകൾ തമ്മിൽ ബന്ധിപ്പിച്ചു; പരിശീലനത്തിലെ കൂടുതൽ കണക്കുകൾ ഒരേസമയം ചെയ്യാനായി. ആദ്യ മോഡലിൽ വിവർത്തനത്തിനായി encoder-ഉം decoder-ഉം ഉണ്ടായിരുന്നു.", example: "Tokens ↔ attention ↔ context · ടോക്കണുകൾ ↔ ശ്രദ്ധ ↔ സന്ദർഭം", url: "https://arxiv.org/abs/1706.03762", source: "Attention Is All You Need" },
  { year: "2018", title: "BERT · ഇരുവശത്തെയും സന്ദർഭം", en: "BERT learned from context on both sides of a word. A pretrained model could then be adapted to tasks such as answering questions.", ml: "BERT ഒരു വാക്കിന്റെ ഇരുവശത്തുമുള്ള സന്ദർഭത്തിൽ നിന്ന് പഠിച്ചു. മുൻകൂട്ടി പരിശീലിപ്പിച്ച മോഡലിനെ ചോദ്യങ്ങൾക്ക് ഉത്തരം കണ്ടെത്തൽ പോലുള്ള ജോലികൾക്കായി മാറ്റാം.", example: "The [MASK] flew. → use both sides · മറച്ച വാക്ക് കണ്ടെത്താൻ ഇരുവശവും നോക്കുക", url: "https://arxiv.org/abs/1810.04805", source: "BERT: Pre-training of Deep Bidirectional Transformers" },
  { year: "2020", title: "GPT-3 · ഉദാഹരണം നൽകി ചോദിക്കാം", en: "GPT-3 showed how a large language model could perform many tasks using instructions and examples in its prompt, without updating its weights for each task.", ml: "GPT-3-ന് ചോദിക്കുന്നതോടൊപ്പം നിർദ്ദേശങ്ങളും ഉദാഹരണങ്ങളും നൽകി പല ജോലികൾ ചെയ്യിക്കാമായിരുന്നു; ഓരോ ജോലിക്കും മോഡലിന്റെ പഠിച്ച ഭാരങ്ങൾ മാറ്റേണ്ടതില്ല.", example: "Happy → സന്തോഷം; Water → ? · ചോദ്യത്തിനൊപ്പം ഒരു ഉദാഹരണം", url: "https://arxiv.org/abs/2005.14165", source: "Language Models are Few-Shot Learners" },
  { year: "2022", title: "Instructions · നിർദ്ദേശങ്ങൾ പിന്തുടരാം", en: "InstructGPT used human demonstrations and preferences to improve instruction following. This helped make language models easier to use, but did not make every answer correct.", ml: "മനുഷ്യർ നൽകിയ മാതൃകാ ഉത്തരങ്ങളും ഇഷ്ടപ്പെട്ട ഉത്തരങ്ങളുടെ ക്രമവും ഉപയോഗിച്ച് InstructGPT നിർദ്ദേശങ്ങൾ പിന്തുടരാൻ മെച്ചപ്പെട്ടു. ഉപയോഗം എളുപ്പമായി; എല്ലാ ഉത്തരങ്ങളും ശരിയാകണമെന്നില്ല.", example: "Explain simply → an easier explanation · ലളിതമായി പറയൂ → എളുപ്പമുള്ള വിശദീകരണം", url: "https://arxiv.org/abs/2203.02155", source: "Training language models to follow instructions with human feedback" },
];

export function Bilingual({ ml, en, lang }: { ml: string; en: string; lang: Language }) {
  return <>{(lang === "ml" ? ["ml", "en"] : ["en", "ml"]).map(l => <p key={l} lang={l}>{l === "ml" ? ml : en}</p>)}</>;
}

export default function Foundations({ lang }: { lang: Language }) {
  const [era, setEra] = useState(0);
  const current = eras[era];
  return <section className="concept-intro foundations" aria-labelledby="foundations-title">
    <div className="eyebrow">{lang === "ml" ? "ആദ്യം അടിസ്ഥാനങ്ങൾ" : "Start with the basics"}</div>
    <h2 id="foundations-title">NLP & LLM · വ്യത്യാസം എന്താണ്?</h2>
    <div className="foundation-grid">
      <article><h3>NLP · Natural Language Processing</h3><Bilingual lang={lang} ml="മനുഷ്യരുടെ ഭാഷ കമ്പ്യൂട്ടറുകൾ ഉപയോഗിച്ച് കൈകാര്യം ചെയ്യുന്ന വലിയ പഠനമേഖല. വിവർത്തനം, തിരച്ചിൽ, സ്പാം കണ്ടെത്തൽ എന്നിവ ഉദാഹരണങ്ങളാണ്." en="The broad field of working with human language using computers. Examples include translation, search, and detecting spam." /></article>
      <article><h3>LLM · Large Language Model</h3><Bilingual lang={lang} ml="വളരെയധികം ഭാഷാ ഡാറ്റയിൽ നിന്ന് ക്രമങ്ങൾ പഠിക്കുന്ന വലിയ മോഡൽ. NLP-യിലെ പല ജോലികൾക്കും ഇത് ഉപയോഗിക്കാം. LLM എന്നത് NLP എന്ന മേഖലയിലെ ഒരു സമീപനമാണ്." en="A large model that learns patterns from lots of language data. It can help with many NLP tasks. An LLM is one approach within NLP." /></article>
    </div>
    <Bilingual lang={lang} ml="NLP ഒരു മേഖലയാണ്; LLM ഒരു തരം മോഡലാണ്. എല്ലാ ഭാഷാ ഉപകരണങ്ങൾക്കും LLM ആവശ്യമില്ല. നിയമങ്ങളും ചെറിയ മോഡലുകളും ഇന്നും ഉപയോഗിക്കുന്നു." en="NLP is a field; an LLM is a kind of model. Language tools can also use rules or smaller models. These approaches still matter." />
    <a href="https://nlp.stanford.edu/" target="_blank" rel="noreferrer">Stanford NLP · {lang === "ml" ? "മേഖലയെക്കുറിച്ച്" : "About the field"} ↗</a>
    <details className="history" open>
      <summary>{lang === "ml" ? "ഇവിടെ വരെ എങ്ങനെ എത്തി?" : "How did we get here?"}</summary>
      <p>{lang === "ml" ? "ഓരോ വർഷവും തൊട്ട് മാറ്റം കാണൂ. ഇവ തിരഞ്ഞെടുത്ത പ്രധാന ഘട്ടങ്ങളാണ്." : "Tap a year to explore the change. These are selected milestones."}</p>
      <div className="era-buttons" role="group" aria-label={lang === "ml" ? "ചരിത്രത്തിലെ ഘട്ടങ്ങൾ" : "History milestones"}>
        {eras.map((e, i) => <button key={e.year} aria-pressed={era === i} onClick={() => setEra(i)}>{e.year}</button>)}
      </div>
      <article className="era-panel" aria-live="polite" aria-atomic="true">
        <h3>{current.title}</h3><Bilingual lang={lang} ml={current.ml} en={current.en} />
        <p className="concept-example">{current.example}</p>
        <a href={current.url} target="_blank" rel="noreferrer">{current.source} ↗</a>
      </article>
      <Bilingual lang={lang} ml="മാറ്റം: പ്രത്യേക ജോലികൾക്കായി ഉണ്ടാക്കിയ ഉപകരണങ്ങളിൽ നിന്ന്, ഒരേ മോഡലിനോട് പല ജോലികൾ ചോദിക്കാവുന്ന രീതിയിലേക്ക്. ഇത് മുഴുവൻ ചരിത്രമല്ല; പഴയ രീതികൾ ഇല്ലാതായിട്ടില്ല." en="The shift: from tools built for individual tasks toward asking one model to do many tasks. This is not the whole history, and older methods have not disappeared." />
    </details>
    <details className="history"><summary>{lang === "ml" ? "യഥാർത്ഥ പേപ്പറും പഠനസ്രോതസ്സുകളും" : "Original paper & learning sources"}</summary>
      <p><a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noreferrer">Attention Is All You Need — Vaswani et al., 2017 ↗</a></p>
      <p><a href="https://arxiv.org/pdf/1706.03762" target="_blank" rel="noreferrer">Original paper · PDF ↗</a></p>
      <p><a href="https://research.google/blog/transformer-a-novel-neural-network-architecture-for-language-understanding/" target="_blank" rel="noreferrer">Google Research · Transformer explained ↗</a></p>
      <Bilingual lang={lang} ml="Attention ഘട്ടത്തിൽ പേപ്പറിലെ സൂത്രവാക്യം പരീക്ഷിക്കാം. ഇവിടെ കാണുന്ന ചെറിയ സംഖ്യകൾ പഠനത്തിനായി തിരഞ്ഞെടുത്തവയാണ്; Gemini-യുടെ ഉള്ളിലെ കണക്കുകളല്ല." en="Try the paper’s formula in the Attention step. Our small numbers are chosen for teaching; they are not measurements from inside Gemini." />
    </details>
  </section>;
}
