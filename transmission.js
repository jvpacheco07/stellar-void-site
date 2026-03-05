document.addEventListener('DOMContentLoaded', function () {
  const receivingText = document.getElementById('receiving-text');
  const staticOverlay = document.querySelector('.static-overlay');
  const videoContainer = document.getElementById('video-container');
  const video = document.getElementById('trailer-video');
  const scanlines = document.getElementById('scanlines');
  const playButtonOverlay = document.getElementById('play-button-overlay');
  const playButton = document.getElementById('play-button');

  let percent = 0;
  let lockedShown = false;

  function simulateReceiving() {
    receivingText.textContent = `RECEIVING TRANSMISSION... ${percent}%`;
    const iv = setInterval(() => {
      const step = Math.floor(Math.random() * 12) + 4;
      percent = Math.min(100, percent + step);

      if (percent >= 89 && !lockedShown) {
        receivingText.textContent = `RECEIVING TRANSMISSION... ${percent}% LOCKED`;
        lockedShown = true;
        // brief pause before finalising
      } else if (percent >= 100) {
        receivingText.textContent = `RECEIVING TRANSMISSION... 100%`;
        clearInterval(iv);
        setTimeout(unlockTransmission, 900);
      } else {
        receivingText.textContent = `RECEIVING TRANSMISSION... ${percent}%${lockedShown ? ' LOCKED' : ''}`;
      }
    }, 350 + Math.random() * 450);
  }

  function unlockTransmission() {
    // Fade out static and show video controls
    staticOverlay.classList.add('fade-out');
    receivingText.classList.add('fade-out');
    videoContainer.classList.remove('locked');
    videoContainer.setAttribute('aria-hidden', 'false');
    // Show play button overlay instead of autoplaying
    if (playButtonOverlay) {
      playButtonOverlay.classList.add('visible');
    }
    // small visual cue
    videoContainer.classList.add('unlocked');
  }

  // Play button logic
  if (playButton) {
    playButton.addEventListener('click', () => {
      if (playButtonOverlay) {
        playButtonOverlay.classList.remove('visible');
      }
      try { video.controls = true; } catch (e) {}
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {
          // play failed
        });
      }
    });
  }

  // When the user plays the video, enable stronger scanlines
  video.addEventListener('play', () => {
    scanlines.classList.add('active');
  });

  video.addEventListener('pause', () => {
    scanlines.classList.remove('active');
  });

  // Allow user click to unmute (explicit user gesture)
  video.addEventListener('click', () => {
    if (video.muted) {
      try { video.muted = false; } catch (e) {}
    }
  });

  // Clicking the receiving text restarts simulation (for demo)
  receivingText.addEventListener('click', () => {
    if (videoContainer.classList.contains('locked')) return; // already unlocked
    percent = 0; lockedShown = false;
    staticOverlay.classList.remove('fade-out');
    receivingText.classList.remove('fade-out');
    if (playButtonOverlay) {
      playButtonOverlay.classList.remove('visible');
    }
    simulateReceiving();
  });

  simulateReceiving();
});
