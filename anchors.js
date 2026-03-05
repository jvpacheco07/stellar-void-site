document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.navegation a[href^="#"]');
  if (!navLinks.length) return;

  function getHeaderOffset() {
    const val = getComputedStyle(document.documentElement).getPropertyValue('--header-offset');
    const n = parseInt(val, 10);
    return Number.isFinite(n) ? n : 92;
  }

  navLinks.forEach(a => {
    a.addEventListener('click', function (ev) {
      ev.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      const headerOffset = getHeaderOffset();
      const top = target.getBoundingClientRect().top + window.pageYOffset - Math.max(0, headerOffset - 8);
      window.scrollTo({ top, behavior: 'smooth' });
      // focus for accessibility
      try { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); setTimeout(() => target.removeAttribute('tabindex'), 1000); } catch (e) {}
    });
  });
});
