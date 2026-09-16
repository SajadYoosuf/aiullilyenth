import { softmax } from "./math";

// One query (one row) of Attention(Q,K,V), paper section 3.2.1.
export function paperAttention(query: number[], keys: number[][], values: number[][], allowed = keys.map(() => true)) {
  if (!query.length || !query.every(Number.isFinite) || !keys.length || keys.length !== values.length || allowed.length !== keys.length || !allowed.some(Boolean) || !values[0]?.length || keys.some(k => k.length !== query.length || !k.every(Number.isFinite)) || values.some(v => v.length !== values[0].length || !v.every(Number.isFinite))) throw new Error("Invalid attention inputs");
  const scale = Math.sqrt(query.length);
  const scores = keys.map(k => k.reduce((sum, n, i) => sum + n * query[i], 0) / scale);
  const visible = softmax(scores.filter((_, i) => allowed[i]), 1);
  let next = 0;
  const weights = scores.map((_, i) => allowed[i] ? visible[next++] : 0);
  const output = values[0].map((_, j) => values.reduce((sum, v, i) => sum + weights[i] * v[j], 0));
  return { scale, scores, weights, output };
}
