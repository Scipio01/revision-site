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
    
    const filteredTopics = topics.filter(t => t.level === level);
    
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
            ${topic.id === 'datarep' || topic.id === 'datatransmission'
              ? `<a class="btn-primary button" href="data-representation.html">Open topic</a>`
              : `
                <a class="btn-primary button" href="flashcards.html" data-topic="${topic.id}">Flashcards</a>
                <a class="btn-secondary button" href="quiz.html" data-topic="${topic.id}">Quiz</a>
                ${topic.hasPractice ? `<a class="btn-secondary button" href="practice.html?topic=${topic.id}" data-topic="${topic.id}">Practice</a>` : ''}
              `
            }
          </div>
        `;
        div.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setSelectedTopic(topic.id)));
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
    
      renderGroup('Paper 1', paper1);
      renderGroup('Paper 2', paper2);
    }

  
});
