let questions = [];
let current = 0;
let score = 0;
let answered = false;

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function renderQuestion() {
  const q = questions[current];
  document.getElementById('quizTitle').textContent = q.topicName;
  document.getElementById('quizCounter').textContent = `Question ${current + 1} of ${questions.length}`;
  document.getElementById('questionText').textContent = q.mcq.question;
  document.getElementById('feedback').textContent = '';
  const optionsWrap = document.getElementById('options');
  optionsWrap.innerHTML = '';
  answered = false;
  shuffle([q.mcq.correct, ...q.mcq.wrong]).forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = option;
    btn.addEventListener('click', () => chooseAnswer(btn, option, q.mcq.correct));
    optionsWrap.appendChild(btn);
  });
}

function chooseAnswer(button, selected, correct) {
  if (answered) return;
  answered = true;
  const options = [...document.querySelectorAll('.quiz-option')];
  options.forEach(btn => {
    if (btn.textContent === correct) btn.classList.add('correct');
  });
  if (selected === correct) {
    score += 1;
    button.classList.add('correct');
    document.getElementById('feedback').textContent = 'Correct.';
  } else {
    button.classList.add('incorrect');
    document.getElementById('feedback').textContent = `Not quite. Correct answer: ${correct}`;
  }
}

function nextQuestion() {
  if (current < questions.length - 1) {
    current += 1;
    renderQuestion();
  } else {
    const topic = getSelectedTopic();
    saveQuizScore(topic, score, questions.length);
    document.getElementById('quizArea').innerHTML = `
      <div class="panel center">
        <h2>Quiz complete</h2>
        <p>Your score: <strong>${score}/${questions.length}</strong></p>
        <div class="actions" style="justify-content:center;">
          <a class="btn-primary" href="progress.html">View Progress</a>
          <a href="quiz.html" onclick="location.reload()">Try Again</a>
        </div>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const topic = getSelectedTopic();
  const res = await fetch(`data/${topic}.json`);
  questions = await res.json();
  renderQuestion();
  document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);
});
