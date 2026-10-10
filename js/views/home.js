// Parcours & progression pédagogique (A0 à C2)
import { state, save } from '../store.js';
import { LEVELS, getUnitsByLevel } from '../data/content.js';

export default async function render() {
  const currentLevelId = state.level || 'A0';
  const levelData = LEVELS.find(l => l.id === currentLevelId) || LEVELS[0];
  const units = getUnitsByLevel(currentLevelId);
  
  // Calculate completed units in this level
  const completedCount = units.filter(u => state.units[u.id]?.status === 'completed').length;
  const progressPct = units.length ? Math.round((completedCount / units.length) * 100) : 0;

  let html = `
    <header class="topbar" style="margin-bottom: 16px;">
      <div class="row-between" style="width: 100%;">
        <div class="row" style="gap: 10px;">
          <span style="font-size: 26px;">🇷🇺</span>
          <div>
            <div class="display" style="font-size: 22px; line-height: 1.1; background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Ruska</div>
            <div class="tiny dim">Russe · Zéro à Bilingue</div>
          </div>
        </div>
        <div class="row" style="gap: 8px;">
          <div class="chip" style="background: rgba(255, 195, 92, 0.15); color: var(--gold); border: 1px solid rgba(255, 195, 92, 0.3);">
            🔥 <strong>${state.streak?.count || 1}</strong> j
          </div>
          <div class="chip" style="background: rgba(123, 92, 255, 0.15); color: var(--violet); border: 1px solid rgba(123, 92, 255, 0.3);">
            ⚡ <strong>${state.xp || 0}</strong> XP
          </div>
        </div>
      </div>
    </header>

    <!-- Sélecteur de niveau -->
    <div style="margin-bottom: 16px;">
      <div class="row" style="gap: 8px; overflow-x: auto; padding-bottom: 6px; -webkit-overflow-scrolling: touch;">
        ${LEVELS.map(lvl => {
          const isSelected = lvl.id === currentLevelId;
          return `
            <button class="btn btn-sm" onclick="app.selectLevel('${lvl.id}')" style="
              background: ${isSelected ? 'var(--grad)' : 'var(--surface)'};
              color: ${isSelected ? '#fff' : 'var(--text-2)'};
              border: 1px solid ${isSelected ? 'transparent' : 'var(--border)'};
              padding: 6px 14px;
              border-radius: 999px;
              white-space: nowrap;
              font-weight: 700;
              font-size: 13px;
              transition: all 0.2s ease;
            ">
              ${lvl.id}
            </button>
          `;
        }).join('')}
      </div>
    </div>
    
    <!-- Hero Card Niveau Actuel -->
    <div class="card hero mb" style="background: linear-gradient(135deg, rgba(123, 92, 255, 0.18), rgba(255, 95, 138, 0.12)); border: 1px solid var(--border-2); padding: 20px;">
      <div class="stack" style="gap: 12px;">
        <div class="row-between">
          <div class="row" style="gap: 10px;">
            <div class="lv-badge" style="--lv: ${levelData.color}; background: ${levelData.color}; color: #000; font-weight: 800; padding: 4px 10px; border-radius: 8px; font-size: 13px;">${levelData.id}</div>
            <span class="eyebrow" style="color: rgba(255,255,255,0.7); font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Niveau sélectionné</span>
          </div>
          <span class="small dim">${completedCount} / ${units.length} terminées</span>
        </div>
        
        <div>
          <div class="h2" style="font-size: 22px; font-weight: 800;">${levelData.name}</div>
          <p class="small" style="color: rgba(255,255,255,0.85); margin-top: 4px;">${levelData.desc}</p>
        </div>

        <!-- Barre de progression -->
        <div style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 999px; overflow: hidden; margin-top: 4px;">
          <div style="background: var(--grad-green); height: 100%; width: ${progressPct}%; transition: width 0.4s ease;"></div>
        </div>
      </div>
    </div>
    
    <div class="section-title row-between" style="margin-bottom: 12px;">
      <h3 class="h3" style="font-size: 17px; font-weight: 700;">Étapes & Leçons</h3>
      <span class="tiny dim">${units.length} unité${units.length > 1 ? 's' : ''}</span>
    </div>
    
    <div class="stack" style="gap: 12px;">
  `;
  
  units.forEach((unit, index) => {
    const unitState = state.units[unit.id] || { status: index === 0 ? 'unlocked' : 'unlocked' };
    const isCompleted = unitState.status === 'completed';
    const wordsCount = unit.words ? unit.words.length : 0;
    const sentCount = unit.sentences ? unit.sentences.length : 0;
    
    html += `
      <a href="#/unit?id=${unit.id}" class="card tap" style="
        display: block;
        padding: 16px;
        border-radius: var(--radius);
        background: var(--surface);
        border: 1px solid ${isCompleted ? 'rgba(61, 220, 151, 0.35)' : 'var(--border)'};
        transition: transform 0.15s ease, background 0.15s ease;
      ">
        <div class="row" style="gap: 14px; align-items: flex-start;">
          <div class="tile-icon" style="
            width: 48px;
            height: 48px;
            border-radius: 14px;
            background: ${isCompleted ? 'rgba(61, 220, 151, 0.15)' : 'rgba(255,255,255,0.06)'};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            flex-shrink: 0;
          ">${unit.icon}</div>
          
          <div class="grow">
            <div class="row-between" style="margin-bottom: 4px;">
              <span class="tiny" style="color: var(--violet); font-weight: 700; text-transform: uppercase;">Étape ${index + 1}</span>
              ${isCompleted ? `
                <span class="chip" style="background: rgba(61, 220, 151, 0.15); color: var(--green); padding: 2px 8px; font-size: 11px;">✓ Terminée</span>
              ` : `
                <span class="chip" style="background: rgba(255,255,255,0.08); color: var(--text-2); padding: 2px 8px; font-size: 11px;">À faire</span>
              `}
            </div>
            
            <div class="h3" style="font-size: 17px; font-weight: 700; margin-bottom: 3px;">${unit.title}</div>
            <div class="small dim" style="margin-bottom: 8px;">${unit.sub}</div>
            
            <div class="row" style="gap: 12px; font-size: 12px; color: var(--text-3);">
              <span>📖 Cours complet</span>
              ${wordsCount ? `<span>🗂️ ${wordsCount} mots</span>` : ''}
              ${sentCount ? `<span>✍️ ${sentCount} phrases</span>` : ''}
            </div>
          </div>
          
          <div style="color: var(--text-3); align-self: center;">
            <svg class="chev" style="width: 20px; height: 20px;" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>
      </a>
    `;
  });
  
  html += `
    </div>

    <!-- Bannière motivation -->
    <div class="card mt-l" style="margin-top: 24px; background: rgba(0,0,0,0.25); border: 1px dashed var(--border-2); padding: 16px; text-align: center;">
      <div class="small dim">Astuce : Touche n'importe quel mot cyrillique en violet dans les leçons pour entendre sa prononciation audio !</div>
    </div>
  `;

  // Attach global level change handler
  window.app = window.app || {};
  window.app.selectLevel = (lvlId) => {
    state.level = lvlId;
    save();
    window.location.hash = '#/';
    // Force rerender
    const viewRoot = document.getElementById('view');
    if (viewRoot) {
      render().then(h => { viewRoot.innerHTML = h; });
    }
  };
  
  return html;
}
