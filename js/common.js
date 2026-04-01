const THEMES = ['theme-ocean', 'theme-forest', 'theme-lilac', 'theme-warm'];

function setTheme(theme) {
  document.body.classList.remove(...THEMES);
  if (theme && THEMES.includes(theme)) document.body.classList.add(theme);
  localStorage.setItem('theme', theme || 'theme-ocean');
}

function setMode(mode) {
  document.body.classList.toggle('dark', mode === 'dark');
  localStorage.setItem('mode', mode);
  const label = document.getElementById('modeLabel');
  if (label) label.textContent = mode === 'dark' ? 'Dark' : 'Light';
}

function setActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('active');
  });
}

function initChrome() {
  const savedTheme = localStorage.getItem('theme') || 'theme-ocean';
  const savedMode = localStorage.getItem('mode') || 'light';
  setTheme(savedTheme);
  setMode(savedMode);
  setActiveNav();

  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) {
    themeSelect.value = savedTheme;
    themeSelect.addEventListener('change', e => setTheme(e.target.value));
  }
  const modeBtn = document.getElementById('modeToggle');
  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      const next = document.body.classList.contains('dark') ? 'light' : 'dark';
      setMode(next);
    });
  }
}

function getSelectedLevel() {
  return localStorage.getItem('selectedLevel') || 'gcse';
}
function setSelectedLevel(level) {
  localStorage.setItem('selectedLevel', level);
}
function setSelectedTopic(topicId) {
  localStorage.setItem('selectedTopic', topicId);
}

function getSelectedTopic() {
  const params = new URLSearchParams(window.location.search);
  const topicFromUrl = params.get('topic');

  if (topicFromUrl) {
    localStorage.setItem('selectedTopic', topicFromUrl);
    return topicFromUrl;
  }

  return localStorage.getItem('selectedTopic') || 'networks';
}

function formatTopicName(topicId) {
  return topicId
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getProgress() {
  return JSON.parse(localStorage.getItem('revisionProgress') || '{}');
}
function saveProgress(progress) {
  localStorage.setItem('revisionProgress', JSON.stringify(progress));
}
function markTopicVisited(topicId) {
  const progress = getProgress();
  progress.lastTopic = topicId;
  if (!progress.topics) progress.topics = {};
  if (!progress.topics[topicId]) {
    progress.topics[topicId] = { viewed: 0, bestQuiz: 0, bestPercent: 0, completed: false, attempts: 0 };
  }
  progress.topics[topicId].viewed += 1;
  saveProgress(progress);
}
function saveQuizScore(topicId, score, total) {
  const progress = getProgress();
  if (!progress.topics) progress.topics = {};
  if (!progress.topics[topicId]) {
    progress.topics[topicId] = { viewed: 0, bestQuiz: 0, bestPercent: 0, completed: false, attempts: 0 };
  }
  const percent = Math.round((score / total) * 100);
  progress.topics[topicId].bestQuiz = Math.max(progress.topics[topicId].bestQuiz || 0, score);
  progress.topics[topicId].bestPercent = Math.max(progress.topics[topicId].bestPercent || 0, percent);
  progress.topics[topicId].lastScore = `${score}/${total}`;
  progress.topics[topicId].lastPercent = percent;
  progress.topics[topicId].completed = score === total;
  progress.topics[topicId].attempts = (progress.topics[topicId].attempts || 0) + 1;
  saveProgress(progress);
}
function clearAllProgress() {
  localStorage.removeItem('revisionProgress');
  location.reload();
}

document.addEventListener('DOMContentLoaded', initChrome);
