// Centre de révision : Répétition espacée (SRS) et Flashcards aléatoires selon la maîtrise
import { state } from '../store.js';
import { getDueCards, getAllCards, mastery } from '../srs.js';

export default async function render() {
  const allCards = getAllCards();
  const dueCards = getDueCards();
  const dueCount = dueCards.length;

  // Breakdown by mastery
  const counts = { new: 0, learning: 0, known: 0, mastered: 0 };
  allCards.forEach(c => {
    const m = mastery(c.ru);
    if (counts[m] !== undefined) counts[m]++;
  });

  return `
    <header class="topbar" style="margin-bottom: 16px;">
      <div class="row-between" style="width: 100%;">
        <div class="display" style="font-size: 22px; font-weight: 800;">Révisions</div>
        <div class="chip" style="background: rgba(255, 95, 138, 0.15); color: var(--pink); border: 1px solid rgba(255, 95, 138, 0.3);">
          ${dueCount} à réviser
        </div>
      </div>
    </header>

    <!-- Carte principale Due -->
    <div class="card center mb" style="background: linear-gradient(135deg, rgba(255, 95, 138, 0.15), rgba(123, 92, 255, 0.15)); border: 1px solid var(--border-2); padding: 28px 20px;">
      <div style="font-size: 54px; font-weight: 800; font-family: var(--font-display); background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
        ${dueCount}
      </div>
      <div class="h3" style="font-size: 18px; margin-top: 4px;">Cartes prêtes à réviser</div>
      <p class="small dim" style="max-width: 85%; margin: 8px auto 20px;">
        ${dueCount > 0 
          ? "Ton algorithme de répétition espacée te propose ces cartes pour fixer la mémoire à long terme."
          : "Toutes tes cartes dues sont révisées ! Tu peux lancer des flashcards aléatoires pour t'entraîner."
        }
      </p>

      <div class="stack" style="gap: 10px; max-width: 320px; margin: 0 auto; width: 100%;">
        <button class="btn btn-primary btn-block" onclick="location.hash='#/flashcards?mode=smart'" style="padding: 14px; font-weight: 700; border-radius: 14px;">
          ⚡ Session intelligente (SRS)
        </button>

        <button class="btn btn-secondary btn-block" onclick="location.hash='#/flashcards?mode=random'" style="padding: 14px; font-weight: 700; border-radius: 14px;">
          🎲 Flashcards aléatoires (selon maîtrise)
        </button>
      </div>
    </div>

    <!-- Statistiques de maîtrise du vocabulaire -->
    <div class="section-title" style="margin-bottom: 12px;">
      <h3 class="h3" style="font-size: 16px; font-weight: 700;">État de maîtrise du vocabulaire (${allCards.length} mots)</h3>
    </div>

    <div class="grid-2" style="gap: 10px;">
      <div class="card" style="padding: 14px; background: var(--surface); border: 1px solid var(--border);">
        <div class="row-between">
          <span class="small dim">À revoir</span>
          <span style="font-size: 18px; font-weight: 800; color: var(--red);">${counts.learning}</span>
        </div>
        <div class="tiny dim" style="margin-top: 4px;">Poids élevé en révision</div>
      </div>

      <div class="card" style="padding: 14px; background: var(--surface); border: 1px solid var(--border);">
        <div class="row-between">
          <span class="small dim">Nouveaux</span>
          <span style="font-size: 18px; font-weight: 800; color: var(--blue);">${counts.new}</span>
        </div>
        <div class="tiny dim" style="margin-top: 4px;">À découvrir</div>
      </div>

      <div class="card" style="padding: 14px; background: var(--surface); border: 1px solid var(--border);">
        <div class="row-between">
          <span class="small dim">En cours / Acquis</span>
          <span style="font-size: 18px; font-weight: 800; color: var(--gold);">${counts.known}</span>
        </div>
        <div class="tiny dim" style="margin-top: 4px;">Mémoire moyenne</div>
      </div>

      <div class="card" style="padding: 14px; background: var(--surface); border: 1px solid var(--border);">
        <div class="row-between">
          <span class="small dim">Maîtrisés</span>
          <span style="font-size: 18px; font-weight: 800; color: var(--green);">${counts.mastered}</span>
        </div>
        <div class="tiny dim" style="margin-top: 4px;">Mémoire long terme</div>
      </div>
    </div>

    <!-- Explication pédagogique -->
    <div class="card mt" style="background: rgba(0,0,0,0.25); border: 1px dashed var(--border-2); padding: 14px 16px; margin-top: 18px;">
      <div class="row" style="gap: 10px; align-items: flex-start;">
        <span style="font-size: 22px;">💡</span>
        <div class="small dim" style="line-height: 1.5;">
          <strong>Comment ça marche ?</strong> Le mode aléatoire tire les mots avec un poids inverse à leur maîtrise : les mots difficiles ou signalés « À revoir » reviennent beaucoup plus fréquemment jusqu'à être assimilés.
        </div>
      </div>
    </div>
  `;
}
