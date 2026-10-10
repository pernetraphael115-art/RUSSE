// Session de Flashcards interactives (SRS SM-2 & Aléatoire selon maîtrise)
import { state, save, addXP } from '../store.js';
import { getDueCards, getRandomCards, getAllCards, updateCard, grade, preview, mastery, MASTERY_LABEL } from '../srs.js';
import { speak } from '../tts.js';
import { shuffle, md } from '../text.js';
import { getAllWords } from '../data/content.js';

let queue = [];
let currentCard = null;
let mode = 'smart';
let cardsDone = 0;

export default async function render() {
  const hashPart = window.location.hash.split('?')[1] || '';
  const urlParams = new URLSearchParams(hashPart);
  mode = urlParams.get('mode') || 'smart';

  // Build the session queue
  if (mode === 'random') {
    queue = getRandomCards(15, 'random');
  } else {
    queue = getDueCards();
  }

  // If queue is still empty, populate from all words registry
  if (queue.length === 0) {
    const all = getAllWords();
    queue = shuffle(all.slice(0, 15)).map(w => ({
      ru: w.ru,
      fr: w.fr,
      note: w.note,
      cat: w.cat,
      examples: w.examples,
      mastery: mastery(w.ru)
    }));
  }

  cardsDone = 0;

  window.app = window.app || {};
  window.app.showCardAnswer = showCardAnswer;
  window.app.gradeFlashcard = gradeFlashcard;
  window.app.speak = speak;

  return renderCardView();
}

