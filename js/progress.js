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
      <h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3>
      <p>Views: <strong>${item.viewed || 0}</strong></p>
      <p>Best quiz score: <strong>${item.bestQuiz ?? 0}</strong></p>
      <p>Last score: <strong>${item.lastScore || '—'}</strong></p>
      <p>Status: <strong>${item.completed ? 'Completed perfectly' : 'In progress'}</strong></p>
    `;
    wrap.appendChild(div);
  });
  document.getElementById('lastTopic').textContent = progress.lastTopic || '—';
  document.getElementById('clearProgressBtn').addEventListener('click', clearAllProgress);
});
