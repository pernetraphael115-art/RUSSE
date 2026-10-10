// Spaced repetition (SM-2 inspired) + mastery-weighted random selection.
import { state, save, countNewCard, newCardsLeftToday } from './store.js';

const MIN = 60 * 1000, DAY = 24 * 60 * MIN;

export function card(key) { return state.srs[key]; }

/** Add a card with full word metadata to SRS store. */
export function addCard(ru, fr = '', note = '', cat = '', examples = []) {
  if (!ru) return;
  const existing = state.srs[ru];
  if (existing) {
    if (fr && !existing.fr) existing.fr = fr;
    if (note && !existing.note) existing.note = note;
    if (cat && !existing.cat) existing.cat = cat;
    if (examples && examples.length && (!existing.examples || !existing.examples.length)) existing.examples = examples;
    save();
    return existing;
  }
  const now = Date.now();
  const newCard = {
    ru,
    fr,
    note,
    cat,
    examples: examples || [],
    e: 2.5,
    i: 0,
    d: now,
    r: 0,
    l: 0,
    s: now
  };
  state.srs[ru] = newCard;
  save();
  return newCard;
}

/** Grade: 1 = À revoir, 2 = Difficile, 3 = Bien, 4 = Facile (or 0-3 converted) */
export function grade(key, q) {
  const now = Date.now();
  let c = state.srs[key];
  const isNew = !c || c.r === 0;
  if (!c) {
    c = { ru: key, e: 2.5, i: 0, d: now, r: 0, l: 0, s: now };
  }
  
  // Normalize quality to 1..4
  let quality = typeof q === 'number' ? q : 3;
  if (quality < 1) quality = 1;
  if (quality > 4) quality = 4;

  if (quality === 1) {
    c.r = 0;
    c.l = (c.l || 0) + 1;
    c.i = 0;
    c.e = Math.max(1.3, (c.e || 2.5) - 0.2);
    c.d = now + 10 * MIN;
  } else {
    let i;
    if (quality === 2) {
      i = c.r === 0 ? 1 : Math.max(1, Math.round((c.i || 1) * 1.2));
      c.e = Math.max(1.3, (c.e || 2.5) - 0.15);
    } else if (quality === 3) {
      i = c.r === 0 ? 1 : c.r === 1 ? 3 : Math.round(Math.max(c.i || 1, 1) * (c.e || 2.5));
    } else {
      i = c.r === 0 ? 4 : Math.round(Math.max(c.i || 1, 1) * (c.e || 2.5) * 1.3);
      c.e = (c.e || 2.5) + 0.15;
    }
    c.i = Math.min(i, 365);
    c.r = (c.r || 0) + 1;
    c.d = now + c.i * DAY;
  }
  c.s = now;
  state.srs[key] = c;
  if (!state.stats) state.stats = { answers: 0, correct: 0, cards: 0, lessons: 0 };
  state.stats.cards = (state.stats.cards || 0) + 1;
  if (isNew) countNewCard();
  save();
  return c;
}

/** Alias to update card with grade */
export function updateCard(key, gradeScore) {
  // Convert 0..3 to 1..4 if needed
  const q = gradeScore === 0 ? 1 : gradeScore === 1 ? 2 : gradeScore === 2 ? 3 : 4;
  return grade(key, q);
}

/** Light-touch update from exercises (correct/incorrect answers on a word). */
export function nudge(key, ok) {
  const c = state.srs[key];
  if (!c) { if (ok) return; grade(key, 1); return; }
  if (!ok) {
    c.e = Math.max(1.3, (c.e || 2.5) - 0.15);
    c.d = Math.min(c.d || Date.now(), Date.now() + 10 * MIN);
    c.l = (c.l || 0) + 1;
    save();
  }
}

