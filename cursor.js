document.body.style.cursor = "none";

const cursor = document.createElement("div");
const cursorSize = 20;

Object.assign(cursor.style, {
  position: "fixed",
  pointerEvents: "none",
  zIndex: "10000",
  width: cursorSize + "px",
  height: cursorSize + "px",
  background: "url('media/img/spr_gui_vida.png') center/contain no-repeat",
  borderRadius: "50%",
  boxShadow: "none",
  filter: "none"
});

document.body.appendChild(cursor);

let glowActive = false;

document.addEventListener("mousemove", e => {
  cursor.style.left = (e.clientX - cursorSize / 2) + "px";
  cursor.style.top = (e.clientY - cursorSize / 2) + "px";
});

function startGlowAnimation() {
  if (glowActive) return;
  glowActive = true;
  cursor.style.boxShadow = "0 0 10px 4px hsl(200, 100%, 65%)";
  cursor.style.filter = "drop-shadow(0 2px 3px hsl(200, 100%, 65%))";
}

function stopGlowAnimation() {
  glowActive = false;
  cursor.style.boxShadow = "none";
  cursor.style.filter = "none";
}

// cursor glow on nav links, buttons, and the ship (but not the message text)
document.querySelectorAll("a, button, .clicavel, .player-icon").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(1.2)";
    startGlowAnimation();
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
    stopGlowAnimation();
  });
});