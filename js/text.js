// Text utilities: normalisation, comparison, inline markup.

export const stripStress = (s = '') => s.replace(/\u0301/g, '');

const CYR = /[а-яё]/i;
export const hasCyr = (s = '') => CYR.test(s);

/** Normalise Russian for comparison: no stress, ё→е, lowercase, no punctuation. */
export function normRu(s = '') {
  return stripStress(s)
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Normalise French for comparison: lowercase, no accents, no punctuation, apostrophes → space. */
export function normFr(s = '') {
  return s
    .toLowerCase()
    .replace(/œ/g, 'oe').replace(/æ/g, 'ae')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/['’`´]/g, ' ')
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Levenshtein distance (iterative, two rows). */
export function lev(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  let cur = new Array(b.length + 1);
  for (let i = 1; i <= a.length; i++) {
    cur[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, cur] = [cur, prev];
  }
  return prev[b.length];
}

/**
 * Compare an answer to a list of accepted answers.
 * Returns { status: 'ok' | 'near' | 'ko', best }
 */
export function compareAnswer(input, accepted, norm) {
  const a = norm(input);
  if (!a) return { status: 'ko', best: accepted[0] };
  let best = accepted[0], bestD = Infinity;
  for (const t of accepted) {
    const n = norm(t);
    if (n === a) return { status: 'ok', best: t };
    const d = lev(a, n);
    if (d < bestD) { bestD = d; best = t; }
  }
  const n = norm(best);
  const tolerance = Math.max(1, Math.floor(n.length / 12));
  if (bestD <= tolerance) return { status: 'near', best };
  return { status: 'ko', best };
}

export function escapeHtml(s = '') {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** Text to speak from a mixed cell: keep only Cyrillic words. */
export function cyrOnly(s = '') {
  return s.replace(/<[^>]+>/g, ' ').replace(/[^\p{Script=Cyrillic}\u0301\s,.!?-]/gu, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Inline markup used in lessons:
 *  **bold**   *highlight*   {русский} → tappable/speakable chip
 */
export function md(s = '') {
  let out = escapeHtml(s);
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*(.+?)\*/g, '<em>$1</em>');
  out = out.replace(/\{(.+?)\}/g, (_, t) => {
    const cls = t.length > 22 ? 'ru-inline long' : 'ru-inline';
    return `<span class="${cls}" data-say="${t}">${t}</span>`;
  });
  return out;
}

/** Split a Russian sentence into tokens {t, w} (w = is a word). */
export function tokenize(s = '') {
  const out = [];
  const re = /([\p{L}\u0301]+(?:-[\p{L}\u0301]+)*)|([^\p{L}\u0301]+)/gu;
  let m;
  while ((m = re.exec(s))) out.push(m[1] ? { t: m[1], w: true } : { t: m[2], w: false });
  return out;
}

/** Words of a sentence for tiles (keeps hyphenated words, drops punctuation). */
export function sentenceWords(s = '') {
  return tokenize(s).filter(x => x.w).map(x => x.t);
}

/** French tiles: split on spaces, keep elisions together (j'habite). */
export function frWords(s = '') {
  return s.replace(/[.,!?;:«»"]/g, ' ').split(/\s+/).filter(Boolean);
}

/** Basic Latin → Cyrillic transliteration for searching ("privet" → "привет"). */
const TR = [
  ['shch', 'щ'], ['sch', 'щ'], ['zh', 'ж'], ['kh', 'х'], ['ts', 'ц'], ['ch', 'ч'], ['sh', 'ш'],
  ['yu', 'ю'], ['ya', 'я'], ['yo', 'ё'], ['ye', 'е'], ['iu', 'ю'], ['ia', 'я'],
  ['a', 'а'], ['b', 'б'], ['v', 'в'], ['g', 'г'], ['d', 'д'], ['e', 'е'], ['z', 'з'], ['i', 'и'],
  ['j', 'й'], ['y', 'ы'], ['k', 'к'], ['l', 'л'], ['m', 'м'], ['n', 'н'], ['o', 'о'], ['p', 'п'],
  ['r', 'р'], ['s', 'с'], ['t', 'т'], ['u', 'у'], ['f', 'ф'], ['h', 'х'], ['c', 'к'], ['w', 'в'], ['x', 'кс'], ["'", 'ь']
];
export function translit(s = '') {
  let x = s.toLowerCase(), out = '';
  while (x.length) {
    const hit = TR.find(([l]) => x.startsWith(l));
    if (hit) { out += hit[1]; x = x.slice(hit[0].length); }
    else { out += x[0]; x = x.slice(1); }
  }
  return out;
}

export const shuffle = arr => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
export const pick = (arr, n) => shuffle(arr).slice(0, n);
export const sample = arr => arr[Math.floor(Math.random() * arr.length)];
