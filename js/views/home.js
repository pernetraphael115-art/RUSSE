import { state } from '../store.js';
import { LEVELS } from '../data/levels.js';
import a0Units from '../data/units_a0.js';

export default async function render() {
  const levelData = LEVELS.find(l => l.id === state.level) || LEVELS[0];
  const units = state.level === 'A0' ? a0Units : [];
  
  let html = `
    <div class="topbar">
      <div class="title display" style="font-size: 22px;">Ruska</div>
    </div>
    
    <div class="card hero mb">
      <div class="stack">
        <div class="row">
          <div class="lv-badge" style="--lv: ${levelData.color}">${levelData.id}</div>
          <span class="eyebrow" style="color: rgba(255,255,255,0.7)">Niveau actuel</span>
        </div>
        <div class="h2">${levelData.name}</div>
        <p class="small" style="color: rgba(255,255,255,0.85); max-width: 80%;">${levelData.desc}</p>
      </div>
    </div>
    
    <div class="section-title">
      <h3 class="h3">Parcours</h3>
    </div>
    
    <div class="stack">
  `;
  
  units.forEach((unit, index) => {
    const unitState = state.units[unit.id] || { status: 'locked' };
    const isLocked = unitState.status === 'locked' && index > 0 && (state.units[units[index-1].id]?.status !== 'completed'); // basic unlock logic
    
    html += `
      <a href="#/unit?id=${unit.id}" class="card tap ${isLocked ? 'locked' : ''}" style="opacity: ${isLocked ? '0.5' : '1'}; pointer-events: ${isLocked ? 'none' : 'auto'}">
        <div class="row">
          <div class="tile-icon">${unit.icon}</div>
          <div class="grow">
            <div class="h3">${unit.title}</div>
            <div class="small dim">${unit.sub}</div>
          </div>
          ${unitState.status === 'completed' ? '<svg class="chev" style="color: var(--green);" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>' : '<svg class="chev" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>'}
        </div>
      </a>
    `;
  });
  
  html += `</div>`;
  
  return html;
}
