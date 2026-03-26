// Deploy Button Sci-Fi Effect
document.addEventListener('DOMContentLoaded', function() {
  const deployButton = document.getElementById('install');
  const progressBarFill = document.querySelector('.progress-bar-fill');
  const systemTime = document.getElementById('system-time');
  const downloadStatus = document.getElementById('download-status');
  let isAnimating = false;
  let animationTimeout;

  // Sistema de clock em tempo real
  function updateSystemTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    if (systemTime) {
      systemTime.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }

  // Atualizar relógio a cada segundo
  updateSystemTime();
  setInterval(updateSystemTime, 1000);

  deployButton.addEventListener('mouseenter', function(e) {
    if (isAnimating) return;
    
    isAnimating = true;
    progressBarFill.style.width = '0%';
    
    if (downloadStatus) {
      downloadStatus.textContent = 'INICIANDO...';
    }
    
    const startTime = Date.now();
    const duration = 1500; // 1.5 segundos
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      
      progressBarFill.style.width = progress + '%';
      
      // Atualizar status durante o download
      if (downloadStatus) {
        if (progress < 100) {
          downloadStatus.textContent = `DEPLOYING ${Math.round(progress)}%`;
        } else {
          downloadStatus.textContent = 'CONCLUÍDO';
        }
      }
      
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
      if (downloadStatus) {
        downloadStatus.textContent = 'PRONTO';
      }
    }
  });

  function resetProgress() {
    isAnimating = false;
    progressBarFill.style.width = '0%';
  }

  function triggerDownload() {
    // Cria um link temporário e clica nele
    const link = document.createElement('a');
    link.href = 'Stellar_Void_26_03_2026.zip';
    link.download = 'Stellar_Void_26_03_2026.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});
