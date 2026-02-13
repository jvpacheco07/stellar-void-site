document.body.style.cursor = "none";

const cursor = document.createElement("div");
const cursorSize = 25;

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

document.querySelectorAll("a, button, .clicavel, .player-icon").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(1.5)";
    startGlowAnimation();
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
    stopGlowAnimation();
  });
});