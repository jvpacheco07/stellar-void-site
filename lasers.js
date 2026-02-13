// Star Wars style laser beams effect
document.addEventListener('DOMContentLoaded', function() {
  const numLasers = 25;
  const lasers = [];

  // Calculate text box area (assuming .caixa is centered)
  const caixaWidth = Math.min(1000, window.innerWidth);
  const caixaLeft = (window.innerWidth - caixaWidth) / 2;
  const caixaRight = caixaLeft + caixaWidth;

  // Create lasers
  for (let i = 0; i < numLasers; i++) {
    const laser = document.createElement('div');
    laser.className = 'laser';
    laser.style.position = 'fixed';
    laser.style.width = '1px';
    laser.style.height = '100vh'; // Full height
    laser.style.background = 'linear-gradient(to bottom, transparent, rgba(0, 238, 255, 0.8), transparent)'; // Red laser
    laser.style.pointerEvents = 'none';
    const leftPos = Math.random() * window.innerWidth;
    laser.style.left = leftPos + 'px';
    laser.style.top = Math.random() > 0.5 ? '-100vh' : '100vh'; // Start above or below
    laser.style.animation = Math.random() > 0.5 ? 'laserDown 3s linear infinite' : 'laserUp 3s linear infinite';
    laser.style.animationDelay = Math.random() * 3 + 's'; // Random delay

    // Check if laser passes over text boxes
    if (leftPos >= caixaLeft && leftPos <= caixaRight) {
      laser.style.zIndex = '-1'; // Behind text boxes
      laser.style.opacity = '0.5'; // Dimmer
    } else {
      laser.style.zIndex = '0'; // Normal
      laser.style.opacity = '1';
    }

    document.body.appendChild(laser);
    lasers.push(laser);
  }

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes laserDown {
      from { top: -100vh; }
      to { top: 100vh; }
    }
    @keyframes laserUp {
      from { top: 100vh; }
      to { top: -100vh; }
    }
  `;
  document.head.appendChild(style);
});