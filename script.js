const loveNoteButton = document.querySelector("#love-note-button");
const loveNote = document.querySelector("#love-note");
const noButton = document.querySelector("#no-button");
const yesButton = document.querySelector("#yes-button");
const gameArea = document.querySelector("#game-area");
const gameHint = document.querySelector("#game-hint");
const celebration = document.querySelector("#celebration");
const closeCelebration = document.querySelector("#close-celebration");
const moreHeartsButton = document.querySelector("#more-hearts-button");
const complimentButton = document.querySelector("#compliment-button");
const compliment = document.querySelector("#compliment");
const shareButton = document.querySelector("#share-button");
const heartLayer = document.querySelector("#floating-hearts");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const compliments = [
  "Máš v sebe niečo, čo robí svet jemnejším.",
  "Dnes, zajtra aj vždy: si pre mňa výnimočná.",
  "Tvoj smiech patrí medzi moje najobľúbenejšie zvuky.",
  "Si dôkaz, že tie najkrajšie veci prichádzajú potichu.",
  "Pri tebe sa aj bežný deň cíti ako malý sviatok."
];
let complimentIndex = 0;
let noButtonMoves = 0;

function createHeart(amount = 1) {
  if (reduceMotion) return;

  for (let index = 0; index < amount; index += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.22 ? "♥" : "✦";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${14 + Math.random() * 20}px`;
    heart.style.animationDuration = `${5 + Math.random() * 5}s`;
    heart.style.animationDelay = `${Math.random() * 1.5}s`;
    heartLayer.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
}

function moveNoButton() {
  const areaRect = gameArea.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();
  const maxX = Math.max(0, areaRect.width - buttonRect.width - 8);
  const maxY = 55;
  const nextX = Math.round(Math.random() * maxX);
  const nextY = Math.round((Math.random() * maxY * 2) - maxY);

  noButton.style.position = "absolute";
  noButton.style.left = `${nextX}px`;
  noButton.style.top = `calc(50% + ${nextY}px)`;
  noButton.style.transform = "translateY(-50%)";
  noButtonMoves += 1;

  const hints = [
    "Ups, toto tlačidlo sa nechce nechať chytiť.",
    "Naozaj si si tým istá? Skús radšej to ružové. ♥",
    "To „Nie” je veľmi hanblivé...",
    "Myslím, že správna odpoveď má tvar srdiečka."
  ];
  gameHint.textContent = hints[Math.min(noButtonMoves - 1, hints.length - 1)];
  createHeart(2);
}

function showCelebration() {
  celebration.classList.remove("is-hidden");
  document.body.style.overflow = "hidden";
  createConfetti();
  createHeart(12);
  closeCelebration.focus();
}

function hideCelebration() {
  celebration.classList.add("is-hidden");
  document.body.style.overflow = "";
  yesButton.focus();
}

function createConfetti() {
  if (reduceMotion) return;

  const colors = ["#df5d88", "#f2b5c6", "#c48bdf", "#f4c86c", "#fff"];
  for (let index = 0; index < 50; index += 1) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[index % colors.length];
    piece.style.setProperty("--drift", `${-120 + Math.random() * 240}px`);
    piece.style.animationDelay = `${Math.random() * 0.45}s`;
    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

loveNoteButton.addEventListener("click", () => {
  const isHidden = loveNote.classList.contains("is-hidden");
  loveNote.classList.toggle("is-hidden");
  loveNoteButton.querySelector("span").textContent = isHidden ? "Moje srdce je otvorené" : "Otvor moje srdce";
  createHeart(5);
  if (isHidden) loveNote.scrollIntoView({ behavior: "smooth", block: "center" });
});

noButton.addEventListener("pointerenter", moveNoButton);
noButton.addEventListener("click", moveNoButton);
yesButton.addEventListener("click", showCelebration);
closeCelebration.addEventListener("click", hideCelebration);
moreHeartsButton.addEventListener("click", () => {
  createConfetti();
  createHeart(20);
});

celebration.addEventListener("click", (event) => {
  if (event.target === celebration) hideCelebration();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !celebration.classList.contains("is-hidden")) hideCelebration();
});

complimentButton.addEventListener("click", () => {
  complimentIndex = (complimentIndex + 1) % compliments.length;
  compliment.textContent = compliments[complimentIndex];
  complimentButton.animate(
    [{ transform: "scale(1)" }, { transform: "scale(1.18) rotate(15deg)" }, { transform: "scale(1)" }],
    { duration: 360, easing: "ease-out" }
  );
  createHeart(4);
});

shareButton.addEventListener("click", async () => {
  const shareData = {
    title: "Pre Anetu, s láskou",
    text: "Aneta, si môj najkrajší dôvod na úsmev. ♥",
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      shareButton.textContent = "Skopírované! ♥";
      setTimeout(() => { shareButton.textContent = "Pošli si túto lásku ↗"; }, 2000);
    }
  } catch (error) {
    if (error.name !== "AbortError") console.error("Zdieľanie sa nepodarilo:", error);
  }
});

if (!reduceMotion) {
  createHeart(7);
  window.setInterval(() => createHeart(1), 2200);
}
