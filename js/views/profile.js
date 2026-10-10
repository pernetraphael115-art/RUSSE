import { state } from '../store.js';

export default async function render() {
  return `
    <div class="topbar">
      <div class="title h2">Profil</div>
    </div>
    
    <div class="stack">
      <div class="card center mb">
        <div style="font-size: 56px; margin-bottom: 8px;">🔥</div>
        <div class="h1">${state.streak} jours</div>
        <p class="muted small mt-s">Série en cours !</p>
      </div>
      
      <div class="grid-2">
        <div class="card center">
          <div class="h2" style="color: var(--gold);">${state.xp}</div>
          <div class="tiny dim mt-s">XP TOTAL</div>
        </div>
        <div class="card center">
          <div class="h2" style="color: var(--teal);">${Object.keys(state.srs).length}</div>
          <div class="tiny dim mt-s">MOTS APPRIS</div>
        </div>
      </div>
      
      <div class="section-title mt">
        <h3 class="h3">Paramètres</h3>
      </div>
      
      <div class="card-list">
        <div class="list-item tap" onclick="alert('Réinitialiser ?')">
          <div class="grow">Réinitialiser la progression</div>
          <svg class="chev" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>
    </div>
  `;
}
