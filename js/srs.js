// Spaced repetition (SM-2 inspired) + mastery-weighted random selection.
import { state, save, countNewCard, newCardsLeftToday } from './store.js';

const MIN = 60 * 1000, DAY = 24 * 60 * MIN;

export function card(key) { return state.srs[key]; }

/** Grade: 1 = À revoir, 2 = Difficile, 3 = Bien, 4 = Facile */
export function grade(key, q) {
  const now = Date.now();
  let c = state.srs[key];
  const isNew = !c;
  if (!c) c = { e: 2.5, i: 0, d: now, r: 0, l: 0, s: now };
  if (q === 1) {
    c.r = 0; c.l++; c.i = 0; c.e = Math.max(1.3, c.e - 0.2); c.d = now + 10 * MIN;
  } else {
    let i;
    if (q === 2) { i = c.r === 0 ? 1 : Math.max(1, Math.round(c.i * 1.2)); c.e = Math.max(1.3, c.e - 0.15); }
    else if (q === 3) { i = c.r === 0 ? 1 : c.r === 1 ? 3 : Math.round(Math.max(c.i, 1) * c.e); }
    else { i = c.r === 0 ? 4 : Math.round(Math.max(c.i, 1) * c.e * 1.3); c.e += 0.15; }
    c.i = Math.min(i, 365); c.r++; c.d = now + c.i * DAY;
  }
  c.s = now;
  state.srs[key] = c;
  state.stats.cards++;
  if (isNew) countNewCard();
  save();
  return c;
}

/** Light-touch update from exercises (correct/incorrect answers on a word). */
export function nudge(key, ok) {
  const c = state.srs[key];
  if (!c) { if (ok) return; grade(key, 1); return; }
  if (!ok) { c.e = Math.max(1.3, c.e - 0.15); c.d = Math.min(c.d, Date.now() + 10 * MIN); c.l++; save(); }
}

/** Preview the interval for each grade (for button labels). */
export function preview(key) {
  const c = state.srs[key] || { e: 2.5, i: 0, r: 0 };
  const fmt = d => d < 1 ? '10 min' : d < 30 ? `${d} j` : d < 365 ? `${Math.round(d / 30)} mois` : '1 an';
  const hard = c.r === 0 ? 1 : Math.max(1, Math.round(c.i * 1.2));
  const good = c.r === 0 ? 1 : c.r === 1 ? 3 : Math.round(Math.max(c.i, 1) * c.e);
  const easy = c.r === 0 ? 4 : Math.round(Math.max(c.i, 1) * c.e * 1.3);
  return [fmt(0), fmt(hard), fmt(good), fmt(easy)];
}

export function mastery(key) {
  const c = state.srs[key];
  if (!c) return 'new';
  if (c.i >= 21) return 'mastered';
  if (c.i >= 4) return 'known';
  return 'learning';
}
export const MASTERY_LABEL = { new: 'Nouveau', learning: 'En cours', known: 'Acquis', mastered: 'Maîtrisé' };

export const isDue = key => { const c = state.srs[key]; return !!c && c.d <= Date.now(); };

export function dueCount(keys) { return keys.filter(isDue).length; }

function weight(key) {
  const c = state.srs[key];
  const now = Date.now();
  if (!c) return 3;
  if (c.d <= now) return 6 + Math.min(10, (now - c.d) / DAY) + c.l * 0.5;
  const m = mastery(key);
  const base = m === 'learning' ? 1.6 : m === 'known' ? 0.5 : 0.15;
  return base + c.l * 0.2 + (c.e < 2 ? 0.6 : 0);
}

function weightedPick(keys, n) {
  const pool = keys.map(k => ({ k, w: weight(k) }));
  const out = [];
  while (out.length < n && pool.length) {
    const total = pool.reduce((s, x) => s + x.w, 0);
    let r = Math.random() * total, idx = 0;
    for (; idx < pool.length; idx++) { r -= pool[idx].w; if (r <= 0) break; }
    idx = Math.min(idx, pool.length - 1);
    out.push(pool[idx].k);
    pool.splice(idx, 1);
  }
  return out;
}

/**
 * Build a session.
 * smart: due cards first (most overdue), then new cards (daily limit), then weak cards.
 * free: mastery-weighted random over the whole pool.
 */
export function buildSession(keys, mode = 'smart', size = state.settings.sessionSize) {
  if (mode === 'free') return weightedPick(keys, size);
  const now = Date.now();
  const due = keys.filter(isDue).sort((a, b) => state.srs[a].d - state.srs[b].d).slice(0, size);
  let out = due.slice();
  if (out.length < size) {
    const fresh = keys.filter(k => !state.srs[k]).slice(0, Math.min(size - out.length, newCardsLeftToday()));
    out = out.concat(fresh);
  }
  if (out.length < size) {
    const rest = keys.filter(k => !out.includes(k) && state.srs[k] && state.srs[k].d > now && mastery(k) === 'learning');
    out = out.concat(weightedPick(rest, size - out.length));
  }
  // interleave so new cards are not all at the end
  return out.sort(() => Math.random() - 0.5).sort((a, b) => (isDue(b) ? 1 : 0) - (isDue(a) ? 1 : 0) || 0);
}
