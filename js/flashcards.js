let cards = [];
let index = 0;
let flipped = false;

function renderCard() {
  if (!cards.length) return;
  const card = cards[index];
  document.getElementById('topicTitle').textContent = card.topicName;
  document.getElementById('cardCounter').textContent = `Card ${index + 1} of ${cards.length}`;
  document.getElementById('frontText').innerHTML = card.front;
  document.getElementById('backText').innerHTML = card.back;
  const outer = document.getElementById('flashcard');
  outer.classList.toggle('flip', flipped);
}
function toggleFlip() { flipped = !flipped; renderCard(); }
function nextCard() { index = (index + 1) % cards.length; flipped = false; renderCard(); }
function prevCard() { index = (index - 1 + cards.length) % cards.length; flipped = false; renderCard(); }

async function showPracticeLinkIfAvailable(topic) {
  const metaRes = await fetch('data/topics.json');
  const topics = await metaRes.json();
  const topicMeta = topics.find(item => item.id === topic);
  if (topicMeta?.hasPractice) {
    document.getElementById('practiceLink').style.display = 'inline-flex';
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const topic = getSelectedTopic();
  document.getElementById('quizLink').href = `quiz.html?topic=${topic}`;
  const res = await fetch(`data/${topic}.json`);
  cards = await res.json();
  markTopicVisited(topic);
  renderCard();
  await showPracticeLinkIfAvailable(topic);
  document.getElementById('flashcard').addEventListener('click', toggleFlip);
  document.getElementById('flipBtn').addEventListener('click', toggleFlip);
  document.getElementById('nextBtn').addEventListener('click', nextCard);
  document.getElementById('prevBtn').addEventListener('click', prevCard);
});
