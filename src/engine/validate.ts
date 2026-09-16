import type { Lesson } from "../types";
import { percentages } from "./math";
const str = (v: unknown, max = 160): v is string =>
  typeof v === "string" && v.trim().length > 0 && v.length <= max;
export function validateLesson(raw: unknown): Lesson | { safe: false } {
  if (!raw || typeof raw !== "object") throw Error("Invalid lesson");
  const r = raw as Record<string, any>;
  if (r.safe === false) return { safe: false };
  if (
    r.safe !== true ||
    !str(r.sentence, 300) ||
    !Array.isArray(r.teaching_tokens) ||
    r.teaching_tokens.length < 1 ||
    r.teaching_tokens.length > 60 ||
    !r.teaching_tokens.every((t: unknown) => str(t, 60))
  )
    throw Error("Invalid sentence");
  if (
    !Array.isArray(r.dimensions) ||
    r.dimensions.length !== 2 ||
    !r.dimensions.every(
      (d: any) => d && str(d.name_ml, 50) && str(d.name_en, 50),
    )
  )
    throw Error("Invalid dimensions");
  if (
    !Array.isArray(r.words) ||
    r.words.length < 2 ||
    r.words.length > 6 ||
    !r.words.every(
      (w: any) =>
        w &&
        str(w.text, 40) &&
        Number.isFinite(w.x) &&
        Number.isFinite(w.y) &&
        str(w.meaning_ml),
    )
  )
    throw Error("Invalid words");
  if (
    new Set(r.words.map((w: any) => w.text)).size !== r.words.length ||
    !r.words.some((w: any) => w.text === r.focus_word) ||
    !str(r.insight_ml, 300)
  )
    throw Error("Invalid focus");
  if (
    !Array.isArray(r.next_word_options) ||
    r.next_word_options.length !== 3 ||
    !r.next_word_options.every(
      (o: any) => o && str(o.text, 80) && Number.isFinite(o.percent),
    )
  )
    throw Error("Invalid predictions");
  const ps = percentages(
    r.next_word_options.map((o: any) => Math.max(0, o.percent)),
  );
  return {
    safe: true,
    sentence: r.sentence,
    teaching_tokens: r.teaching_tokens,
    dimensions: r.dimensions.map((d: any) => ({
      name_ml: d.name_ml,
      name_en: d.name_en,
    })),
    words: r.words.map((w: any) => ({
      text: w.text,
      x: Math.round(Math.max(0, Math.min(10, w.x))),
      y: Math.round(Math.max(0, Math.min(10, w.y))),
      meaning_ml: w.meaning_ml,
    })),
    focus_word: r.focus_word,
    insight_ml: r.insight_ml,
    next_word_options: r.next_word_options.map((o: any, i: number) => ({
      text: o.text,
      percent: ps[i],
    })),
    source: "live",
  };
}
