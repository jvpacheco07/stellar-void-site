// protect-media.js
// Adds light protection over decorative media: disables right-click/drag and
// optionally replaces GIF with a video if a converted file exists (WebM/MP4).

document.addEventListener('DOMContentLoaded', () => {
  const img = document.querySelector('.gif-topo');
  const overlay = document.querySelector('.media-lock');
  if (!img || !overlay) return;

  // Basic protections
  img.setAttribute('draggable', 'false');
  img.ondragstart = () => false;
  img.style.pointerEvents = 'none'; // prevent direct interactions on the img itself

  // overlay captures pointer actions (right-click, long-press)
  overlay.addEventListener('contextmenu', (e) => e.preventDefault());
  overlay.addEventListener('mousedown', (e) => e.preventDefault());
  overlay.addEventListener('touchstart', (e) => e.preventDefault());
  overlay.addEventListener('dragstart', (e) => e.preventDefault());

  // Additionally prevent long-press saving on mobile by stopping contextmenu on document for this element
  img.addEventListener('contextmenu', (e) => e.preventDefault());

  // Try to replace with a video if a converted file exists.
  // If you convert Animation.gif to Animation.webm / Animation.mp4, this will use the first available.
  const base = img.getAttribute('src').replace(/\.gif$/i, '');
  const candidates = [base + '.webm', base + '.mp4'];

  async function findAndReplace() {
    for (const src of candidates) {
      try {
        const res = await fetch(src, { method: 'HEAD' });
        if (res && res.ok) {
          const video = document.createElement('video');
          video.className = img.className;
          video.autoplay = true;
          video.loop = true;
          video.muted = true;
          video.playsInline = true;
          video.preload = 'metadata';
          video.src = src;
          video.setAttribute('aria-hidden', 'true');
          video.style.display = 'block';
          video.style.width = img.style.width || img.width + 'px';
          // replace the image node in DOM (image is inside .media-frame)
          const frame = img.closest('.media-frame');
          if (frame) {
            frame.replaceChild(video, img);
            // keep overlay on top
            return;
          }
        }
      } catch (err) {
        // fetch may fail on file:// or CORS; ignore and continue
      }
    }
  }

  // run replacement in background (non-blocking)
  findAndReplace();
});
