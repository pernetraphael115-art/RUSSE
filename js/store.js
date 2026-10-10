// Persistent state (localStorage) — progress, SRS, settings, stats.

const KEY = 'ruska.v1';

export function today(d = new Date()) {
  const z = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
}
function yesterday() { const d = new Date(); d.setDate(d.getDate() - 1); return today(d); }

const DEFAULTS = () => ({
  created: Date.now(),
  name: 'Apprenant',
  xp: 40,
  level: 'A0',
  unlockedLevels: ['A0'],
  streak: { count: 1, last: today(), best: 1 },
  days: { [today()]: 40 },
  goal: 30,
  srs: {},             // wordKey → { e, i, d, r, l, s, ru, fr, note, cat, examples }
  units: {
    'a0-alphabet': { status: 'unlocked' }
  },
  seen: {},
  accepted: {},
  stats: { answers: 0, correct: 0, cards: 0, lessons: 0 },
  settings: { rate: 0.85, voice: '', free: false, autoplay: true, stress: true, newPerDay: 15, sessionSize: 20 },
  newToday: { date: today(), n: 0 },
});

function merge(base, saved) {
  if (!saved || typeof saved !== 'object') return base;
  for (const k of Object.keys(saved)) {
    if (base[k] && typeof base[k] === 'object' && !Array.isArray(base[k]) && typeof saved[k] === 'object') {
      base[k] = merge(base[k], saved[k]);
    } else {
      base[k] = saved[k];
    }
  }
  return base;
}

function load() {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(KEY) : null;
    return raw ? merge(DEFAULTS(), JSON.parse(raw)) : DEFAULTS();
  } catch {
    return DEFAULTS();
  }
}

export const state = load();

let saveTimer = null;
export function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(KEY, JSON.stringify(state));
      }
    } catch (e) {
      console.warn('save failed', e);
    }
  }, 120);
}

export const saveState = save;

export function saveNow() {
  clearTimeout(saveTimer);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(KEY, JSON.stringify(state));
    }
  } catch {}
}

if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', saveNow);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') saveNow();
  });
}

/** Award XP and update streak. */
export function addXP(n) {
  const t = today();
  state.xp = (state.xp || 0) + n;
  state.days[t] = (state.days[t] || 0) + n;
  const s = state.streak || { count: 0, last: null, best: 0 };
  if (s.last !== t) {
    s.count = s.last === yesterday() ? s.count + 1 : 1;
    s.last = t;
    s.best = Math.max(s.best, s.count);
  }
  save();
}

/** Current streak, taking missed days into account. */
export function currentStreak() {
  const s = state.streak || { count: 1, last: today(), best: 1 };
  if (s.last === today() || s.last === yesterday()) return s.count;
  return 0;
}

export const todayXP = () => (state.days && state.days[today()]) || 0;

export function unitProgress(id) {
  return state.units[id] || (state.units[id] = { status: 'locked' });
}

export function recordAnswer(ok) {
  if (!state.stats) state.stats = { answers: 0, correct: 0, cards: 0, lessons: 0 };
  state.stats.answers++;
  if (ok) state.stats.correct++;
  save();
}

export function newCardsLeftToday() {
  const t = today();
  if (!state.newToday || state.newToday.date !== t) state.newToday = { date: t, n: 0 };
  return Math.max(0, (state.settings?.newPerDay || 15) - state.newToday.n);
}

export function countNewCard() {
  newCardsLeftToday();
  if (state.newToday) state.newToday.n++;
  save();
}

export function seedInitialSRS() {
  if (Object.keys(state.srs).length === 0) {
    import('./data/content.js').then(({ getAllWords }) => {
      const words = getAllWords().slice(0, 15);
      words.forEach((w, idx) => {
        state.srs[w.ru] = {
          ru: w.ru,
          fr: w.fr,
          note: w.note,
          cat: w.cat,
          examples: w.examples,
          e: 2.5,
          i: 0,
          d: Date.now() + idx * 30000,
          r: 0,
          l: 0,
          s: Date.now()
        };
      });
      save();
    }).catch(() => {});
  }
}

export function exportData() {
  return JSON.stringify({ app: 'ruska', version: 1, exported: new Date().toISOString(), state }, null, 2);
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
  if (typeof localStorage !== 'undefined') localStorage.removeItem(KEY);
  const fresh = DEFAULTS();
  for (const k of Object.keys(state)) delete state[k];
  Object.assign(state, fresh);
  saveNow();
}

if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
  navigator.storage.persist().catch(() => {});
}
