// Lexique & Dictionnaire complet du vocabulaire (recherche, audio, notes et exemples traduits)
import { state, save } from '../store.js';
import { getAllWords, LEVELS } from '../data/content.js';
import { speak } from '../tts.js';
import { translit, md, normRu, normFr } from '../text.js';
import { mastery, MASTERY_LABEL, addCard } from '../srs.js';

let searchQuery = '';
let filterLevel = 'ALL';

export default async function render() {
  const allWords = getAllWords();
  
  // Apply filtering
  const q = searchQuery.toLowerCase().trim();
  const qTranslit = translit(q);

  const filtered = allWords.filter(w => {
    // Level match
    if (filterLevel !== 'ALL' && w.level !== filterLevel) return false;
    
    // Search match
    if (!q) return true;
    const ruMatch = normRu(w.ru).includes(normRu(q)) || normRu(w.ru).includes(normRu(qTranslit));
    const frMatch = normFr(w.fr).includes(normFr(q));
    const noteMatch = w.note && normFr(w.note).includes(normFr(q));
    return ruMatch || frMatch || noteMatch;
  });

  window.app = window.app || {};
  window.app.speak = speak;
  window.app.onLexiconSearch = (val) => {
    searchQuery = val;
    renderLexiconList();
  };
  window.app.setLexiconFilter = (lvl) => {
    filterLevel = lvl;
    const viewRoot = document.getElementById('view');
    if (viewRoot) {
      render().then(html => { viewRoot.innerHTML = html; });
    }
  };
  window.app.toggleWordCard = (idx) => {
    const el = document.getElementById(`word-detail-${idx}`);
    if (el) {
      el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }
  };

  return `
    <header class="topbar" style="margin-bottom: 12px;">
      <div class="row-between" style="width: 100%;">
        <div class="display" style="font-size: 22px; font-weight: 800;">Lexique</div>
        <div class="chip" style="background: rgba(47, 214, 195, 0.15); color: var(--teal); border: 1px solid rgba(47, 214, 195, 0.3);">
          ${allWords.length} mots répertoriés
        </div>
      </div>
    </header>

    <!-- Barre de recherche -->
    <div style="margin-bottom: 12px; position: relative;">
      <input type="search" id="lex-search" placeholder="Rechercher en russe, français ou phonétique..." value="${searchQuery}" oninput="app.onLexiconSearch(this.value)" style="
        width: 100%;
        background: var(--surface);
        border: 1px solid var(--border-2);
        color: #fff;
        padding: 12px 16px 12px 42px;
        border-radius: 14px;
        font-size: 15px;
      ">
      <div style="position: absolute; left: 14px; top: 12px; color: var(--text-3);">
        <svg viewBox="0 0 24 24" style="width: 18px; height: 18px;"><circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M21 21l-4.35-4.35" fill="none" stroke="currentColor" stroke-width="2"/></svg>
      </div>
    </div>

    <!-- Filtres de niveau -->
    <div style="margin-bottom: 16px; display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px;">
      <button class="btn btn-sm ${filterLevel === 'ALL' ? 'btn-primary' : 'btn-secondary'}" onclick="app.setLexiconFilter('ALL')" style="padding: 5px 12px; font-size: 12px; border-radius: 999px;">
        Tous
      </button>
      ${LEVELS.map(lvl => `
        <button class="btn btn-sm ${filterLevel === lvl.id ? 'btn-primary' : 'btn-secondary'}" onclick="app.setLexiconFilter('${lvl.id}')" style="padding: 5px 12px; font-size: 12px; border-radius: 999px;">
          ${lvl.id}
        </button>
      `).join('')}
    </div>

    <div id="lexicon-list-container">
      ${renderItemsHtml(filtered)}
    </div>
  `;
}

