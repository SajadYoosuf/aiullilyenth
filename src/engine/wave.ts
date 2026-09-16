// Gemini returns signed 16-bit little-endian PCM. Browsers need a WAV header.
export function pcmToWave(base64: string, mimeType: string): Blob {
  if (!/^audio\/(?:L16|pcm)(?:;|$)/i.test(mimeType) || !base64 || base64.length > 32_000_000) throw new Error("Invalid PCM audio");
  const rate = Number(/(?:^|;)\s*rate=(\d+)/i.exec(mimeType)?.[1] || 24000);
  const channels = Number(/(?:^|;)\s*channels=(\d+)/i.exec(mimeType)?.[1] || 1);
  if (!Number.isInteger(rate) || rate < 8000 || rate > 96000 || channels !== 1) throw new Error("Unsupported PCM format");
  const pcm = atob(base64);
  if (!pcm.length || pcm.length % 2) throw new Error("Invalid PCM samples");
  const buffer = new ArrayBuffer(44 + pcm.length);
  const view = new DataView(buffer);
  const write = (offset: number, text: string) => Array.from(text).forEach((c,i) => view.setUint8(offset+i, c.charCodeAt(0)));
  write(0,"RIFF"); view.setUint32(4,36+pcm.length,true); write(8,"WAVE"); write(12,"fmt ");
  view.setUint32(16,16,true); view.setUint16(20,1,true); view.setUint16(22,1,true);
  view.setUint32(24,rate,true); view.setUint32(28,rate*2,true); view.setUint16(32,2,true); view.setUint16(34,16,true);
  write(36,"data"); view.setUint32(40,pcm.length,true);
  for (let i=0;i<pcm.length;i++) view.setUint8(44+i,pcm.charCodeAt(i));
  return new Blob([buffer], {type:"audio/wav"});
}
