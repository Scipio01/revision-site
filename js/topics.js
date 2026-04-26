document.addEventListener('DOMContentLoaded', async () => {
  const wrap = document.getElementById('topicsList');
  const levelLabel = document.getElementById('levelLabel');
  const level = getSelectedLevel();
  const params = new URLSearchParams(window.location.search);
  const selectedPaper = params.get('paper');

    if (level === 'gcse' && selectedPaper === 'paper1') {
    levelLabel.textContent = 'GCSE Paper 1';
  } else if (level === 'gcse' && selectedPaper === 'paper2') {
    levelLabel.textContent = 'GCSE Paper 2';
  } else {
    levelLabel.textContent = level === 'alevel' ? 'A Level' : 'GCSE';
  }

  
  document.getElementById('gcseSwitch').classList.toggle('active', level === 'gcse');
  document.getElementById('alevelSwitch').classList.toggle('active', level === 'alevel');

  document.getElementById('gcseSwitch').addEventListener('click', () => setSelectedLevel('gcse'));
  document.getElementById('alevelSwitch').addEventListener('click', () => setSelectedLevel('alevel'));

  const res = await fetch('data/topics.json');
  const topics = await res.json();

  wrap.innerHTML = '';

  const filteredTopics = topics.filter(t => t.level === level && t.id !== 'databases');

  if (level === 'gcse') {
    const paper1 = filteredTopics.filter(t => t.group === 'paper1');
    const paper2 = filteredTopics.filter(t => t.group === 'paper2');

    function renderTopicCard(topic) {
      const div = document.createElement('div');
      div.className = 'topic-card';

      div.innerHTML = `
        <span class="badge">${topic.level === 'alevel' ? 'A Level' : 'GCSE'}</span>
        <h3>${topic.name}</h3>
        <p class="muted">${topic.description}</p>
        <div class="actions">
          ${
            topic.id === 'datarep' ||
            topic.id === 'datatransmission' ||
            topic.id === 'hardware1' ||
            topic.id === 'hardware2' ||
            topic.id === 'hardware3' ||
            topic.id === 'hardware4' ||
            topic.id === 'software' ||
            topic.id === 'internet' ||
            topic.id === 'emerging' ||
            topic.id === 'algorithms' ||
            topic.id === 'programming' ||
            topic.id === 'programming2' ||
            topic.id === 'testingtracetables'
              ? `<a class="btn-primary button" href="${
                  topic.id === 'datarep'
                    ? 'data-representation.html'
                    : topic.id === 'datatransmission'
                    ? 'data-transmission.html'
                    : topic.id === 'hardware1'
                    ? 'hardware1.html'
                    : topic.id === 'hardware2'
                    ? 'hardware2.html'
                    : topic.id === 'hardware3'
                    ? 'hardware3.html'
                    : topic.id === 'hardware4'
                    ? 'hardware4.html'
                    : topic.id === 'internet'
                    ? 'internet.html'
                    : topic.id === 'emerging'
                    ? 'emerging.html'
                   : topic.id === 'algorithms'
                    ? 'algorithms.html'
                   : topic.id === 'testingtracetables'
                    ? 'testing-trace-tables.html'
                    : topic.id === 'programming'
                    ? 'programming.html'
                    : topic.id === 'programming2'
                    ? 'programming2.html'
                    : topic.id === 'programming3'
                    ? 'programming3.html'


                
                    : 'software.html'
                }">Open topic</a>`
              : `
        <a class="btn-primary button" href="flashcards.html" data-topic="${topic.id}">Flashcards</a>
        <a class="btn-secondary button" href="quiz.html" data-topic="${topic.id}">Quiz</a>
        ${topic.hasPractice ? `<a class="btn-secondary button" href="practice.html?topic=${topic.id}" data-topic="${topic.id}">Practice</a>` : ''}
              `
          }
        </div>
      `;

      div.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => setSelectedTopic(topic.id))
      );

      return div;
    }

    function renderGroup(title, topicList) {
      const section = document.createElement('div');
      section.style.marginBottom = '30px';
      section.style.width = '100%';

      const heading = document.createElement('h2');
      heading.textContent = title;
      heading.style.margin = '24px 0 12px';

      section.appendChild(heading);

      const grid = document.createElement('div');
      grid.className = 'grid';

      topicList.forEach(topic => {
        grid.appendChild(renderTopicCard(topic));
      });

      section.appendChild(grid);
      wrap.appendChild(section);
    }

    if (selectedPaper === 'paper1') {
  renderGroup('Paper 1', paper1);
} else if (selectedPaper === 'paper2') {
  renderGroup('Paper 2', paper2);
} else {
  renderGroup('Paper 1', paper1);
  renderGroup('Paper 2', paper2);
}
  }
});
