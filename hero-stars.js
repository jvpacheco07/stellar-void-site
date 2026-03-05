// Simple, lightweight starfield for the hero section
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let stars = [];
  const STAR_COUNT = 40;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function init() {
    resize();
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        z: Math.random(), // depth (0..1)
        a: rand(0.2, 0.8),
        r: rand(0.2, 0.9)
      });
    }
  }

  let last = performance.now();

  function tick(now) {
    const dt = Math.min(40, now - last) / 1000; // seconds
    last = now;
    // clear
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    // draw stars
    for (let s of stars) {
      // depth affects speed and size
      const speed = 10 + s.z * 30; // px per second
      s.y += speed * dt; // move down slowly
      // slight horizontal drift
      s.x += Math.sin(now / 500 + s.z * 10) * 0.2;

      if (s.y > canvas.clientHeight + 2) s.y = -2;
      if (s.x > canvas.clientWidth + 2) s.x = 0;
      if (s.x < -2) s.x = canvas.clientWidth + 2;

      const size = s.r * (0.4 + s.z * 0.8);
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${s.a})`;
      ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', () => {
    resize();
    // keep stars within bounds if resized
    for (let s of stars) {
      s.x = Math.min(canvas.clientWidth, s.x);
      s.y = Math.min(canvas.clientHeight, s.y);
    }
  });

  init();
  requestAnimationFrame(tick);
});
