const emojis = ['🐶', '🐱', '🐰', '🐸', '🦊', '🐻', '🐼', '🐷'];
let cards = [...emojis, ...emojis]; // pares
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const gameBoard = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCard(emoji) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">${emoji}</div>
      <div class="card-back">❓</div>
    </div>
  `;

  card.addEventListener('click', () => flipCard(card, emoji));
  return card;
}

function flipCard(card, emoji) {
  if (lockBoard || card.classList.contains('flip')) return;

  card.classList.add('flip');

  if (!firstCard) {
    firstCard = { card, emoji };
  } else {
    secondCard = { card, emoji };
    checkMatch();
  }
}

function checkMatch() {
  lockBoard = true;
  const isMatch = firstCard.emoji === secondCard.emoji;

  if (isMatch) {
    resetTurn();
  } else {
    setTimeout(() => {
      firstCard.card.classList.remove('flip');
      secondCard.card.classList.remove('flip');
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function startGame() {
  gameBoard.innerHTML = '';
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  const shuffled = shuffle(cards);
  shuffled.forEach(emoji => {
    const card = createCard(emoji);
    gameBoard.appendChild(card);
  });
}

restartBtn.addEventListener('click', startGame);

startGame();
