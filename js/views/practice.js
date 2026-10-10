// Pratique interactive : Traduction intelligente, Entraîneur d'alphabet, et Écoute
import { state, addXP, save } from '../store.js';
import { ALPHABET, ALPHA_CATS, LEVELS, getAllSentences } from '../data/content.js';
import { speak } from '../tts.js';
import { normFr, compareAnswer, md } from '../text.js';

let activeSubView = 'hub'; // 'hub' | 'translate' | 'alphabet' | 'listening'
let selectedLevel = 'A0';
let currentSentenceIndex = 0;

export default async function render() {
  window.app = window.app || {};
  window.app.setPracticeView = (view, lvl) => {
    activeSubView = view;
    if (lvl) selectedLevel = lvl;
    currentSentenceIndex = 0;
    const viewRoot = document.getElementById('view');
    if (viewRoot) {
      render().then(html => { viewRoot.innerHTML = html; });
    }
  };
  window.app.speak = speak;

  if (activeSubView === 'translate') {
    return renderTranslateModule();
  } else if (activeSubView === 'alphabet') {
    return renderAlphabetModule();
  } else if (activeSubView === 'listening') {
    return renderListeningModule();
  }

  return renderHub();
}

function renderHub() {
  return `
    <header class="topbar" style="margin-bottom: 16px;">
      <div class="display" style="font-size: 22px; font-weight: 800;">Pratique & Entraînement</div>
    </header>

    <div class="stack" style="gap: 14px;">
      <!-- Module 1 : Traduction intelligente -->
      <div class="card tap" onclick="app.setPracticeView('translate', '${state.level || 'A0'}')" style="padding: 20px; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--border);">
        <div class="row" style="gap: 16px; align-items: flex-start;">
          <div class="tile-icon" style="font-size: 28px; width: 54px; height: 54px; border-radius: 16px; background: rgba(123, 92, 255, 0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            ✍️
          </div>
          <div class="grow">
            <div class="row-between">
              <span class="tiny" style="color: var(--violet); font-weight: 700; text-transform: uppercase;">Traduction intelligente</span>
              <span class="chip" style="background: rgba(123,92,255,0.15); color: var(--violet); font-size: 11px;">Tous niveaux</span>
            </div>
            <div class="h3" style="font-size: 18px; font-weight: 700; margin: 4px 0 6px;">Atelier de traduction expliquée</div>
            <p class="small dim" style="line-height: 1.4;">
              Traduis des phrases réelles. Reçois une correction intelligente avec explication de chaque mot et chaque règle de grammaire.
            </p>
          </div>
        </div>
      </div>

      <!-- Module 2 : Entraîneur d'alphabet -->
      <div class="card tap" onclick="app.setPracticeView('alphabet')" style="padding: 20px; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--border);">
        <div class="row" style="gap: 16px; align-items: flex-start;">
          <div class="tile-icon" style="font-size: 28px; width: 54px; height: 54px; border-radius: 16px; background: rgba(47, 214, 195, 0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            🔤
          </div>
          <div class="grow">
            <div class="row-between">
              <span class="tiny" style="color: var(--teal); font-weight: 700; text-transform: uppercase;">Alphabet cyrillique</span>
              <span class="chip" style="background: rgba(47,214,195,0.15); color: var(--teal); font-size: 11px;">33 lettres</span>
            </div>
            <div class="h3" style="font-size: 18px; font-weight: 700; margin: 4px 0 6px;">Entraîneur de lecture & sons</div>
            <p class="small dim" style="line-height: 1.4;">
              Écoute, compare les 4 familles de lettres (identiques, faux amis, nouvelles, signes) et entraîne ta prononciation.
            </p>
          </div>
        </div>
      </div>

      <!-- Module 3 : Écoute et dictée -->
      <div class="card tap" onclick="app.setPracticeView('listening')" style="padding: 20px; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--border);">
        <div class="row" style="gap: 16px; align-items: flex-start;">
          <div class="tile-icon" style="font-size: 28px; width: 54px; height: 54px; border-radius: 16px; background: rgba(255, 195, 92, 0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            🎧
          </div>
          <div class="grow">
            <div class="row-between">
              <span class="tiny" style="color: var(--gold); font-weight: 700; text-transform: uppercase;">Compréhension orale</span>
              <span class="chip" style="background: rgba(255,195,92,0.15); color: var(--gold); font-size: 11px;">Audio natif</span>
            </div>
            <div class="h3" style="font-size: 18px; font-weight: 700; margin: 4px 0 6px;">Écoute & Reconstitution</div>
            <p class="small dim" style="line-height: 1.4;">
              Entraîne ton oreille : écoute une phrase russe et devine son sens pour fluidifier ton écoute.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// MODULE TRADUCTION INTELLIGENTE
// ─────────────────────────────────────────────────────────────
function renderTranslateModule() {
  const allSentences = getAllSentences();
  const filtered = selectedLevel 
    ? allSentences.filter(s => s.level === selectedLevel)
    : allSentences;

  const sentences = filtered.length ? filtered : allSentences;
  const sentence = sentences[currentSentenceIndex % sentences.length];

  window.app.evalTranslation = () => {
    const input = document.getElementById('tr-user-input')?.value || '';
    const accepted = [sentence.fr, ...(sentence.alt || [])];
    const res = compareAnswer(input, accepted, normFr);

    const box = document.getElementById('tr-eval-box');
    if (!box) return;

    if (res.status === 'ok' || res.status === 'near') {
      addXP(15);
      box.innerHTML = `
        <div style="background: rgba(61, 220, 151, 0.15); border: 1px solid var(--green); border-radius: 14px; padding: 16px; margin-top: 14px;">
          <div class="row" style="gap: 8px; color: var(--green); font-weight: 700; margin-bottom: 8px;">
            <span>✓</span> <span>${res.status === 'near' ? 'Presque parfait (légère approximation tolérée) !' : 'Excellente traduction ! (+15 XP)'}</span>
          </div>
          <div style="font-size: 16px; color: #fff; font-weight: 600;"><strong>Traduction correcte :</strong> ${sentence.fr}</div>

          <!-- Décomposition mot par mot -->
          <div style="margin-top: 14px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;">
            <div class="tiny dim" style="text-transform: uppercase; font-weight: 700; margin-bottom: 8px;">Explication de chaque mot :</div>
            <div class="stack" style="gap: 6px;">
              ${(sentence.w || []).map(([wRu, wFr, wExpl]) => `
                <div class="row-between" style="font-size: 13.5px; background: rgba(0,0,0,0.25); padding: 7px 12px; border-radius: 8px;">
                  <span class="ru-inline" data-say="${wRu}" style="color: var(--teal); font-weight: 700;">${wRu}</span>
                  <span class="dim">${wFr}</span>
                  <span class="tiny muted">${wExpl}</span>
                </div>
              `).join('')}
            </div>
          </div>

          ${sentence.g ? `
            <div style="margin-top: 12px; font-size: 13.5px; background: rgba(123,92,255,0.18); border-radius: 10px; padding: 10px 12px; color: #e5dcff; line-height: 1.4;">
              🧠 <strong>Règle de grammaire appliquée :</strong> ${sentence.g}
            </div>
          ` : ''}

          <button class="btn btn-primary btn-block mt" onclick="app.nextTranslateSentence(${sentences.length})" style="margin-top: 14px; padding: 12px; font-weight: 700;">
            Phrase suivante →
          </button>
        </div>
      `;
    } else {
      box.innerHTML = `
        <div style="background: rgba(255, 92, 114, 0.15); border: 1px solid var(--red); border-radius: 14px; padding: 16px; margin-top: 14px;">
          <div class="row" style="gap: 8px; color: var(--red); font-weight: 700; margin-bottom: 8px;">
            <span>✗</span> <span>Traduction à corriger</span>
          </div>
          <div style="font-size: 16px; color: #fff;"><strong>Traduction attendue :</strong> ${sentence.fr}</div>

          <!-- Décomposition mot par mot -->
          <div style="margin-top: 14px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;">
            <div class="tiny dim" style="text-transform: uppercase; font-weight: 700; margin-bottom: 8px;">Décomposition :</div>
            <div class="stack" style="gap: 6px;">
              ${(sentence.w || []).map(([wRu, wFr, wExpl]) => `
                <div class="row-between" style="font-size: 13.5px; background: rgba(0,0,0,0.25); padding: 7px 12px; border-radius: 8px;">
                  <span class="ru-inline" data-say="${wRu}" style="color: var(--teal); font-weight: 700;">${wRu}</span>
                  <span class="dim">${wFr}</span>
                  <span class="tiny muted">${wExpl}</span>
                </div>
              `).join('')}
            </div>
          </div>

          ${sentence.g ? `
            <div style="margin-top: 12px; font-size: 13.5px; color: #ffccd4;">
              🧠 <strong>Règle :</strong> ${sentence.g}
            </div>
          ` : ''}

          <button class="btn btn-secondary btn-block mt" onclick="app.nextTranslateSentence(${sentences.length})" style="margin-top: 14px; padding: 12px; font-weight: 700;">
            Passer à la suivante
          </button>
        </div>
      `;
    }
  };

  window.app.nextTranslateSentence = (total) => {
    currentSentenceIndex = (currentSentenceIndex + 1) % total;
    const viewRoot = document.getElementById('view');
    if (viewRoot) {
      render().then(html => { viewRoot.innerHTML = html; });
    }
  };

  return `
    <header class="topbar" style="margin-bottom: 14px;">
      <div class="row-between" style="width: 100%;">
        <button class="icon-btn" onclick="app.setPracticeView('hub')" style="background: var(--surface); width: 38px; height: 38px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
          <svg viewBox="0 0 24 24" style="width: 20px; height: 20px;"><path fill="none" stroke="currentColor" stroke-width="2.5" d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style="text-align: center;">
          <div class="h3" style="font-size: 16px; font-weight: 700;">Traduction intelligente</div>
          <div class="tiny dim">Niveau ${sentence.level || 'A0'} · Phrase ${currentSentenceIndex + 1}/${sentences.length}</div>
        </div>
        <div style="width: 38px;"></div>
      </div>
    </header>

    <!-- Filtre de niveaux pour la traduction -->
    <div style="margin-bottom: 14px; display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px;">
      ${LEVELS.map(lvl => `
        <button class="btn btn-sm ${lvl.id === selectedLevel ? 'btn-primary' : 'btn-secondary'}" onclick="app.setPracticeView('translate', '${lvl.id}')" style="padding: 5px 12px; font-size: 12px; border-radius: 999px;">
          ${lvl.id}
        </button>
      `).join('')}
    </div>

    <!-- Carte de la phrase -->
    <div class="card" style="padding: 22px 18px; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--border-2); box-shadow: var(--shadow);">
      <div class="row-between" style="margin-bottom: 12px;">
        <span class="chip" style="background: rgba(123,92,255,0.15); color: var(--violet); font-size: 11px;">Russe → Français</span>
        <button class="say sm" data-say="${sentence.ru}" style="color: var(--teal); background: rgba(47, 214, 195, 0.15); width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <svg viewBox="0 0 24 24" style="width: 18px; height: 18px;"><polygon fill="currentColor" points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path fill="none" stroke="currentColor" stroke-width="2" d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        </button>
      </div>

      <div class="ru ru-big" style="font-size: 26px; font-weight: 800; color: #fff; line-height: 1.3; margin-bottom: 16px;">
        ${sentence.ru}
      </div>

      <div class="stack" style="gap: 10px;">
        <input type="text" id="tr-user-input" placeholder="Tape ta traduction en français..." style="
          width: 100%;
          background: rgba(0,0,0,0.3);
          border: 1px solid var(--border-2);
          color: #fff;
          padding: 14px 16px;
          border-radius: 14px;
          font-size: 16px;
        " onkeydown="if(event.key==='Enter') app.evalTranslation()">

        <button class="btn btn-primary btn-block" onclick="app.evalTranslation()" style="padding: 14px; font-size: 15px; font-weight: 700; border-radius: 14px;">
          ✓ Valider & Analyser la phrase
        </button>
      </div>

      <div id="tr-eval-box"></div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// MODULE ENTRAÎNEUR D'ALPHABET CYRILLIQUE
// ─────────────────────────────────────────────────────────────
function renderAlphabetModule() {
  return `
    <header class="topbar" style="margin-bottom: 14px;">
      <div class="row-between" style="width: 100%;">
        <button class="icon-btn" onclick="app.setPracticeView('hub')" style="background: var(--surface); width: 38px; height: 38px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
          <svg viewBox="0 0 24 24" style="width: 20px; height: 20px;"><path fill="none" stroke="currentColor" stroke-width="2.5" d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style="text-align: center;">
          <div class="h3" style="font-size: 16px; font-weight: 700;">L'Alphabet Cyrillique</div>
          <div class="tiny dim">Les 33 lettres avec audio</div>
        </div>
        <div style="width: 38px;"></div>
      </div>
    </header>

    <!-- Légende des 4 familles -->
    <div class="card mb" style="padding: 12px 14px; background: rgba(0,0,0,0.25); border: 1px solid var(--border); border-radius: 14px;">
      <div class="tiny dim" style="margin-bottom: 8px; font-weight: 700; text-transform: uppercase;">Les 4 familles de lettres :</div>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${Object.keys(ALPHA_CATS).map(k => `
          <div class="chip" style="background: rgba(255,255,255,0.06); color: ${ALPHA_CATS[k].color}; font-size: 12px; border: 1px solid ${ALPHA_CATS[k].color}44;">
            ● ${ALPHA_CATS[k].label}
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Grille des 33 lettres -->
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px;">
      ${ALPHABET.map(([upper, lower, name, sound, exRu, exFr, cat]) => {
        const catInfo = ALPHA_CATS[cat] || { color: 'var(--teal)' };
        return `
          <div class="card tap" onclick="app.speak('${upper}')" style="
            padding: 12px 8px;
            text-align: center;
            border-radius: 14px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-top: 3px solid ${catInfo.color};
            transition: transform 0.15s ease;
          ">
            <div class="ru ru-big" style="font-size: 26px; font-weight: 800; color: #fff;">${upper} ${lower}</div>
            <div class="tiny" style="color: ${catInfo.color}; font-weight: 700; margin-top: 2px;">[${sound.split(' ')[0]}]</div>
            <div class="tiny dim" style="margin-top: 4px; font-size: 11px;">${name}</div>
            
            <div style="margin-top: 8px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 6px;">
              <div class="ru ru-inline" data-say="${exRu}" style="font-size: 12px; color: var(--teal); font-weight: 700;">${exRu}</div>
              <div class="tiny dim">${exFr}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// MODULE ÉCOUTE ET RECONSTITUTION
// ─────────────────────────────────────────────────────────────
function renderListeningModule() {
  const allSentences = getAllSentences();
  const sentence = allSentences[currentSentenceIndex % allSentences.length];

  window.app.evalListening = (chosenFr) => {
    const isCorrect = chosenFr === sentence.fr;
    const box = document.getElementById('listen-eval-box');
    if (!box) return;

    if (isCorrect) {
      addXP(15);
      box.innerHTML = `
        <div style="background: rgba(61, 220, 151, 0.15); border: 1px solid var(--green); border-radius: 14px; padding: 14px; margin-top: 14px;">
          <div style="color: var(--green); font-weight: 700; margin-bottom: 6px;">✓ Bravo ! Excellente écoute (+15 XP)</div>
          <div style="font-size: 15px; color: #fff;">${sentence.ru} = <strong>${sentence.fr}</strong></div>
          <button class="btn btn-primary btn-block mt" onclick="app.nextTranslateSentence(${allSentences.length})" style="margin-top: 12px;">Phrase suivante →</button>
        </div>
      `;
    } else {
      box.innerHTML = `
        <div style="background: rgba(255, 92, 114, 0.15); border: 1px solid var(--red); border-radius: 14px; padding: 14px; margin-top: 14px;">
          <div style="color: var(--red); font-weight: 700; margin-bottom: 6px;">✗ Pas tout à fait</div>
          <div style="font-size: 15px; color: #fff;">La phrase était : <strong>${sentence.fr}</strong></div>
          <button class="btn btn-secondary btn-block mt" onclick="app.nextTranslateSentence(${allSentences.length})" style="margin-top: 12px;">Passer →</button>
        </div>
      `;
    }
  };

  // Generate 3 choices (1 correct, 2 decoys)
  const choices = [sentence.fr];
  const otherSentences = allSentences.filter(s => s.fr !== sentence.fr);
  for (let i = 0; i < Math.min(2, otherSentences.length); i++) {
    choices.push(otherSentences[(currentSentenceIndex + i + 1) % otherSentences.length].fr);
  }
  choices.sort(() => Math.random() - 0.5);

  setTimeout(() => {
    speak(sentence.ru);
  }, 100);

  return `
    <header class="topbar" style="margin-bottom: 14px;">
      <div class="row-between" style="width: 100%;">
        <button class="icon-btn" onclick="app.setPracticeView('hub')" style="background: var(--surface); width: 38px; height: 38px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
          <svg viewBox="0 0 24 24" style="width: 20px; height: 20px;"><path fill="none" stroke="currentColor" stroke-width="2.5" d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style="text-align: center;">
          <div class="h3" style="font-size: 16px; font-weight: 700;">Compréhension orale</div>
          <div class="tiny dim">Écoute et choisis le sens</div>
        </div>
        <div style="width: 38px;"></div>
      </div>
    </header>

    <div class="card center" style="padding: 30px 20px; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--border-2);">
      <button class="say" data-say="${sentence.ru}" style="
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--grad);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px;
        box-shadow: var(--shadow-glow);
      ">
        <svg viewBox="0 0 24 24" style="width: 36px; height: 36px;"><polygon fill="currentColor" points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path fill="none" stroke="currentColor" stroke-width="2.5" d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
      </button>

      <div class="small dim">Touche le bouton pour réécouter la phrase</div>

      <div class="stack" style="gap: 10px; width: 100%; margin-top: 24px;">
        ${choices.map(c => `
          <button class="btn btn-secondary btn-block" onclick="app.evalListening('${escape(c)}')" style="padding: 14px 16px; font-size: 15px; font-weight: 600; text-align: left; justify-content: flex-start; border-radius: 12px;">
            ${c}
          </button>
        `).join('')}
      </div>

      <div id="listen-eval-box" style="width: 100%;"></div>
    </div>
  `;
}
