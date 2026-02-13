// Random moving stars background effect
document.addEventListener('DOMContentLoaded', function() {
  const numStars = 25;
  const stars = [];

  // Create stars
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.position = 'fixed';
    star.style.width = '2px';
    star.style.height = '2px';
    star.style.backgroundColor = 'white';
    star.style.borderRadius = '50%';
    star.style.pointerEvents = 'none';
    star.style.zIndex = '1'; // Behind other elements
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';
    star.style.opacity = Math.random() * 0.8 + 0.2; // Random opacity
    document.body.appendChild(star);
    stars.push(star);
  }

  // Animate stars continuously
  function animateStars() {
    stars.forEach(star => {
      // Move randomly and continuously
      const currentLeft = parseFloat(star.style.left);
      const currentTop = parseFloat(star.style.top);
      const newLeft = currentLeft + (Math.random() - 0.5) * 0.5; // Very small continuous movement
      const newTop = currentTop + (Math.random() - 0.5) * 0.5;

      // Keep within bounds
      star.style.left = Math.max(0, Math.min(window.innerWidth - 2, newLeft)) + 'px';
      star.style.top = Math.max(0, Math.min(window.innerHeight - 2, newTop)) + 'px';
    });
    requestAnimationFrame(animateStars);
  }
  animateStars();
});