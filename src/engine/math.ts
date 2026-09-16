import type { Word } from "../types";
export function score(a: Pick<Word, "x" | "y">, b: Pick<Word, "x" | "y">) {
  return a.x * b.x + a.y * b.y;
}
export function softmax(values: number[], temperature = 10) {
  if (!values.length || temperature <= 0 || !values.every(Number.isFinite))
    throw new Error("Invalid scores");
  const max = Math.max(...values);
  const exp = values.map((v) => Math.exp((v - max) / temperature));
  const sum = exp.reduce((a, b) => a + b, 0);
  return exp.map((v) => v / sum);
}
export function percentages(weights: number[]) {
  if (!weights.length || weights.some((v) => !Number.isFinite(v) || v < 0))
    throw new Error("Invalid weights");
  const sum = weights.reduce((a, b) => a + b, 0);
  const scaled = weights.map((v) =>
    sum ? (v / sum) * 100 : 100 / weights.length,
  );
  const ints = scaled.map(Math.floor);
  const order = scaled
    .map((v, i) => ({ i, remainder: v - ints[i] }))
    .sort((a, b) => b.remainder - a.remainder);
  const missing = 100 - ints.reduce((a, b) => a + b, 0);
  for (let i = 0; i < missing; i++) ints[order[i].i]++;
  return ints;
}
export function weightedAverage(
  words: Pick<Word, "x" | "y">[],
  weights: number[],
) {
  if (
    !words.length ||
    words.length !== weights.length ||
    weights.some((v) => v < 0 || !Number.isFinite(v))
  )
    throw new Error("Invalid vectors");
  const total = weights.reduce((a, b) => a + b, 0);
  if (total <= 0) throw new Error("Zero weight");
  return words.reduce(
    (p, w, i) => ({
      x: p.x + (w.x * weights[i]) / total,
      y: p.y + (w.y * weights[i]) / total,
    }),
    { x: 0, y: 0 },
  );
}
export function attention(words: Word[], focus: string) {
  const word = words.find((w) => w.text === focus);
  if (!word) throw new Error("Missing focus");
  const scores = words.map((w) => score(word, w));
  const weights = softmax(scores);
  return {
    scores,
    weights,
    percents: percentages(weights),
    position: weightedAverage(words, weights),
  };
}
export function cosine(a: number[], b: number[]) {
  if (
    !a.length ||
    a.length !== b.length ||
    ![...a, ...b].every(Number.isFinite)
  )
    throw new Error("Invalid vectors");
  const dot = a.reduce((s, v, i) => s + v * b[i], 0);
  const norm = Math.hypot(...a) * Math.hypot(...b);
  return norm ? Math.max(-1, Math.min(1, dot / norm)) : 0;
}
