// ===== SEARCH-LOGIC-01 =====

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("topicSearch");
  const resultsContainer = document.getElementById("searchResults");

  if (!searchInput || !resultsContainer) return;

  const searchableItems = [

    // ===== CORE TOPICS =====
    { name: "Data Representation", type: "Topic page", description: "Binary, hexadecimal, text, sound, images and data representation.", keywords: "binary hex ascii unicode text sound image compression", url: "data-representation.html" },
    { name: "Data Transmission", type: "Topic page", description: "Packets, transmission modes, error detection and encryption.", keywords: "packet packets packet switching protocol transmission serial parallel simplex duplex", url: "data-transmission.html" },
    { name: "Hardware", type: "Topic page", description: "CPU, memory, storage and hardware components.", keywords: "cpu von neumann memory storage registers cache clock speed", url: "hardware1.html" },
    { name: "Software", type: "Topic page", description: "Operating systems and translation software.", keywords: "software operating system compiler interpreter assembler machine code high level language", url: "software.html" },
    { name: "Internet and Web", type: "Topic page", description: "Internet, web technologies and cyber security.", keywords: "internet web domain protocol cookies session persistent dns http https", url: "internet.html" },
    { name: "Algorithms", type: "Topic page", description: "Flowcharts, pseudocode and algorithms.", keywords: "algorithm flowchart pseudocode trace table", url: "algorithms.html" },
    { name: "Programming", type: "Topic page", description: "Programming concepts and logic.", keywords: "sequence selection iteration array procedure function", url: "programming.html" },

    // ===== DATA REPRESENTATION =====
    { name: "Binary", type: "Flashcards", description: "Binary numbers and conversions.", keywords: "binary denary conversion bits base 2", url: "flashcards.html?topic=binary" },
    { name: "Binary Addition", type: "Flashcards", description: "Binary addition and carrying.", keywords: "binary addition carry overflow", url: "flashcards.html?topic=binadd" },
    { name: "Binary Shifts", type: "Flashcards", description: "Left and right shifts.", keywords: "binary shift left right multiply divide", url: "flashcards.html?topic=binshift" },
    { name: "Hexadecimal", type: "Flashcards", description: "Hex conversions.", keywords: "hex hexadecimal base 16", url: "flashcards.html?topic=hex" },
    { name: "Two's Complement", type: "Flashcards", description: "Negative binary numbers.", keywords: "twos complement negative binary", url: "flashcards.html?topic=twos" },
    { name: "Overflow", type: "Flashcards", description: "Overflow errors.", keywords: "overflow binary too many bits", url: "flashcards.html?topic=overflow" },
    { name: "Character Sets", type: "Flashcards", description: "ASCII and Unicode.", keywords: "ascii unicode text character set", url: "flashcards.html?topic=text" },
    { name: "Images", type: "Flashcards", description: "Image representation.", keywords: "pixel resolution colour depth", url: "flashcards.html?topic=images" },
    { name: "Sound", type: "Flashcards", description: "Sound representation.", keywords: "sample rate bit depth", url: "flashcards.html?topic=sound" },
    { name: "Storage and Compression", type: "Flashcards", description: "File sizes and compression.", keywords: "compression lossy lossless file size", url: "flashcards.html?topic=storage" },

    // ===== DATA TRANSMISSION =====
    { name: "Data Packets", type: "Flashcards", description: "Packet structure.", keywords: "packet switching header payload trailer", url: "flashcards.html?topic=datapackets" },
    { name: "Transmission Modes", type: "Flashcards", description: "Serial and parallel.", keywords: "serial parallel simplex duplex crosstalk skew", url: "flashcards.html?topic=transmissionmodes" },
    { name: "Error Detection", type: "Flashcards", description: "Parity and checks.", keywords: "parity checksum arq ack nack", url: "flashcards.html?topic=errordetection" },
    { name: "Encryption", type: "Flashcards", description: "Encryption methods.", keywords: "encryption symmetric asymmetric public private key", url: "flashcards.html?topic=encryption" },

    // ===== HARDWARE =====
    { name: "CPU", type: "Flashcards", description: "CPU and architecture.", keywords: "cpu von neumann fde fetch decode execute", url: "flashcards.html?topic=cpu" },
    { name: "Registers", type: "Flashcards", description: "CPU registers.", keywords: "register pc mar mdr acc cir", url: "flashcards.html?topic=registers" },
    { name: "Memory", type: "Flashcards", description: "RAM and ROM.", keywords: "ram rom primary storage virtual memory paging flash memory", url: "flashcards.html?topic=memory" },
    { name: "Secondary Storage", type: "Flashcards", description: "Storage types.", keywords: "secondary storage hdd ssd optical", url: "flashcards.html?topic=secondary" },
    { name: "Input Devices", type: "Flashcards", description: "Input hardware.", keywords: "keyboard mouse scanner camera", url: "flashcards.html?topic=inputdevices" },
    { name: "Output Devices", type: "Flashcards", description: "Output hardware.", keywords: "monitor printer speaker actuator", url: "flashcards.html?topic=outputdevices" },
    { name: "Sensors", type: "Flashcards", description: "Sensors.", keywords: "sensor temperature light pressure", url: "flashcards.html?topic=sensors" },

    // ===== SOFTWARE =====
    { name: "Operating Systems", type: "Flashcards", description: "OS functions.", keywords: "operating system firmware bootloader bios bootstrap", url: "flashcards.html?topic=operatingsystems" },
    { name: "Translation Software", type: "Flashcards", description: "Compiler and interpreter.", keywords: "compiler interpreter assembler machine code assembly high level language", url: "flashcards.html?topic=translation" },
    { name: "IDE", type: "Flashcards", description: "Integrated Development Environment tools.", keywords: "ide integrated development environment editor debugger translator compiler interpreter runtime error syntax error", url: "flashcards.html?topic=ides" },
    { name: "Web Technologies", type: "Flashcards", description: "Web basics.", keywords: "domain protocol cookies session persistent http https dns", url: "flashcards.html?topic=webtech" },
    { name: "IP and MAC Addresses", type: "Flashcards", description: "Networking.", keywords: "ip mac nic network interface card", url: "flashcards.html?topic=ipmac" },

    // ===== SECURITY / INTERNET =====
    { name: "Cyber Security Threats", type: "Flashcards", description: "Threats.", keywords: "malware phishing brute force", url: "flashcards.html?topic=threats" },
    { name: "Security Solutions", type: "Flashcards", description: "Security methods.", keywords: "firewall antivirus encryption", url: "flashcards.html?topic=solutions" },
    { name: "Digital Currency", type: "Flashcards", description: "Cryptocurrency.", keywords: "blockchain ledger bitcoin", url: "flashcards.html?topic=currency" },


    // ===== ALGORITHMS (extra) =====
    { name: "Structure Diagrams", type: "Flashcards", description: "Breaking problems into modules.", keywords: "structure diagram hierarchy modular decomposition", url: "flashcards.html?topic=structurediagrams" },

    
    // ===== AI =====
    { name: "Artificial Intelligence", type: "Flashcards", description: "AI and expert systems.", keywords: "ai expert systems machine learning characteristics", url: "flashcards.html?topic=ai" },
    { name: "Robotics", type: "Flashcards", description: "Robotics.", keywords: "robot actuator automation", url: "flashcards.html?topic=robotics" }

  ];

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    resultsContainer.innerHTML = "";

    if (query.length < 2) return;

    const matches = searchableItems.filter(item => {
      const text = `${item.name} ${item.description} ${item.keywords}`.toLowerCase();
      return text.includes(query);
    });

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<p class="muted">No topics found.</p>`;
      return;
    }


// ===== SORT RESULTS =====
matches.sort((a, b) => {
  const priority = {
    "Flashcards": 1,
    "Quiz": 2,
    "Practice": 3,
    "Topic page": 4
  };

  return (priority[a.type] || 5) - (priority[b.type] || 5);
});




    
    matches.forEach(item => {
      const link = document.createElement("a");
      link.href = item.url;
      link.className = "search-result";
      link.innerHTML = `
        <strong>${item.name}</strong>
        <span>${item.type}</span>
      `;
      resultsContainer.appendChild(link);
    });
  });
});
