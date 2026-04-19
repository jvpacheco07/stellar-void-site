document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bg-grid');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const config = {
    verticalSpacing: 68,
    horizontalSpacing: 64,
    scanSpeed: 46,
    background: '#020406',
    sweepSpeed: 160,
    sweepHeight: 320,
    sweepWidthRatio: 1
  };

  let width = 0;
  let height = 0;
  let isMobile = false;
  let dpr = 1;
  let horizontalOffset = 0;
  let sweepOffset = 0;
  let lastTime = performance.now();

  function getViewportHeight() {
    return window.visualViewport ? window.visualViewport.height : window.innerHeight;
  }

  function getMetrics() {
    return {
      verticalSpacing: isMobile ? Math.max(44, Math.round(width / 9.5)) : config.verticalSpacing,
      horizontalSpacing: isMobile ? Math.max(42, Math.round(height / 12)) : config.horizontalSpacing,
      scanSpeed: isMobile ? 38 : config.scanSpeed,
      sweepSpeed: isMobile ? 132 : config.sweepSpeed,
      sweepHeight: isMobile ? Math.min(Math.round(height * 0.42), 260) : config.sweepHeight,
      baseLineWidth: isMobile ? 0.9 : 1,
      baseGlowWidth: isMobile ? 2.2 : 3,
      sweepLineWidth: isMobile ? 0.9 : 1,
      sweepGlowWidth: isMobile ? 3 : 4
    };
  }

  function resize() {
    width = window.innerWidth;
    height = Math.round(getViewportHeight());
    isMobile = width <= 1024 || ('ontouchstart' in window && Math.min(width, height) <= 1024);
    dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawBackgroundGlow() {
    const radial = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.75);
    radial.addColorStop(0, 'rgba(0, 160, 255, 0.08)');
    radial.addColorStop(0.4, 'rgba(0, 100, 200, 0.04)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, width, height);
  }

  function drawVerticalLines() {
    const metrics = getMetrics();

    for (let x = 0; x <= width + metrics.verticalSpacing; x += metrics.verticalSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.strokeStyle = 'rgba(0, 225, 255, 0.18)';
      ctx.lineWidth = metrics.baseLineWidth;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.strokeStyle = 'rgba(0, 238, 255, 0.05)';
      ctx.lineWidth = metrics.baseGlowWidth;
      ctx.stroke();
    }
  }

  function drawHorizontalLines(now) {
    const metrics = getMetrics();
    const pulse = (Math.sin(now / 700) + 1) * 0.5;

    for (let y = -metrics.horizontalSpacing; y <= height + metrics.horizontalSpacing; y += metrics.horizontalSpacing) {
      const lineY = y + horizontalOffset;
      const wrappedY = ((lineY % (height + metrics.horizontalSpacing)) + (height + metrics.horizontalSpacing)) % (height + metrics.horizontalSpacing) - metrics.horizontalSpacing;
      const normalized = Math.max(0, Math.min(1, wrappedY / Math.max(height, 1)));
      const alpha = 0.12 + (1 - normalized) * 0.1 + pulse * 0.04;

      ctx.beginPath();
      ctx.moveTo(0, wrappedY);
      ctx.lineTo(width, wrappedY);
      ctx.strokeStyle = `rgba(0, 225, 255, ${alpha})`;
      ctx.lineWidth = metrics.baseLineWidth;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, wrappedY);
      ctx.lineTo(width, wrappedY);
      ctx.strokeStyle = `rgba(0, 238, 255, ${alpha * 0.22})`;
      ctx.lineWidth = metrics.baseGlowWidth;
      ctx.stroke();
    }
  }

  function drawSweepBand(now) {
    const metrics = getMetrics();
    const bandHeight = Math.min(metrics.sweepHeight, height * 0.58);
    const bandWidth = width * config.sweepWidthRatio;
    const bandLeft = (width - bandWidth) / 2;
    const bandRight = bandLeft + bandWidth;
    const bandTop = height + bandHeight - sweepOffset;
    const bandBottom = bandTop + bandHeight;

    if (bandBottom < 0 || bandTop > height) return;

    const flickerBase = 0.7 + (Math.sin(now / 90) + 1) * 0.28;
    const flickerJitter = 0.82 + Math.random() * 0.5;
    const bandFlicker = flickerBase * flickerJitter;

    const gradient = ctx.createLinearGradient(0, bandTop, 0, bandBottom);
    gradient.addColorStop(0, 'rgba(0, 238, 255, 0)');
    gradient.addColorStop(0.18, `rgba(0, 238, 255, ${0.05 * bandFlicker})`);
    gradient.addColorStop(0.5, `rgba(0, 238, 255, ${0.16 * bandFlicker})`);
    gradient.addColorStop(0.82, `rgba(0, 238, 255, ${0.05 * bandFlicker})`);
    gradient.addColorStop(1, 'rgba(0, 238, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(bandLeft, bandTop, bandWidth, bandHeight);

    ctx.save();
    ctx.beginPath();
    ctx.rect(bandLeft, bandTop, bandWidth, bandHeight);
    ctx.clip();

    for (let x = 0; x <= width + metrics.verticalSpacing; x += metrics.verticalSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, bandTop);
      ctx.lineTo(x, bandBottom);
      ctx.strokeStyle = `rgba(120, 248, 255, ${0.18 * bandFlicker})`;
      ctx.lineWidth = metrics.sweepLineWidth;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, bandTop);
      ctx.lineTo(x, bandBottom);
      ctx.strokeStyle = `rgba(0, 238, 255, ${0.08 * bandFlicker})`;
      ctx.lineWidth = metrics.sweepGlowWidth;
      ctx.stroke();
    }

    for (let y = -metrics.horizontalSpacing; y <= height + metrics.horizontalSpacing; y += metrics.horizontalSpacing) {
      const lineY = y + horizontalOffset;
      const wrappedY = ((lineY % (height + metrics.horizontalSpacing)) + (height + metrics.horizontalSpacing)) % (height + metrics.horizontalSpacing) - metrics.horizontalSpacing;
      if (wrappedY < bandTop - metrics.horizontalSpacing || wrappedY > bandBottom + metrics.horizontalSpacing) continue;
      const distance = Math.abs(wrappedY - (bandTop + bandHeight / 2));

      ctx.beginPath();
      ctx.moveTo(bandLeft, wrappedY);
      ctx.lineTo(bandRight, wrappedY);
      ctx.strokeStyle = `rgba(120, 248, 255, ${0.2 * bandFlicker})`;
      ctx.lineWidth = metrics.sweepLineWidth;
      ctx.stroke();

      const intensity = Math.max(0, 1 - distance / (bandHeight / 2));
      if (intensity <= 0) continue;

      ctx.beginPath();
      ctx.moveTo(bandLeft, wrappedY);
      ctx.lineTo(bandRight, wrappedY);
      ctx.strokeStyle = `rgba(120, 248, 255, ${(0.18 + intensity * 0.52) * bandFlicker})`;
      ctx.lineWidth = 1.8 + intensity * 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(bandLeft, wrappedY);
      ctx.lineTo(bandRight, wrappedY);
      ctx.strokeStyle = `rgba(0, 238, 255, ${(0.06 + intensity * 0.18) * bandFlicker})`;
      ctx.lineWidth = 6 + intensity * 5;
      ctx.stroke();
    }
    ctx.restore();

  }

  function render(now) {
    const metrics = getMetrics();
    const dt = Math.min(40, now - lastTime) / 1000;
    lastTime = now;
    horizontalOffset -= metrics.scanSpeed * dt;
    sweepOffset += metrics.sweepSpeed * dt;

    const cycle = metrics.horizontalSpacing;
    if (horizontalOffset <= -cycle) horizontalOffset += cycle;
    const sweepCycle = height + Math.min(metrics.sweepHeight, height * 0.28) * 2;
    if (sweepOffset >= sweepCycle) sweepOffset -= sweepCycle;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = config.background;
    ctx.fillRect(0, 0, width, height);

    drawBackgroundGlow();
    drawVerticalLines();
    drawHorizontalLines(now);
    drawSweepBand(now);

    requestAnimationFrame(render);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('orientationchange', () => setTimeout(resize, 120), { passive: true });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => { lastTime = performance.now(); });
  requestAnimationFrame(render);
});
