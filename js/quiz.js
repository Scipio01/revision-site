let questions = [];
let current = 0;
let score = 0;
let answered = false;

function shuffle(array) {
  return array.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function updateStatus() {
  document.getElementById('quizCounter').textContent = `Question ${current + 1} of ${questions.length}`;
  document.getElementById('scoreLive').textContent = score;
  document.getElementById('answeredLive').textContent = current;
  document.getElementById('totalLive').textContent = questions.length;
  document.getElementById('progressFill').style.width = `${(current / questions.length) * 100}%`;
}

function renderQuestion() {
  const q = questions[current];
  document.getElementById('quizTitle').textContent = q.topicName;
  document.getElementById('questionText').innerHTML = q.mcq.question.replace(/\n/g, '<br>');
  document.getElementById('feedback').className = 'feedback-box muted';
  document.getElementById('feedback').textContent = 'Choose the best answer to unlock the next question.';
  const optionsWrap = document.getElementById('options');
  optionsWrap.innerHTML = '';
  answered = false;
  document.getElementById('nextQuestionBtn').disabled = true;
  document.getElementById('nextHint').textContent = 'Choose an answer';
  shuffle([q.mcq.correct, ...q.mcq.wrong]).forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = option;
    btn.addEventListener('click', () => chooseAnswer(btn, option, q.mcq.correct));
    optionsWrap.appendChild(btn);
  });
  updateStatus();
}

function chooseAnswer(button, selected, correct) {
  if (answered) return;
  answered = true;
  const feedback = document.getElementById('feedback');
  const options = [...document.querySelectorAll('.quiz-option')];
  options.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.classList.add('correct');
  });
  if (selected === correct) {
    score += 1;
    button.classList.add('correct');
    feedback.textContent = 'Correct. Nice work.';
    feedback.className = 'feedback-box correct';
  } else {
    button.classList.add('incorrect');
    feedback.textContent = `Not quite. Correct answer: ${correct}`;
    feedback.className = 'feedback-box incorrect';
  }
  document.getElementById('answeredLive').textContent = current + 1;
  document.getElementById('scoreLive').textContent = score;
  document.getElementById('nextHint').textContent = current === questions.length - 1 ? 'Finish quiz' : 'Go to next question';
  document.getElementById('nextQuestionBtn').disabled = false;
}

function getResultMessage(percent) {
  if (percent === 100) return 'Excellent — full marks.';
  if (percent >= 80) return 'Strong result — you are close to secure recall.';
  if (percent >= 60) return 'Good start — a quick flashcard pass should help.';
  return 'Worth revisiting the flashcards before trying again.';
}

function nextQuestion() {
  if (!answered) return;
  if (current < questions.length - 1) {
    current += 1;
    renderQuestion();
  } else {
    const topic = getSelectedTopic();
    saveQuizScore(topic, score, questions.length);
    const percent = Math.round((score / questions.length) * 100);
    document.getElementById('quizArea').innerHTML = `
      <section class="panel center">
        <div class="kicker">Quiz complete</div>
        <h2>${formatTopicName(topic)}</h2>
        <div class="result-score">${score}/${questions.length}</div>
        <p><strong>${percent}%</strong> correct</p>
        <p class="muted">${getResultMessage(percent)}</p>
        <div class="summary-grid" style="margin-top:18px;">
          <div class="mini-card"><h3>Best use now</h3><p>Review any weak terms, then retake the quiz.</p></div>
          <div class="mini-card"><h3>Stored locally</h3><p>Your best score and latest attempt have been saved on this device.</p></div>
        </div>
       <div class="actions" style="justify-content:center; margin-top:18px;">
  <a class="btn-primary button" href="progress.html">View progress</a>
  ${
    topic !== 'tracetables'
      ? `<a class="btn-secondary button" href="flashcards.html">Back to flashcards</a>`
      : ''
  }
  <a class="btn-secondary button" href="quiz.html" onclick="location.reload()">Try again</a>
</div>
      </section>
    `;
  }
}

async function showPracticeLinkIfAvailable(topic) {
  const metaRes = await fetch('data/topics.json');
  const topics = await metaRes.json();
  const topicMeta = topics.find(item => item.id === topic);

  if (topicMeta?.hasPractice) {
    const practiceLink = document.getElementById('practiceLink');
    practiceLink.style.display = 'inline-flex';
    practiceLink.href = `practice.html?topic=${topic}`;
  }
}



document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const topic = params.get('topic') || getSelectedTopic();
  document.getElementById('practiceLink').href = `practice.html?topic=${topic}`;

  const res = await fetch(`data/${topic}-quiz.json`);
  questions = await res.json();
  renderQuestion();
  await showPracticeLinkIfAvailable(topic);
  document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);
});
