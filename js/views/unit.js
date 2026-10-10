import { state, saveState } from '../store.js';
import { md } from '../text.js';
import { speak } from '../tts.js';
import a0Units from '../data/units_a0.js';
import { addCard } from '../srs.js';

let currentUnit = null;

export default async function render(path) {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
  const unitId = urlParams.get('id');
  
  if (!unitId) return '<div class="stack center mt-l">Unité introuvable.</div>';
  
  // Right now only A0 exists in data
  currentUnit = a0Units.find(u => u.id === unitId);
  if (!currentUnit) return '<div class="stack center mt-l">Unité introuvable.</div>';

  let html = `
    <div class="topbar">
      <button class="icon-btn" onclick="history.back()"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>
      <div class="title h3">${currentUnit.icon} ${currentUnit.title}</div>
    </div>
    
    <div class="stack mt">
  `;
  
  currentUnit.lesson.forEach(section => {
    html += `<div class="card mb"><div class="h2 mb">${section.t}</div><div class="stack">`;
    
    section.b.forEach(block => {
      const [type, ...args] = block;
      
      if (type === 'p') {
        html += `<p>${md(args[0])}</p>`;
      } else if (type === 'ul') {
        html += `<ul style="padding-left: 20px; margin: 0; display: flex; flex-direction: column; gap: 8px;">`;
        args[0].forEach(li => html += `<li>${md(li)}</li>`);
        html += `</ul>`;
      } else if (type === 'table') {
        const [headers, rows] = args;
        html += `<div style="overflow-x: auto;"><table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">`;
        html += `<thead><tr style="border-bottom: 1px solid var(--border-2); color: var(--text-3); font-weight: normal;">`;
        headers.forEach(h => html += `<th style="padding: 8px 4px; font-weight: normal;">${h}</th>`);
        html += `</tr></thead><tbody>`;
        rows.forEach(row => {
          html += `<tr style="border-bottom: 1px solid var(--border);">`;
          row.forEach(cell => html += `<td style="padding: 10px 4px;">${md(cell)}</td>`);
          html += `</tr>`;
        });
        html += `</tbody></table></div>`;
      } else if (type === 'tip' || type === 'info' || type === 'warn' || type === 'why') {
        let bg, color, icon;
        if (type === 'tip') { bg = 'rgba(61, 220, 151, 0.15)'; color = 'var(--green)'; icon = '💡'; }
        else if (type === 'warn') { bg = 'rgba(255, 92, 114, 0.15)'; color = 'var(--red)'; icon = '⚠️'; }
        else if (type === 'why') { bg = 'rgba(123, 92, 255, 0.15)'; color = 'var(--violet)'; icon = '🧠'; }
        else { bg = 'rgba(77, 163, 255, 0.15)'; color = 'var(--blue)'; icon = 'ℹ️'; }
        
        html += `
          <div style="background: ${bg}; padding: 14px; border-radius: 12px; display: flex; gap: 12px;">
            <div style="font-size: 20px; line-height: 1.2;">${icon}</div>
            <div style="font-size: 14px; color: rgba(255,255,255,0.9);">${md(args[0])}</div>
          </div>
        `;
      } else if (type === 'ex') {
        const [ru, fr, note] = args;
        html += `
          <div style="padding: 12px; background: var(--surface-2); border-radius: 12px;">
            <div class="row">
              <button class="say sm" onclick="app.speak('${ru}')" style="margin-right: 8px;">
                <svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              </button>
              <div class="grow">
                <div class="ru ru-big" style="font-size: 18px; margin-bottom: 2px;">${md(ru)}</div>
                <div class="small dim">${fr}</div>
              </div>
            </div>
            ${note ? `<div class="tiny muted mt-s" style="border-top: 1px solid var(--border); padding-top: 8px;">${md(note)}</div>` : ''}
          </div>
        `;
      } else if (type === 'quiz') {
        const [q, opts, correctIdx, exp] = args;
        const qid = Math.random().toString(36).substr(2, 9);
        html += `
          <div class="card" style="background: rgba(0,0,0,0.2); border: 1px dashed var(--border-2);" id="q-${qid}">
            <div class="h3 mb">${q}</div>
            <div class="stack-sm">
              ${opts.map((o, i) => `
                <button class="btn btn-secondary btn-sm" style="justify-content: flex-start; text-align: left;" onclick="app.checkQuiz('${qid}', ${i}, ${correctIdx}, '${escape(md(exp))}')">${o}</button>
              `).join('')}
            </div>
            <div class="exp-box mt-s small" style="display: none; padding: 10px; border-radius: 8px; background: rgba(255,255,255,0.1);"></div>
          </div>
        `;
      }
    });
    
    html += `</div></div>`;
  });
  
  html += `
    <button class="btn btn-primary btn-block mt" onclick="app.finishUnit('${unitId}')">Terminer la leçon</button>
  </div>`;
  
  // Expose global methods for inline handlers
  window.app = window.app || {};
  window.app.speak = speak;
  window.app.checkQuiz = (qid, selected, correct, expRaw) => {
    const box = document.getElementById(`q-${qid}`);
    if (!box) return;
    const btns = box.querySelectorAll('button');
    btns.forEach((b, i) => {
      b.disabled = true;
      if (i === correct) b.style.background = 'var(--grad-green)';
      else if (i === selected) b.style.background = 'var(--red)';
    });
    const expBox = box.querySelector('.exp-box');
    expBox.innerHTML = unescape(expRaw);
    expBox.style.display = 'block';
  };
  window.app.finishUnit = (uid) => {
    state.units[uid] = { status: 'completed' };
    state.xp += 50;
    
    // Add words to SRS
    const u = a0Units.find(x => x.id === uid);
    if (u && u.words) {
      u.words.forEach(w => {
        addCard(w[0], w[1], w[3]); // ru, fr, note
      });
    }
    
    saveState();
    window.location.hash = '#/';
  };
  
  // Attach event listener for inline ruska speech
  setTimeout(() => {
    document.querySelectorAll('.ru-inline').forEach(el => {
      el.addEventListener('click', (e) => {
        speak(e.target.dataset.say || e.target.textContent);
      });
      el.style.color = 'var(--pink)';
      el.style.cursor = 'pointer';
      el.style.textDecoration = 'underline';
      el.style.textDecorationStyle = 'dotted';
    });
  }, 100);

  return html;
}
