import { state, initStore, loadLevel, saveState } from './store.js';
import { getDueCards } from './srs.js';
import { LEVELS } from './data/levels.js';

// App initialization
async function initApp() {
  await initStore();
  
  // Set up routing
  window.addEventListener('hashchange', handleRoute);
  
  // Initial route
  if (!location.hash) {
    location.hash = '#/';
  } else {
    handleRoute();
  }
}

// Router
const routes = {
  '/': () => import('./views/home.js').then(m => m.default()),
  '/review': () => import('./views/review.js').then(m => m.default()),
  '/practice': () => import('./views/practice.js').then(m => m.default()),
  '/lexicon': () => import('./views/lexicon.js').then(m => m.default()),
  '/profile': () => import('./views/profile.js').then(m => m.default()),
  '/unit': () => import('./views/unit.js').then(m => m.default),
  '/flashcards': () => import('./views/flashcards.js').then(m => m.default()),
};

let currentView = null;

async function handleRoute() {
  const hash = location.hash || '#/';
  const path = hash.split('?')[0].substring(1) || '/';
  
  const viewRoot = document.getElementById('view');
  
  // Update tab bar active state
  document.querySelectorAll('#tabbar a').forEach(a => {
    if (a.getAttribute('href') === hash.split('?')[0]) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  // Check if route exists
  const routeMatch = Object.keys(routes).find(r => r === path || (path.startsWith(r + '/') && r !== '/'));
  let renderFunction = routes[routeMatch || '/'];
  
  // Hide tabbar on sub-views (unit, flashcards)
  if (path.startsWith('unit') || path.startsWith('flashcards')) {
    document.body.classList.add('immersive');
    if (path.startsWith('unit')) renderFunction = routes['/unit'];
  } else {
    document.body.classList.remove('immersive');
  }
  
  if (currentView && currentView.cleanup) {
    currentView.cleanup();
  }

  // Fade out old content
  viewRoot.style.opacity = '0';
  
  try {
    const viewHTML = await renderFunction(path);
    viewRoot.innerHTML = viewHTML;
    
    // Fade in new content
    viewRoot.classList.remove('view-enter');
    void viewRoot.offsetWidth; // trigger reflow
    viewRoot.classList.add('view-enter');
    viewRoot.style.opacity = '1';
    
    // Update review badge
    updateReviewBadge();

  } catch (error) {
    console.error('Route error:', error);
    viewRoot.innerHTML = '<div class="stack center mt-l"><div class="h2">Erreur</div><p class="muted">Impossible de charger cette page.</p></div>';
    viewRoot.style.opacity = '1';
  }
}

export function updateReviewBadge() {
  const dueCount = getDueCards().length;
  const badge = document.getElementById('due-badge');
  if (dueCount > 0) {
    badge.textContent = dueCount > 99 ? '99+' : dueCount;
    badge.hidden = false;
  } else {
    badge.hidden = true;
  }
}

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
