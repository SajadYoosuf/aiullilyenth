import { describe, it, expect } from "vitest";
import {
  score,
  softmax,
  weightedAverage,
  percentages,
  attention,
  cosine,
} from "./math";
import { validateLesson } from "./validate";
import { demos } from "../lessons";
describe("attention math", () => {
  it("shows the same multiply-and-add calculation used for scores", () => {
    expect(score({ x: 5, y: 5 }, { x: 1, y: 9 })).toBe(50);
  });
  it("uses temperature 10 and includes self attention", () => {
    const a = attention(demos[0].words, "മോനേ");
    expect(a.scores).toEqual([35, 50, 50, 30]);
    expect(a.weights.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 12);
    expect(a.weights[1]).toBeCloseTo(a.weights[2], 12);
    expect(a.percents.reduce((a, b) => a + b, 0)).toBe(100);
  });
  it("softmax is stable with large scores", () => {
    expect(softmax([100000, 100000])).toEqual([0.5, 0.5]);
    expect(softmax([100000, 99990])[0]).toBeCloseTo(0.7310585786);
  });
  it("computes the weighted average using unrounded weights", () => {
    expect(
      weightedAverage(
        [
          { x: 0, y: 10 },
          { x: 10, y: 0 },
        ],
        [0.25, 0.75],
      ),
    ).toEqual({ x: 7.5, y: 2.5 });
  });
  it("rounds attention to exactly 100, with stable tie breaking", () => {
    expect(percentages([1, 1, 1])).toEqual([34, 33, 33]);
    for (let n = 2; n <= 6; n++)
      expect(
        percentages(Array.from({ length: n }, (_, i) => Math.exp(i))).reduce(
          (a, b) => a + b,
          0,
        ),
      ).toBe(100);
  });
  it("changes the meaning of bat in opposite directions", () => {
    const cricket = attention(demos[1].words, "bat").position;
    const flying = attention(demos[2].words, "bat").position;
    expect(cricket.x).toBeGreaterThan(cricket.y);
    expect(flying.y).toBeGreaterThan(flying.x);
  });
  it("moves the Malayalam focus toward mocking", () => {
    const p = attention(demos[0].words, "മോനേ").position;
    expect(p.y).toBeGreaterThan(5);
    expect(p.x).toBeLessThan(5);
  });
  it("rejects invalid math inputs", () => {
    expect(() => softmax([])).toThrow();
    expect(() => softmax([NaN])).toThrow();
    expect(() => softmax([1], 0)).toThrow();
    expect(() => weightedAverage([{ x: 1, y: 1 }], [])).toThrow();
    expect(() => percentages([-1, 2])).toThrow();
  });
  it("handles cosine similarity including zero vectors", () => {
    expect(cosine([1, 0], [1, 0])).toBe(1);
    expect(cosine([1, 0], [0, 1])).toBe(0);
    expect(cosine([1, 0], [-1, 0])).toBe(-1);
    expect(cosine([0, 0], [1, 0])).toBe(0);
    expect(() => cosine([1], [1, 2])).toThrow();
  });
});
describe("untrusted lesson validation", () => {
  it("accepts safe=false without other fields", () =>
    expect(validateLesson({ safe: false })).toEqual({ safe: false }));
  it("clamps coordinates and normalizes predictions", () => {
    const raw = structuredClone(demos[0]);
    raw.words[0].x = -2;
    raw.words[0].y = 13.7;
    const lesson = validateLesson(raw);
    expect(lesson.safe).toBe(true);
    if (lesson.safe) {
      expect(lesson.words[0]).toMatchObject({ x: 0, y: 10 });
      expect(lesson.next_word_options.reduce((s, o) => s + o.percent, 0)).toBe(
        100,
      );
    }
  });
  it("rejects missing focus and non-finite coordinates", () => {
    expect(() =>
      validateLesson({ ...demos[0], focus_word: "missing" }),
    ).toThrow();
    const raw = structuredClone(demos[0]);
    raw.words[0].x = NaN;
    expect(() => validateLesson(raw)).toThrow();
  });
  it("requires exactly two dimensions and three prediction options", () => {
    expect(() => validateLesson({ ...demos[0], dimensions: [] })).toThrow();
    expect(() =>
      validateLesson({ ...demos[0], next_word_options: [] }),
    ).toThrow();
  });
  it("rejects duplicate words and malformed tokens", () => {
    expect(() =>
      validateLesson({
        ...demos[0],
        words: [demos[0].words[0], demos[0].words[0]],
      }),
    ).toThrow();
    expect(() =>
      validateLesson({ ...demos[0], teaching_tokens: [{}] }),
    ).toThrow();
  });
});
