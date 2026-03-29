let cards = [];
let index = 0;
let flipped = false;

function renderCard() {
  const card = cards[index];
  document.getElementById('topicTitle').textContent = card.topicName;
  document.getElementById('cardCounter').textContent = `Card ${index + 1} of ${cards.length}`;
  document.getElementById('frontText').textContent = card.front;
  document.getElementById('backText').textContent = card.back;
  const outer = document.getElementById('flashcard');
  outer.classList.toggle('flip', flipped);
}
function toggleFlip() { flipped = !flipped; renderCard(); }
function nextCard() { index = (index + 1) % cards.length; flipped = false; renderCard(); }
function prevCard() { index = (index - 1 + cards.length) % cards.length; flipped = false; renderCard(); }

document.addEventListener('DOMContentLoaded', async () => {
  const topic = getSelectedTopic();
  const res = await fetch(`data/${topic}.json`);
  cards = await res.json();
  markTopicVisited(topic);
  renderCard();
  document.getElementById('flashcard').addEventListener('click', toggleFlip);
  document.getElementById('flipBtn').addEventListener('click', toggleFlip);
  document.getElementById('nextBtn').addEventListener('click', nextCard);
  document.getElementById('prevBtn').addEventListener('click', prevCard);
});
