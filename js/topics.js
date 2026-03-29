document.addEventListener('DOMContentLoaded', async () => {
  const wrap = document.getElementById('topicsList');
  const levelLabel = document.getElementById('levelLabel');
  const level = getSelectedLevel();
  levelLabel.textContent = level.toUpperCase();
  const res = await fetch('data/topics.json');
  const topics = await res.json();
  wrap.innerHTML = '';
  topics.filter(t => t.level === level).forEach(topic => {
    const div = document.createElement('div');
    div.className = 'topic-card';
    div.innerHTML = `
      <span class="badge">${topic.level.toUpperCase()}</span>
      <h3>${topic.name}</h3>
      <p class="muted">${topic.description}</p>
      <div class="actions">
        <a class="btn-primary" href="flashcards.html" data-topic="${topic.id}">Flashcards</a>
        <a href="quiz.html" data-topic="${topic.id}">Quiz</a>
      </div>
    `;
    div.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setSelectedTopic(topic.id)));
    wrap.appendChild(div);
  });
});
