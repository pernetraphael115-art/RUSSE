// Centralized curriculum & data registry for Ruska
import { LEVELS } from './levels.js';
import { ALPHABET, ALPHA_CATS } from './alphabet.js';
import a0Units from './units_a0.js';
import { ADDITIONAL_UNITS } from './units_more.js';

// Assign level 'A0' to units_a0 if not set
const normalizedA0 = a0Units.map(u => ({ ...u, level: u.level || 'A0' }));

export const ALL_UNITS = [...normalizedA0, ...ADDITIONAL_UNITS];

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

  ALL_UNITS.forEach(u => {
    if (!u.words) return;
    u.words.forEach(w => {
      // Format: [ru, fr, cat, note, [[ex_ru, ex_fr, ex_note]], forms]
      const ru = w[0];
      if (!ru || seen.has(ru)) return;
      seen.add(ru);
      
      const fr = w[1] || '';
      const cat = w[2] || '';
      const note = w[3] || '';
      const examplesRaw = w[4] || [];
      const examples = examplesRaw.map(e => ({
        ru: e[0] || '',
        fr: e[1] || '',
        note: e[2] || ''
      }));

      list.push({
        ru,
        fr,
        cat,
        note,
        examples,
        forms: w[5] || [],
        unitId: u.id,
        level: u.level
      });
    });
  });

  cachedAllWords = list;
  return list;
}

export function getWord(ru) {
  return getAllWords().find(w => w.ru === ru);
}

export function getAllSentences() {
  const list = [];
  ALL_UNITS.forEach(u => {
    if (!u.sentences) return;
    u.sentences.forEach(s => {
      list.push({
        ...s,
        unitId: u.id,
        level: u.level
      });
    });
  });
  return list;
}

export function getSentencesByLevel(levelId) {
  if (!levelId) return getAllSentences();
  return getAllSentences().filter(s => s.level === levelId);
}
