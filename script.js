const terminal = document.getElementById("terminal");
const input = document.getElementById("input");
const output = document.getElementById("output");
const introTitle = document.getElementById("intro-title");
const canvas = document.getElementById("butterfly-canvas");
const ctx = canvas.getContext("2d");

// 🦋 Resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 🦋 Floating butterflies (soft pastel)
let butterflies = [];
for (let i = 0; i < 20; i++) {
  butterflies.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 8 + Math.random() * 8,
    speed: 0.3 + Math.random() * 0.6,
    color: `hsla(${280 + Math.random() * 40}, 80%, 85%, 0.9)`,
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  butterflies.forEach((b) => {
    ctx.beginPath();
    ctx.ellipse(b.x, b.y, b.size, b.size / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = b.color;
    ctx.fill();

    b.y -= b.speed;
    b.x += Math.sin(b.y / 20) * 0.5;

    if (b.y < -10) b.y = canvas.height + 10;
  });
  requestAnimationFrame(animate);
}
animate();

// === Terminal logic ===
function print(text) {
  output.innerHTML += text + "\n";
  terminal.scrollTop = terminal.scrollHeight;
}

function clearButterflies() {
  butterflies = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// === Commands ===
const commands = {
  help: "✨ Try these commands:\n- journey\n- creations\n- energy\n- inspiration\n- mystery\n- exit\n",
  journey: "Prachi’s soft codepath — a mix of art, backend magic, and dreams unfolding softly 🌸",
  creations: "Lists your projects or experiments:\n✨ UNILEVER, ARIZONA, HCSC 🌐 DreamAPI ☕ cakes and cookies 🍜 amazing Chinese & continental cook 🎨 can try hands on craft & art ✏️ beautiful sketcher — each built with magic and logic.",
  energy: "💫 Balanced — code, calm, chai, and cosmic vibes.",
  inspiration: "‘Elegance is when logic meets poetry.’",
  mystery: "🦋 You’ve always been the enigma — gracefully simple, endlessly deep.",
  exit: "Goodbye for now... 🌙",
};

// === Enter Key Handling ===
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && introTitle.style.display !== "none") {
    introTitle.style.display = "none";
    terminal.classList.remove("hidden");
    clearButterflies();
    print(commands.help);
  } else if (event.key === "Enter" && input.value.trim() !== "") {
    handleCommand(input.value.trim().toLowerCase());
    input.value = "";
  }
});

function handleCommand(cmd) {
  print(`> ${cmd}`);
  if (commands[cmd]) {
    print(commands[cmd]);
  } else {
    print("Command not found. Type 'help' to see options.\n");
  }
}

// === Mobile Detection ===
const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

if (isMobile) {
  introTitle.textContent = "If you’re curious, tap below to explore the unknown...";

  const exploreBtn = document.createElement("button");
  exploreBtn.textContent = "✨ Tap to Explore ✨";
  exploreBtn.classList.add("explore-btn");
  document.getElementById("intro").appendChild(exploreBtn);

  exploreBtn.addEventListener("click", () => {
    terminal.classList.remove("hidden");
    introTitle.style.display = "none";
    exploreBtn.style.display = "none";
    clearButterflies();
    print(commands.help);
  });
}
