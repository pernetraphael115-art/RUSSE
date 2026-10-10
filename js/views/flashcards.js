import { state, save } from '../store.js';
import { getDueCards, updateCard } from '../srs.js';
import { speak } from '../tts.js';
import { shuffle } from '../text.js';

let dueQueue = [];
let currentCard = null;

export default async function render() {
  dueQueue = shuffle(getDueCards());
  
  if (dueQueue.length === 0) {
    return `
      <div class="stack center mt-l">
        <div style="font-size: 64px;">🎉</div>
        <div class="h2">Session terminée !</div>
        <button class="btn btn-primary mt" onclick="location.hash='#/review'">Retour</button>
      </div>
    `;
  }
  
  window.app = window.app || {};
  window.app.showAnswer = showAnswer;
  window.app.gradeCard = gradeCard;
  window.app.speak = speak;
  
  return renderCard();
}

function renderCard() {
  currentCard = dueQueue[0];
  const total = getDueCards().length + dueQueue.length - 1; // approximation
  
  return `
    <div class="topbar">
      <button class="icon-btn" onclick="history.back()"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>
      <div class="title center">Cartes restantes : ${dueQueue.length}</div>
      <div style="width: 42px;"></div>
    </div>
    
    <div class="card center mt-l" style="min-height: 250px; display: flex; flex-direction: column; justify-content: center; position: relative;">
      <button class="say sm" style="position: absolute; top: 10px; right: 10px;" onclick="app.speak('${currentCard.ru}')">
        <svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
      </button>
      
      <div class="ru ru-big">${currentCard.ru}</div>
      
      <div id="fc-answer" style="display: none; margin-top: 20px; border-top: 1px solid var(--border-2); padding-top: 20px;">
        <div class="h2" style="color: var(--teal);">${currentCard.fr}</div>
        ${currentCard.note ? `<div class="muted small mt-s">${currentCard.note}</div>` : ''}
      </div>
    </div>
    
    <div style="position: fixed; bottom: calc(var(--safe-bottom) + 20px); left: 18px; right: 18px;">
      <button id="btn-show" class="btn btn-primary btn-block" onclick="app.showAnswer()">Voir la réponse</button>
      
      <div id="fc-grades" class="grid-2" style="display: none; gap: 10px;">
        <button class="btn btn-danger" onclick="app.gradeCard(0)">À revoir</button>
        <button class="btn btn-primary" onclick="app.gradeCard(3)">Parfait</button>
      </div>
    </div>
  `;
}

function showAnswer() {
  document.getElementById('fc-answer').style.display = 'block';
  document.getElementById('btn-show').style.display = 'none';
  document.getElementById('fc-grades').style.display = 'grid';
  speak(currentCard.ru);
}

function gradeCard(grade) {
  // Update the card in SRS
  updateCard(currentCard.ru, grade);
  
  // XP reward
  state.xp += (grade * 2);
  
  // Remove from queue if correct, or re-add at end if missed
  const card = dueQueue.shift();
  if (grade < 2) {
    dueQueue.push(card);
  }
  
  save();
  
  // Render next card or finish
  const viewRoot = document.getElementById('view');
  if (dueQueue.length > 0) {
    viewRoot.innerHTML = renderCard();
  } else {
    viewRoot.innerHTML = `
      <div class="stack center mt-l" style="padding-top: 40px;">
        <div style="font-size: 64px;">🏆</div>
        <div class="h2">Session terminée !</div>
        <p class="muted">Toutes les cartes ont été révisées.</p>
        <button class="btn btn-primary mt" onclick="location.hash='#/review'">Retour</button>
      </div>
    `;
  }
  
  // Notify app to update badges if needed (optional)
  import('../app.js').then(m => m.updateReviewBadge && m.updateReviewBadge());
}
