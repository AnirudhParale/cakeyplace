function showSection(sectionId) {
  document.getElementById('homepage').style.display = 'none';
  document.getElementById('cake-builder').style.display = 'none';
  document.getElementById('memory-match').style.display = 'none';

  document.getElementById(sectionId).style.display = 'block';

  if (sectionId === 'memory-match' && document.getElementById('cardGrid').children.length === 0) {
    createCardGrid();
  }
}

function showMessage(shape) {
  const messageEl = document.getElementById('cake-message');
  if (shape === 'heart') {
    messageEl.textContent = "Good at baking hearts, aren't you?";
  } else if (shape === 'circle') {
    messageEl.textContent = "Cute cakey, not better than yours tho! 😉";
  } else if (shape === 'square') {
    messageEl.textContent = "Forget the cake, Can I have you for the take away? 🌸";
  }
}

document.querySelectorAll('[draggable=true]').forEach(el => {
  el.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', e.target.textContent);
  });
});

function handleDrop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  const newItem = document.createElement('div');
  newItem.textContent = data;
  e.currentTarget.appendChild(newItem);
}

const emojis = ['🍓', '🍫', '🍍', '🍦', '🧈', '🍒', '🥭', '🍰'];
const cards = [...emojis, ...emojis];
let flipped = [];
let matched = [];

function shuffle(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

function createCardGrid() {
  const grid = document.getElementById('cardGrid');
  const shuffled = shuffle(cards);
  shuffled.forEach((emoji, idx) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.emoji = emoji;
    card.dataset.index = idx;
    card.textContent = '❓';
    card.onclick = () => flipCard(card);
    grid.appendChild(card);
  });
}

function flipCard(card) {
  if (flipped.length === 2 || matched.includes(card.dataset.index)) return;
  card.textContent = card.dataset.emoji;
  flipped.push(card);

  if (flipped.length === 2) {
    const [a, b] = flipped;
    if (a.dataset.emoji === b.dataset.emoji) {
      matched.push(a.dataset.index, b.dataset.index);
      a.classList.add('matched');
      b.classList.add('matched');
      if (matched.length === cards.length) {
        document.getElementById('matchMessage').textContent = "Perfect match! Just like us 💕";
      }
    } else {
      setTimeout(() => {
        a.textContent = '❓';
        b.textContent = '❓';
      }, 1000);
    }
    flipped = [];
  }
}
