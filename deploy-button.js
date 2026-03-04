// Deploy Button Sci-Fi Effect
document.addEventListener('DOMContentLoaded', function() {
  const deployButton = document.getElementById('install');
  const progressBarFill = document.querySelector('.progress-bar-fill');
  let isAnimating = false;
  let animationTimeout;

  deployButton.addEventListener('mouseenter', function(e) {
    if (isAnimating) return;
    
    isAnimating = true;
    progressBarFill.style.width = '0%';
    
    const startTime = Date.now();
    const duration = 1500; // 1.5 segundos
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      
      progressBarFill.style.width = progress + '%';
      
      if (progress < 100) {
        animationTimeout = requestAnimationFrame(animate);
      } else {
        // Barra completa - inicia o download
        triggerDownload();
        resetProgress();
      }
    };
    
    animationTimeout = requestAnimationFrame(animate);
  });

  deployButton.addEventListener('mouseleave', function() {
    if (isAnimating) {
      cancelAnimationFrame(animationTimeout);
      resetProgress();
    }
  });

  function resetProgress() {
    isAnimating = false;
    progressBarFill.style.width = '0%';
  }

  function triggerDownload() {
    // Cria um link temporário e clica nele
    const link = document.createElement('a');
    link.href = 'Stellar_Void.zip';
    link.download = 'stellar-void.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});
