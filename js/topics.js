document.addEventListener('DOMContentLoaded', async () => {
  const wrap = document.getElementById('topicsList');
  const levelLabel = document.getElementById('levelLabel');
  const level = getSelectedLevel();
  levelLabel.textContent = level === 'alevel' ? 'A Level' : 'GCSE';
  document.getElementById('gcseSwitch').classList.toggle('active', level === 'gcse');
  document.getElementById('alevelSwitch').classList.toggle('active', level === 'alevel');
  document.getElementById('gcseSwitch').addEventListener('click', () => setSelectedLevel('gcse'));
  document.getElementById('alevelSwitch').addEventListener('click', () => setSelectedLevel('alevel'));

  const res = await fetch('data/topics.json');
  const topics = await res.json();
  wrap.innerHTML = '';
  topics.filter(t => t.level === level).forEach(topic => {
    const div = document.createElement('div');
    div.className = 'topic-card';
    div.innerHTML = `
      <span class="badge">${topic.level === 'alevel' ? 'A Level' : 'GCSE'}</span>
      <h3>${topic.name}</h3>
      <p class="muted">${topic.description}</p>
      <div class="actions">
        <a class="btn-primary button" href="flashcards.html" data-topic="${topic.id}">Flashcards</a>
        <a class="btn-secondary button" href="quiz.html" data-topic="${topic.id}">Quiz</a>
        ${topic.hasPractice ? `<a class="btn-secondary button" href="practice.html" data-topic="${topic.id}">Practice</a>` : ''}
      </div>
    `;
    div.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setSelectedTopic(topic.id)));
    wrap.appendChild(div);
  });
});
