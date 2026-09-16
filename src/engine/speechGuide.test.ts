import { describe, it, expect, vi } from "vitest";
import { createSpeechGuide } from "./speechGuide";

function setup() {
  const spoken: SpeechSynthesisUtterance[] = [];
  const synth = { speak: vi.fn((u: SpeechSynthesisUtterance) => spoken.push(u)), cancel: vi.fn(), pause: vi.fn(), resume: vi.fn() };
  const guide = createSpeechGuide(synth, text => ({ text } as SpeechSynthesisUtterance));
  const scene = vi.fn(), state = vi.fn();
  const voice = { lang: "ml-IN" } as SpeechSynthesisVoice;
  return { synth, guide, spoken, scene, state, voice };
}
describe("spoken board guide", () => {
  it("advances the board only after each spoken cue ends", () => {
    const t = setup();
    t.guide.play(["first", "second"], t.voice, .85, t.scene, t.state);
    expect(t.scene.mock.calls).toEqual([[0]]);
    expect(t.spoken[0].rate).toBe(.85);
    t.spoken[0].onend?.call(t.spoken[0], {} as SpeechSynthesisEvent);
    expect(t.scene.mock.calls).toEqual([[0], [1]]);
    t.spoken[1].onend?.call(t.spoken[1], {} as SpeechSynthesisEvent);
    expect(t.state).toHaveBeenLastCalledWith("idle");
  });
  it("ignores late callbacks after stopping or replacing narration", () => {
    const t = setup();
    t.guide.play(["old", "must not play"], t.voice, 1, t.scene, t.state);
    const late = t.spoken[0].onend;
    t.guide.stop();
    t.guide.play(["new"], t.voice, 1, t.scene, t.state);
    late?.call(t.spoken[0], {} as SpeechSynthesisEvent);
    expect(t.spoken.map(u => u.text)).toEqual(["old", "new"]);
  });
  it("pauses and resumes, and surfaces speech failure without advancing", () => {
    const t = setup();
    t.guide.play(["first", "second"], t.voice, 1, t.scene, t.state);
    t.guide.pause(); expect(t.state).toHaveBeenLastCalledWith("paused");
    t.guide.resume(); expect(t.state).toHaveBeenLastCalledWith("playing");
    const lateEnd = t.spoken[0].onend;
    t.spoken[0].onerror?.call(t.spoken[0], {} as SpeechSynthesisErrorEvent);
    lateEnd?.call(t.spoken[0], {} as SpeechSynthesisEvent);
    expect(t.state).toHaveBeenLastCalledWith("error");
    expect(t.spoken).toHaveLength(1);
  });
  it("disposes without notifying an unmounted component", () => {
    const t = setup();
    t.guide.play(["first"], t.voice, 1, t.scene, t.state);
    t.state.mockClear(); t.guide.dispose();
    expect(t.state).not.toHaveBeenCalled();
    expect(t.spoken[0].onend).toBeNull();
  });
});
