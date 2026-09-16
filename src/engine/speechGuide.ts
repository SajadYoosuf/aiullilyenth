export type Playback = "idle" | "playing" | "paused" | "error";
export function createSpeechGuide(
  synth: Pick<SpeechSynthesis, "speak" | "cancel" | "pause" | "resume">,
  makeUtterance = (text: string) => new SpeechSynthesisUtterance(text),
) {
  let generation = 0;
  let state: Playback = "idle";
  let report = (_: Playback) => {};
  let active: SpeechSynthesisUtterance | null = null;
  const setState = (next: Playback) => { state = next; report(next); };
  function stop() {
    generation++;
    if (active) { active.onend = null; active.onerror = null; }
    active = null;
    synth.cancel();
    setState("idle");
  }
  return {
    stop,
    pause() { if (state === "playing") { synth.pause(); setState("paused"); } },
    resume() { if (state === "paused") { synth.resume(); setState("playing"); } },
    dispose() { report = () => {}; stop(); },
    play(lines: string[], voice: SpeechSynthesisVoice, rate: number, onScene: (index: number) => void, onState: (state: Playback) => void) {
      stop();
      report = onState;
      if (!lines.length) return;
      const run = generation;
      function say(index: number) {
        if (generation !== run) return;
        onScene(index);
        active = makeUtterance(lines[index]);
        active.voice = voice;
        active.lang = voice.lang;
        active.rate = rate;
        active.onend = () => {
          if (generation !== run) return;
          active = null;
          if (index + 1 < lines.length) say(index + 1);
          else setState("idle");
        };
        active.onerror = () => { if (generation === run) { generation++; active = null; setState("error"); } };
        setState("playing");
        try { synth.resume(); synth.speak(active); }
        catch { generation++; active = null; setState("error"); }
      }
      say(0);
    },
  };
}
