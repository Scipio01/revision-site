// ===== SEARCH-LOGIC-01 =====

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("topicSearch");
  const resultsContainer = document.getElementById("searchResults");

  if (!searchInput || !resultsContainer) return;

  const searchableTopics = [
    {
      id: "datapackets",
      name: "Data Packets",
      description: "Packets, packet switching, headers, payloads and packet reassembly."
    },
    {
      id: "transmissionmodes",
      name: "Transmission Modes",
      description: "Serial transmission, parallel transmission, simplex, half-duplex and full-duplex."
    },
    {
      id: "errordetection",
      name: "Error Detection",
      description: "Parity, checksum, check digit, echo check, ARQ, ACK and NACK."
    },
    {
      id: "encryption",
      name: "Encryption",
      description: "Symmetric encryption, asymmetric encryption, public keys and private keys."
    }
  ];

  fetch("data/topics.json")
    .then(res => res.json())
    .then(data => {
      searchableTopics.push(...data);
    });

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    resultsContainer.innerHTML = "";

    if (query.length < 2) return;

    const matches = searchableTopics.filter(t =>
      (t.name || "").toLowerCase().includes(query) ||
      (t.description || "").toLowerCase().includes(query) ||
      (t.id || "").toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<p class="muted">No topics found.</p>`;
      return;
    }

    matches.forEach(topic => {
      const link = document.createElement("a");
      link.href = `flashcards.html?topic=${topic.id}`;
      link.textContent = topic.name;
      link.style.display = "block";
      link.style.marginBottom = "6px";

      resultsContainer.appendChild(link);
    });
  });
});
