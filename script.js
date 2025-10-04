const slotGrid = document.getElementById('slotGrid');
const handle = document.getElementById('handle');
const betAmountDisplay = document.getElementById('betAmount');
const winAmountDisplay = document.getElementById('winAmount');
const increaseBet = document.getElementById('increaseBet');
const decreaseBet = document.getElementById('decreaseBet');

const slotIcons = [
  '🍒', '🍋', '🔔', '💎', '⭐', '🍀'
];

let betAmount = 1;

// Create 18 slot cells
function createGrid() {
  slotGrid.innerHTML = '';
  for (let i = 0; i < 18; i++) {
    const cell = document.createElement('div');
    const icon = document.createElement('img');
    icon.src = getRandomIcon();
    cell.appendChild(icon);
    slotGrid.appendChild(cell);
  }
}

function getRandomIcon() {
  const emoji = slotIcons[Math.floor(Math.random() * slotIcons.length)];
  const canvas = document.createElement('canvas');
  canvas.width = 80;
  canvas.height = 80;
  const ctx = canvas.getContext('2d');
  ctx.font = '60px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, 40, 40);
  return canvas.toDataURL();
}

function spinReels() {
  let spins = 20;
  const interval = setInterval(() => {
    createGrid();
    spins--;
    if (spins === 0) {
      clearInterval(interval);
      calculateWin();
      handle.classList.remove('pulled');
    }
  }, 100);
}

function calculateWin() {
  // Simple win logic: if 3+ matching icons in a row
  const icons = Array.from(slotGrid.children).map(cell => cell.firstChild.src);
  const counts = {};
  icons.forEach(src => {
    counts[src] = (counts[src] || 0) + 1;
  });

  let win = 0;
  for (let src in counts) {
    if (counts[src] >= 3) {
      win += betAmount * counts[src];
    }
  }

  winAmountDisplay.textContent = `$${win}`;
}

handle.addEventListener('click', () => {
  handle.classList.add('pulled');
  spinReels();
});

increaseBet.addEventListener('click', () => {
  betAmount += 1;
  betAmountDisplay.textContent = `$${betAmount}`;
});

decreaseBet.addEventListener('click', () => {
  if (betAmount > 1) {
    betAmount -= 1;
    betAmountDisplay.textContent = `$${betAmount}`;
  }
});

createGrid();
