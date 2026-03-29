
let practiceSet = null;
let currentIndex = 0;
let score = 0;
let checked = false;
let currentDifficulty = 'easy';

function normaliseAnswer(value) {
  return value.trim().replace(/\s+/g, '');
}

function getDifficultyConfig(level) {
  if (level === 'hard') {
    return {
      count: 10,
      max: 255,
      allowPad8: true,
      label: 'Hard',
      instructions: 'Hard mixes larger values up to 255. Binary answers can be written with or without leading zeroes.'
    };
  }
  if (level === 'medium') {
    return {
      count: 10,
      max: 63,
      allowPad8: false,
      label: 'Medium',
      instructions: 'Medium mixes denary to binary and binary to denary with values up to 63.'
    };
  }
  return {
    count: 10,
    max: 15,
    allowPad8: false,
    label: 'Easy',
    instructions: 'Easy uses smaller values up to 15 so you can focus on place value.'
  };
}

function makeBinaryQuestion(value, config) {
  const binary = value.toString(2);
  const padded = value.toString(2).padStart(8, '0');
  const accepted = config.allowPad8 ? [binary, padded] : [binary];
  return {
    type: 'denary-to-binary',
    prompt: `Convert ${value} to binary.`,
    answer: binary,
    accepted,
    working: `Use binary place values to build ${value}. ${value} in binary is ${binary}${config.allowPad8 ? `, or ${padded} in 8-bit form` : ''}.`
  };
}

function makeDenaryQuestion(value) {
  const binary = value.toString(2);
  return {
    type: 'binary-to-denary',
    prompt: `Convert ${binary} to denary.`,
    answer: String(value),
    accepted: [String(value)],
    working: `Add the binary place values shown by the 1s. ${binary} = ${value}.`
  };
}

function buildBinaryPracticeSet(difficulty) {
  const config = getDifficultyConfig(difficulty);
  const questions = [];
  for (let i = 0; i < config.count; i += 1) {
    const value = Math.floor(Math.random() * (config.max + 1));
    const useBinaryToDenary = difficulty === 'easy' ? i % 2 === 1 : Math.random() < 0.5;
    questions.push(useBinaryToDenary ? makeDenaryQuestion(value) : makeBinaryQuestion(value, config));
  }
  return {
    topicName: `Binary Systems (${config.label})`,
    instructions: config.instructions,
    questions
  };
}

function updatePracticeStatus() {
  const total = practiceSet.questions.length;
  document.getElementById('practiceCounter').textContent = `Question ${currentIndex + 1} of ${total}`;
  document.getElementById('practiceScore').textContent = score;
  document.getElementById('practiceProgressFill').style.width = `${(currentIndex / total) * 100}%`;
}

function renderPracticeQuestion() {
  const q = practiceSet.questions[currentIndex];
  document.getElementById('practiceTitle').textContent = `${practiceSet.topicName} Practice`;
  document.getElementById('practiceInstructions').textContent = practiceSet.instructions;
  document.getElementById('practiceQuestion').textContent = q.prompt;
  document.getElementById('practiceType').textContent = q.type === 'denary-to-binary' ? 'Denary → Binary' : 'Binary → Denary';
  document.getElementById('practiceAnswer').value = '';
  document.getElementById('practiceFeedback').textContent = 'Enter an answer, then click Check answer.';
  document.getElementById('practiceFeedback').className = 'feedback-box muted';
  document.getElementById('checkAnswerBtn').disabled = false;
  document.getElementById('nextPracticeBtn').disabled = true;
  checked = false;
  updatePracticeStatus();
}

function checkAnswer() {
  if (checked) return;
  const q = practiceSet.questions[currentIndex];
  const input = normaliseAnswer(document.getElementById('practiceAnswer').value);
  const accepted = (q.accepted || [q.answer]).map(normaliseAnswer);
  const feedback = document.getElementById('practiceFeedback');
  if (!input) {
    feedback.textContent = 'Type an answer first.';
    feedback.className = 'feedback-box incorrect';
    return;
  }
  checked = true;
  if (accepted.includes(input)) {
    score += 1;
    feedback.innerHTML = `<strong>Correct.</strong> ${q.working}`;
    feedback.className = 'feedback-box correct';
  } else {
    feedback.innerHTML = `<strong>Not quite.</strong> Correct answer: ${q.answer}. ${q.working}`;
    feedback.className = 'feedback-box incorrect';
  }
  document.getElementById('practiceScore').textContent = score;
  document.getElementById('checkAnswerBtn').disabled = true;
  document.getElementById('nextPracticeBtn').disabled = false;
}

function finishPractice() {
  const total = practiceSet.questions.length;
  const percent = Math.round((score / total) * 100);
  saveQuizScore(`${getSelectedTopic()}-practice-${currentDifficulty}`, score, total);
  document.getElementById('practiceArea').innerHTML = `
    <section class="panel center">
      <div class="kicker">Practice complete</div>
      <h2>${practiceSet.topicName}</h2>
      <div class="result-score">${score}/${total}</div>
      <p><strong>${percent}%</strong> correct</p>
      <p class="muted">Use flashcards to refresh the terms, then try another practice set to improve speed and accuracy.</p>
      <div class="actions" style="justify-content:center; margin-top:18px;">
        <a class="btn-primary button" href="progress.html">View progress</a>
        <a class="btn-secondary button" href="flashcards.html">Back to flashcards</a>
        <a class="btn-secondary button" href="practice.html">Try again</a>
      </div>
    </section>
  `;
}

function nextQuestion() {
  if (!checked) return;
  if (currentIndex < practiceSet.questions.length - 1) {
    currentIndex += 1;
    renderPracticeQuestion();
  } else {
    finishPractice();
  }
}

async function loadPracticeSet() {
  const topic = getSelectedTopic();
  if (topic === 'binary') {
    practiceSet = buildBinaryPracticeSet(currentDifficulty);
    renderPracticeQuestion();
    return;
  }

  const res = await fetch(`data/${topic}-practice.json`);
  if (!res.ok) {
    document.getElementById('practiceArea').innerHTML = `
      <section class="panel center">
        <div class="kicker">Practice not ready</div>
        <h2>${formatTopicName(topic)}</h2>
        <p class="muted">This topic does not have a practice page yet.</p>
        <div class="actions" style="justify-content:center; margin-top:18px;">
          <a class="btn-secondary button" href="topics.html">Back to topics</a>
        </div>
      </section>
    `;
    return;
  }
  practiceSet = await res.json();
  renderPracticeQuestion();
}

function startNewSet() {
  currentIndex = 0;
  score = 0;
  checked = false;
  loadPracticeSet();
}

document.addEventListener('DOMContentLoaded', async () => {
  const topic = getSelectedTopic();
  markTopicVisited(topic);

  const difficultySelect = document.getElementById('difficultySelect');
  const newSetBtn = document.getElementById('newSetBtn');

  if (topic !== 'binary') {
    difficultySelect.closest('.difficulty-wrap').style.display = 'none';
    newSetBtn.style.display = 'none';
  } else {
    difficultySelect.addEventListener('change', (event) => {
      currentDifficulty = event.target.value;
      startNewSet();
    });
    newSetBtn.addEventListener('click', startNewSet);
  }

  await loadPracticeSet();

  document.getElementById('checkAnswerBtn').addEventListener('click', checkAnswer);
  document.getElementById('nextPracticeBtn').addEventListener('click', nextQuestion);
  document.getElementById('practiceAnswer').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (checked) {
        nextQuestion();
      } else {
        checkAnswer();
      }
    }
  });
});
