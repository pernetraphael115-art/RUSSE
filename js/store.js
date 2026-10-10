// Persistent state (localStorage) — progress, SRS, settings, stats.

const KEY = 'ruska.v1';

const DEFAULTS = () => ({
  created: Date.now(),
  name: '',
  xp: 0,
  streak: { count: 0, last: null, best: 0 },
  days: {},            // 'YYYY-MM-DD' → xp earned that day
  goal: 30,            // daily XP goal
  srs: {},             // wordKey → { e, i, d, r, l, s }
  units: {},           // unitId → { lesson, vocab, drill, test, done }
  seen: {},            // wordKey → timestamp first studied
  accepted: {},        // sentenceKey → [user answers accepted manually]
  stats: { answers: 0, correct: 0, cards: 0, lessons: 0 },
  settings: { rate: 0.85, voice: '', free: false, autoplay: true, stress: true, newPerDay: 15, sessionSize: 20 },
  newToday: { date: '', n: 0 },
});

function merge(base, saved) {
  for (const k of Object.keys(saved || {})) {
    if (base[k] && typeof base[k] === 'object' && !Array.isArray(base[k]) && typeof saved[k] === 'object') {
      base[k] = merge(base[k], saved[k]);
    } else base[k] = saved[k];
  }
  return base;
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? merge(DEFAULTS(), JSON.parse(raw)) : DEFAULTS();
  } catch { return DEFAULTS(); }
}

export const state = load();

let saveTimer = null;
export function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { console.warn('save failed', e); }
  }, 120);
}
export function saveNow() {
  clearTimeout(saveTimer);
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}
addEventListener('pagehide', saveNow);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') saveNow(); });

export function today(d = new Date()) {
  const z = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
}
function yesterday() { const d = new Date(); d.setDate(d.getDate() - 1); return today(d); }

/** Award XP and update streak. */
export function addXP(n) {
  const t = today();
  state.xp += n;
  state.days[t] = (state.days[t] || 0) + n;
  const s = state.streak;
  if (s.last !== t) {
    s.count = s.last === yesterday() ? s.count + 1 : 1;
    s.last = t;
    s.best = Math.max(s.best, s.count);
  }
  save();
}

/** Current streak, taking missed days into account. */
export function currentStreak() {
  const s = state.streak;
  if (s.last === today() || s.last === yesterday()) return s.count;
  return 0;
}

export const todayXP = () => state.days[today()] || 0;

export function unitProgress(id) {
  return state.units[id] || (state.units[id] = { lesson: false, vocab: false, drill: 0, test: 0, done: false });
}

export function recordAnswer(ok) {
  state.stats.answers++;
  if (ok) state.stats.correct++;
  save();
}

export function newCardsLeftToday() {
  const t = today();
  if (state.newToday.date !== t) state.newToday = { date: t, n: 0 };
  return Math.max(0, state.settings.newPerDay - state.newToday.n);
}
export function countNewCard() {
  newCardsLeftToday();
  state.newToday.n++;
  save();
}

export function exportData() {
  return JSON.stringify({ app: 'ruska', version: 1, exported: new Date().toISOString(), state }, null, 1);
}
export function importData(text) {
  const data = JSON.parse(text);
  if (!data || data.app !== 'ruska' || !data.state) throw new Error('Fichier invalide');
  const fresh = merge(DEFAULTS(), data.state);
  for (const k of Object.keys(state)) delete state[k];
  Object.assign(state, fresh);
  saveNow();
}
export function resetAll() {
  localStorage.removeItem(KEY);
  const fresh = DEFAULTS();
  for (const k of Object.keys(state)) delete state[k];
  Object.assign(state, fresh);
  saveNow();
}

// Ask the browser to keep our data (helps on iOS).
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
