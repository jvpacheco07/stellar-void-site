// Detecta a visibilidade do gif e controla a animação do logo
document.addEventListener('DOMContentLoaded', () => {
  const logoImg = document.querySelector('.logo-barra');
  const gifImg = document.querySelector('.gif-topo');
  const cornerUp = document.querySelector('.corner-up');
  const cornerMessage = document.querySelector('.corner-message');
  const sobreEl = document.getElementById('sobre');
  const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-offset')) || 92;
  // production mode: no debug logging or temporary outlines
  if (!logoImg) return;

  function updateLogoVisibility() {
    if (!gifImg) return;
    const gifRect = gifImg.getBoundingClientRect();
    const gifVisible = gifRect.top < window.innerHeight && gifRect.bottom > 0;
    if (gifVisible) {
      logoImg.classList.add('hide');
      logoImg.classList.remove('show');
      logoImg.style.pointerEvents = 'none';
    } else {
      logoImg.classList.remove('hide');
      logoImg.classList.add('show');
      logoImg.style.pointerEvents = 'auto';
    }
  }

  // Show/hide corner-up when the page reaches the #sobre section
  function updateCornerVisibility() {
    if (!cornerUp || !sobreEl) return;
    // Legacy scroll-based check (kept as fallback)
    const scrollShow = window.scrollY >= (sobreEl.offsetTop - headerOffset - 8);
    // Also check the element's position relative to viewport for better accuracy
    const rect = sobreEl.getBoundingClientRect();
    const rectShow = rect.top <= headerOffset + 8; // when the section's top is at or above header offset
    const show = scrollShow || rectShow;
    if (show) cornerUp.classList.add('show');
    else cornerUp.classList.remove('show');
    // (no debug logging in production)
    // sync corner message visibility with the arrow
    if (cornerMessage) {
      if (show) cornerMessage.classList.add('show');
      else cornerMessage.classList.remove('show');
    }
  }

  // Replace frequent scroll-driven reads with IntersectionObservers to avoid layout thrashing
  // Observe gif visibility to toggle logo, and observe #sobre for corner visibility
  const observers = [];
  // disconnect observers on unload to avoid leaks
  window.addEventListener('unload', () => {
    observers.forEach(o => {
      try { o.disconnect(); } catch (e) {}
    });
  });

  // Observe gif visibility to toggle logo without running on every scroll
  try {
    if (gifImg && 'IntersectionObserver' in window) {
      const gifIo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            logoImg.classList.add('hide');
            logoImg.classList.remove('show');
            logoImg.style.pointerEvents = 'none';
          } else {
            logoImg.classList.remove('hide');
            logoImg.classList.add('show');
            logoImg.style.pointerEvents = 'auto';
          }
        });
      }, { root: null, threshold: 0.01 });
      gifIo.observe(gifImg);
      observers.push(gifIo);
    } else {
      // fallback to a single initial compute
      updateLogoVisibility();
    }
  } catch (e) {
    console.debug('gif IO failed, using fallback', e);
    updateLogoVisibility();
  }

  // Observe #sobre for corner visibility
  try {
    if (sobreEl && cornerUp && 'IntersectionObserver' in window) {
      const sobreIo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            cornerUp.classList.add('show');
            if (cornerMessage) cornerMessage.classList.add('show');
          } else {
            const top = entry.boundingClientRect.top;
            if (top > headerOffset) {
              cornerUp.classList.remove('show');
              if (cornerMessage) cornerMessage.classList.remove('show');
            }
          }
        });
      }, { root: null, threshold: 0, rootMargin: `-${headerOffset}px 0px 0px 0px` });
      sobreIo.observe(sobreEl);
      observers.push(sobreIo);
    } else {
      // fallback to initial compute
      updateCornerVisibility();
    }
  } catch (e) {
    console.debug('sobre IO failed, using fallback', e);
    updateCornerVisibility();
  }

  // initial states
  updateCornerVisibility();

  // --- Nav tilt enter/exit handlers ---
  document.querySelectorAll('nav a').forEach(a => {
    let exitTimer = null;
    a.addEventListener('mouseenter', () => {
      clearTimeout(exitTimer);
      a.classList.remove('tilt-exit');
      // force reflow to restart animation if needed
      void a.offsetWidth;
      a.classList.add('tilt-enter');
    });
    a.addEventListener('mouseleave', () => {
      a.classList.remove('tilt-enter');
      // small delay to ensure enter animation finished
      exitTimer = setTimeout(() => {
        a.classList.add('tilt-exit');
        // remove exit class after animation completes
        setTimeout(() => a.classList.remove('tilt-exit'), 600);
      }, 0);
    });
    // when a nav tab is clicked, ensure the corner-up appears (user requested)
    a.addEventListener('click', () => {
      if (cornerUp) cornerUp.classList.add('show');
      if (cornerMessage) cornerMessage.classList.add('show');
    });
  });

  // --- Player click: advance ship and reveal nav tabs ---
  const playerWrap = document.querySelector('.player-wrap');
  const headerRight = document.querySelector('.header-right');

  if (playerWrap && headerRight) {
    let launched = false;
    // make playerWrap focusable for keyboard users
    playerWrap.setAttribute('tabindex', '0');
    const playerIcon = playerWrap.querySelector('.player-icon');

    function launchAndReveal() {
      if (launched) return;
      launched = true;
      // hide decorative message immediately
      hideMessage();

      // find the 'Sobre' link inside the nav
      const sobreLink = headerRight.querySelector('nav a[href="#sobre"]');
      const desiredGap = 8; // px gap between tab and ship

      if (sobreLink) {
        // reveal nav immediately so its layout is included in measurements
        headerRight.classList.add('open');

        // wait a frame for layout to update, then compute positions
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const sobreRect = sobreLink.getBoundingClientRect();
            const playerRect = playerWrap.getBoundingClientRect();

            // target: position player's RIGHT edge to the LEFT of the 'Sobre' left edge, leaving desiredGap
            const targetLeft = sobreRect.left - desiredGap - playerRect.width;
            const deltaX = Math.round(targetLeft - playerRect.left);

            // vertical align: center on the sobre link center
            const sobreCenterY = sobreRect.top + sobreRect.height / 2;
            const playerCenterY = playerRect.top + playerRect.height / 2;
            const deltaY = Math.round(sobreCenterY - playerCenterY);

            // apply transform to playerWrap (it has a transition in CSS)
            playerWrap.style.transform = `translateX(${deltaX}px) translateY(${deltaY}px)`;
          });
        });
      } else {
        // fallback: previous simple launch
        hideMessage();
        playerWrap.classList.add('launch');
        setTimeout(() => headerRight.classList.add('open'), 200);
      }
    }

    function returnAndHide() {
      if (!launched) return;
      // 1) flip ship to opposite direction
      if (playerIcon) playerIcon.classList.add('flip');

      // 2) hide nav immediately (start fade out)
      headerRight.classList.remove('open');

      // 3) after a short delay, move ship back to original place
      const moveBackDelay = 120; // ms
      setTimeout(() => {
        // clear inline transform to let CSS move it back to origin (transition handles animation)
        playerWrap.style.transform = '';
        // also ensure launch class is removed
        playerWrap.classList.remove('launch');
      }, moveBackDelay);

      // 4) after transition completes, remove flip and mark not launched
      const totalReturnTime = 700; // ms (should be >= .player-wrap transition duration)
      setTimeout(() => {
        if (playerIcon) playerIcon.classList.remove('flip');
        launched = false;
        // show the decorative message again
        showMessage();
      }, totalReturnTime);
    }

    // when mouse enters the gif, temporarily suppress nav glow
    playerWrap.addEventListener('mouseenter', () => headerRight.classList.add('suppress-nav-glow'));
    playerWrap.addEventListener('mouseleave', () => headerRight.classList.remove('suppress-nav-glow'));
    // the message is decorative/non-clickable; reference it so we can hide/show when launching/returning
    const playerMsg = document.querySelector('.player-message');
    function hideMessage() {
      if (!playerMsg) return;
      playerMsg.style.visibility = 'hidden';
      playerMsg.style.opacity = '0';
      playerMsg.style.pointerEvents = 'none';
    }
    function showMessage() {
      if (!playerMsg) return;
      playerMsg.style.visibility = 'visible';
      playerMsg.style.opacity = '1';
      playerMsg.style.pointerEvents = 'auto';
    }

    // click toggles between launch+reveal and return+hide
    playerWrap.addEventListener('click', () => {
      if (!launched) launchAndReveal();
      else returnAndHide(); // pass a delay to returnAndHide if needed
    });

    playerWrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!launched) launchAndReveal();
        else returnAndHide();
      }
    });
  }
});


