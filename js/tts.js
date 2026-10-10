// Text-to-speech using the device's Russian voice (works offline on iOS once the voice is installed).
import { state } from './store.js';
import { stripStress } from './text.js';

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
let voices = [];
const listeners = new Set();

function refresh() {
  if (!synth) return;
  voices = synth.getVoices().filter(v => /^ru/i.test(v.lang));
  // Prefer enhanced / premium voices
  voices.sort((a, b) => score(b) - score(a));
  listeners.forEach(fn => fn(voices));
}
function score(v) {
  let s = 0;
  if (/premium|enhanced|améliorée|улучш/i.test(v.name)) s += 5;
  if (/milena|yuri|katya|irina|google/i.test(v.name)) s += 2;
  if (v.localService) s += 1;
  return s;
}
if (synth) {
  refresh();
  synth.addEventListener?.('voiceschanged', refresh);
  // iOS sometimes needs a nudge
  setTimeout(refresh, 300);
  setTimeout(refresh, 1500);
}

export const supported = () => !!synth;
export const russianVoices = () => voices;
export const hasRussianVoice = () => voices.length > 0;
export const onVoices = fn => { listeners.add(fn); return () => listeners.delete(fn); };

let current = null;

/** Speak Russian text. opts: { slow, el } — el gets the .playing class while speaking. */
export function say(text, opts = {}) {
  if (!synth || !text) return;
  try {
    synth.cancel();
  } catch {}
  if (current?.el) current.el.classList.remove('playing');
  
  const clean = stripStress(String(text)).replace(/[«»"]/g, '').trim();
  if (!clean) return;

  const u = new SpeechSynthesisUtterance(clean);
  u.lang = 'ru-RU';
  const chosen = voices.find(v => v.voiceURI === state.settings?.voice) || voices[0];
  if (chosen) u.voice = chosen;
  const rate = state.settings?.rate || 0.85;
  u.rate = opts.slow ? Math.max(0.4, rate * 0.6) : rate;
  u.pitch = 1;
  const el = opts.el;
  if (el) {
    el.classList.add('playing');
    const done = () => el.classList.remove('playing');
    u.onend = done;
    u.onerror = done;
  }
  current = { u, el };
  try {
    synth.speak(u);
  } catch (err) {
    console.warn('TTS error:', err);
  }
}

/** Alias for compatibility */
export const speak = say;

export function stop() {
  try { synth?.cancel(); } catch {}
}

// Global click delegation for Russian speech tags
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-say], .say, .ru-inline');
    if (!target) return;
    const text = target.getAttribute('data-say') || target.dataset?.say || target.textContent;
    if (text) {
      say(text, { el: target });
    }
  });
}
