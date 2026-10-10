import { state, seedInitialSRS } from './store.js';
import { getDueCards } from './srs.js';

// Router mapping
const routes = {
  '/': () => import('./views/home.js').then(m => m.default()),
  '/review': () => import('./views/review.js').then(m => m.default()),
  '/practice': () => import('./views/practice.js').then(m => m.default()),
  '/lexicon': () => import('./views/lexicon.js').then(m => m.default()),
  '/profile': () => import('./views/profile.js').then(m => m.default()),
  '/unit': () => import('./views/unit.js').then(m => m.default()),
  '/flashcards': () => import('./views/flashcards.js').then(m => m.default()),
};

let currentPath = null;

export async function handleRoute() {
  const hash = location.hash || '#/';
  // Extract path without query parameters
  const pathPart = hash.split('?')[0];
  const cleanPath = pathPart.replace(/^#/, '') || '/';
  
  // Normalized route key
  let routeKey = '/';
  if (cleanPath.startsWith('/unit')) routeKey = '/unit';
  else if (cleanPath.startsWith('/flashcards')) routeKey = '/flashcards';
  else if (cleanPath.startsWith('/review')) routeKey = '/review';
  else if (cleanPath.startsWith('/practice')) routeKey = '/practice';
  else if (cleanPath.startsWith('/lexicon')) routeKey = '/lexicon';
  else if (cleanPath.startsWith('/profile')) routeKey = '/profile';
  else routeKey = '/';

  currentPath = routeKey;

  // Toggle immersive mode (hide tabbar on full-screen activities)
  if (routeKey === '/unit' || routeKey === '/flashcards') {
    document.body?.classList?.add('immersive');
    const tabbar = document.getElementById('tabbar');
    if (tabbar) tabbar.style.display = 'none';
  } else {
    document.body?.classList?.remove('immersive');
    const tabbar = document.getElementById('tabbar');
    if (tabbar) tabbar.style.display = 'flex';
  }

  // Update tab bar active classes
  document.querySelectorAll('#tabbar a').forEach(a => {
    const tabName = a.getAttribute('data-tab');
    const expectedRoute = tabName === 'home' ? '/' : `/${tabName}`;
    if (routeKey === expectedRoute) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  const viewRoot = document.getElementById('view');
  if (!viewRoot) return;

  // Fade out
  viewRoot.style.opacity = '0';

  try {
    const renderFn = routes[routeKey] || routes['/'];
    const html = await renderFn();
    viewRoot.innerHTML = html;

    // Trigger enter animation
    viewRoot.classList.remove('view-enter');
    void viewRoot.offsetWidth; // trigger reflow
    viewRoot.classList.add('view-enter');
    viewRoot.style.opacity = '1';

    // Scroll to top of view
    window.scrollTo({ top: 0, behavior: 'instant' });

    updateReviewBadge();
  } catch (error) {
    console.error('Route error on', routeKey, error);
    viewRoot.innerHTML = `
      <div class="stack center mt-l" style="padding-top: 50px; text-align: center;">
        <div style="font-size: 48px; margin-bottom: 12px;">⚠️</div>
        <div class="h2">Oups, une erreur est survenue</div>
        <p class="muted" style="margin-top: 8px; font-size: 14px;">${error.message || 'Impossible de charger cette page.'}</p>
        <button class="btn btn-primary mt" onclick="location.hash='#/'" style="margin-top: 20px; padding: 12px 24px; border-radius: 12px;">
          Retour à l'accueil
        </button>
      </div>
    `;
    viewRoot.style.opacity = '1';
  }
}

export function updateReviewBadge() {
  try {
    const dueCount = getDueCards().length;
    const badge = document.getElementById('due-badge');
    if (badge) {
      if (dueCount > 0) {
        badge.textContent = dueCount > 99 ? '99+' : dueCount;
        badge.hidden = false;
      } else {
        badge.hidden = true;
      }
    }
  } catch {}
}

export async function initApp() {
  // Seed initial cards if state is empty
  seedInitialSRS();

  // Listen for hash changes
  window.addEventListener('hashchange', handleRoute);

  // Initial load
  if (!location.hash || location.hash === '#') {
    location.hash = '#/';
  } else {
    handleRoute();
  }
}

// Ensure startup regardless of document state
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}
