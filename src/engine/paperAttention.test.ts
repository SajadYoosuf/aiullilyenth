import { describe, expect, it } from "vitest";
import { paperAttention } from "./paperAttention";

describe("paper scaled dot-product attention", () => {
  it("scales by sqrt of key dimension and mixes V rather than K", () => {
    const a = paperAttention([1, 0], [[1, 0], [0, 1]], [[2, 0], [0, 4]]);
    const first = Math.exp(1 / Math.sqrt(2)) / (Math.exp(1 / Math.sqrt(2)) + 1);
    expect(a.weights[0]).toBeCloseTo(first, 12);
    expect(a.output[0]).toBeCloseTo(2 * first, 12);
    expect(a.output[1]).toBeCloseTo(4 * (1 - first), 12);
  });
  it("excludes masked tokens before normalization", () => {
    const a = paperAttention([1, 0], [[1, 0], [100, 0]], [[2, 3], [9, 9]], [true, false]);
    expect(a.weights).toEqual([1, 0]);
    expect(a.output).toEqual([2, 3]);
  });
  it("allows value dimensions to differ from key dimensions", () => {
    expect(paperAttention([0], [[1], [2]], [[2, 4, 6], [4, 6, 8]]).output).toEqual([3, 5, 7]);
  });
  it("rejects invalid dimensions and entirely masked rows", () => {
    expect(() => paperAttention([1], [[1, 2]], [[1]])).toThrow();
    expect(() => paperAttention([1], [[1]], [[1]], [false])).toThrow();
    expect(() => paperAttention([NaN], [[1]], [[1]])).toThrow();
  });
});
