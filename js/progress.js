document.addEventListener('DOMContentLoaded', () => {
  const progress = getProgress();
  const topics = progress.topics || {};
  const wrap = document.getElementById('progressGrid');
  const keys = Object.keys(topics);
  if (!keys.length) {
    wrap.innerHTML = '<div class="panel"><p>No progress saved yet. Try a flashcard set or quiz first.</p></div>';
    return;
  }
  wrap.innerHTML = '';
  keys.forEach(key => {
    const item = topics[key];
    const div = document.createElement('div');
    div.className = 'stat';
    div.innerHTML = `
      <h3>${formatTopicName(key)}</h3>
      <p>Views: <strong>${item.viewed || 0}</strong></p>
      <p>Attempts: <strong>${item.attempts || 0}</strong></p>
      <p>Best quiz score: <strong>${item.bestQuiz ?? 0}</strong></p>
      <p>Best percentage: <strong>${item.bestPercent ?? 0}%</strong></p>
      <p>Last score: <strong>${item.lastScore || '—'}</strong></p>
      <p>Status: <strong>${item.completed ? 'Completed perfectly' : 'In progress'}</strong></p>
      <div class="actions">
        <a class="btn-secondary button" href="flashcards.html" onclick="setSelectedTopic('${key}')">Flashcards</a>
        <a class="btn-primary button" href="quiz.html" onclick="setSelectedTopic('${key}')">Quiz</a>
      </div>
    `;
    wrap.appendChild(div);
  });
  document.getElementById('lastTopic').textContent = progress.lastTopic ? formatTopicName(progress.lastTopic) : '—';
  document.getElementById('clearProgressBtn').addEventListener('click', clearAllProgress);
});
