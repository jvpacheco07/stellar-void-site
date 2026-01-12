// Smooth scroll helper for corner-up button
document.addEventListener('DOMContentLoaded', function () {
  // Prevent browsers from restoring scroll position on refresh/back navigation
  try {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  } catch (e) {}

  // Ensure we start at top on pageshow (including bfcache restores) and beforeunload
  try {
    window.addEventListener('pageshow', function (ev) {
      // when coming from bfcache or persisted session, ensure scroll at top
      window.scrollTo(0, 0);
    }, { passive: true });
    window.addEventListener('beforeunload', function () {
      // ensure next load doesn't restore to previous scroll
      try { window.scrollTo(0, 0); } catch (e) {}
    });
  } catch (e) {}

  const corner = document.querySelector('.corner-up');
  if (!corner) return;

  // Lightweight user scroll watcher: temporarily reduce visual effects while the user is actively scrolling.
  // (user scroll watcher removed - reverting reduced-motion behavior per user request)

  corner.addEventListener('click', function (e) {
    e.preventDefault();
    // perform smooth scroll to top
    // Use native smooth scroll when available
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // re-enable handlers shortly after native animation likely finished
      // fire a single scroll event after a short delay to ensure UI updates
      setTimeout(() => window.dispatchEvent(new Event('scroll')), 650);
    } else {
      // Fallback: simple animated scroll
      const duration = 500;
      const start = window.pageYOffset;
      const startTime = performance.now();
      let rafId = null;

      function easeInOutQuad(t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t; }

      function scroll() {
        const now = performance.now();
        const time = Math.min(1, (now - startTime) / duration);
        const timeFunc = easeInOutQuad(time);
        window.scrollTo(0, Math.ceil((1 - timeFunc) * start));
        if (time < 1) rafId = requestAnimationFrame(scroll);
        else {
          // finished
          window.dispatchEvent(new Event('scroll'));
          if (rafId) cancelAnimationFrame(rafId);
        }
      }
      rafId = requestAnimationFrame(scroll);
    }

    // Accessibility: move focus to main content after scroll
    const main = document.querySelector('main') || document.body;
    if (main && typeof main.focus === 'function') {
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
      // remove tabindex after a short delay
      setTimeout(() => main.removeAttribute('tabindex'), 1000);
    }
  });
});
