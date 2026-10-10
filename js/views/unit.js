// Vue détaillée d'une unité : Leçon de grammaire, Vocabulaire avec exemples, et Traduction expliquée
import { state, save, addXP } from '../store.js';
import { md, normFr, compareAnswer } from '../text.js';
import { speak, say } from '../tts.js';
import { getUnitById } from '../data/content.js';
import { addCard } from '../srs.js';

let activeTab = 'lesson'; // 'lesson' | 'vocab' | 'sentences'
let currentUnit = null;
let currentSentenceIdx = 0;

export default async function render(path) {
  const hashPart = window.location.hash.split('?')[1] || '';
  const urlParams = new URLSearchParams(hashPart);
  const unitId = urlParams.get('id');
  
  if (!unitId) {
    return `
      <div class="stack center mt-l" style="padding-top: 40px;">
        <div class="h2">Unité introuvable</div>
        <p class="muted">Sélectionne une unité depuis le parcours.</p>
        <button class="btn btn-primary mt" onclick="location.hash='#/'">Retour au parcours</button>
      </div>
    `;
  }
  
  currentUnit = getUnitById(unitId);
  if (!currentUnit) {
    return `
      <div class="stack center mt-l" style="padding-top: 40px;">
        <div class="h2">Leçon introuvable</div>
        <button class="btn btn-primary mt" onclick="location.hash='#/'">Retour</button>
      </div>
    `;
  }

  const isCompleted = state.units[unitId]?.status === 'completed';
  const wordsCount = currentUnit.words?.length || 0;
  const sentCount = currentUnit.sentences?.length || 0;

  let html = `
    <header class="topbar" style="margin-bottom: 12px;">
      <div class="row-between" style="width: 100%;">
        <button class="icon-btn" onclick="history.back()" aria-label="Retour" style="background: var(--surface); width: 38px; height: 38px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
          <svg viewBox="0 0 24 24" style="width: 20px; height: 20px;"><path fill="none" stroke="currentColor" stroke-width="2.5" d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div style="text-align: center; max-width: 65%;">
          <div class="tiny dim" style="text-transform: uppercase; letter-spacing: 0.5px;">Niveau ${currentUnit.level || 'A0'}</div>
          <div class="h3 truncate" style="font-size: 16px; font-weight: 700;">${currentUnit.icon} ${currentUnit.title}</div>
        </div>
        <div>
          ${isCompleted ? '<span class="chip" style="background: rgba(61,220,151,0.2); color: var(--green); font-size: 11px;">✓ Fait</span>' : '<span style="width: 38px; display: inline-block;"></span>'}
        </div>
      </div>
    </header>

    <!-- Onglets de l'unité -->
    <div style="display: flex; gap: 8px; margin-bottom: 16px; border-bottom: 1px solid var(--border); padding-bottom: 8px;">
      <button class="btn btn-sm ${activeTab === 'lesson' ? 'btn-primary' : 'btn-secondary'}" onclick="app.setUnitTab('lesson')" style="flex: 1; padding: 8px 6px; font-size: 13px;">
        📖 Cours (${currentUnit.lesson?.length || 0})
      </button>
      <button class="btn btn-sm ${activeTab === 'vocab' ? 'btn-primary' : 'btn-secondary'}" onclick="app.setUnitTab('vocab')" style="flex: 1; padding: 8px 6px; font-size: 13px;">
        🗂️ Vocabulaire (${wordsCount})
      </button>
      ${sentCount > 0 ? `
        <button class="btn btn-sm ${activeTab === 'sentences' ? 'btn-primary' : 'btn-secondary'}" onclick="app.setUnitTab('sentences')" style="flex: 1; padding: 8px 6px; font-size: 13px;">
          ✍️ Phrases (${sentCount})
        </button>
      ` : ''}
    </div>

    <div id="unit-content">
      ${renderTabContent(activeTab)}
    </div>
  `;

  // Attach app namespace methods
  window.app = window.app || {};
  window.app.speak = speak;
  window.app.setUnitTab = (tab) => {
    activeTab = tab;
    const content = document.getElementById('unit-content');
    if (content) {
      content.innerHTML = renderTabContent(tab);
    }
  };

  window.app.checkQuiz = (qid, selected, correct, expRaw) => {
    const box = document.getElementById(`q-${qid}`);
    if (!box) return;
    const btns = box.querySelectorAll('button');
    btns.forEach((b, i) => {
      b.disabled = true;
      if (i === correct) {
        b.style.background = 'var(--grad-green)';
        b.style.color = '#fff';
      } else if (i === selected) {
        b.style.background = 'var(--red)';
        b.style.color = '#fff';
      }
    });
    const expBox = box.querySelector('.exp-box');
    if (expBox) {
      expBox.innerHTML = decodeURIComponent(expRaw);
      expBox.style.display = 'block';
    }
    // XP reward
    if (selected === correct) addXP(5);
  };

  window.app.finishUnit = () => {
    state.units[unitId] = { status: 'completed' };
    addXP(50);
    
    // Auto-add unit words to SRS flashcards
    if (currentUnit && currentUnit.words) {
      currentUnit.words.forEach(w => {
        addCard(w[0], w[1], w[3], w[2], (w[4] || []).map(e => ({ ru: e[0], fr: e[1], note: e[2] })));
      });
    }
    
    save();
    alert('🎉 Félicitations ! Unité terminée (+50 XP). Le vocabulaire a été ajouté à tes révisions.');
    window.location.hash = '#/';
  };

  // Sentences translation interactive handler
  window.app.checkSentenceAnswer = (sentIdx) => {
    const s = currentUnit.sentences[sentIdx];
    if (!s) return;
    const input = document.getElementById(`sent-input-${sentIdx}`)?.value || '';
    const accepted = [s.fr, ...(s.alt || [])];
    const res = compareAnswer(input, accepted, normFr);

    const feedbackBox = document.getElementById(`sent-feedback-${sentIdx}`);
    if (!feedbackBox) return;

    if (res.status === 'ok' || res.status === 'near') {
      addXP(10);
      feedbackBox.innerHTML = `
        <div style="background: rgba(61, 220, 151, 0.15); border: 1px solid var(--green); border-radius: 12px; padding: 14px; margin-top: 12px;">
          <div class="row" style="gap: 8px; color: var(--green); font-weight: 700; margin-bottom: 6px;">
            <span>✓</span> <span>${res.status === 'near' ? 'Presque parfait (petite faute tolérée) !' : 'Excellente traduction ! (+10 XP)'}</span>
          </div>
          <div class="small" style="color: #fff;"><strong>Traduction :</strong> ${s.fr}</div>
          
          <!-- Décomposition mot à mot -->
          <div style="margin-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
            <div class="tiny dim" style="text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">Explication mot à mot :</div>
            <div class="stack" style="gap: 6px;">
              ${(s.w || []).map(([wRu, wFr, wExpl]) => `
                <div class="row-between" style="font-size: 13px; background: rgba(0,0,0,0.2); padding: 6px 10px; border-radius: 8px;">
                  <span class="ru-inline" data-say="${wRu}" style="color: var(--teal); font-weight: 700;">${wRu}</span>
                  <span class="dim">${wFr}</span>
                  <span class="tiny muted">${wExpl}</span>
                </div>
              `).join('')}
            </div>
          </div>

          ${s.g ? `
            <div style="margin-top: 10px; font-size: 13px; background: rgba(123,92,255,0.15); border-radius: 8px; padding: 8px 10px; color: #e0d8ff;">
              🧠 <strong>Règle de grammaire :</strong> ${s.g}
            </div>
          ` : ''}
        </div>
      `;
    } else {
      feedbackBox.innerHTML = `
        <div style="background: rgba(255, 92, 114, 0.15); border: 1px solid var(--red); border-radius: 12px; padding: 14px; margin-top: 12px;">
          <div class="row" style="gap: 8px; color: var(--red); font-weight: 700; margin-bottom: 6px;">
            <span>✗</span> <span>À revoir</span>
          </div>
          <div class="small" style="color: #fff;"><strong>Traduction attendue :</strong> ${s.fr}</div>
          
          <div style="margin-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
            <div class="tiny dim" style="text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">Décomposition :</div>
            <div class="stack" style="gap: 6px;">
              ${(s.w || []).map(([wRu, wFr, wExpl]) => `
                <div class="row-between" style="font-size: 13px; background: rgba(0,0,0,0.2); padding: 6px 10px; border-radius: 8px;">
                  <span class="ru-inline" data-say="${wRu}" style="color: var(--teal); font-weight: 700;">${wRu}</span>
                  <span class="dim">${wFr}</span>
                  <span class="tiny muted">${wExpl}</span>
                </div>
              `).join('')}
            </div>
          </div>
          ${s.g ? `<div style="margin-top: 10px; font-size: 13px; color: #ffccd4;">🧠 ${s.g}</div>` : ''}
        </div>
      `;
    }
  };

  return html;
}

