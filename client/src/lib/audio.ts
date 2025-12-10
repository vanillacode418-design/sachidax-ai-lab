export function generateDemoWavBlob({ seconds = 4, sampleRate = 44100, baseFreq = 220 } = {}) {
  const length = Math.floor(seconds * sampleRate);
  const channels = 1;
  const buffer = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    // frequency modulation for "expressive" tone
    const fm = Math.sin(2 * Math.PI * 2 * t) * 20; // slow FM
    const freq = baseFreq + 80 * Math.sin(2 * Math.PI * 0.25 * t) + fm;
    const carrier = Math.sin(2 * Math.PI * freq * t);
    // amplitude envelope (attack-decay-sustain-release)
    let env = 1.0;
    if (t < 0.08) env = t / 0.08; // attack
    else if (t < 0.6) env = 1 - (t - 0.08) * 0.2; // slight decay
    else if (t < seconds - 0.2) env = 0.85; // sustain
    else env = Math.max(0, (seconds - t) / 0.2); // release

    // add some harmonics
    const h2 = 0.25 * Math.sin(2 * Math.PI * (freq * 2) * t);
    const h3 = 0.12 * Math.sin(2 * Math.PI * (freq * 3) * t);
    buffer[i] = (carrier + h2 + h3) * 0.5 * env * (0.85 + 0.15 * Math.random());
  }

  // Convert float buffer to 16-bit PCM WAV
  function floatTo16BitPCM(float32Array: Float32Array) {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    let offset = 0;
    for (let i = 0; i < float32Array.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, float32Array[i]));
      s = s < 0 ? s * 0x8000 : s * 0x7fff;
      view.setInt16(offset, s, true);
    }
    return view;
  }

  function writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  const wavBuffer = new ArrayBuffer(44 + buffer.length * 2);
  const view = new DataView(wavBuffer);

  /* RIFF identifier */
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + buffer.length * 2, true);
  writeString(view, 8, 'WAVE');
  /* fmt chunk */
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // chunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, channels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * channels * 2, true); // byte rate
  view.setUint16(32, channels * 2, true); // block align
  view.setUint16(34, 16, true); // bits per sample
  /* data chunk */
  writeString(view, 36, 'data');
  view.setUint32(40, buffer.length * 2, true);

  // write PCM samples
  const pcmView = floatTo16BitPCM(buffer);
  for (let i = 0; i < pcmView.byteLength; i++) {
    view.setUint8(44 + i, pcmView.getUint8(i));
  }

  return new Blob([view], { type: 'audio/wav' });
}
