// Centralized curriculum & data registry for Ruska
import { LEVELS } from './levels.js';
import { ALPHABET, ALPHA_CATS } from './alphabet.js';
import a0Units from './units_a0.js';
import { ADDITIONAL_UNITS } from './units_more.js';
import { EXPANDED_UNITS } from './units_curriculum_expanded.js';

// Vocabulary banks (470+ words enriched with translations, notes, categories & examples)
import { VOCABULARY_BANK } from './vocab_bank.js';
import { VOCABULARY_BANK_2 } from './vocab_bank_2.js';
import { VOCABULARY_BANK_3 } from './vocab_bank_3.js';

// Sentence banks (340+ sentences with word-by-word breakdown & grammar rules)
import { SENTENCES_BANK } from './sentences_bank.js';
import { SENTENCES_BANK_LARGE } from './sentences_bank_large.js';
import { ADDITIONAL_SENTENCES } from './sentences_bank_batch3.js';
import { BATCH_4_SENTENCES } from './sentences_bank_batch4.js';
import { BATCH_5_SENTENCES } from './sentences_bank_batch5.js';

// Assign level 'A0' to units_a0 if not set
const normalizedA0 = a0Units.map(u => ({ ...u, level: u.level || 'A0' }));

// Full curriculum across all levels (A0, A1, A2, B1, B2, C1, C2)
export const ALL_UNITS = [...normalizedA0, ...ADDITIONAL_UNITS, ...EXPANDED_UNITS];

export { LEVELS, ALPHABET, ALPHA_CATS };

export function getAllUnits() {
  return ALL_UNITS;
}

export function getUnitsByLevel(levelId = 'A0') {
  return ALL_UNITS.filter(u => u.level === levelId);
}

export function getUnitById(id) {
  return ALL_UNITS.find(u => u.id === id);
}

let cachedAllWords = null;
export function getAllWords() {
  if (cachedAllWords) return cachedAllWords;
  const list = [];
  const seen = new Set();

  function addWordEntry(w, defaultUnitId, defaultLevel) {
    if (!w || !Array.isArray(w)) return;
    const ru = w[0];
    if (!ru || typeof ru !== 'string') return;
    const cleanKey = ru.toLowerCase().trim().replace(/́/g, '');
    if (seen.has(cleanKey)) return;
    seen.add(cleanKey);

    const fr = w[1] || '';
    const cat = w[2] || '';
    const note = w[3] || '';
    const examplesRaw = w[4] || [];
    const examples = Array.isArray(examplesRaw) ? examplesRaw.map(e => ({
      ru: e[0] || '',
      fr: e[1] || '',
      note: e[2] || ''
    })) : [];

    list.push({
      ru,
      fr,
      cat,
      note,
      examples,
      forms: w[5] || [],
      unitId: defaultUnitId || 'lexicon',
      level: w[6] || defaultLevel || 'A1'
    });
  }

  // 1. Add words from lessons curriculum
  ALL_UNITS.forEach(u => {
    if (!u.words) return;
    u.words.forEach(w => addWordEntry(w, u.id, u.level));
  });

  // 2. Add words from enriched vocabulary banks (470+ words)
  [VOCABULARY_BANK, VOCABULARY_BANK_2, VOCABULARY_BANK_3].forEach(bank => {
    if (Array.isArray(bank)) {
      bank.forEach(w => addWordEntry(w, 'lexicon', w[6] || 'A1'));
    }
  });

  cachedAllWords = list;
  return list;
}

export function getWord(ru) {
  if (!ru) return null;
  const clean = ru.toLowerCase().trim().replace(/́/g, '');
  return getAllWords().find(w => w.ru.toLowerCase().trim().replace(/́/g, '') === clean);
}

let cachedAllSentences = null;
export function getAllSentences() {
  if (cachedAllSentences) return cachedAllSentences;
  const list = [];
  const seen = new Set();

  function addSentenceEntry(s, defaultUnitId, defaultLevel) {
    if (!s || !s.ru) return;
    const cleanKey = s.ru.toLowerCase().trim().replace(/́/g, '');
    if (seen.has(cleanKey)) return;
    seen.add(cleanKey);

    list.push({
      ...s,
      unitId: defaultUnitId || s.unitId || 'practice',
      level: s.level || defaultLevel || 'A1'
    });
  }

  // 1. Sentences from all units
  ALL_UNITS.forEach(u => {
    if (!u.sentences) return;
    u.sentences.forEach(s => addSentenceEntry(s, u.id, u.level));
  });

  // 2. Sentences from all practice banks (340+ sentences)
  [SENTENCES_BANK, SENTENCES_BANK_LARGE, ADDITIONAL_SENTENCES, BATCH_4_SENTENCES, BATCH_5_SENTENCES].forEach(bank => {
    if (Array.isArray(bank)) {
      bank.forEach(s => addSentenceEntry(s, 'practice', s.level || 'A1'));
    }
  });

  cachedAllSentences = list;
  return list;
}

export function getSentencesByLevel(levelId) {
  if (!levelId || levelId === 'ALL') return getAllSentences();
  return getAllSentences().filter(s => s.level === levelId);
}
