// Level metadata (CECRL / CEFR scale: from zero to bilingual).
export const LEVELS = [
  { id: 'A0', name: 'Découverte', desc: "L'alphabet, les sons et tes premiers mots.", color: '#2fd6c3' },
  { id: 'A1', name: 'Premiers pas', desc: 'Se présenter, verbes au présent, les premiers cas.', color: '#3ddc97' },
  { id: 'A2', name: 'Élémentaire', desc: 'Génitif, datif, instrumental, aspects et mouvement.', color: '#4da3ff' },
  { id: 'B1', name: 'Seuil', desc: 'Nombres, impératif, comparaisons, phrases complexes.', color: '#9a7bff' },
  { id: 'B2', name: 'Avancé', desc: 'Préfixes de mouvement, participes et gérondifs.', color: '#ff6fa0' },
  { id: 'C1', name: 'Autonome', desc: 'Nuances, particules, langue parlée et idiomes.', color: '#ff9d4d' },
  { id: 'C2', name: 'Maîtrise', desc: 'Formation des mots, styles, culture : le niveau bilingue.', color: '#ffc35c' },
];
export const levelById = id => LEVELS.find(l => l.id === id);
