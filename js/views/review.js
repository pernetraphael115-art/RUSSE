import { state } from '../store.js';
import { getDueCards } from '../srs.js';

export default async function render() {
  const due = getDueCards();
  const count = due.length;
  
  let html = `
    <div class="topbar">
      <div class="title h2">Révisions</div>
    </div>
  `;
  
  if (count === 0) {
    html += `
      <div class="stack center mt-l" style="padding-top: 40px;">
        <div style="font-size: 64px; margin-bottom: 10px;">🎉</div>
        <div class="h2">Tout est à jour !</div>
        <p class="muted">Tu as révisé tout ton vocabulaire pour l'instant. Reviens plus tard ou continue d'apprendre de nouveaux mots.</p>
      </div>
    `;
  } else {
    html += `
      <div class="card center mb">
        <div class="h1" style="color: var(--pink); font-size: 48px;">${count}</div>
        <div class="h3 mt-s">Cartes à réviser</div>
        <p class="muted small mt-s">Ton algorithme de répétition espacée a préparé ${count} mot${count > 1 ? 's' : ''} pour toi.</p>
        <button class="btn btn-primary btn-block mt" onclick="location.hash='#/flashcards'" style="margin-top: 24px;">Commencer la session</button>
      </div>
    `;
  }
  
  return html;
}
