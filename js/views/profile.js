// Profil de l'apprenant, Statistiques, Réglages audio, et Guide d'installation hors-ligne
import { state, save, resetAll, exportData, importData } from '../store.js';
import { getAllCards } from '../srs.js';
import { speak, supported } from '../tts.js';

export default async function render() {
  const cardsCount = getAllCards().length;
  const completedUnits = Object.keys(state.units || {}).filter(k => state.units[k]?.status === 'completed').length;

  window.app = window.app || {};
  window.app.setRate = (r) => {
    state.settings.rate = r;
    save();
    speak('Приве́т! Как дела́?');
    const viewRoot = document.getElementById('view');
    if (viewRoot) render().then(h => viewRoot.innerHTML = h);
  };
  window.app.confirmReset = () => {
    if (confirm('Es-tu sûr de vouloir réinitialiser toute ta progression ? Cette action est irréversible.')) {
      resetAll();
      location.hash = '#/';
      location.reload();
    }
  };
  window.app.exportSave = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportData());
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `ruska_sauvegarde_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
  };

  return `
    <header class="topbar" style="margin-bottom: 16px;">
      <div class="display" style="font-size: 22px; font-weight: 800;">Profil & Réglages</div>
    </header>

    <div class="stack" style="gap: 16px;">
      <!-- Carte Série et XP -->
      <div class="card center" style="background: linear-gradient(135deg, rgba(255, 195, 92, 0.15), rgba(255, 95, 138, 0.15)); border: 1px solid var(--border-2); padding: 24px 20px;">
        <div style="font-size: 48px; margin-bottom: 4px;">🔥</div>
        <div class="h1" style="font-size: 32px; font-weight: 800;">${state.streak?.count || 1} jours</div>
        <p class="muted small" style="margin-top: 4px;">Série de jours consécutifs</p>
      </div>

      <!-- Statistiques 4 cases -->
      <div class="grid-2" style="gap: 10px;">
        <div class="card center" style="padding: 16px; background: var(--surface); border: 1px solid var(--border);">
          <div class="h2" style="color: var(--gold); font-size: 26px; font-weight: 800;">${state.xp || 0}</div>
          <div class="tiny dim" style="margin-top: 4px; font-weight: 700;">XP TOTAL</div>
        </div>

        <div class="card center" style="padding: 16px; background: var(--surface); border: 1px solid var(--border);">
          <div class="h2" style="color: var(--teal); font-size: 26px; font-weight: 800;">${cardsCount}</div>
          <div class="tiny dim" style="margin-top: 4px; font-weight: 700;">MOTS DANS LE SRS</div>
        </div>

        <div class="card center" style="padding: 16px; background: var(--surface); border: 1px solid var(--border);">
          <div class="h2" style="color: var(--green); font-size: 26px; font-weight: 800;">${completedUnits}</div>
          <div class="tiny dim" style="margin-top: 4px; font-weight: 700;">UNITÉS TERMINÉES</div>
        </div>

        <div class="card center" style="padding: 16px; background: var(--surface); border: 1px solid var(--border);">
          <div class="h2" style="color: var(--violet); font-size: 26px; font-weight: 800;">${state.level || 'A0'}</div>
          <div class="tiny dim" style="margin-top: 4px; font-weight: 700;">NIVEAU ACTUEL</div>
        </div>
      </div>

      <!-- Réglages Audio -->
      <div class="section-title mt" style="margin-top: 8px;">
        <h3 class="h3" style="font-size: 16px; font-weight: 700;">Prononciation & Audio</h3>
      </div>

      <div class="card" style="padding: 16px; background: var(--surface); border: 1px solid var(--border);">
        <div class="row-between" style="margin-bottom: 12px;">
          <div>
            <div style="font-weight: 700; font-size: 15px;">Vitesse de parole</div>
            <div class="tiny dim">Ajuste la vitesse pour mieux décomposer les sons</div>
          </div>
          <button class="btn btn-sm" onclick="app.speak('Приве́т!')" style="background: rgba(123,92,255,0.2); color: var(--violet); padding: 4px 10px; border-radius: 8px;">
            Tester 🔊
          </button>
        </div>

        <div class="row" style="gap: 8px;">
          <button class="btn btn-sm ${state.settings?.rate === 0.65 ? 'btn-primary' : 'btn-secondary'}" onclick="app.setRate(0.65)" style="flex: 1; border-radius: 10px;">
            Lente (0.65x)
          </button>
          <button class="btn btn-sm ${(!state.settings?.rate || state.settings?.rate === 0.85) ? 'btn-primary' : 'btn-secondary'}" onclick="app.setRate(0.85)" style="flex: 1; border-radius: 10px;">
            Normale (0.85x)
          </button>
          <button class="btn btn-sm ${state.settings?.rate === 1.0 ? 'btn-primary' : 'btn-secondary'}" onclick="app.setRate(1.0)" style="flex: 1; border-radius: 10px;">
            Rapide (1.0x)
          </button>
        </div>
      </div>

      <!-- Installation Hors-ligne (iPhone / Android) -->
      <div class="section-title mt" style="margin-top: 8px;">
        <h3 class="h3" style="font-size: 16px; font-weight: 700;">📱 Installer sur son téléphone (100% hors-ligne)</h3>
      </div>

      <div class="card" style="padding: 18px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-2); border-radius: var(--radius-sm);">
        <div class="stack" style="gap: 12px; font-size: 14px; line-height: 1.5; color: var(--text-2);">
          <div style="color: #fff; font-weight: 700;">Cette application est une PWA autonome conçue pour fonctionner sans internet.</div>
          
          <div style="background: rgba(255,255,255,0.04); padding: 12px; border-radius: 10px;">
            <strong style="color: var(--teal);">Sur iPhone / iPad (Safari) :</strong>
            <ol style="margin: 6px 0 0 18px; padding: 0;">
              <li>Ouvre le lien dans <strong>Safari</strong>.</li>
              <li>Touche le bouton <strong>Partager</strong> (<svg viewBox="0 0 24 24" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"><path fill="none" stroke="currentColor" stroke-width="2" d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg> en bas de l'écran).</li>
              <li>Fais défiler et sélectionne <strong>« Sur l'écran d'accueil »</strong>.</li>
              <li>L'icône Ruska apparaît comme une vraie application native !</li>
            </ol>
          </div>

          <div style="background: rgba(255,255,255,0.04); padding: 12px; border-radius: 10px;">
            <strong style="color: var(--green);">Sur Android (Chrome) :</strong>
            <ol style="margin: 6px 0 0 18px; padding: 0;">
              <li>Ouvre le lien dans <strong>Chrome</strong>.</li>
              <li>Touche le menu <strong>⋮</strong> en haut à droite.</li>
              <li>Sélectionne <strong>« Installer l'application »</strong> ou « Ajouter à l'écran d'accueil ».</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Gestion des données -->
      <div class="section-title mt" style="margin-top: 8px;">
        <h3 class="h3" style="font-size: 16px; font-weight: 700;">Sauvegarde & Progression</h3>
      </div>

      <div class="stack" style="gap: 8px;">
        <button class="btn btn-secondary btn-block" onclick="app.exportSave()" style="padding: 12px; font-size: 14px; border-radius: 12px;">
          💾 Exporter ma progression (JSON)
        </button>

        <button class="btn btn-danger btn-block" onclick="app.confirmReset()" style="padding: 12px; font-size: 14px; border-radius: 12px;">
          ⚠️ Réinitialiser toute la progression
        </button>
      </div>
    </div>
  `;
}