/** Preview the interval for each grade (for button labels). */
export function preview(key) {
  const c = state.srs[key] || { e: 2.5, i: 0, r: 0 };
  const fmt = d => d < 1 ? '10 min' : d < 30 ? `${d} j` : d < 365 ? `${Math.round(d / 30)} mois` : '1 an';
  const hard = c.r === 0 ? 1 : Math.max(1, Math.round((c.i || 1) * 1.2));
  const good = c.r === 0 ? 1 : c.r === 1 ? 3 : Math.round(Math.max(c.i || 1, 1) * (c.e || 2.5));
  const easy = c.r === 0 ? 4 : Math.round(Math.max(c.i || 1, 1) * (c.e || 2.5) * 1.3);
  return [fmt(0), fmt(hard), fmt(good), fmt(easy)];
}

export function mastery(key) {
  const c = state.srs[key];
  if (!c || c.r === 0) return 'new';
  if ((c.i || 0) >= 21) return 'mastered';
  if ((c.i || 0) >= 4) return 'known';
  return 'learning';
}

export const MASTERY_LABEL = {
  new: 'Nouveau',
  learning: 'En cours',
  known: 'Acquis',
  mastered: 'Maîtrisé'
};

export const isDue = key => {
  const c = state.srs[key];
  return !!c && (c.d || 0) <= Date.now();
};

export function dueCount(keys) {
  const list = keys || Object.keys(state.srs);
  return list.filter(isDue).length;
}

/** Return all cards that are currently due for review, or all available cards. */
export function getDueCards() {
  const allKeys = Object.keys(state.srs);
  const now = Date.now();
  
  // Find due cards first
  const dueKeys = allKeys.filter(k => (state.srs[k].d || 0) <= now);
  const targetKeys = dueKeys.length > 0 ? dueKeys : allKeys;
  
  return targetKeys.map(k => {
    const item = state.srs[k];
    return {
      ru: item.ru || k,
      fr: item.fr || '',
      note: item.note || '',
      cat: item.cat || '',
      examples: item.examples || [],
      mastery: mastery(k),
      ...item
    };
  });
}

/** Get random cards weighted inversely by mastery:
 *  - 'learning' & 'new' have high weight (frequent)
 *  - 'known' has moderate weight
 *  - 'mastered' has low weight
 */
export function getRandomCards(count = 15, mode = 'random') {
  const allKeys = Object.keys(state.srs);
  if (!allKeys.length) return [];

  const pool = allKeys.map(k => {
    const m = mastery(k);
    const dueBonus = isDue(k) ? 4 : 0;
    let baseWeight = 2;
    if (m === 'learning') baseWeight = 8;
    else if (m === 'new') baseWeight = 5;
    else if (m === 'known') baseWeight = 3;
    else if (m === 'mastered') baseWeight = 1;
    return { key: k, weight: baseWeight + dueBonus };
  });

  const selectedKeys = [];
  const tempPool = [...pool];

  while (selectedKeys.length < Math.min(count, allKeys.length) && tempPool.length) {
    const totalWeight = tempPool.reduce((acc, curr) => acc + curr.weight, 0);
    let r = Math.random() * totalWeight;
    let chosenIndex = 0;
    for (let i = 0; i < tempPool.length; i++) {
      r -= tempPool[i].weight;
      if (r <= 0) {
        chosenIndex = i;
        break;
      }
    }
    selectedKeys.push(tempPool[chosenIndex].key);
    tempPool.splice(chosenIndex, 1);
  }

  return selectedKeys.map(k => {
    const item = state.srs[k];
    return {
      ru: item.ru || k,
      fr: item.fr || '',
      note: item.note || '',
      cat: item.cat || '',
      examples: item.examples || [],
      mastery: mastery(k),
      ...item
    };
  });
}

export function getAllCards() {
  return Object.keys(state.srs).map(k => {
    const item = state.srs[k];
    return {
      ru: item.ru || k,
      fr: item.fr || '',
      note: item.note || '',
      cat: item.cat || '',
      examples: item.examples || [],
      mastery: mastery(k),
      ...item
    };
  });
}

export function buildSession(keys, mode = 'smart', size = state.settings.sessionSize || 20) {
  if (mode === 'random' || mode === 'free') {
    return getRandomCards(size);
  }
  return getDueCards().slice(0, size);
}