function renderLexiconList() {
  const container = document.getElementById('lexicon-list-container');
  if (!container) return;

  const allWords = getAllWords();
  const q = searchQuery.toLowerCase().trim();
  const qTranslit = translit(q);

  const filtered = allWords.filter(w => {
    if (filterLevel !== 'ALL' && w.level !== filterLevel) return false;
    if (!q) return true;
    const ruMatch = normRu(w.ru).includes(normRu(q)) || normRu(w.ru).includes(normRu(qTranslit));
    const frMatch = normFr(w.fr).includes(normFr(q));
    const noteMatch = w.note && normFr(w.note).includes(normFr(q));
    return ruMatch || frMatch || noteMatch;
  });

  container.innerHTML = renderItemsHtml(filtered);
}

function renderItemsHtml(words) {
  if (!words.length) {
    return `
      <div class="card center" style="padding: 30px;">
        <p class="muted">Aucun mot trouvé pour « ${searchQuery} ».</p>
      </div>
    `;
  }

  let html = `<div class="stack" style="gap: 10px;">`;

  words.forEach((w, idx) => {
    const m = mastery(w.ru);
    const mLabel = MASTERY_LABEL[m] || 'Nouveau';

    html += `
      <div class="card" style="padding: 14px 16px; border-radius: var(--radius-sm); background: var(--surface); border: 1px solid var(--border);">
        <div class="row-between" style="align-items: flex-start;">
          <div class="tap" onclick="app.toggleWordCard(${idx})" style="flex: 1;">
            <div class="row" style="gap: 8px; align-items: baseline;">
              <span class="ru ru-big" style="font-size: 19px; font-weight: 800; color: #fff;">${w.ru}</span>
              ${w.cat ? `<span class="tiny dim" style="font-style: italic;">${w.cat}</span>` : ''}
              <span class="chip" style="font-size: 10px; padding: 1px 6px; background: rgba(255,255,255,0.06); color: var(--text-3);">${w.level || 'A0'}</span>
            </div>
            <div style="font-size: 15px; color: var(--teal); font-weight: 600; margin-top: 2px;">${w.fr}</div>
          </div>

          <button class="say sm" data-say="${w.ru}" style="color: var(--violet); background: rgba(123, 92, 255, 0.15); width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-left: 10px;">
            <svg viewBox="0 0 24 24" style="width: 16px; height: 16px;"><polygon fill="currentColor" points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path fill="none" stroke="currentColor" stroke-width="2" d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
          </button>
        </div>

        <!-- Détail déroulant avec exemples et explications -->
        <div id="word-detail-${idx}" style="margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px;">
          ${w.note ? `
            <div class="small muted" style="font-size: 13.5px; line-height: 1.4; margin-bottom: 8px;">
              💡 ${md(w.note)}
            </div>
          ` : ''}

          ${w.examples && w.examples.length ? `
            <div class="stack" style="gap: 6px;">
              ${w.examples.map(ex => `
                <div class="row" style="gap: 8px; background: rgba(0,0,0,0.25); padding: 8px 10px; border-radius: 8px; align-items: center;">
                  <button class="say sm" data-say="${ex.ru}" style="color: var(--teal); width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <svg viewBox="0 0 24 24" style="width: 12px; height: 12px;"><polygon fill="currentColor" points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon></svg>
                  </button>
                  <div class="grow">
                    <div style="font-size: 13.5px; font-weight: 700; color: #fff;">${md(ex.ru)}</div>
                    <div class="tiny dim">${ex.fr}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div class="row-between" style="margin-top: 10px; font-size: 12px; color: var(--text-3);">
            <span>Statut SRS : <strong>${mLabel}</strong></span>
            <button class="btn btn-sm" onclick="app.addWordToSRS('${w.ru}')" style="font-size: 11px; padding: 3px 8px; border-radius: 6px; background: rgba(255,255,255,0.08);">
              + Réviser dans SRS
            </button>
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  return html;
}

window.app = window.app || {};
window.app.addWordToSRS = (ru) => {
  const allWords = getAllWords();
  const w = allWords.find(x => x.ru === ru);
  if (w) {
    addCard(w.ru, w.fr, w.note, w.cat, w.examples);
    alert(`« ${ru} » ajouté à tes cartes de révision !`);
  }
};
