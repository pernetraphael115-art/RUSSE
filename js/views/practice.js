export default async function render() {
  return `
    <div class="topbar">
      <div class="title h2">Pratique</div>
    </div>
    
    <div class="stack">
      <div class="card tap">
        <div class="row">
          <div class="tile-icon">🔤</div>
          <div class="grow">
            <div class="h3">Entraîneur d'alphabet</div>
            <div class="small dim">Apprendre à lire le cyrillique</div>
          </div>
          <svg class="chev" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>
      
      <div class="card tap">
        <div class="row">
          <div class="tile-icon">🎧</div>
          <div class="grow">
            <div class="h3">Compréhension orale</div>
            <div class="small dim">Écouter et taper ce qu'on entend</div>
          </div>
          <svg class="chev" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>
    </div>
  `;
}
