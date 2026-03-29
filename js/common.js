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

function initChrome() {
  const savedTheme = localStorage.getItem('theme') || 'theme-ocean';
  const savedMode = localStorage.getItem('mode') || 'light';
  setTheme(savedTheme);
  setMode(savedMode);

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
  return localStorage.getItem('selectedTopic') || 'networks';
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
  if (!progress.topics[topicId]) progress.topics[topicId] = { viewed: 0, bestQuiz: 0, completed: false };
  progress.topics[topicId].viewed += 1;
  saveProgress(progress);
}
function saveQuizScore(topicId, score, total) {
  const progress = getProgress();
  if (!progress.topics) progress.topics = {};
  if (!progress.topics[topicId]) progress.topics[topicId] = { viewed: 0, bestQuiz: 0, completed: false };
  progress.topics[topicId].bestQuiz = Math.max(progress.topics[topicId].bestQuiz || 0, score);
  progress.topics[topicId].lastScore = `${score}/${total}`;
  progress.topics[topicId].completed = score === total;
  saveProgress(progress);
}
function clearAllProgress() {
  localStorage.removeItem('revisionProgress');
  location.reload();
}

document.addEventListener('DOMContentLoaded', initChrome);
