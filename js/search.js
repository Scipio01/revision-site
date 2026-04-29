// ===== SEARCH-LOGIC-01 =====

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("topicSearch");
  const resultsContainer = document.getElementById("searchResults");

  if (!searchInput || !resultsContainer) return;

  let topics = [];

  // Load topics
  fetch("data/topics.json")
    .then(res => res.json())
    .then(data => {
      topics = data;
    });

  // Listen for typing
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    resultsContainer.innerHTML = "";

    if (query.length < 2) return;

    const matches = topics.filter(t =>
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<p class="muted">No topics found.</p>`;
      return;
    }

    matches.forEach(topic => {
      const link = document.createElement("a");
      link.href = `topics.html`;
      link.textContent = topic.name;
      link.style.display = "block";
      link.style.marginBottom = "6px";

      resultsContainer.appendChild(link);
    });
  });
});
