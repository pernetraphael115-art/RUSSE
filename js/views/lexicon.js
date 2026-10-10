import { state } from '../store.js';

export default async function render() {
  const vocabIds = Object.keys(state.srs);
  
  let html = `
    <div class="topbar">
      <div class="title h2">Lexique</div>
    </div>
    
    <div class="card mb">
      <div class="row-between">
        <div class="h3">Mots appris</div>
        <div class="h2" style="color: var(--teal);">${vocabIds.length}</div>
      </div>
    </div>
  `;
  
  if (vocabIds.length === 0) {
    html += `
      <div class="stack center mt-l">
        <p class="muted">Tu n'as pas encore appris de mots. Commence une leçon pour remplir ton lexique !</p>
      </div>
    `;
  } else {
    // Basic list for now, we'll need to fetch actual words from data
    html += `
      <div class="card-list">
        ${vocabIds.slice(0, 50).map(id => `
          <div class="list-item" style="padding: 12px 16px;">
            <div class="grow">
              <div class="h3">${id}</div>
              <div class="small dim">Niveau de maîtrise : ${state.srs[id].lvl || 0}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  return html;
}
