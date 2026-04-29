// ===== SEARCH-LOGIC-01 =====

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("topicSearch");
  const resultsContainer = document.getElementById("searchResults");

  if (!searchInput || !resultsContainer) return;

  const searchableItems = [
    // ===== CONTAINER PAGES =====
    { name: "Data Representation", type: "Topic page", description: "Binary, hexadecimal, text, sound, images and data representation.", url: "data-representation.html" },
    { name: "Data Transmission", type: "Topic page", description: "Packets, transmission modes, error detection and encryption.", url: "data-transmission.html" },
    { name: "Hardware Part 1", type: "Topic page", description: "CPU, registers, FDE cycle, cache, clock speed and cores.", url: "hardware1.html" },
    { name: "Hardware Part 2", type: "Topic page", description: "CPU performance and embedded systems.", url: "hardware2.html" },
    { name: "Hardware Part 3", type: "Topic page", description: "Memory, secondary storage and cloud storage.", url: "hardware3.html" },
    { name: "Hardware Part 4", type: "Topic page", description: "Input devices, output devices and sensors.", url: "hardware4.html" },
    { name: "Software", type: "Topic page", description: "Operating systems, utility software, interrupts and translation software.", url: "software.html" },
    { name: "The Internet and its Uses", type: "Topic page", description: "Internet, WWW, URLs, DNS, browsers, cookies, cyber security and digital currency.", url: "internet.html" },
    { name: "Algorithm Design and Problem Solving", type: "Topic page", description: "Flowcharts, pseudocode, standard algorithms, testing and trace tables.", url: "algorithms.html" },

    // ===== DATA REPRESENTATION =====
    { name: "Binary", type: "Flashcards", description: "Binary numbers, denary to binary, binary to denary.", url: "flashcards.html?topic=binary" },
    { name: "Binary Practice", type: "Practice", description: "Practise binary conversions.", url: "practice.html?topic=binary" },
    { name: "Binary Addition", type: "Flashcards", description: "Binary addition and carrying.", url: "flashcards.html?topic=binadd" },
    { name: "Binary Addition Practice", type: "Practice", description: "Practise binary addition.", url: "practice.html?topic=binadd" },
    { name: "Binary Shifts", type: "Flashcards", description: "Left shifts, right shifts, multiplying and dividing by powers of 2.", url: "flashcards.html?topic=binshift" },
    { name: "Binary Shifts Practice", type: "Practice", description: "Practise binary shifts.", url: "practice.html?topic=binshift" },
    { name: "Hexadecimal", type: "Flashcards", description: "Hexadecimal, denary, binary and conversions.", url: "flashcards.html?topic=hex" },
    { name: "Hexadecimal Practice", type: "Practice", description: "Practise hex conversions.", url: "practice.html?topic=hex" },
    { name: "Two’s Complement", type: "Flashcards", description: "Negative numbers in binary using two’s complement.", url: "flashcards.html?topic=twos" },
    { name: "Two’s Complement Practice", type: "Practice", description: "Practise two’s complement.", url: "practice.html?topic=twos" },
    { name: "Overflow", type: "Flashcards", description: "Overflow errors and register limits.", url: "flashcards.html?topic=overflow" },
    { name: "Overflow Practice", type: "Practice", description: "Practise spotting overflow.", url: "practice.html?topic=overflow" },
    { name: "ASCII and Unicode", type: "Flashcards", description: "Character sets, ASCII, Unicode and text representation.", url: "flashcards.html?topic=text" },
    { name: "ASCII and Unicode Practice", type: "Practice", description: "Practise text representation.", url: "practice.html?topic=text" },
    { name: "Sound", type: "Flashcards", description: "Sample rate, bit depth, duration and sound file size.", url: "flashcards.html?topic=sound" },
    { name: "Sound Practice", type: "Practice", description: "Practise sound file size calculations.", url: "practice.html?topic=sound" },

    // ===== DATA TRANSMISSION =====
    { name: "Data Packets", type: "Flashcards", description: "Packets, headers, payloads, packet switching and reassembly.", url: "flashcards.html?topic=datapackets" },
    { name: "Transmission Modes", type: "Flashcards", description: "Serial, parallel, simplex, half-duplex, full-duplex, crosstalk and skew.", url: "flashcards.html?topic=transmissionmodes" },
    { name: "Error Detection", type: "Flashcards", description: "Parity, checksum, check digit, echo check, ARQ, ACK and NACK.", url: "flashcards.html?topic=errordetection" },
    { name: "Encryption", type: "Flashcards", description: "Symmetric encryption, asymmetric encryption, public keys and private keys.", url: "flashcards.html?topic=encryption" },

    // ===== ALGORITHMS =====
    { name: "Flowcharts", type: "Flashcards", description: "Flowchart symbols, decisions, processes, input/output and subprograms.", url: "flashcards.html?topic=flowcharts" },
    { name: "Flowcharts Practice", type: "Practice", description: "Practise flowchart symbols and drawing flowcharts.", url: "practice.html?topic=flowcharts" },
    { name: "Pseudocode", type: "Flashcards", description: "Writing algorithms using pseudocode.", url: "flashcards.html?topic=pseudocode" },
    { name: "Pseudocode Practice", type: "Practice", description: "Practise writing pseudocode.", url: "practice.html?topic=pseudocode" },
    { name: "Standard Algorithms", type: "Flashcards", description: "Counting, totalling, maximum, minimum, average, linear search and bubble sort.", url: "flashcards.html?topic=standardalgorithms" },
    { name: "Standard Algorithms Practice", type: "Practice", description: "Practise standard algorithms.", url: "practice.html?topic=standardalgorithms" },
    { name: "Validation Checks", type: "Flashcards", description: "Range check, length check, type check, format check and presence check.", url: "flashcards.html?topic=validationchecks" },
    { name: "Validation Checks Practice", type: "Practice", description: "Practise validation checks.", url: "practice.html?topic=validationchecks" },
    { name: "Verification", type: "Flashcards", description: "Visual check and double entry.", url: "flashcards.html?topic=verificationchecks" },
    { name: "Verification Practice", type: "Practice", description: "Practise verification.", url: "practice.html?topic=verificationchecks" },
    { name: "Error Types", type: "Flashcards", description: "Syntax errors, runtime errors and logic errors.", url: "flashcards.html?topic=errortypes" },
    { name: "Error Types Practice", type: "Practice", description: "Practise identifying error types.", url: "practice.html?topic=errortypes" },
    { name: "Test Data", type: "Flashcards", description: "Normal, abnormal, extreme and boundary test data.", url: "flashcards.html?topic=testdata" },
    { name: "Test Data Practice", type: "Practice", description: "Practise test data.", url: "practice.html?topic=testdata" },
    { name: "Trace Tables", type: "Flashcards", description: "Trace variables through algorithms.", url: "flashcards.html?topic=tracetables" },
    { name: "Trace Tables Practice", type: "Practice", description: "Practise completing trace tables.", url: "practice.html?topic=tracetables" },

    // ===== PROGRAMMING =====
    { name: "Data Types", type: "Flashcards", description: "Integer, real, char, string and Boolean.", url: "flashcards.html?topic=datatypes" },
    { name: "Operations", type: "Flashcards", description: "Assignment, arithmetic, comparison and Boolean operations.", url: "flashcards.html?topic=operations" },
    { name: "Operations Practice", type: "Practice", description: "Practise programming operations.", url: "practice.html?topic=operations" },
    { name: "String Handling", type: "Flashcards", description: "Length, substring, concatenation, uppercase and lowercase.", url: "flashcards.html?topic=stringhandling" },
    { name: "String Handling Practice", type: "Practice", description: "Practise string operations.", url: "practice.html?topic=stringhandling" },
    { name: "Sequence", type: "Flashcards", description: "Instructions running one after another.", url: "flashcards.html?topic=sequence" },
    { name: "Sequence Practice", type: "Practice", description: "Practise sequence questions.", url: "practice.html?topic=sequence" },
    { name: "Selection", type: "Flashcards", description: "IF statements, ELSE, CASE and conditions.", url: "flashcards.html?topic=selection" },
    { name: "Selection Practice", type: "Practice", description: "Practise selection questions.", url: "practice.html?topic=selection" },
    { name: "Iteration", type: "Flashcards", description: "FOR loops, WHILE loops and REPEAT UNTIL loops.", url: "flashcards.html?topic=iteration" },
    { name: "Iteration Practice", type: "Practice", description: "Practise iteration questions.", url: "practice.html?topic=iteration" },
    { name: "Library Routines", type: "Flashcards", description: "MOD, DIV, ROUND, RANDOM, LENGTH and string routines.", url: "flashcards.html?topic=libraryroutines" },
    { name: "Library Routines Practice", type: "Practice", description: "Practise library routines.", url: "practice.html?topic=libraryroutines" },
    { name: "Arrays", type: "Flashcards", description: "1D arrays, 2D arrays, indexes and loops.", url: "flashcards.html?topic=arrays" },
    { name: "Arrays Practice", type: "Practice", description: "Practise arrays.", url: "practice.html?topic=arrays" },
    { name: "Procedures and Functions", type: "Flashcards", description: "Subprograms, procedures, functions, parameters and return values.", url: "flashcards.html?topic=procedures" },
    { name: "Procedures and Functions Practice", type: "Practice", description: "Practise procedures and functions.", url: "practice.html?topic=procedures" },
    { name: "Maintainable Programs", type: "Flashcards", description: "Meaningful identifiers, comments, constants and modular programming.", url: "flashcards.html?topic=maintainableprograms" },
    { name: "Maintainable Programs Practice", type: "Practice", description: "Practise maintainable programs.", url: "practice.html?topic=maintainableprograms" },
    { name: "File Handling", type: "Flashcards", description: "Open, read, write and close files.", url: "flashcards.html?topic=filehandling" },
    { name: "File Handling Practice", type: "Practice", description: "Practise file handling.", url: "practice.html?topic=filehandling" },

    // ===== DATABASES AND BOOLEAN LOGIC =====
    { name: "Database Theory", type: "Flashcards", description: "Fields, records, data types, primary keys and validation.", url: "flashcards.html?topic=databasetheory" },
    { name: "Database Theory Practice", type: "Practice", description: "Practise database theory.", url: "practice.html?topic=databasetheory" },
    { name: "SQL", type: "Flashcards", description: "SELECT, FROM, WHERE, ORDER BY, SUM and COUNT.", url: "flashcards.html?topic=sql" },
    { name: "SQL Practice", type: "Practice", description: "Practise SQL queries.", url: "practice.html?topic=sql" },
    { name: "Boolean Logic", type: "Flashcards", description: "Logic gates, truth tables, circuits and Boolean expressions.", url: "flashcards.html?topic=booleanlogic" },
    { name: "Boolean Logic Practice", type: "Practice", description: "Practise logic gates, truth tables, circuits and expressions.", url: "practice.html?topic=booleanlogic" }
  ];

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    resultsContainer.innerHTML = "";

    if (query.length < 2) return;

    const matches = searchableItems.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<p class="muted">No topics found.</p>`;
      return;
    }

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