function renderTabContent(tab) {
  if (tab === 'vocab') {
    return renderVocabTab();
  } else if (tab === 'sentences') {
    return renderSentencesTab();
  }
  return renderLessonTab();
}

function renderLessonTab() {
  let html = `<div class="stack" style="gap: 16px;">`;

  (currentUnit.lesson || []).forEach(section => {
    html += `
      <div class="card" style="padding: 18px; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--border);">
        <div class="h2" style="font-size: 18px; font-weight: 800; margin-bottom: 12px; color: var(--text);">${section.t}</div>
        <div class="stack" style="gap: 12px;">
    `;

    section.b.forEach(block => {
      const [type, ...args] = block;

      if (type === 'p') {
        html += `<p style="font-size: 15px; line-height: 1.6; color: var(--text-2);">${md(args[0])}</p>`;
      } else if (type === 'ul') {
        html += `<ul style="padding-left: 20px; margin: 0; display: flex; flex-direction: column; gap: 8px;">`;
        args[0].forEach(li => html += `<li style="font-size: 14.5px; color: var(--text-2);">${md(li)}</li>`);
        html += `</ul>`;
      } else if (type === 'table') {
        const [headers, rows] = args;
        html += `
          <div style="overflow-x: auto; margin: 6px 0; border-radius: 12px; background: rgba(0,0,0,0.2); border: 1px solid var(--border);">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px;">
              <thead>
                <tr style="border-bottom: 1px solid var(--border-2); color: var(--text-3);">
                  ${headers.map(h => `<th style="padding: 10px 12px; font-weight: 700;">${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${rows.map(r => `
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    ${r.map(cell => `<td style="padding: 10px 12px;">${md(cell)}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      } else if (type === 'tip' || type === 'info' || type === 'warn' || type === 'why') {
        let bg, color, icon;
        if (type === 'tip') { bg = 'rgba(61, 220, 151, 0.12)'; color = 'var(--green)'; icon = '💡'; }
        else if (type === 'warn') { bg = 'rgba(255, 92, 114, 0.12)'; color = 'var(--red)'; icon = '⚠️'; }
        else if (type === 'why') { bg = 'rgba(123, 92, 255, 0.15)'; color = 'var(--violet)'; icon = '🧠'; }
        else { bg = 'rgba(77, 163, 255, 0.12)'; color = 'var(--blue)'; icon = 'ℹ️'; }

        html += `
          <div style="background: ${bg}; border-left: 3px solid ${color}; padding: 12px 14px; border-radius: 0 12px 12px 0; display: flex; gap: 12px;">
            <div style="font-size: 20px; line-height: 1.2;">${icon}</div>
            <div style="font-size: 14px; color: rgba(255,255,255,0.9); line-height: 1.5;">${md(args[0])}</div>
          </div>
        `;
      } else if (type === 'ex') {
        const [ru, fr, note] = args;
        html += `
          <div style="padding: 12px 14px; background: rgba(255,255,255,0.04); border-radius: 12px; border: 1px solid var(--border);">
            <div class="row" style="gap: 12px; align-items: center;">
              <button class="say sm" data-say="${ru}" aria-label="Écouter" style="background: rgba(123,92,255,0.2); width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--violet); flex-shrink: 0;">
                <svg viewBox="0 0 24 24" style="width: 16px; height: 16px;"><polygon fill="currentColor" points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path fill="none" stroke="currentColor" stroke-width="2" d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              </button>
              <div class="grow">
                <div class="ru ru-big" style="font-size: 17px; font-weight: 700; color: #fff;">${md(ru)}</div>
                <div class="small dim">${fr}</div>
              </div>
            </div>
            ${note ? `<div class="tiny muted" style="margin-top: 6px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 6px;">${md(note)}</div>` : ''}
          </div>
        `;
      } else if (type === 'quiz') {
        const [q, opts, correctIdx, exp] = args;
        const qid = Math.random().toString(36).substring(2, 9);
        const encodedExp = encodeURIComponent(md(exp));
        html += `
          <div class="card" style="background: rgba(0,0,0,0.3); border: 1px dashed rgba(255,255,255,0.2); padding: 16px; border-radius: 14px; margin-top: 6px;" id="q-${qid}">
            <div class="row" style="gap: 8px; margin-bottom: 8px;">
              <span class="chip" style="background: var(--grad); color: #fff; font-size: 11px;">Quiz</span>
              <strong style="font-size: 15px;">${q}</strong>
            </div>
            <div class="stack" style="gap: 8px; margin-top: 10px;">
              ${opts.map((o, i) => `
                <button class="btn btn-secondary btn-sm" style="justify-content: flex-start; text-align: left; padding: 10px 14px; font-size: 14px; border-radius: 10px;" onclick="app.checkQuiz('${qid}', ${i}, ${correctIdx}, '${encodedExp}')">
                  ${o}
                </button>
              `).join('')}
            </div>
            <div class="exp-box mt-s small" style="display: none; padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.08); margin-top: 10px;"></div>
          </div>
        `;
      }
    });

    html += `</div></div>`;
  });

  html += `
    <div style="margin-top: 20px; text-align: center;">
      <button class="btn btn-primary btn-block" style="padding: 16px; font-size: 16px; font-weight: 800; border-radius: 16px;" onclick="app.finishUnit()">
        ✓ Valider cette étape (+50 XP)
      </button>
    </div>
  </div>`;

  return html;
}

function renderVocabTab() {
  const words = currentUnit.words || [];
  if (!words.length) {
    return `<div class="card center" style="padding: 30px;"><p class="muted">Aucun mot de vocabulaire particulier pour cette étape d'introduction.</p></div>`;
  }

  let html = `
    <div class="stack" style="gap: 12px;">
      <div class="small dim" style="margin-bottom: 4px;">${words.length} mots avec audio et exemples traduits :</div>
  `;

  words.forEach(w => {
    const [ru, fr, cat, note, examples] = w;
    html += `
      <div class="card" style="padding: 16px; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--border);">
        <div class="row-between" style="align-items: flex-start;">
          <div>
            <div class="row" style="gap: 10px; align-items: baseline;">
              <span class="ru ru-big" style="font-size: 20px; font-weight: 800; color: #fff;">${ru}</span>
              ${cat ? `<span class="tiny dim" style="font-style: italic;">${cat}</span>` : ''}
            </div>
            <div class="h3" style="font-size: 16px; color: var(--teal); margin-top: 4px;">${fr}</div>
          </div>

          <button class="say sm" data-say="${ru}" style="background: rgba(47, 214, 195, 0.15); color: var(--teal); width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg viewBox="0 0 24 24" style="width: 18px; height: 18px;"><polygon fill="currentColor" points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path fill="none" stroke="currentColor" stroke-width="2" d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
          </button>
        </div>

        ${note ? `
          <div class="small muted" style="margin-top: 8px; font-size: 13.5px; line-height: 1.4;">
            💡 ${md(note)}
          </div>
        ` : ''}

        ${examples && examples.length ? `
          <div style="margin-top: 12px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px;">
            <div class="tiny dim" style="text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">Exemple :</div>
            ${examples.map(ex => `
              <div class="row" style="gap: 10px; background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 10px; align-items: center;">
                <button class="say sm" data-say="${ex[0]}" style="color: var(--violet); width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                  <svg viewBox="0 0 24 24" style="width: 14px; height: 14px;"><polygon fill="currentColor" points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon></svg>
                </button>
                <div class="grow">
                  <div style="font-size: 14.5px; font-weight: 600; color: #fff;">${md(ex[0])}</div>
                  <div class="tiny dim">${ex[1]}</div>
                  ${ex[2] ? `<div class="tiny" style="color: var(--text-3);">${md(ex[2])}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  });

  html += `</div>`;
  return html;
}

function renderSentencesTab() {
  const sents = currentUnit.sentences || [];
  if (!sents.length) {
    return `<div class="card center" style="padding: 30px;"><p class="muted">Aucune phrase à traduire pour cette étape.</p></div>`;
  }

  let html = `
    <div class="stack" style="gap: 16px;">
      <div class="small dim">Traduis chaque phrase en français. La correction intelligente t'explique chaque mot et chaque règle de grammaire :</div>
  `;

  sents.forEach((s, idx) => {
    html += `
      <div class="card" style="padding: 18px; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--border);">
        <div class="row-between" style="margin-bottom: 8px;">
          <span class="chip" style="background: rgba(123,92,255,0.15); color: var(--violet); font-size: 11px;">Phrase ${idx + 1} / ${sents.length}</span>
          <button class="say sm" data-say="${s.ru}" style="color: var(--teal); background: rgba(47, 214, 195, 0.15); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <svg viewBox="0 0 24 24" style="width: 16px; height: 16px;"><polygon fill="currentColor" points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path fill="none" stroke="currentColor" stroke-width="2" d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
          </button>
        </div>

        <div class="ru ru-big" style="font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 12px;">
          ${s.ru}
        </div>

        <div class="stack" style="gap: 8px;">
          <input type="text" id="sent-input-${idx}" placeholder="Écris la traduction en français..." style="
            width: 100%;
            background: rgba(0,0,0,0.3);
            border: 1px solid var(--border-2);
            color: #fff;
            padding: 12px 14px;
            border-radius: 12px;
            font-size: 15px;
          " onkeydown="if(event.key==='Enter') app.checkSentenceAnswer(${idx})">
          
          <button class="btn btn-secondary btn-block" onclick="app.checkSentenceAnswer(${idx})" style="padding: 10px; font-weight: 700;">
            Vérifier & Analyser
          </button>
        </div>

        <div id="sent-feedback-${idx}"></div>
      </div>
    `;
  });

  html += `</div>`;
  return html;
}
