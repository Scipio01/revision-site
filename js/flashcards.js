let cards = [];
let index = 0;
let flipped = false;
let topicDisplayName = "Topic";


function renderCard() {
  if (!cards.length) return;
  const card = cards[index];
  document.getElementById('topicTitle').textContent = topicDisplayName;
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
  const practiceLink = document.getElementById('practiceLink');
  const flowchartsLink = document.getElementById('flowchartsPracticeLink');
  const pseudocodeLink = document.getElementById('pseudocodePracticeLink');
  const standardAlgorithmsLink = document.getElementById('standardAlgorithmsPracticeLink');

  if (practiceLink) practiceLink.style.display = 'none';
  if (flowchartsLink) flowchartsLink.style.display = 'none';
  if (pseudocodeLink) pseudocodeLink.style.display = 'none';
  if (standardAlgorithmsLink) standardAlgorithmsLink.style.display = 'none';

  if (topic === 'algorithms') {
    flowchartsLink.style.display = 'inline-flex';
    pseudocodeLink.style.display = 'inline-flex';
    standardAlgorithmsLink.style.display = 'inline-flex';
    return;
  }

  const metaRes = await fetch('data/topics.json');
  const topics = await metaRes.json();
  const topicMeta = topics.find(item => item.id === topic);

  if (topicMeta?.hasPractice) {
    practiceLink.style.display = 'inline-flex';
    practiceLink.href = `practice.html?topic=${topic}`;
  }
}

async function getTopicDisplayName(topic) {
  const metaRes = await fetch('data/topics.json');
  const topics = await metaRes.json();
  return topics.find(item => item.id === topic)?.name || topic;
}

document.addEventListener('DOMContentLoaded', async () => {
  const topic = getSelectedTopic();

topicDisplayName = await getTopicDisplayName(topic);
document.getElementById('quizLink').href = `quiz.html?topic=${topic}`;
document.getElementById('practiceLink').href = `practice.html?topic=${topic}`;
const res = await fetch(`data/${topic}.json`);
cards = await res.json();

if (cards.length && cards[0].topicName) {
  topicDisplayName = cards[0].topicName;
}

document.getElementById('topicTitle').textContent = topicDisplayName;

  
  markTopicVisited(topic);
  renderCard();
  await showPracticeLinkIfAvailable(topic);
  document.getElementById('flashcard').addEventListener('click', toggleFlip);
  document.getElementById('flipBtn').addEventListener('click', toggleFlip);
  document.getElementById('nextBtn').addEventListener('click', nextCard);
  document.getElementById('prevBtn').addEventListener('click', prevCard);
});
