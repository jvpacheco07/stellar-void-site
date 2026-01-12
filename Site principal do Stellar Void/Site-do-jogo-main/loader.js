// loader.js — hide the #site-loader when page is fully loaded
(function () {
  function removeLoader(loader) {
    if (!loader) return;
    // fade out
    loader.classList.add('loaded');
    // remove from DOM after transition
    const t = parseFloat(getComputedStyle(loader).transitionDuration) * 1000 || 420;
    setTimeout(() => {
      if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
      // ensure scroll restored
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }, t + 40);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('site-loader');
    if (!loader) return;
    // Prevent scrolling while loader is visible
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Progress UI elements
    const progressBar = loader.querySelector('.loader-progress-bar');
    const loaderText = loader.querySelector('.loader-text');

    // Gather assets to track (images, videos and CSS background-images), exclude loader's own logo
    function extractBackgroundUrls(cssValue) {
      if (!cssValue || cssValue === 'none') return [];
      const urls = [];
      const re = /url\((?:"|')?(.*?)(?:"|')?\)/g;
      let m;
      while ((m = re.exec(cssValue)) !== null) {
        if (m[1]) urls.push(m[1]);
      }
      return urls;
    }

    function getTrackableAssets() {
      const imgs = Array.from(document.images).filter(i => !i.closest('#site-loader'));
      const vids = Array.from(document.querySelectorAll('video')).filter(v => !v.closest('#site-loader'));

      // scan for background-image URLs
      const elements = Array.from(document.querySelectorAll('body *'));
      const bgSet = new Set();
      elements.forEach(el => {
        if (el.closest && el.closest('#site-loader')) return; // skip loader area
        let style;
        try { style = getComputedStyle(el); } catch (e) { return; }
        if (!style) return;
        const cssVal = style.backgroundImage;
        const urls = extractBackgroundUrls(cssVal);
        urls.forEach(u => {
          if (!u) return;
          // ignore common gradient keywords
          if (u.startsWith('linear-gradient') || u.startsWith('radial-gradient')) return;
          bgSet.add(u);
        });
      });

      const bgImages = [];
      bgSet.forEach(u => {
        if (!u) return;
        if (u.startsWith('data:')) {
          // data URIs are considered already loaded — push a marker object
          bgImages.push({ __inlineBackground: true, src: u });
        } else {
          const i = new Image();
          // set src after listeners in case needed; app logic will check complete
          i.src = u;
          bgImages.push(i);
        }
      });

      return imgs.concat(vids, bgImages);
    }

    let assets = getTrackableAssets();
    let total = assets.length;
    let loadedCount = 0;

    function updateProgress() {
      const pct = total === 0 ? 100 : Math.round((loadedCount / total) * 100);
      if (progressBar) progressBar.style.width = pct + '%';
      if (loaderText) loaderText.textContent = pct >= 100 ? 'Pronto!' : `Carregando… ${pct}%`;
      if (pct >= 100) {
        removeLoader(loader);
      }
    }

    function markLoaded() {
      loadedCount = Math.min(total, loadedCount + 1);
      updateProgress();
    }

    // Attach listeners for assets not yet ready
    if (total === 0) {
      // nothing to track — fallback to window.load removal
      window.addEventListener('load', () => removeLoader(loader), { once: true });
      setTimeout(() => { if (document.getElementById('site-loader')) removeLoader(document.getElementById('site-loader')); }, 6000);
      return;
    }

    assets.forEach(asset => {
      // handle inline background markers
      if (asset && asset.__inlineBackground) {
        // already considered loaded
        markLoaded();
        return;
      }

      const tag = (asset && asset.tagName) ? asset.tagName.toLowerCase() : '';
      if (tag === 'img') {
        const img = asset;
        if (img.complete && img.naturalWidth !== 0) {
          markLoaded();
        } else {
          img.addEventListener('load', markLoaded, { once: true });
          img.addEventListener('error', markLoaded, { once: true });
        }
      } else if (tag === 'video') {
        const vid = asset;
        if (vid.readyState >= 3) {
          markLoaded();
        } else {
          vid.addEventListener('loadeddata', markLoaded, { once: true });
          vid.addEventListener('error', markLoaded, { once: true });
        }
      } else if (asset instanceof Image) {
        // image created via new Image() for background
        const img = asset;
        if (img.complete && (img.naturalWidth !== 0 || img.src.indexOf('data:') === 0)) {
          markLoaded();
        } else {
          img.addEventListener('load', markLoaded, { once: true });
          img.addEventListener('error', markLoaded, { once: true });
        }
      } else {
        // unknown asset type — count it as loaded
        markLoaded();
      }
    });

    // As extra safety, also remove loader on window.load (ensures all resources handled)
    window.addEventListener('load', () => { assets = getTrackableAssets(); total = assets.length; updateProgress(); }, { once: true });

    // Fallback: if load/progress doesn't complete within 8s, remove loader anyway
    setTimeout(function () {
      if (document.getElementById('site-loader')) removeLoader(document.getElementById('site-loader'));
    }, 8000);
  });
})();
