// ===== SEARCH-LOGIC-01 =====

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("topicSearch");
  const resultsContainer = document.getElementById("searchResults");

  if (!searchInput || !resultsContainer) return;

  const searchableItems = [
    // ===== CONTAINER PAGES =====
    { name: "Data Representation", type: "Topic page", description: "Binary, hexadecimal, text, sound, images and data representation.", keywords: "binary hex hexadecimal ascii unicode text sound image pixel compression", url: "data-representation.html" },
    { name: "Data Transmission", type: "Topic page", description: "Packets, transmission modes, error detection and encryption.", keywords: "packets serial parallel simplex duplex error detection parity checksum encryption", url: "data-transmission.html" },
    { name: "Hardware Part 1", type: "Topic page", description: "CPU, registers, FDE cycle, cache, clock speed and cores.", keywords: "cpu registers fde fetch decode execute cache clock cores embedded", url: "hardware1.html" },
    { name: "Hardware Part 2", type: "Topic page", description: "CPU performance and embedded systems.", keywords: "cpu performance cache clock speed cores embedded microprocessor", url: "hardware2.html" },
    { name: "Hardware Part 3", type: "Topic page", description: "Memory, secondary storage and cloud storage.", keywords: "ram rom memory storage secondary cloud", url: "hardware3.html" },
    { name: "Hardware Part 4", type: "Topic page", description: "Input devices, output devices and sensors.", keywords: "input output sensors touchscreen scanner camera", url: "hardware4.html" },
    { name: "Software", type: "Topic page", description: "Operating systems, utility software, interrupts and translation software.", keywords: "software operating system utility interrupts compiler interpreter assembler translation machine code assembly high level language ide", url: "software.html" },
    { name: "The Internet and its Uses", type: "Topic page", description: "Internet, WWW, URLs, DNS, browsers, cookies, cyber security and digital currency.", keywords: "internet www url dns browser cookie cyber security digital currency ip mac network hardware", url: "internet.html" },
    { name: "Automated and Emerging Technologies", type: "Topic page", description: "Automation, robotics, artificial intelligence and expert systems.", keywords: "automation robotics ai artificial intelligence expert systems machine learning", url: "emerging.html" },
    { name: "Algorithm Design and Problem Solving", type: "Topic page", description: "Flowcharts, pseudocode, standard algorithms, testing and trace tables.", keywords: "algorithm flowchart pseudocode trace table testing validation verification", url: "algorithms.html" },

    // ===== DATA REPRESENTATION =====
    { name: "Binary", type: "Flashcards", description: "Binary numbers, denary to binary, binary to denary.", keywords: "base 2 bits denary conversion place value", url: "flashcards.html?topic=binary" },
    { name: "Binary Practice", type: "Practice", description: "Practise binary conversions.", keywords: "binary denary conversion practice", url: "practice.html?topic=binary" },
    { name: "Binary Addition", type: "Flashcards", description: "Binary addition and carrying.", keywords: "add carry overflow", url: "flashcards.html?topic=binadd" },
    { name: "Binary Addition Practice", type: "Practice", description: "Practise binary addition.", keywords: "add carry overflow", url: "practice.html?topic=binadd" },
    { name: "Binary Shifts", type: "Flashcards", description: "Left shifts, right shifts, multiplying and dividing by powers of 2.", keywords: "left shift right shift multiply divide powers of 2", url: "flashcards.html?topic=binshift" },
    { name: "Binary Shifts Practice", type: "Practice", description: "Practise binary shifts.", keywords: "left shift right shift multiply divide powers of 2", url: "practice.html?topic=binshift" },
    { name: "Hexadecimal", type: "Flashcards", description: "Hexadecimal, denary, binary and conversions.", keywords: "hex base 16 denary binary conversion", url: "flashcards.html?topic=hex" },
    { name: "Hexadecimal Practice", type: "Practice", description: "Practise hex conversions.", keywords: "hex base 16 denary binary conversion", url: "practice.html?topic=hex" },
    { name: "Two’s Complement", type: "Flashcards", description: "Negative numbers in binary using two’s complement.", keywords: "negative binary twos complement two's complement", url: "flashcards.html?topic=twos" },
    { name: "Two’s Complement Practice", type: "Practice", description: "Practise two’s complement.", keywords: "negative binary twos complement two's complement", url: "practice.html?topic=twos" },
    { name: "Overflow", type: "Flashcards", description: "Overflow errors and register limits.", keywords: "overflow binary addition register too many bits", url: "flashcards.html?topic=overflow" },
    { name: "Overflow Practice", type: "Practice", description: "Practise spotting overflow.", keywords: "overflow binary addition register too many bits", url: "practice.html?topic=overflow" },
    { name: "ASCII and Unicode", type: "Flashcards", description: "Character sets, ASCII, Unicode and text representation.", keywords: "text character set ascii unicode extended ascii", url: "flashcards.html?topic=text" },
    { name: "ASCII and Unicode Practice", type: "Practice", description: "Practise text representation.", keywords: "text character set ascii unicode extended ascii", url: "practice.html?topic=text" },
    { name: "Images", type: "Flashcards", description: "Pixels, resolution, colour depth and image file size.", keywords: "image bitmap pixel resolution colour depth file size", url: "flashcards.html?topic=images" },
    { name: "Sound", type: "Flashcards", description: "Sample rate, bit depth, duration and sound file size.", keywords: "sound audio sample rate sampling bit depth file size", url: "flashcards.html?topic=sound" },
    { name: "Sound Practice", type: "Practice", description: "Practise sound file size calculations.", keywords: "sound audio sample rate bit depth file size", url: "practice.html?topic=sound" },
    { name: "Storage and Compression", type: "Flashcards", description: "Storage units, file size, lossy and lossless compression.", keywords: "storage compression lossy lossless file size bits bytes kilobytes megabytes gigabytes", url: "flashcards.html?topic=storage" },

    // ===== DATA TRANSMISSION =====
    { name: "Data Packets", type: "Flashcards", description: "Packets, headers, payloads, packet switching and reassembly.", keywords: "packet packets header payload trailer route reassembly", url: "flashcards.html?topic=datapackets" },
    { name: "Transmission Modes", type: "Flashcards", description: "Serial, parallel, simplex, half-duplex, full-duplex, crosstalk and skew.", keywords: "serial parallel simplex half duplex full duplex crosstalk skew usb", url: "flashcards.html?topic=transmissionmodes" },
    { name: "Error Detection", type: "Flashcards", description: "Parity, checksum, check digit, echo check, ARQ, ACK and NACK.", keywords: "error detection parity checksum check digit echo check arq ack nack", url: "flashcards.html?topic=errordetection" },
    { name: "Encryption", type: "Flashcards", description: "Symmetric encryption, asymmetric encryption, public keys and private keys.", keywords: "encryption symmetric asymmetric public key private key cipher", url: "flashcards.html?topic=encryption" },

    // ===== HARDWARE =====
    { name: "CPU", type: "Flashcards", description: "Central processing unit and CPU purpose.", keywords: "cpu processor central processing unit", url: "flashcards.html?topic=cpu" },
    { name: "CPU Components", type: "Flashcards", description: "ALU, control unit, registers and CPU components.", keywords: "alu control unit cpu components", url: "flashcards.html?topic=cpucomponents" },
    { name: "ALU and Control Unit", type: "Flashcards", description: "Arithmetic logic unit and control unit.", keywords: "alu arithmetic logic unit control unit", url: "flashcards.html?topic=alucontrol" },
    { name: "Fetch Decode Execute Cycle", type: "Flashcards", description: "Fetch, decode and execute cycle.", keywords: "fde fetch decode execute cycle", url: "flashcards.html?topic=fde" },
    { name: "Registers", type: "Flashcards", description: "PC, MAR, MDR, CIR and ACC registers.", keywords: "register pc mar mdr cir acc accumulator program counter", url: "flashcards.html?topic=registers" },
    { name: "Clock Speed", type: "Flashcards", description: "Clock speed and CPU performance.", keywords: "clock speed hertz ghz cpu performance", url: "flashcards.html?topic=clockspeed" },
    { name: "Cache", type: "Flashcards", description: "Cache memory and CPU performance.", keywords: "cache memory cpu performance", url: "flashcards.html?topic=memory" },
    { name: "Buses", type: "Flashcards", description: "Address bus, data bus and control bus.", keywords: "bus buses address bus data bus control bus", url: "flashcards.html?topic=buses" },
    { name: "Instruction Set", type: "Flashcards", description: "Instruction set and machine instructions.", keywords: "instruction set machine instruction opcode operand", url: "flashcards.html?topic=instructionset" },
    { name: "Embedded Systems", type: "Flashcards", description: "Embedded systems and microprocessors.", keywords: "embedded system microprocessor", url: "flashcards.html?topic=embedded" },
    { name: "Microprocessor", type: "Flashcards", description: "Microprocessors and embedded devices.", keywords: "microprocessor embedded device", url: "flashcards.html?topic=microprocessor" },
    { name: "Memory", type: "Flashcards", description: "RAM, ROM and main memory.", keywords: "ram rom memory volatile non volatile", url: "flashcards.html?topic=memory" },
    { name: "Secondary Storage", type: "Flashcards", description: "Magnetic, optical and solid-state storage.", keywords: "secondary storage magnetic optical solid state ssd hdd", url: "flashcards.html?topic=secondary" },
    { name: "Cloud Storage", type: "Flashcards", description: "Cloud storage and remote servers.", keywords: "cloud storage remote server", url: "flashcards.html?topic=cloud" },
    { name: "Input Devices", type: "Flashcards", description: "Input devices and their uses.", keywords: "input keyboard mouse microphone scanner camera", url: "flashcards.html?topic=inputdevices" },
    { name: "Output Devices", type: "Flashcards", description: "Output devices and their uses.", keywords: "output monitor printer speaker actuator", url: "flashcards.html?topic=outputdevices" },
    { name: "Sensors", type: "Flashcards", description: "Sensors and data capture.", keywords: "sensor temperature light pressure moisture humidity", url: "flashcards.html?topic=sensors" },
    { name: "Touchscreens", type: "Flashcards", description: "Touchscreen input and output.", keywords: "touchscreen capacitive resistive", url: "flashcards.html?topic=touchscreens" },
    { name: "Scanners and Cameras", type: "Flashcards", description: "Scanners, cameras and image capture.", keywords: "scanner camera barcode qr code", url: "flashcards.html?topic=scannerscameras" },

    // ===== SOFTWARE / INTERNET / EMERGING =====
    { name: "Operating Systems", type: "Flashcards", description: "Operating system functions.", keywords: "operating system os memory management file management user interface peripheral", url: "flashcards.html?topic=operatingsystems" },
    { name: "Interrupts", type: "Flashcards", description: "Interrupts and interrupt handling.", keywords: "interrupt interrupt service routine isr", url: "flashcards.html?topic=interrupts" },
    { name: "Translation Software", type: "Flashcards", description: "Compiler, interpreter, assembler and machine code.", keywords: "compiler interpreter assembler translation software machine code source code object code", url: "flashcards.html?topic=translation" },
    { name: "Types of Language", type: "Flashcards", description: "High-level language, low-level language, assembly language and machine code.", keywords: "machine code assembly language high level language low level language", url: "flashcards.html?topic=types" },
    { name: "IDEs", type: "Flashcards", description: "Integrated development environments and tools.", keywords: "ide integrated development environment editor debugger translator", url: "flashcards.html?topic=ides" },
    { name: "Internet vs WWW", type: "Flashcards", description: "Internet, World Wide Web and web services.", keywords: "internet www world wide web", url: "flashcards.html?topic=internetvswww" },
    { name: "Web Technologies", type: "Flashcards", description: "URLs, HTTP, HTTPS, DNS and browsers.", keywords: "url http https dns browser web server", url: "flashcards.html?topic=webtech" },
    { name: "IP and MAC Addresses", type: "Flashcards", description: "IP addresses and MAC addresses.", keywords: "ip address mac address network address", url: "flashcards.html?topic=ipmac" },
    { name: "Network Hardware", type: "Flashcards", description: "Routers, switches and network hardware.", keywords: "router switch network hardware hub access point", url: "flashcards.html?topic=networkhardware" },
    { name: "Cyber Security Threats", type: "Flashcards", description: "Malware, phishing, brute force and other threats.", keywords: "cyber security threat malware phishing brute force denial of service dos spyware virus", url: "flashcards.html?topic=threats" },
    { name: "Security Solutions", type: "Flashcards", description: "Firewalls, anti-malware, passwords and security measures.", keywords: "firewall anti malware antivirus password biometrics two factor authentication encryption", url: "flashcards.html?topic=solutions" },
    { name: "Digital Currency", type: "Flashcards", description: "Digital currency and online transactions.", keywords: "digital currency cryptocurrency bitcoin online payment", url: "flashcards.html?topic=currency" },
    { name: "Automation", type: "Flashcards", description: "Automation and automated systems.", keywords: "automation automated system", url: "flashcards.html?topic=automation" },
    { name: "Robotics", type: "Flashcards", description: "Robotics and robot systems.", keywords: "robot robotics automated robot arm sensors actuators", url: "flashcards.html?topic=robotics" },
    { name: "Artificial Intelligence", type: "Flashcards", description: "AI, machine learning and expert systems.", keywords: "ai artificial intelligence machine learning expert system expert systems neural network", url: "flashcards.html?topic=ai" },

    // ===== ALGORITHMS =====
    { name: "Program Development Life Cycle", type: "Flashcards", description: "Analysis, design, coding, testing and evaluation.", keywords: "pdlc program development life cycle analysis design coding testing evaluation", url: "flashcards.html?topic=pdlc" },
    { name: "Flowcharts", type: "Flashcards", description: "Flowchart symbols, decisions, processes, input/output and subprograms.", keywords: "flowchart terminal process decision input output subprogram", url: "flashcards.html?topic=flowcharts" },
    { name: "Flowcharts Practice", type: "Practice", description: "Practise flowchart symbols and drawing flowcharts.", keywords: "flowchart terminal process decision input output subprogram", url: "practice.html?topic=flowcharts" },
    { name: "Pseudocode", type: "Flashcards", description: "Writing algorithms using pseudocode.", keywords: "pseudocode algorithm input output if for while repeat", url: "flashcards.html?topic=pseudocode" },
    { name: "Pseudocode Practice", type: "Practice", description: "Practise writing pseudocode.", keywords: "pseudocode algorithm input output if for while repeat", url: "practice.html?topic=pseudocode" },
    { name: "Standard Algorithms", type: "Flashcards", description: "Counting, totalling, maximum, minimum, average, linear search and bubble sort.", keywords: "standard algorithms count total average maximum minimum linear search bubble sort", url: "flashcards.html?topic=standardalgorithms" },
    { name: "Standard Algorithms Practice", type: "Practice", description: "Practise standard algorithms.", keywords: "count total average maximum minimum linear search bubble sort", url: "practice.html?topic=standardalgorithms" },
    { name: "Validation Checks", type: "Flashcards", description: "Range check, length check, type check, format check and presence check.", keywords: "validation range check length check type check format check presence check", url: "flashcards.html?topic=validationchecks" },
    { name: "Validation Checks Practice", type: "Practice", description: "Practise validation checks.", keywords: "validation range length type format presence", url: "practice.html?topic=validationchecks" },
    { name: "Validation Algorithms", type: "Flashcards", description: "Algorithms that use validation checks.", keywords: "validation algorithm range check while loop", url: "flashcards.html?topic=validationalgorithms" },
    { name: "Verification", type: "Flashcards", description: "Visual check and double entry.", keywords: "verification visual check double entry proof reading", url: "flashcards.html?topic=verificationchecks" },
    { name: "Verification Practice", type: "Practice", description: "Practise verification.", keywords: "verification visual check double entry", url: "practice.html?topic=verificationchecks" },
    { name: "Testing", type: "Flashcards", description: "Testing programs and using test data.", keywords: "testing dry run test plan test data", url: "flashcards.html?topic=testing" },
    { name: "Error Types", type: "Flashcards", description: "Syntax errors, runtime errors and logic errors.", keywords: "syntax runtime logic error errors", url: "flashcards.html?topic=errortypes" },
    { name: "Error Types Practice", type: "Practice", description: "Practise identifying error types.", keywords: "syntax runtime logic error errors", url: "practice.html?topic=errortypes" },
    { name: "Test Data", type: "Flashcards", description: "Normal, abnormal, extreme and boundary test data.", keywords: "normal abnormal extreme boundary invalid valid erroneous test data", url: "flashcards.html?topic=testdata" },
    { name: "Test Data Practice", type: "Practice", description: "Practise test data.", keywords: "normal abnormal extreme boundary invalid valid test data", url: "practice.html?topic=testdata" },
    { name: "Trace Tables", type: "Practice", description: "Trace variables through algorithms.", keywords: "trace table dry run variable pseudocode flowchart", url: "practice.html?topic=tracetables" },

    // ===== PROGRAMMING =====
    { name: "Data Types", type: "Flashcards", description: "Integer, real, char, string and Boolean.", keywords: "integer real char character string boolean data type", url: "flashcards.html?topic=datatypes" },
    { name: "Operations", type: "Flashcards", description: "Assignment, arithmetic, comparison and Boolean operations.", keywords: "assignment arithmetic comparison boolean operator operators mod div", url: "flashcards.html?topic=operations" },
    { name: "Operations Practice", type: "Practice", description: "Practise programming operations.", keywords: "assignment arithmetic comparison boolean operator operators mod div", url: "practice.html?topic=operations" },
    { name: "String Handling", type: "Flashcards", description: "Length, substring, concatenation, uppercase and lowercase.", keywords: "string length substring concatenation ucase lcase uppercase lowercase", url: "flashcards.html?topic=stringhandling" },
    { name: "String Handling Practice", type: "Practice", description: "Practise string operations.", keywords: "string length substring concatenation ucase lcase", url: "practice.html?topic=stringhandling" },
    { name: "Sequence", type: "Flashcards", description: "Instructions running one after another.", keywords: "sequence order instructions", url: "flashcards.html?topic=sequence" },
    { name: "Sequence Practice", type: "Practice", description: "Practise sequence questions.", keywords: "sequence order instructions", url: "practice.html?topic=sequence" },
    { name: "Selection", type: "Flashcards", description: "IF statements, ELSE, CASE and conditions.", keywords: "selection if then else case condition", url: "flashcards.html?topic=selection" },
    { name: "Selection Practice", type: "Practice", description: "Practise selection questions.", keywords: "selection if then else case condition", url: "practice.html?topic=selection" },
    { name: "Iteration", type: "Flashcards", description: "FOR loops, WHILE loops and REPEAT UNTIL loops.", keywords: "iteration loop loops for while repeat until", url: "flashcards.html?topic=iteration" },
    { name: "Iteration Practice", type: "Practice", description: "Practise iteration questions.", keywords: "iteration loop loops for while repeat until", url: "practice.html?topic=iteration" },
    { name: "Library Routines", type: "Flashcards", description: "MOD, DIV, ROUND, RANDOM, LENGTH and string routines.", keywords: "library routine mod div round random length substring", url: "flashcards.html?topic=libraryroutines" },
    { name: "Library Routines Practice", type: "Practice", description: "Practise library routines.", keywords: "mod div round random length substring", url: "practice.html?topic=libraryroutines" },
    { name: "Arrays", type: "Flashcards", description: "1D arrays, 2D arrays, indexes and loops.", keywords: "array arrays 1d 2d index indexes list", url: "flashcards.html?topic=arrays" },
    { name: "Arrays Practice", type: "Practice", description: "Practise arrays.", keywords: "array arrays 1d 2d index indexes", url: "practice.html?topic=arrays" },
    { name: "Procedures and Functions", type: "Flashcards", description: "Subprograms, procedures, functions, parameters and return values.", keywords: "procedure function subprogram parameter argument return local global", url: "flashcards.html?topic=procedures" },
    { name: "Procedures and Functions Practice", type: "Practice", description: "Practise procedures and functions.", keywords: "procedure function subprogram parameter argument return local global", url: "practice.html?topic=procedures" },
    { name: "Maintainable Programs", type: "Flashcards", description: "Meaningful identifiers, comments, constants and modular programming.", keywords: "maintainable meaningful identifier comments indentation constants modular", url: "flashcards.html?topic=maintainableprograms" },
    { name: "Maintainable Programs Practice", type: "Practice", description: "Practise maintainable programs.", keywords: "maintainable identifier comments indentation constants modular", url: "practice.html?topic=maintainableprograms" },
    { name: "File Handling", type: "Flashcards", description: "Open, read, write and close files.", keywords: "file handling openfile readfile writefile closefile", url: "flashcards.html?topic=filehandling" },
    { name: "File Handling Practice", type: "Practice", description: "Practise file handling.", keywords: "file handling openfile readfile writefile closefile", url: "practice.html?topic=filehandling" },

    // ===== DATABASES AND BOOLEAN LOGIC =====
    { name: "Database Theory", type: "Flashcards", description: "Fields, records, data types, primary keys and validation.", keywords: "database field record table primary key data type validation", url: "flashcards.html?topic=databasetheory" },
    { name: "Database Theory Practice", type: "Practice", description: "Practise database theory.", keywords: "database field record table primary key data type validation", url: "practice.html?topic=databasetheory" },
    { name: "SQL", type: "Flashcards", description: "SELECT, FROM, WHERE, ORDER BY, SUM and COUNT.", keywords: "sql select from where order by sum count query database", url: "flashcards.html?topic=sql" },
    { name: "SQL Practice", type: "Practice", description: "Practise SQL queries.", keywords: "sql select from where order by sum count query database", url: "practice.html?topic=sql" },
    { name: "Boolean Logic", type: "Flashcards", description: "Logic gates, truth tables, circuits and Boolean expressions.", keywords: "boolean logic gate gates and or not nand nor xor truth table circuit expression", url: "flashcards.html?topic=booleanlogic" },
    { name: "Boolean Logic Practice", type: "Practice", description: "Practise logic gates, truth tables, circuits and expressions.", keywords: "boolean logic gate gates and or not nand nor xor truth table circuit expression", url: "practice.html?topic=booleanlogic" }
  ];

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    resultsContainer.innerHTML = "";

    if (query.length < 2) return;

    const matches = searchableItems.filter(item => {
      const searchText = `${item.name} ${item.type} ${item.description} ${item.keywords}`.toLowerCase();
      return searchText.includes(query);
    });

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
