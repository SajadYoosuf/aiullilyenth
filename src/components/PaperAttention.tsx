import { useState } from "react";
import type { Language } from "../types";
import { paperAttention } from "../engine/paperAttention";
import { Bilingual } from "./Foundations";
const tokens = ["The", "bat", "flew"];
const keys = [[1, 0], [1, 1], [0, 1]];
const values = [[1, 0], [0, 2], [3, 1]];
export default function PaperAttention({ lang }: { lang: Language }) {
  const [focus, setFocus] = useState(1);
  const [masked, setMasked] = useState(false);
  const allowed = tokens.map((_, i) => !masked || i <= focus);
  const result = paperAttention(keys[focus], keys, values, allowed);
  return <details className="concept-intro paper-attention">
    <summary>{lang === "ml" ? "പേപ്പറിലെ attention പരീക്ഷിക്കാം" : "Try attention from the paper"} · Q, K, V</summary>
    <Bilingual lang={lang} ml="മുകളിലെ എളുപ്പമുള്ള മാതൃക score / 10 ഉപയോഗിക്കുന്നു. താഴെ പേപ്പറിലെ സൂത്രവാക്യമാണ്: ചെറിയ, സങ്കൽപ്പിച്ച Q, K, V സംഖ്യകൾ ഉപയോഗിച്ച് ഒരു attention head-ന്റെ കണക്ക്." en="The simpler lesson above uses score / 10. Below is the paper’s formula, computed for one attention head using small, invented Q, K, V numbers." />
    <p className="paper-formula">Attention(Q, K, V) = softmax(QKᵀ / √dₖ)V</p>
    <Bilingual lang={lang} ml="Q (Query): എന്തുമായി പൊരുത്തം നോക്കണം? K (Key): പൊരുത്തം കണക്കാക്കാനുള്ള സംഖ്യകൾ. V (Value): ആ പ്രാധാന്യത്തോടെ ചേർക്കുന്ന വിവരം. Softmax സ്കോറുകളെ ആകെ 1 വരുന്ന ഭാരങ്ങളാക്കുന്നു." en="Q (query) is compared with each K (key). Their match sets how much of each V (value) to mix. Softmax turns scores into weights that add up to 1." />
    <p>{lang === "ml" ? "ഒരു വാക്ക് തിരഞ്ഞെടുക്കൂ; അതിന്റെ Q ഉപയോഗിക്കാം." : "Choose a word to use its Q."}</p>
    <div className="era-buttons" role="group" aria-label="Query token">{tokens.map((token, i) => <button key={token} onClick={() => setFocus(i)} aria-pressed={focus === i}>{token}</button>)}</div>
    <label className="mask-control"><input type="checkbox" checked={masked} onChange={e => setMasked(e.target.checked)} />{lang === "ml" ? "പിന്നീടുള്ള വാക്കുകൾ മറയ്ക്കുക (causal mask)" : "Hide later words (causal mask)"}</label>
    <div aria-live="polite" aria-atomic="true">
      <p>Q = [{keys[focus].join(", ")}] · dₖ = 2 · √2 ≈ 1.414</p>
      <div className="paper-rows">{tokens.map((token, i) => <div key={token} className="paper-row">
        <strong>{token} · {(result.weights[i] * 100).toFixed(1)}%</strong>
        <code>K = [{keys[i].join(", ")}] · V = [{values[i].join(", ")}]</code>
        <code>({keys[focus][0]}×{keys[i][0]} + {keys[focus][1]}×{keys[i][1]}) / √2 = {result.scores[i].toFixed(3)}{!allowed[i] ? " → masked (−∞)" : ""}</code>
        <div className="bar"><i className={`tone-${i}`} style={{width: `${result.weights[i] * 100}%`}} /></div>
      </div>)}</div>
      <p className="concept-example">{lang === "ml" ? "ചേർത്ത വിവരം" : "Mixed information"}: Σ(weight × V) = [{result.output.map(n => n.toFixed(3)).join(", ")}]</p>
    </div>
    <Bilingual lang={lang} ml="Mask ഓണാക്കിയാൽ തിരഞ്ഞെടുത്ത സ്ഥാനത്തിന് ശേഷമുള്ള വാക്കുകളുടെ ഭാരം 0 ആകും. യഥാർത്ഥ Transformer പഠിച്ച Q, K, V മാറ്റങ്ങളും പല heads-ഉം മറ്റ് പാളികളും ഉപയോഗിക്കുന്നു. ഇത് പൂർണ്ണ മോഡലല്ല." en="With the mask on, later positions get zero weight. A full Transformer uses learned Q, K, V projections, multiple heads, and other layers. This is not a full model." />
    <a href="https://arxiv.org/html/1706.03762v7#S3.SS2" target="_blank" rel="noreferrer">Attention Is All You Need · §3.2 ↗</a>
  </details>;
}