function renderCardView() {
  if (!queue.length) {
    return `
      <div class="stack center mt-l" style="padding-top: 50px; text-align: center;">
        <div style="font-size: 64px; margin-bottom: 12px;">🎉</div>
        <div class="h2" style="font-size: 24px; font-weight: 800;">Session terminée !</div>
        <p class="muted" style="margin-top: 8px; max-width: 80%; margin-left: auto; margin-right: auto;">
          Tu as révisé ${cardsDone} carte${cardsDone > 1 ? 's' : ''} avec succès. Continue ainsi pour ancrer ton russe !
        </p>
        <button class="btn btn-primary mt" onclick="location.hash='#/review'" style="margin-top: 24px; padding: 14px 28px; border-radius: 14px;">
          Retour aux révisions
        </button>
      </div>
    `;
  }

  currentCard = queue[0];
  const cardMastery = mastery(currentCard.ru);
  const intervals = preview(currentCard.ru);

  // Auto-play audio on new card
  setTimeout(() => {
    speak(currentCard.ru);
  }, 100);

  const totalRemaining = queue.length;

  return `
    <header class="topbar" style="margin-bottom: 12px;">
      <div class="row-between" style="width: 100%;">
        <button class="icon-btn" onclick="location.hash='#/review'" style="background: var(--surface); width: 38px; height: 38px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
          <svg viewBox="0 0 24 24" style="width: 20px; height: 20px;"><path fill="none" stroke="currentColor" stroke-width="2.5" d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style="text-align: center;">
          <span class="tiny dim" style="text-transform: uppercase;">Mode ${mode === 'random' ? 'Aléatoire pondéré' : 'Intelligent SRS'}</span>
          <div class="small" style="font-weight: 700;">Restant : ${totalRemaining}</div>
        </div>
        <div class="chip" style="font-size: 11px; background: rgba(255,255,255,0.08); color: var(--text-2);">
          ${MASTERY_LABEL[cardMastery] || 'Nouveau'}
        </div>
      </div>
    </header>

    <!-- Carte principale -->
    <div class="card center mt" id="flashcard-box" style="
      min-height: 290px;
      padding: 24px 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      background: var(--surface);
      border: 1px solid var(--border-2);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
    ">
      <!-- Bouton Audio -->
      <button class="say" data-say="${currentCard.ru}" aria-label="Écouter" style="
        position: absolute;
        top: 14px;
        right: 14px;
        background: rgba(123, 92, 255, 0.2);
        color: var(--violet);
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg viewBox="0 0 24 24" style="width: 20px; height: 20px;"><polygon fill="currentColor" points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path fill="none" stroke="currentColor" stroke-width="2" d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
      </button>

      <!-- Mot russe recto -->
      <div class="ru ru-big" style="font-size: 36px; font-weight: 800; color: #fff; line-height: 1.2; margin-bottom: 6px;">
        ${currentCard.ru}
      </div>

      ${currentCard.cat ? `<div class="tiny dim" style="font-style: italic; margin-bottom: 12px;">${currentCard.cat}</div>` : ''}

      <!-- Verso réponse (révélé au clic) -->
      <div id="fc-verso" style="display: none; width: 100%; border-top: 1px solid var(--border-2); padding-top: 16px; margin-top: 14px;">
        <div class="h2" style="color: var(--teal); font-size: 24px; font-weight: 700;">
          ${currentCard.fr}
        </div>

        ${currentCard.note ? `
          <div class="small muted" style="margin-top: 10px; line-height: 1.4; background: rgba(0,0,0,0.25); padding: 10px 14px; border-radius: 10px;">
            💡 ${md(currentCard.note)}
          </div>
        ` : ''}

        <!-- Phrases d'exemples traduites et expliquées -->
        ${currentCard.examples && currentCard.examples.length ? `
          <div style="margin-top: 14px; text-align: left;">
            <div class="tiny dim" style="text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">Exemple d'usage :</div>
            ${currentCard.examples.map(ex => `
              <div class="row" style="gap: 10px; background: rgba(255,255,255,0.04); padding: 10px 12px; border-radius: 10px; align-items: center; border: 1px solid var(--border);">
                <button class="say sm" data-say="${ex.ru}" style="color: var(--teal); background: rgba(47, 214, 195, 0.15); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <svg viewBox="0 0 24 24" style="width: 14px; height: 14px;"><polygon fill="currentColor" points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon></svg>
                </button>
                <div class="grow">
                  <div style="font-size: 14.5px; font-weight: 700; color: #fff;">${md(ex.ru)}</div>
                  <div class="tiny dim">${ex.fr}</div>
                  ${ex.note ? `<div class="tiny" style="color: var(--text-3); margin-top: 2px;">${md(ex.note)}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>

    <!-- Contrôles du bas -->
    <div style="margin-top: 18px;">
      <button id="btn-reveal" class="btn btn-primary btn-block" onclick="app.showCardAnswer()" style="padding: 16px; font-size: 16px; font-weight: 700; border-radius: 16px;">
        👁️ Voir la traduction & les exemples
      </button>

      <!-- 4 boutons de notation SM-2 -->
      <div id="fc-actions" style="display: none; gap: 8px;" class="grid-2">
        <button class="btn btn-danger" onclick="app.gradeFlashcard(1)" style="padding: 12px 8px; border-radius: 12px; flex-direction: column; gap: 2px;">
          <span style="font-weight: 700; font-size: 14px;">🔴 À revoir</span>
          <span class="tiny dim">${intervals[0]}</span>
        </button>

        <button class="btn btn-secondary" onclick="app.gradeFlashcard(2)" style="padding: 12px 8px; border-radius: 12px; flex-direction: column; gap: 2px; border-color: rgba(255, 143, 77, 0.4);">
          <span style="font-weight: 700; font-size: 14px; color: var(--orange);">🟠 Difficile</span>
          <span class="tiny dim">${intervals[1]}</span>
        </button>

        <button class="btn btn-secondary" onclick="app.gradeFlashcard(3)" style="padding: 12px 8px; border-radius: 12px; flex-direction: column; gap: 2px; border-color: rgba(61, 220, 151, 0.4);">
          <span style="font-weight: 700; font-size: 14px; color: var(--green);">🟢 Bien</span>
          <span class="tiny dim">${intervals[2]}</span>
        </button>

        <button class="btn btn-primary" onclick="app.gradeFlashcard(4)" style="padding: 12px 8px; border-radius: 12px; flex-direction: column; gap: 2px;">
          <span style="font-weight: 700; font-size: 14px;">🟣 Facile</span>
          <span class="tiny dim">${intervals[3]}</span>
        </button>
      </div>
    </div>
  `;
}

function showCardAnswer() {
  const verso = document.getElementById('fc-verso');
  const btnReveal = document.getElementById('btn-reveal');
  const fcActions = document.getElementById('fc-actions');

  if (verso) verso.style.display = 'block';
  if (btnReveal) btnReveal.style.display = 'none';
  if (fcActions) fcActions.style.display = 'grid';

  // Play audio when revealing answer
  if (currentCard) speak(currentCard.ru);
}

function gradeFlashcard(gradeQuality) {
  if (!currentCard) return;

  // Grade with SM-2 algorithm
  grade(currentCard.ru, gradeQuality);
  addXP(gradeQuality * 2);
  cardsDone++;

  // If failed (grade 1), re-append to end of queue so user encounters it again in this session
  const popped = queue.shift();
  if (gradeQuality === 1) {
    queue.push(popped);
  }

  save();

  // Render next card
  const viewRoot = document.getElementById('view');
  if (viewRoot) {
    viewRoot.innerHTML = renderCardView();
  }
}
