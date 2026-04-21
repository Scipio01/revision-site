let currentQuestion = "";
let currentAnswer = "";
let currentQuestionType = "";
let currentSourceValue = 0;
let correctCount = 0; 
let incorrectCount = 0;
let currentStreak = 0;
let bestStreak = 0;
let questionNumber = 0;
let totalQuestions = 10;

let soundQuestionCount = 0;
let drawQuestionIndex = 0;
let lastFlowchartAnswer = "";

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const feedbackEl = document.getElementById("feedback");
const difficultyEl = document.getElementById("difficulty");
const modeEl = document.getElementById("mode");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const newSetBtn = document.getElementById("newSetBtn");
const correctCountEl = document.getElementById("correctCount");
const incorrectCountEl = document.getElementById("incorrectCount");
const streakCountEl = document.getElementById("streakCount");
const bestStreakCountEl = document.getElementById("bestStreakCount");
const questionNumberEl = document.getElementById("questionNumber");
const totalQuestionsEl = document.getElementById("totalQuestions");
const imageOptionsEl = document.getElementById("imageOptions");



function updateScoreDisplay() {
  if (getTopic() === "validationchecks") {
    totalQuestions = 5;
  } else if (getTopic() === "verificationchecks") {
    totalQuestions = 4;
  } else if (getTopic() === "standardalgorithms") {
    totalQuestions = 5;
} else if (getTopic() === "errortypes") {
  totalQuestions = 10;
} else if (getTopic() === "testdata") {
  totalQuestions = 10;
} else if (getTopic() === "validationexam") {
  totalQuestions = 5;
} else if (getTopic() === "tracetables") {
  totalQuestions = 6;
} else {
  totalQuestions = 10;
}

  correctCountEl.textContent = correctCount;
  incorrectCountEl.textContent = incorrectCount;
  streakCountEl.textContent = currentStreak;
  bestStreakCountEl.textContent = bestStreak;
  questionNumberEl.textContent = questionNumber;
  totalQuestionsEl.textContent = totalQuestions;
}




 
function updatePracticeHeader() {
  const topic = getTopic();
  const titleEl = document.getElementById("practiceTitle");
  const introEl = document.getElementById("practiceIntro");


    const tip = document.querySelector(".exam-tip");
    
   if (topic === "flowcharts") {
  titleEl.textContent = "Flowcharts Practice";
  introEl.textContent = "Practise matching flowchart symbols to their meanings.";

  if (tip) tip.style.display = "none";
  return;
}
    
    if (tip) tip.style.display = "none";

  if (topic === "binshift") {
    titleEl.textContent = "Binary Shifts";
    introEl.textContent = "Practise left and right shifts (×2 and ÷2).";
    return;
  }

  if (topic === "binadd") {
    titleEl.textContent = "Binary Addition";
    introEl.textContent = "Practise adding binary numbers with clear working.";
    return;
  }

  if (topic === "hex") {
    titleEl.textContent = "Hex Practice";
    introEl.textContent = "Practise converting between denary, binary and hexadecimal with instant feedback and working.";
    return;
  }

  if (topic === "twos") {
    titleEl.textContent = "Two’s Complement";
    introEl.textContent = "Practise converting negative denary numbers into binary using two’s complement.";
    return;
  }
  
  if (topic === "overflow") {
    titleEl.textContent = "Overflow Practice";
    introEl.textContent = "Practise spotting when a result is too large to fit in the available bits.";
    return;
  }

  if (topic === "sound") {
    titleEl.textContent = "Sound Practice";
    introEl.textContent = "Practise sound file size calculations and unit conversions.";
    return;
  }
  
  if (topic === "text") {
    titleEl.textContent = "ASCII / Unicode Practice";
    introEl.textContent = "Practise ASCII values, Unicode, and how text is represented in binary.";
    return;
  }
    if (topic === "sound") {
    titleEl.textContent = "Sound Practice";
    introEl.textContent = "Practise sound file size calculations and unit conversions.";
    return;
  }

if (topic === "standardalgorithms") {
  titleEl.textContent = "Standard Algorithms Practice";
  introEl.textContent = "Practise identifying methods such as counting, totalling, maximum, minimum and average.";
  return;
}

if (topic === "validationchecks") {
  titleEl.textContent = "Validation Checks Practice";
  introEl.textContent = "Practise choosing validation checks and writing simple validation and verification algorithms.";
  return;
}

  if (topic === "verificationchecks") {
  titleEl.textContent = "Verification Practice";
  introEl.textContent = "Practise identifying and using visual checks and double entry checks.";
  return;
}

  if (topic === "validationexam") {
  titleEl.textContent = "Validation and Verification Exam Practice";
  introEl.textContent = "Practise exam-style questions on validation and verification, then compare your answer with the model answer.";
  return;
}

 if (topic === "errortypes") {
  titleEl.textContent = "Error Types Practice";
  introEl.textContent = "Practise identifying syntax errors, runtime errors and logic errors.";
  return;
} 

if (topic === "testdata") {
  titleEl.textContent = "Test Data Practice";
  introEl.textContent = "Practise identifying normal, abnormal, extreme and boundary data.";
  return;
}

  if (topic === "tracetables") {
  titleEl.textContent = "Trace Tables Practice";
  introEl.textContent = "Practise completing trace tables from pseudocode and flowcharts using model answers.";
  return;
}
 
if (topic === "pseudocode") {
  titleEl.textContent = "Pseudocode Practice";
  introEl.textContent = "Practise writing algorithms using pseudocode with model answers.";
  return;
}
  
  // default
  titleEl.textContent = "Binary Practice";
  introEl.textContent = "Practise converting between denary and binary with instant feedback and working.";
}

function getTopic() {
  const params = new URLSearchParams(window.location.search);
  return params.get("topic") || "binary";
}

function getMaxValue(difficulty) {
  if (difficulty === "easy") return 15;
  if (difficulty === "medium") return 63;
  return 255;
}

function toBinary(num) {
  return num.toString(2);
}

function padBinary(binaryString) {
  return binaryString.padStart(8, "0");
}

function randomInt(maxInclusive) {
  return Math.floor(Math.random() * (maxInclusive + 1));
}

function denaryToBinaryWorking(num, difficulty) {
  let remaining = num;
  let placeValues = difficulty === "hard"
    ? [128, 64, 32, 16, 8, 4, 2, 1]
    : [64, 32, 16, 8, 4, 2, 1];

  placeValues = placeValues.filter(v => v <= Math.max(num, 1));

  if (difficulty === "hard" && num <= 255) {
    placeValues = [128, 64, 32, 16, 8, 4, 2, 1];
  }

  const bits = [];
  const usedValues = [];

  for (const value of placeValues) {
    if (value <= remaining) {
      bits.push(1);
      usedValues.push(value);
      remaining -= value;
    } else {
      bits.push(0);
    }
  }
   
  return [
    `${num} = ${usedValues.length ? usedValues.join(" + ") : "0"}`,
    "",
    `Place values: ${placeValues.join("  ")}`,
    `Bits:         ${bits.join("  ")}`,
    "",
    `Answer: ${difficulty === "hard" ? padBinary(num.toString(2)) : num.toString(2)}`
  ].join("\n");
}

function binaryToDenaryWorking(binary) {
  const digits = binary.split("").map(Number);
  const placeValues = [];

  for (let i = 0; i < digits.length; i++) {
    placeValues.push(2 ** (digits.length - i - 1));
  }

  let total = 0;
  const usedValues = [];

  for (let i = 0; i < digits.length; i++) {
    if (digits[i] === 1) {
      total += placeValues[i];
      usedValues.push(placeValues[i]);
    }
  }

  return [
    `Binary: ${binary}`,
    "",
    `Place values: ${placeValues.join("  ")}`,
    `Digits:       ${digits.join("  ")}`,
    "",
    `Add: ${usedValues.length ? usedValues.join(" + ") : "0"} = ${total}`,
    "",
    `Answer: ${total}`
  ].join("\n");
}

function updateModeOptions() {
  const topic = getTopic();
  modeEl.innerHTML = "";

  modeEl.style.display = "inline-block";
  difficultyEl.style.display = "inline-block";

  if (topic === "flowcharts") {
    modeEl.innerHTML = `
      <option value="symbols">Flowchart Symbols</option>
      <option value="draw">Draw from Prompt</option>
    `;
    return;
  }

  if (topic === "standardalgorithms") {
    modeEl.innerHTML = `
      <option value="standardmethods">Standard methods</option>
      <option value="linearsearch">Linear search</option>
      <option value="bubblesort">Bubble sort</option>
      <option value="mixed">Mixed</option>
    `;

    difficultyEl.innerHTML = `
      <option value="identify">Identify the method</option>
      <option value="fill">Complete the missing line</option>
      <option value="trace">Trace the algorithm</option>
      <option value="write">Write the algorithm</option>
    `;

    difficultyEl.value = "identify";
    return;
  }

if (topic === "validationchecks" || topic === "verificationchecks" || topic === "validationexam" || topic === "errortypes" || topic === "testdata" || topic === "tracetables") {
  modeEl.style.display = "none";
  difficultyEl.style.display = "none";
  return;
}

  if (topic === "hex") {
    modeEl.innerHTML = `
      <option value="mixed">Mixed</option>
      <option value="denToHex">Denary → Hex</option>
      <option value="hexToDen">Hex → Denary</option>
      <option value="binToHex">Binary → Hex</option>
      <option value="hexToBin">Hex → Binary</option>
    `;
  } else {
    modeEl.innerHTML = `
      <option value="mixed">Mixed</option>
      <option value="denToBin">Denary → Binary</option>
      <option value="binToDen">Binary → Denary</option>
    `;
  }
}


function generateQuestion() {
  const difficulty = difficultyEl.value;
const mode = modeEl.value;
const topic = getTopic();
window.traceTableMode = window.traceTableMode || "pseudocode";
  const flowchartModeButtons = document.getElementById("flowchartModeButtons");

  const statsBox = document.querySelector(".practice-stats");
  const pseudoCategoryWrap = document.getElementById("pseudoCategoryWrap");
  window.pseudocodeQuestions = window.pseudocodeQuestions || [];

const writeTip = document.querySelector(".question-card .exam-tip");
const topicTips = {
  binadd: "✍️ Write the numbers out in columns and track your carries carefully.",
  binshift: "💡 Remember: left shift multiplies by 2, right shift divides by 2.",
  overflow: "💡 Check the register size first — can the result fit in the available bits?",
  twos: "✍️ Write the positive value first, then invert the bits and add 1.",
  hex: "✍️ Group binary into 4 bits or divide by 16 when converting.",
  sound: "💡 Use the formula: sample rate × bit depth × time.",
  text: "💡 Remember: standard ASCII uses 7 bits per character.",
  tracetables: "✍️ Complete the trace table on paper before clicking “Show answer”. Then compare your work to the model answer."
};
  
if (topic === "tracetables") {
  difficultyEl.style.display = "none";
  modeEl.style.display = "none";

  flowchartModeButtons.style.display = "flex";
  flowchartModeButtons.innerHTML = `
    <button type="button" id="tracePseudoBtn" class="button ${window.traceTableMode === "pseudocode" ? "btn-primary" : "btn-secondary"}">Pseudocode questions</button>
    <button type="button" id="traceFlowBtn" class="button ${window.traceTableMode === "flowchart" ? "btn-primary" : "btn-secondary"}">Flowchart questions</button>
  `;

  document.getElementById("tracePseudoBtn").addEventListener("click", () => {
    window.traceTableMode = "pseudocode";
    questionNumber = 1;
    generateQuestion();
  });

  document.getElementById("traceFlowBtn").addEventListener("click", () => {
    window.traceTableMode = "flowchart";
    questionNumber = 1;
    generateQuestion();
  });

  if (writeTip) {
    writeTip.style.display = "block";
    writeTip.textContent = "✍️ Complete the trace table on paper before clicking “Show answer”. Then compare your work to the model answer.";
  }

} else 
  
 if (topic === "tracetables") {
  difficultyEl.style.display = "none";
  modeEl.style.display = "none";

  flowchartModeButtons.style.display = "flex";
  flowchartModeButtons.innerHTML = `
    <button type="button" id="tracePseudoBtn" class="button ${window.traceTableMode === "pseudocode" ? "btn-primary" : "btn-secondary"}">Pseudocode questions</button>
    <button type="button" id="traceFlowBtn" class="button ${window.traceTableMode === "flowchart" ? "btn-primary" : "btn-secondary"}">Flowchart questions</button>
  `;

  document.getElementById("tracePseudoBtn").addEventListener("click", () => {
    window.traceTableMode = "pseudocode";
    questionNumber = 1;
    generateQuestion();
  });

  document.getElementById("traceFlowBtn").addEventListener("click", () => {
    window.traceTableMode = "flowchart";
    questionNumber = 1;
    generateQuestion();
  });

  if (writeTip) {
    writeTip.style.display = "block";
    writeTip.textContent = "✍️ Complete the trace table on paper before clicking “Show answer”. Then compare your work to the model answer.";
  }

} else if (topic === "flowcharts") {
  flowchartModeButtons.style.display = "block";

  if (mode === "draw") {
    if (writeTip) {
      writeTip.style.display = "block";
      writeTip.textContent = "✍️ Draw your flowchart on paper before clicking “Show solution”. Then compare your answer.";
    }
  } else {
    if (writeTip) writeTip.style.display = "none";
  }

} else {
  flowchartModeButtons.style.display = "none";

  if (topic === "pseudocode") {
    if (writeTip) {
      writeTip.style.display = "block";
      writeTip.textContent = "✍️ Write your answer on paper before clicking “Show answer”. Then compare your solution with the model answer.";
    }

  } else if (topicTips[topic]) {
    if (writeTip) {
      writeTip.style.display = "block";
      writeTip.textContent = topicTips[topic];
    }

  } else {
    if (writeTip) writeTip.style.display = "none";
  }
}
  

  if (topic === "pseudocode") {
    const pseudoCategory = document.getElementById("pseudoCategory").value;
  
    const filteredQuestions = pseudoCategory === "all"
      ? window.pseudocodeQuestions
      : window.pseudocodeQuestions.filter(q => q.category === pseudoCategory);
  
    statsBox.innerHTML =
      `<div class="stat-box">Question: ${questionNumber}/${filteredQuestions.length}</div>`;
    pseudoCategoryWrap.style.display = "block";
  } else {

  
 statsBox.innerHTML =
  `<div class="stat-box">Correct: <span id="correctCount">${correctCount}</span></div>
   <div class="stat-box">Incorrect: <span id="incorrectCount">${incorrectCount}</span></div>
   <div class="stat-box">Streak: <span id="streakCount">${currentStreak}</span></div>
   <div class="stat-box">Best: <span id="bestStreakCount">${bestStreak}</span></div>
   
<div class="stat-box">Question: <span id="questionNumber">${questionNumber}</span>/<span id="totalQuestions">${
topic === "standardalgorithms" ? 5 :
topic === "validationchecks" ? 5 :
topic === "verificationchecks" ? 4 :
topic === "errortypes" ? 10 :
topic === "testdata" ? 10 :
topic === "validationexam" ? 5 :
topic === "tracetables" ? 6 :
10
}</span></div>`;

   
pseudoCategoryWrap.style.display = "none";
}

  document.getElementById("answer").parentElement.style.display = "block";
  hintBtn.style.display = "none";

 if (topic === "tracetables") {
  statsBox.style.display = "none";
} else if (topic === "flowcharts" && mode === "draw") {
  statsBox.style.display = "none";
} else {
  statsBox.style.display = "flex";
}

  feedbackEl.innerHTML = "";
  feedbackEl.classList.remove("correct", "incorrect");
  answerEl.value = "";
  answerEl.focus();


      if (imageOptionsEl) {
      imageOptionsEl.innerHTML = "";
    }
    
    answerEl.style.display = "block";
    answerEl.parentElement.style.display = "flex";
    checkBtn.style.display = "inline-flex";

    if (topic === "flowcharts") {

    
    if (mode === "draw") {
     const drawQuestions = [
  {
    question: "Draw a flowchart to ask the user to enter 2 numbers, add the numbers together and output the total.",
    answer: "total.png"
  },
  {
    question: "Draw a flowchart to input a number and output 'Higher' if it is greater than 10, otherwise output 'Lower'.",
    answer: "numbergreater10.png"
  },
  {
    question: "Draw a flowchart to input two numbers and output the largest number, or output 'Equal' if the numbers are the same.",
    answer: "biggestnumber.png"
  },
  {
    question: "Draw a flowchart to ask the user to enter 10 numbers, calculate the total and output the result.",
    answer: "total10.png"
  },
  {
    question: "Draw a flowchart to ask the user to enter two numbers, then call a subprogram to calculate and output the total.",
    answer: "subprogramflow.png"
  }
];

const selected = drawQuestions[drawQuestionIndex];

currentQuestionType = "flowchartDraw";
currentQuestion = selected.question;
currentAnswer = selected.answer;

questionEl.textContent = currentQuestion;

 // remove old message if it exists
const existingMsg = document.getElementById("finalMsg");
if (existingMsg) existingMsg.remove();

if (drawQuestionIndex === drawQuestions.length - 1) {
  const endMsg = document.createElement("div");
  endMsg.id = "finalMsg";
  endMsg.className = "exam-tip final-message";
  endMsg.textContent = "You have reached the final flowchart question. Click Next question to go through them again.";
  questionEl.insertAdjacentElement("afterend", endMsg);
}

 const imageDiv = document.getElementById("imageOptions");

imageDiv.innerHTML = `
  <button id="showSolutionBtn" type="button" class="button btn-primary">Show solution</button>

  <div id="solutionWrap" style="display:none; margin-top:16px;">
    <div class="flowchart-solution">
      <img src="images/practice/flowcharts/solutions/${currentAnswer}" alt="Flowchart solution">
    </div>
  </div>
`;
    
      answerEl.style.display = "none";
      answerEl.parentElement.style.display = "none";
      checkBtn.style.display = "none";
    
      const showSolutionBtn = document.getElementById("showSolutionBtn");
      const solutionWrap = document.getElementById("solutionWrap");
    
  showSolutionBtn.addEventListener("click", () => {
  solutionWrap.style.display = "block";
  showSolutionBtn.disabled = true;
    if (writeTip) writeTip.style.display = "none";

  const imageDiv = document.getElementById("imageOptions");

  // prevent duplicate message
  if (!document.getElementById("flowTip")) {
    const feedbackMsg = document.createElement("div");
    feedbackMsg.id = "flowTip";
    feedbackMsg.className = "exam-tip";
    feedbackMsg.style.marginTop = "12px";
    feedbackMsg.textContent =
      "💡 Your flowchart does not have to look exactly the same as this model answer. If the logic, symbols and outputs are correct, it can still gain full marks.";

    imageDiv.appendChild(feedbackMsg);
  }
});
    
      return;
    }
      
      const symbols = [
        { name: "Terminal", file: "terminal.png" },
        { name: "Process", file: "process.png" },
        { name: "Decision", file: "decision.png" },
        { name: "Input/Output", file: "input-output.png" },
        { name: "Subprogram", file: "subprogram.png" }
      ];
    
      const prompts = {
        "Terminal": "start or end of a program",
        "Process": "a calculation or instruction",
        "Decision": "a condition that branches the flow",
        "Input/Output": "inputting or outputting data",
        "Subprogram": "calling another procedure"
      };
    
      let availableSymbols = symbols.filter(symbol => symbol.name !== lastFlowchartAnswer);
    
    if (availableSymbols.length === 0) {
      availableSymbols = symbols;
    }
    
    const correct = availableSymbols[Math.floor(Math.random() * availableSymbols.length)];
    lastFlowchartAnswer = correct.name;
  const options = [...symbols].sort(() => Math.random() - 0.5);

  currentQuestionType = "flowSymbol";
  currentAnswer = correct.name;

  questionEl.textContent = "Which flowchart symbol is used for: " + prompts[correct.name] + "?";

  const imageDiv = document.getElementById("imageOptions");
  imageDiv.innerHTML = "";

  options.forEach(opt => {
    const div = document.createElement("div");
    div.className = "image-option";
    div.innerHTML = `<img src="images/practice/flowcharts/${opt.file}" alt="${opt.name}">`;

    div.addEventListener("click", () => {
      if (checkBtn.disabled) return;
    
      answerEl.value = opt.name;
      checkAnswer();
    
      const allOptions = document.querySelectorAll(".image-option");
    
      allOptions.forEach(option => {
        option.style.pointerEvents = "none";
        option.style.opacity = "0.85";
    
        const img = option.querySelector("img");
    
        if (img.alt === currentAnswer) {
          option.style.borderColor = "green";
        }
      });
    
      if (opt.name !== currentAnswer) {
        div.style.borderColor = "red";
      } else {
        div.style.borderColor = "green";
      }
    });

    imageDiv.appendChild(div);
  });

  answerEl.style.display = "none";
  answerEl.parentElement.style.display = "none";
  checkBtn.style.display = "none";

  return;
}

if (topic === "tracetables") {
  const traceTableQuestions = window.traceTableMode === "flowchart"
    ? [
        { question: "Complete the trace table for this flowchart question.", questionImage: "trace-flow-1-q.png", answerImage: "trace-flow-1-a.png" },
        { question: "Complete the trace table for this flowchart question.", questionImage: "trace-flow-2-q.png", answerImage: "trace-flow-2-a.png" },
        { question: "Complete the trace table for this flowchart question.", questionImage: "trace-flow-3-q.png", answerImage: "trace-flow-3-a.png" },
        { question: "Complete the trace table for this flowchart question.", questionImage: "trace-flow-4-q.png", answerImage: "trace-flow-4-a.png" },
        { question: "Complete the trace table for this flowchart question.", questionImage: "trace-flow-5-q.png", answerImage: "trace-flow-5-a.png" },
        { question: "Complete the trace table for this flowchart question.", questionImage: "trace-flow-6-q.png", answerImage: "trace-flow-6-a.png" }
      ]
    : [
        { question: "Complete the trace table for this pseudocode question.", questionImage: "trace-pseudo-1-q.png", answerImage: "trace-pseudo-1-a.png" },
        { question: "Complete the trace table for this pseudocode question.", questionImage: "trace-pseudo-2-q.png", answerImage: "trace-pseudo-2-a.png" },
        { question: "Complete the trace table for this pseudocode question.", questionImage: "trace-pseudo-3-q.png", answerImage: "trace-pseudo-3-a.png" },
        { question: "Complete the trace table for this pseudocode question.", questionImage: "trace-pseudo-4-q.png", answerImage: "trace-pseudo-4-a.png" },
        { question: "Complete the trace table for this pseudocode question.", questionImage: "trace-pseudo-5-q.png", answerImage: "trace-pseudo-5-a.png" },
        { question: "Complete the trace table for this pseudocode question.", questionImage: "trace-pseudo-6-q.png", answerImage: "trace-pseudo-6-a.png" }
      ];

  if (questionNumber > traceTableQuestions.length) {
    questionNumber = traceTableQuestions.length;
  }

  const selected = traceTableQuestions[(questionNumber - 1) % traceTableQuestions.length];

  currentQuestionType = "exam";
  currentQuestion = selected.question;
  currentAnswer = selected.answerImage;

  questionEl.textContent = currentQuestion;

  const existingMsg = document.getElementById("finalMsg");
  if (existingMsg) existingMsg.remove();

  if (questionNumber === traceTableQuestions.length) {
    const endMsg = document.createElement("div");
    endMsg.id = "finalMsg";
    endMsg.className = "exam-tip final-message";
    endMsg.textContent = "You have reached the final question. Click Next question to go through them again.";
    questionEl.insertAdjacentElement("afterend", endMsg);
  }

  const imageDiv = document.getElementById("imageOptions");

  imageDiv.innerHTML = `
    <div class="flowchart-solution">
      <img src="images/practice/tracetables/questions/${selected.questionImage}" alt="Trace table question">
    </div>

    <button id="showTraceAnswerBtn" class="button btn-primary" style="margin-top:16px;">
      Show answer
    </button>

    <div id="traceAnswerWrap" style="display:none; margin-top:16px;">
      <div class="flowchart-solution">
        <img src="images/practice/tracetables/answers/${currentAnswer}" alt="Trace table answer">
      </div>
    </div>
  `;

  answerEl.style.display = "none";
  answerEl.parentElement.style.display = "none";
  checkBtn.style.display = "none";

  const btn = document.getElementById("showTraceAnswerBtn");
  const wrapAnswer = document.getElementById("traceAnswerWrap");

  btn.addEventListener("click", () => {
    wrapAnswer.style.display = "block";
    btn.disabled = true;
    if (writeTip) writeTip.style.display = "none";
  });

  return;
}



  
  if (topic === "text") {
    currentQuestion = "How many bits are used to represent a character in standard ASCII?";
    currentAnswer = "7";
    currentQuestionType = "asciiBits";

    questionEl.textContent = currentQuestion;
    return;
  }

  if (topic === "sound") {
  const sampleRates = [1000, 2000, 4000, 8000, 10000];
  const sampleRate = sampleRates[Math.floor(Math.random() * sampleRates.length)];
  const bitDepth = [8, 16][Math.floor(Math.random() * 2)];

  soundQuestionCount++;

  let type;

  if (soundQuestionCount <= 3) {
    type = "soundBitsPerSecond";
  } else {
    const options = ["soundBitsPerSecond", "soundTotalBits", "soundBitsToBytes", "soundUnits"];
    type = options[Math.floor(Math.random() * options.length)];
  }

  if (type === "soundBitsPerSecond") {
    const bitsPerSecond = sampleRate * bitDepth;

    currentQuestion = `A sound is sampled at ${sampleRate} Hz (samples per second) with a resolution of ${bitDepth} bits (bits per sample).

How many bits are stored per second?

Hint: bits per second = sampling rate × bit depth`;

    currentAnswer = bitsPerSecond.toString();
    currentQuestionType = "soundBitsPerSecond";
    currentSourceValue = { sampleRate, bitDepth };

  } else if (type === "soundTotalBits") {
    const seconds = [2, 5, 10, 20][Math.floor(Math.random() * 4)];
    const totalBits = sampleRate * bitDepth * seconds;

    currentQuestion = `A sound is sampled at ${sampleRate} Hz (samples per second) with a resolution of ${bitDepth} bits (bits per sample) for ${seconds} seconds.

How many bits are stored in total?

Hint: total bits = sampling rate × bit depth × time`;

    currentAnswer = totalBits.toString();
    currentQuestionType = "soundTotalBits";
    currentSourceValue = { sampleRate, bitDepth, seconds };

  } else if (type === "soundBitsToBytes") {
    const bitsPerSecond = sampleRate * bitDepth;
    const bytes = bitsPerSecond / 8;

    currentQuestion = `A sound is sampled at ${sampleRate} Hz (samples per second) with a resolution of ${bitDepth} bits (bits per sample).

It stores ${bitsPerSecond} bits per second.

How many bytes per second is this?

Hint: 8 bits = 1 byte`;

currentAnswer = bytes.toString();
currentQuestionType = "soundBitsToBytes";
currentSourceValue = { bitsPerSecond };

} else if (type === "soundUnits") {

  const unitQuestions = [
    {
      q: "How many bits are in a byte?",
      a: "8",
      w: "1 byte = 8 bits"
    },
    {
      q: "How many bytes are in a kibibyte (KiB)?",
      a: "1024",
      w: "1 KiB = 1024 bytes"
    },
    {
      q: "How many kibibytes (KiB) are in 1 mebibyte (MiB)?",
      a: "1024",
      w: "1 MiB = 1024 KiB"
    }
  ];

  const chosen = unitQuestions[Math.floor(Math.random() * unitQuestions.length)];

  currentQuestion = chosen.q;
  currentAnswer = chosen.a;
  currentQuestionType = "soundUnits";
  currentSourceValue = chosen.w;
}

questionEl.textContent = currentQuestion;
return;
}


if (topic === "pseudocode") {

  window.pseudocodeQuestions = [

// 🔹 Level 1 — Input / Output (10 Questions)

{
  category: "inputoutput",
  question: "Write pseudocode to input a name and output it.",
  answer:
`OUTPUT "Enter your name"
INPUT name
OUTPUT name`,
  hints: [
    "Did you include an OUTPUT prompt?",
    "Did you INPUT a variable?",
    "Did you OUTPUT the value entered?"
  ]
},
{
  category: "inputoutput",
  question: "Write pseudocode to input a number and output double the value.",
  answer:
`OUTPUT "Enter a number"
INPUT num
num ← num * 2
OUTPUT "Double is ", num`,
  hints: [
    "Did you INPUT a number?",
    "Did you multiply it by 2?",
    "Did you OUTPUT the result?"
  ]
},
{
  category: "inputoutput",
  question: "Write pseudocode to input two numbers and output the total.",
  answer:
`OUTPUT "Enter first number"
INPUT num1
OUTPUT "Enter second number"
INPUT num2
total ← num1 + num2
OUTPUT "The total is ", total`,
  hints: [
    "Did you INPUT two numbers?",
    "Did you add them together?",
    "Did you OUTPUT the total?"
  ]
},
{
  category: "inputoutput",
  question: "Write pseudocode to input a number and output its square.",
  answer:
`OUTPUT "Enter a number"
INPUT num
square ← num * num
OUTPUT "The square is ", square`,
  hints: [
    "Did you INPUT a number?",
    "Did you multiply it by itself?",
    "Did you OUTPUT the result?"
  ]
},
{
  category: "inputoutput",
  question: "Write pseudocode to input a number and output half the value.",
  answer:
`OUTPUT "Enter a number"
INPUT num
result ← num / 2
OUTPUT "Half is ", result`,
  hints: [
    "Did you divide the number by 2?",
    "Did you store the result?",
    "Did you OUTPUT it?"
  ]
},
{
  category: "inputoutput",
  question: "Write pseudocode to input a name and age, then output both.",
  answer:
`OUTPUT "Enter name"
INPUT name
OUTPUT "Enter age"
INPUT age
OUTPUT name, age`,
  hints: [
    "Did you INPUT two values?",
    "Did you use two prompts?",
    "Did you OUTPUT both values?"
  ]
},
{
  category: "inputoutput",
  question: "Write pseudocode to input a price and output the price with 20% added.",
  answer:
`OUTPUT "Enter price"
INPUT price
newPrice ← price * 1.2
OUTPUT "New price is ", newPrice`,
  hints: [
    "Did you multiply by 1.2?",
    "Did you store the result?",
    "Did you OUTPUT it clearly?"
  ]
},
{
  category: "inputoutput",
  question: "Write pseudocode to input two numbers and output the difference.",
  answer:
`OUTPUT "Enter first number"
INPUT num1
OUTPUT "Enter second number"
INPUT num2
difference ← num1 - num2
OUTPUT "Difference is ", difference`,
  hints: [
    "Did you subtract the numbers?",
    "Which number comes first?",
    "Did you OUTPUT the result?"
  ]
},
{
  category: "inputoutput",
  question: "Write pseudocode to input a length and width and output the area of a rectangle.",
  answer:
`OUTPUT "Enter length"
INPUT length
OUTPUT "Enter width"
INPUT width
area ← length * width
OUTPUT "Area is ", area`,
  hints: [
    "What formula calculates area?",
    "Did you multiply length and width?",
    "Did you OUTPUT the result?"
  ]
},
{
  category: "inputoutput",
  question: "Write pseudocode to input a number and output the number plus 10.",
  answer:
`OUTPUT "Enter a number"
INPUT num
result ← num + 10
OUTPUT "Result is ", result`,
  hints: [
    "Did you add 10 to the number?",
    "Did you store the result?",
    "Did you OUTPUT it?"
  ]
},


// 🔹 Level 2 — Selection (10 Questions)

{
  category: "selection",
  question: "Write pseudocode to input a number and output if it is positive.",
  answer:
`OUTPUT "Enter a number"
INPUT num
IF num > 0 THEN
  OUTPUT "Positive"
ENDIF`,
  hints: [
    "You are making a decision → use IF",
    "What condition checks for positive?",
    "Only one outcome is needed"
  ]
},
{
  category: "selection",
  question: "Write pseudocode to input a number and output if it is positive or negative.",
  answer:
`OUTPUT "Enter a number"
INPUT num
IF num >= 0 THEN
  OUTPUT "Positive"
ELSE
  OUTPUT "Negative"
ENDIF`,
  hints: [
    "You need two outcomes → use IF...ELSE",
    "What condition separates positive and negative?",
    "Don't forget the ELSE"
  ]
},
{
  category: "selection",
  question: "Write pseudocode to input a number and output 'Positive', 'Negative' or 'Zero'.",
  answer:
`OUTPUT "Enter a number"
INPUT num
IF num > 0 THEN
  OUTPUT "Positive"
ELSE IF num < 0 THEN
  OUTPUT "Negative"
ELSE
  OUTPUT "Zero"
ENDIF`,
  hints: [
    "You have three outcomes → use ELSE IF",
    "Check positive first",
    "What happens if it is neither positive nor negative?"
  ]
},
{
  category: "selection",
  question: "Write pseudocode to input a mark and output Pass if it is 50 or more, otherwise Fail.",
  answer:
`OUTPUT "Enter mark"
INPUT mark
IF mark >= 50 THEN
  OUTPUT "Pass"
ELSE
  OUTPUT "Fail"
ENDIF`,
  hints: [
    "This is a boundary check → use IF",
    "What comparison is needed for pass?",
    "You need both outcomes"
  ]
},
{
  category: "selection",
  question: "Write pseudocode to input a number and output if it is even or odd.",
  answer:
`OUTPUT "Enter a number"
INPUT num
IF num MOD 2 = 0 THEN
  OUTPUT "Even"
ELSE
  OUTPUT "Odd"
ENDIF`,
  hints: [
    "Use MOD to check divisibility",
    "What does MOD 2 = 0 mean?",
    "Include both outcomes"
  ]
},
{
  category: "selection",
  question: "Write pseudocode to input two numbers and output the largest.",
  answer:
`OUTPUT "Enter first number"
INPUT num1
OUTPUT "Enter second number"
INPUT num2
IF num1 > num2 THEN
  OUTPUT num1
ELSE
  OUTPUT num2
ENDIF`,
  hints: [
    "Compare two values",
    "Which operator finds the larger?",
    "One IF is enough"
  ]
},
{
  category: "selection",
  question: "Write pseudocode to input two numbers and output 'Equal' if they are the same, otherwise output the largest.",
  answer:
`OUTPUT "Enter first number"
INPUT num1
OUTPUT "Enter second number"
INPUT num2
IF num1 = num2 THEN
  OUTPUT "Equal"
ELSE IF num1 > num2 THEN
  OUTPUT num1
ELSE
  OUTPUT num2
ENDIF`,
  hints: [
    "First check if they are equal",
    "Then compare which is larger",
    "You need ELSE IF"
  ]
},
{
  category: "selection",
  question: "Write pseudocode to input a number and output 'High' if it is greater than 100, otherwise output 'Low'.",
  answer:
`OUTPUT "Enter a number"
INPUT num
IF num > 100 THEN
  OUTPUT "High"
ELSE
  OUTPUT "Low"
ENDIF`,
  hints: [
    "Single condition → IF",
    "What value is the boundary?",
    "Include ELSE"
  ]
},
{
  category: "selection",
  question: "Write pseudocode to input an age and output 'Adult' if 18 or over, otherwise 'Child'.",
  answer:
`OUTPUT "Enter age"
INPUT age
IF age >= 18 THEN
  OUTPUT "Adult"
ELSE
  OUTPUT "Child"
ENDIF`,
  hints: [
    "Think about the boundary value",
    "Use >= for 18 and over",
    "Two outcomes needed"
  ]
},
{
  category: "selection",
  question: "Write pseudocode to input a number and output 'Divisible by 5' if it is divisible by 5, otherwise 'Not divisible'.",
  answer:
`OUTPUT "Enter a number"
INPUT num
IF num MOD 5 = 0 THEN
  OUTPUT "Divisible by 5"
ELSE
  OUTPUT "Not divisible"
ENDIF`,
  hints: [
    "Use MOD to test divisibility",
    "What result means divisible?",
    "Include both outcomes"
  ]
},

    


// 🔹 Level 3 — Iteration (10 Questions)

{
  category: "iteration",
  question: "Write pseudocode to output the numbers 1 to 10.",
  answer:
`FOR i ← 1 TO 10
  OUTPUT i
NEXT i`,
  hints: [
    "This is a fixed number of repetitions → use a FOR loop",
    "Start at 1",
    "Finish at 10",
    "OUTPUT inside the loop"
  ]
},
{
  category: "iteration",
  question: "Write pseudocode to output the message \"Hello\" 5 times.",
  answer:
`FOR i ← 1 TO 5
  OUTPUT "Hello"
NEXT i`,
  hints: [
    "This is a fixed number of repetitions → use a FOR loop",
    "How many times should it repeat?",
    "OUTPUT should be inside the loop"
  ]
},
{
  category: "iteration",
  question: "Write pseudocode to input 5 numbers and output the total.",
  answer:
`total ← 0
FOR i ← 1 TO 5
  OUTPUT "Enter a number"
  INPUT num
  total ← total + num
NEXT i
OUTPUT "Total is ", total`,
  hints: [
    "You know exactly how many times to repeat → use a FOR loop",
    "You need a running total",
    "INPUT inside the loop",
    "OUTPUT after the loop"
  ]
},
{
  category: "iteration",
  question: "Write pseudocode to input 5 numbers and count how many are positive.",
  answer:
`count ← 0
FOR i ← 1 TO 5
  OUTPUT "Enter a number"
  INPUT num
  IF num > 0 THEN
    count ← count + 1
  ENDIF
NEXT i
OUTPUT "Count is ", count`,
  hints: [
    "You know how many inputs there are → use a FOR loop",
    "You need a counter",
    "What condition checks for positive?",
    "OUTPUT the count after the loop"
  ]
},
{
  category: "iteration",
  question: "Write pseudocode to output the 5 times table from 5 × 1 to 5 × 10.",
  answer:
`FOR i ← 1 TO 10
  OUTPUT 5 * i
NEXT i`,
  hints: [
    "This is a fixed number of repetitions → use a FOR loop",
    "What values should i take?",
    "Multiply 5 by the loop variable"
  ]
},
{
  category: "iteration",
  question: "Write pseudocode to keep asking for a number until the user enters 0.",
  answer:
`OUTPUT "Enter a number"
INPUT num
WHILE num <> 0 DO
  OUTPUT "Enter a number"
  INPUT num
ENDWHILE`,
  hints: [
    "This depends on a condition → use a WHILE loop",
    "What value stops the loop?",
    "You need to input again inside the loop"
  ]
},
{
  category: "iteration",
  question: "Write pseudocode to input numbers until 0 is entered, then output the total.",
  answer:
`total ← 0
OUTPUT "Enter a number (0 to stop)"
INPUT num
WHILE num <> 0 DO
  total ← total + num
  OUTPUT "Enter a number (0 to stop)"
  INPUT num
ENDWHILE
OUTPUT "Total is ", total`,
  hints: [
    "This depends on a condition → use a WHILE loop",
    "You need a running total",
    "Stop when 0 is entered",
    "OUTPUT the total after the loop"
  ]
},
{
  category: "iteration",
  question: "Write pseudocode to keep asking for a password until the user enters \"Secret\".",
  answer:
`OUTPUT "Enter password"
INPUT password
WHILE password <> "Secret" DO
  OUTPUT "Enter password"
  INPUT password
ENDWHILE`,
  hints: [
    "This depends on a condition → use a WHILE loop",
    "What makes the loop stop?",
    "Check the password each time"
  ]
},
{
  category: "iteration",
  question: "Write pseudocode to ask the user to enter a number until they enter one greater than 100.",
  answer:
`REPEAT
  OUTPUT "Enter a number"
  INPUT num
UNTIL num > 100`,
  hints: [
    "The loop must run at least once → use REPEAT...UNTIL",
    "What condition ends the loop?",
    "Check the condition after the input"
  ]
},
{
  category: "iteration",
  question: "Write pseudocode to ask the user to enter \"yes\" until they do so.",
  answer:
`REPEAT
  OUTPUT "Enter yes"
  INPUT reply
UNTIL reply = "yes"`,
  hints: [
    "The user must enter something at least once → use REPEAT...UNTIL",
    "What value makes the loop stop?",
    "Check the condition after the input"
  ]
}

    

];



  const pseudoCategory = document.getElementById("pseudoCategory").value;

const filteredQuestions = pseudoCategory === "all"
  ? window.pseudocodeQuestions
  : window.pseudocodeQuestions.filter(q => q.category === pseudoCategory);

if (questionNumber > filteredQuestions.length) {
  questionNumber = filteredQuestions.length;
}

const item = filteredQuestions[(questionNumber - 1) % filteredQuestions.length];

  
  currentQuestionType = "pseudocode";
  currentQuestion = item.question;
  currentAnswer = item.answer;
  currentHints = item.hints;
  questionEl.innerHTML = currentQuestion.replace(/\n/g, "<br>");
  document.getElementById("answer").parentElement.style.display = "none";
  hintBtn.style.display = "inline-flex";
  return;
}


if (topic === "standardalgorithms") {

  const standardMode = difficultyEl.value;

  const fillQuestions = [
    {
      question: `Complete the missing line to count how many numbers are greater than 10:

count ← 0
FOR i ← 1 TO 5
  INPUT num
  IF num > 10 THEN
    __________
  ENDIF
NEXT i`,
      answer: "count ← count + 1"
    },
    {
      question: `Complete the missing line to calculate the total of the numbers:

total ← 0
FOR i ← 1 TO 5
  INPUT num
  __________
NEXT i`,
      answer: "total ← total + num"
    },
    {
      question: `Complete the missing line to find the largest number:

max ← 0
FOR i ← 1 TO 5
  INPUT num
  IF num > max THEN
    __________
  ENDIF
NEXT i`,
      answer: "max ← num"
    },
    {
      question: `Complete the missing line to find the smallest number:

min ← 999999
FOR i ← 1 TO 5
  INPUT num
  IF num < min THEN
    __________
  ENDIF
NEXT i`,
      answer: "min ← num"
    },
    {
      question: `Complete the missing line to calculate the average:

total ← 0
FOR i ← 1 TO 5
  INPUT num
  total ← total + num
NEXT i
average ← __________`,
      answer: "total / 5"
    }
  ];

  const identifyQuestions = [
    {
      question: `What standard method of solution is this?

count ← 0
FOR i ← 1 TO 5
  INPUT num
  IF num > 10 THEN
    count ← count + 1
  ENDIF
NEXT i
OUTPUT count`,
      answer: "counting"
    },
    {
      question: `What standard method of solution is this?

total ← 0
FOR i ← 1 TO 5
  INPUT num
  total ← total + num
NEXT i
OUTPUT total`,
      answer: "totalling"
    },
    {
      question: `What standard method of solution is this?

max ← 0
FOR i ← 1 TO 5
  INPUT num
  IF num > max THEN
    max ← num
  ENDIF
NEXT i
OUTPUT max`,
      answer: "maximum"
    },
    {
      question: `What standard method of solution is this?

min ← 999999
FOR i ← 1 TO 5
  INPUT num
  IF num < min THEN
    min ← num
  ENDIF
NEXT i
OUTPUT min`,
      answer: "minimum"
    },
    {
      question: `What standard method of solution is this?

total ← 0
FOR i ← 1 TO 5
  INPUT num
  total ← total + num
NEXT i
average ← total / 5
OUTPUT average`,
      answer: "average"
    }
  ];

  const traceQuestions = [
    {
      question: `Trace the algorithm and give the final value of count:

count ← 0
FOR i ← 1 TO 4
  INPUT num
  IF num > 10 THEN
    count ← count + 1
  ENDIF
NEXT i

Inputs: 5, 12, 8, 20`,
      answer: "2"
    },
    {
      question: `Trace the algorithm and give the final value of total:

total ← 0
FOR i ← 1 TO 3
  INPUT num
  total ← total + num
NEXT i

Inputs: 5, 3, 2`,
      answer: "10"
    },
    {
      question: `Trace the algorithm and give the final value of max:

max ← 0
FOR i ← 1 TO 4
  INPUT num
  IF num > max THEN
    max ← num
  ENDIF
NEXT i

Inputs: 7, 3, 9, 5`,
      answer: "9"
    },
    {
      question: `Trace the algorithm and give the final value of min:

min ← 999999
FOR i ← 1 TO 4
  INPUT num
  IF num < min THEN
    min ← num
  ENDIF
NEXT i

Inputs: 7, 3, 9, 5`,
      answer: "3"
    },
    {
      question: `Trace the algorithm and give the final value of average:

total ← 0
FOR i ← 1 TO 4
  INPUT num
  total ← total + num
NEXT i
average ← total / 4

Inputs: 6, 4, 8, 2`,
      answer: "5"
    }
  ];

  const writeQuestions = [
    {
      question: `Write pseudocode to input 5 numbers and count how many are greater than 10.`,
      answer: `count ← 0
FOR i ← 1 TO 5
  INPUT num
  IF num > 10 THEN
    count ← count + 1
  ENDIF
NEXT i
OUTPUT count`
    },
    {
      question: `Write pseudocode to input 5 numbers and calculate the total.`,
      answer: `total ← 0
FOR i ← 1 TO 5
  INPUT num
  total ← total + num
NEXT i
OUTPUT total`
    },
    {
      question: `Write pseudocode to input 5 numbers and find the largest number.`,
      answer: `max ← 0
FOR i ← 1 TO 5
  INPUT num
  IF num > max THEN
    max ← num
  ENDIF
NEXT i
OUTPUT max`
    },
    {
      question: `Write pseudocode to input 5 numbers and find the smallest number.`,
      answer: `min ← 999999
FOR i ← 1 TO 5
  INPUT num
  IF num < min THEN
    min ← num
  ENDIF
NEXT i
OUTPUT min`
    },
    {
      question: `Write pseudocode to input 5 numbers and calculate the average.`,
      answer: `total ← 0
FOR i ← 1 TO 5
  INPUT num
  total ← total + num
NEXT i
average ← total / 5
OUTPUT average`
    }
  ];

  const linearSearchQuestions = [
    {
      question: `Explain how a linear search works.`,
      answer: `A linear search checks each item in the list one by one from the start until the item is found or the end of the list is reached.`
    },
    {
      question: `A linear search is used to find 12 in this list:

5, 9, 3, 12, 7

What position is 12 found in?`,
      answer: "4"
    },
    {
      question: `A linear search is used to find 3 in this list:

8, 6, 3, 1, 5

How many checks are made before the item is found?`,
      answer: "3"
    },
    {
      question: `A linear search is used to find 10 in this list:

4, 2, 8, 6, 1

What is the result of the search?`,
      answer: "not found"
    },
    {
      question: `Write the steps of a linear search in a simple way.`,
      answer: `1. Start at the first item.
2. Compare it with the value you want to find.
3. If it matches, stop.
4. If it does not match, move to the next item.
5. Keep going until the item is found or the end of the list is reached.`
    }
  ];

  const bubbleSortQuestions = [
    {
      question: `Explain how bubble sort works.`,
     answer: `Bubble sort starts by comparing the first two values in the list.

If they are in the wrong order, they are swapped. Then it moves to the next pair and repeats this process.

After one full pass, the largest value has moved to the end of the list.

Example:

Start: 5, 3, 8, 1

Pass 1:
5 and 3 → swap → 3, 5, 8, 1  
5 and 8 → no swap → 3, 5, 8, 1  
8 and 1 → swap → 3, 5, 1, 8  

Pass 2:
3 and 5 → no swap  
5 and 1 → swap → 3, 1, 5, 8  

Pass 3:
3 and 1 → swap → 1, 3, 5, 8  

The list is now sorted.

Bubble sort keeps making passes until no swaps are needed.`
    },
    {
      question: `Bubble sort is applied to this list:

5, 3, 8, 1

What is the list after the first full pass?`,
      answer: "3, 5, 1, 8"
    },
    {
      question: `Bubble sort is applied to this list:

7, 4, 2, 6

What is the list after the first full pass?`,
      answer: "4, 2, 6, 7"
    },
    {
      question: `Bubble sort is applied to this list:

3, 1, 2

What is the list after the second full pass?`,
      answer: "1, 2, 3"
    },
    {
      question: `Write the steps of bubble sort in a simple way.`,
      answer: `1. Start at the beginning of the list.
2. Compare two neighbouring values.
3. If they are in the wrong order, swap them.
4. Move to the next pair and repeat.
5. After one pass, the largest value has moved towards the end.
6. Keep making passes until the list is sorted.`
    }
  ];

  let questionSet = [];
  let index = questionNumber - 1;
  let item;

  if (mode === "standardmethods") {
    if (standardMode === "identify") {
      questionSet = identifyQuestions;
      currentQuestionType = "standardAlgorithmsIdentify";
    } else if (standardMode === "fill") {
      questionSet = fillQuestions;
      currentQuestionType = "standardAlgorithmsFill";
    } else if (standardMode === "trace") {
      questionSet = traceQuestions;
      currentQuestionType = "standardAlgorithmsTrace";
    } else {
      questionSet = writeQuestions;
      currentQuestionType = "standardAlgorithmsWrite";
    }
  }

 else if (mode === "linearsearch") {
  questionSet = linearSearchQuestions;

  if (index === 0) {
    currentQuestionType = "standardAlgorithmsExplain";
  } else if (index === 4) {
    currentQuestionType = "standardAlgorithmsWrite";
  } else {
    currentQuestionType = "standardAlgorithmsTrace";
  }
}

else if (mode === "bubblesort") {
  questionSet = bubbleSortQuestions;

  if (index === 0) {
    currentQuestionType = "standardAlgorithmsExplain";
  } else if (index === 4) {
    currentQuestionType = "standardAlgorithmsWrite";
  } else {
    currentQuestionType = "standardAlgorithmsTrace";
  }
}

  else {
    questionSet = [
      identifyQuestions[0],
      linearSearchQuestions[1],
      bubbleSortQuestions[1],
      linearSearchQuestions[0],
      bubbleSortQuestions[0]
    ];

    if (index === 0) {
      currentQuestionType = "standardAlgorithmsIdentify";
    } else if (index === 1 || index === 2) {
      currentQuestionType = "standardAlgorithmsTrace";
    } else {
      currentQuestionType = "standardAlgorithmsWrite";
    }
  }

  if (index >= questionSet.length) {
    index = questionSet.length - 1;
  }

  item = questionSet[index];
  currentQuestion = item.question;
  currentAnswer = item.answer;

  questionEl.innerHTML = `<div class="code-block">${currentQuestion}</div>`;

  imageOptionsEl.innerHTML = "";

  if (currentQuestionType === "standardAlgorithmsIdentify") {
    const options = ["counting", "totalling", "maximum", "minimum", "average"];

    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "button";
      btn.textContent = opt.charAt(0).toUpperCase() + opt.slice(1);

      btn.addEventListener("click", () => {
        if (checkBtn.disabled) return;

        answerEl.value = opt;
        checkAnswer();

        const allButtons = imageOptionsEl.querySelectorAll("button");

        allButtons.forEach(button => {
          button.disabled = true;
          button.style.opacity = "0.85";

          if (button.textContent.toLowerCase() === currentAnswer) {
            button.style.borderColor = "green";
          }
        });

        if (opt !== currentAnswer) {
          btn.style.borderColor = "red";
        } else {
          btn.style.borderColor = "green";
        }
      });

      imageOptionsEl.appendChild(btn);
    });

    answerEl.style.display = "none";
    answerEl.parentElement.style.display = "none";
    checkBtn.style.display = "none";
  }

  else if (
  currentQuestionType === "standardAlgorithmsWrite" ||
  currentQuestionType === "standardAlgorithmsExplain"
) {
  questionEl.innerHTML =
    `<div class="exam-tip">✍️ Write your answer on paper before clicking “Show answer”. Then compare your solution with the model answer.</div>` +
    `<div class="code-block" style="margin-top: 14px;"><strong>Task:</strong><br><br>${currentQuestion}</div>`;

  answerEl.style.display = "none";
  answerEl.parentElement.style.display = "none";
  checkBtn.style.display = "inline-flex";
  checkBtn.textContent = "Show answer";
}

else {
  answerEl.style.display = "block";
  answerEl.parentElement.style.display = "flex";
  checkBtn.style.display = "inline-flex";
  checkBtn.textContent = "Check answer";
}

  return;

 
}

if (topic === "errortypes") {

  const identifyQuestions = [
    {
      question: `What type of error is this?

PRINT "Hello`,
      answer: "syntax"
    },
    {
      question: `What type of error is this?

total = 10 / 0`,
      answer: "runtime"
    },
    {
      question: `What type of error is this?

answer = 5
OUTPUT "2 + 2 = ", answer`,
      answer: "logic"
    },
    {
      question: `A program crashes when it tries to access an item that does not exist in a list.

What type of error is this?`,
      answer: "runtime"
    },
    {
      question: `A keyword has been misspelt in code.

What type of error is this?`,
      answer: "syntax"
    },
    {
      question: `A program runs, but it multiplies two numbers when it should add them.

What type of error is this?`,
      answer: "logic"
    },
   

{
  question: `What type of error is this?

IF age > 18 THEN
  OUTPUT "Adult`,
  answer: "syntax"
},

    
    {
      question: `A program runs correctly until the user enters a value that causes it to crash.

What type of error is this?`,
      answer: "runtime"
    },
    {
      question: `A program always outputs the wrong total, but it does not crash.

What type of error is this?`,
      answer: "logic"
    },
    {
      question: `What type of error is this?

numbers = [1, 2, 3]
OUTPUT numbers[5]`,
      answer: "runtime"
    }
  ];

  let index = questionNumber - 1;

 if (index >= identifyQuestions.length) {
  questionNumber = identifyQuestions.length;

  const liveQuestionNumberEl = document.getElementById("questionNumber");
  const liveTotalQuestionsEl = document.getElementById("totalQuestions");

  if (liveQuestionNumberEl) liveQuestionNumberEl.textContent = questionNumber;
  if (liveTotalQuestionsEl) liveTotalQuestionsEl.textContent = identifyQuestions.length;

  questionEl.innerHTML = `<div class="code-block">✔ You have completed all questions.</div>`;
  imageOptionsEl.innerHTML = "";
  answerEl.style.display = "none";
  answerEl.parentElement.style.display = "none";
  checkBtn.style.display = "none";
  return;
}

  const item = identifyQuestions[index];

  currentQuestion = item.question;
  currentAnswer = item.answer;
  currentQuestionType = "errorTypeIdentify";

  imageOptionsEl.innerHTML = "";

  const options = ["syntax", "runtime", "logic"];

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "button";
    btn.textContent = opt.charAt(0).toUpperCase() + opt.slice(1);

    btn.addEventListener("click", () => {
      if (checkBtn.disabled) return;

      answerEl.value = opt;
      checkAnswer();

      const allButtons = imageOptionsEl.querySelectorAll("button");

      allButtons.forEach(button => {
        button.disabled = true;
        button.style.opacity = "0.85";

        if (button.textContent.toLowerCase() === currentAnswer) {
          button.style.borderColor = "green";
        }
      });

      if (opt !== currentAnswer) {
        btn.style.borderColor = "red";
      } else {
        btn.style.borderColor = "green";
      }
    });

    imageOptionsEl.appendChild(btn);
  });

  answerEl.style.display = "none";
  answerEl.parentElement.style.display = "none";
  checkBtn.style.display = "none";

  questionEl.innerHTML = `<div class="code-block">${currentQuestion.replace(/\n/g, "<br>")}</div>`;

  return;
}

if (topic === "testdata") {

  const identifyQuestions = [
  {
    question: "A program accepts values between 1 and 100. Which type of test data would 50 be?",
    answer: "normal"
  },
  {
    question: "A program accepts values between 1 and 100. Which type of test data would -10 be?",
    answer: "abnormal"
  },
  {
    question: "A program accepts values between 1 and 100. Which type of test data would 100 be??",
    answer: "extreme"
  },
  {
    question: "A program accepts values between 1 and 100. Which type of test data would 101 be?",
    answer: "boundary"
  },
  {
    question: "A program accepts values between 10 and 20. Which type of test data would 15 be?",
    answer: "normal"
  },
  {
    question: "A program accepts values between 10 and 20. Which type of test data would 9 be?",
    answer: "boundary"
  },
  {
    question: "A program accepts values between 10 and 20. Which type of test data would 25 be?",
    answer: "abnormal"
  },
  {
    question: "A program accepts values between 5 and 15. Which type of test data would 5 be?",
    answer: "extreme"
  },
  {
    question: "A program accepts values between 5 and 15. Which type of test data would 4 be?",
    answer: "boundary"
  },
  {
    question: "A program accepts values between 100 and 200. Which type of test data would 150 be?",
    answer: "normal"
  }
];
  
  let index = questionNumber - 1;

  if (index >= identifyQuestions.length) {
    questionNumber = identifyQuestions.length;

    const liveQuestionNumberEl = document.getElementById("questionNumber");
    const liveTotalQuestionsEl = document.getElementById("totalQuestions");

    if (liveQuestionNumberEl) liveQuestionNumberEl.textContent = questionNumber;
    if (liveTotalQuestionsEl) liveTotalQuestionsEl.textContent = identifyQuestions.length;

    questionEl.innerHTML = `<div class="code-block">✔ You have completed all questions.</div>`;
    imageOptionsEl.innerHTML = "";
    answerEl.style.display = "none";
    answerEl.parentElement.style.display = "none";
    checkBtn.style.display = "none";
    return;
  }

  const item = identifyQuestions[index];

  currentQuestion = item.question;
  currentAnswer = item.answer;
  currentQuestionType = "testDataIdentify";

  imageOptionsEl.innerHTML = "";

  const options = ["normal", "abnormal", "extreme", "boundary"];

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "button";
    btn.textContent = opt.charAt(0).toUpperCase() + opt.slice(1);

    btn.addEventListener("click", () => {
      if (checkBtn.disabled) return;

      answerEl.value = opt;
      checkAnswer();

      const allButtons = imageOptionsEl.querySelectorAll("button");

      allButtons.forEach(button => {
        button.disabled = true;
        button.style.opacity = "0.85";

        if (button.textContent.toLowerCase() === currentAnswer) {
          button.style.borderColor = "green";
        }
      });

      if (opt !== currentAnswer) {
        btn.style.borderColor = "red";
      } else {
        btn.style.borderColor = "green";
      }
    });

    imageOptionsEl.appendChild(btn);
  });

  answerEl.style.display = "none";
  answerEl.parentElement.style.display = "none";
  checkBtn.style.display = "none";

  questionEl.innerHTML = `<div class="code-block">${currentQuestion}</div>`;

  return;
}


  
 if (topic === "validationexam") {

  const examQuestions = [
    {
      question: `Explain the difference between validation and verification.`,
      answer: `Validation checks that data is reasonable and within acceptable limits.

Verification checks that data has been entered correctly and matches the original source.`
    },
    {
      question: `A user enters their date of birth into a form.

Suggest a suitable validation check and explain why it is needed.`,
      answer: `A range check could be used.

This ensures the date of birth is within a realistic range, for example not in the future or unrealistically old.`
    },
    {
      question: `A user enters their email address twice.

Suggest a suitable verification method and explain why it is used.`,
      answer: `Double entry verification can be used.

This ensures both entries match, reducing the chance of typing errors.`
    },
    {
      question: `Explain why validation does not guarantee that data is correct.`,
      answer: `Validation only checks that data is reasonable.

Data can still be incorrect but within the valid range, for example a wrong age that is still between 0 and 120.`
    },
    {
      question: `Explain why verification does not guarantee that data is correct.`,
      answer: `Verification only checks that data has been entered the same way twice.

If the original data is wrong, both entries can still match and still be incorrect.`
    }
  ];

  let index = questionNumber - 1;

 if (index >= examQuestions.length) {
  questionNumber = examQuestions.length;

  const liveQuestionNumberEl = document.getElementById("questionNumber");
  const liveTotalQuestionsEl = document.getElementById("totalQuestions");

  if (liveQuestionNumberEl) liveQuestionNumberEl.textContent = questionNumber;
  if (liveTotalQuestionsEl) liveTotalQuestionsEl.textContent = examQuestions.length;

  questionEl.innerHTML = `<div class="code-block">✔ You have completed all questions.</div>`;
  imageOptionsEl.innerHTML = "";
  answerEl.style.display = "none";
  answerEl.parentElement.style.display = "none";
  checkBtn.style.display = "none";
  return;
}

  const item = examQuestions[index];

  currentQuestion = item.question;
  currentAnswer = item.answer;
  currentQuestionType = "validationExam";

  questionEl.innerHTML =
    `<div class="exam-tip">✍️ Write your answer on paper before clicking “Show answer”. Then compare your response with the model answer.</div>` +
    `<div class="code-block" style="margin-top: 14px;"><strong>Question:</strong><br><br>${currentQuestion.replace(/\n/g, "<br>")}</div>`;

  imageOptionsEl.innerHTML = "";
 
  answerEl.style.display = "none";
  answerEl.parentElement.style.display = "none";
  checkBtn.style.display = "inline-flex";
  checkBtn.textContent = "Show answer";

  return;
}

if (topic === "validationchecks") {

  const identifyQuestions = [
    {
      question: `What type of validation check is this?

IF age < 0 OR age > 120 THEN
  OUTPUT "Invalid"`,
      answer: "range"
    },
    {
      question: `What type of validation check is this?

IF LENGTH(password) < 8 THEN
  OUTPUT "Invalid"`,
      answer: "length"
    },
    {
      question: `What type of validation check is this?

IF username = "" THEN
  OUTPUT "Invalid"`,
      answer: "presence"
    },
    {
      question: `A user enters a postcode when filling in a form.

The system checks that the postcode follows the correct pattern (e.g. NP19 0AB):

IF postcode does not match pattern THEN
  OUTPUT "Invalid"

What type of validation check is being used?`,
      answer: "format"
    },
    {
      question: `A user is entering their age into a form.

The system checks that the value entered is a number and not text.

What type of validation check is being used?`,
      answer: "type"
    }
  ];

  let index = questionNumber - 1;

  if (index >= identifyQuestions.length) {
    index = identifyQuestions.length - 1;
  }

  const item = identifyQuestions[index];

  currentQuestion = item.question;
  currentAnswer = item.answer;
  currentQuestionType = "validationIdentify";

  imageOptionsEl.innerHTML = "";

  const options = ["range", "length", "presence", "format", "type"];

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "button";
    btn.textContent = opt.charAt(0).toUpperCase() + opt.slice(1);

    btn.addEventListener("click", () => {
      if (checkBtn.disabled) return;

      answerEl.value = opt;
      checkAnswer();

      const allButtons = imageOptionsEl.querySelectorAll("button");

      allButtons.forEach(button => {
        button.disabled = true;
        button.style.opacity = "0.85";

        if (button.textContent.toLowerCase() === currentAnswer) {
          button.style.borderColor = "green";
        }
      });

      if (opt !== currentAnswer) {
        btn.style.borderColor = "red";
      } else {
        btn.style.borderColor = "green";
      }
    });

    imageOptionsEl.appendChild(btn);
  });

  answerEl.style.display = "none";
  answerEl.parentElement.style.display = "none";
  checkBtn.style.display = "none";

  questionEl.innerHTML = `<div class="code-block">${currentQuestion}</div>`;

  return;
}
  

if (topic === "verificationchecks") {

  const identifyQuestions = [
    {
      question: `A user enters their password and is asked to check it on screen before submitting.

What type of verification check is being used?`,
      answer: "visual"
    },
    {
      question: `A user enters their email address twice.

The system compares both entries:

IF email1 = email2 THEN
  OUTPUT "Match"

What type of verification check is being used?`,
      answer: "double entry"
    },
    {
      question: `A user is asked to read through their entered data and confirm it is correct.

What type of verification check is being used?`,
      answer: "visual"
    },
    {
      question: `A system asks a user to input their password twice and checks both entries match.

What type of verification check is being used?`,
      answer: "double entry"
    }
  ];

  let index = questionNumber - 1;

  if (index >= identifyQuestions.length) {
    index = identifyQuestions.length - 1;
  }

  const item = identifyQuestions[index];

  currentQuestion = item.question;
  currentAnswer = item.answer;
  currentQuestionType = "verificationIdentify";

  imageOptionsEl.innerHTML = "";

  const options = ["visual", "double entry"];

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "button";
    btn.textContent = opt.charAt(0).toUpperCase() + opt.slice(1);

    btn.addEventListener("click", () => {
      if (checkBtn.disabled) return;

      answerEl.value = opt;
      checkAnswer();

      const allButtons = imageOptionsEl.querySelectorAll("button");

      allButtons.forEach(button => {
        button.disabled = true;
        button.style.opacity = "0.85";

        if (button.textContent.toLowerCase() === currentAnswer) {
          button.style.borderColor = "green";
        }
      });

      if (opt !== currentAnswer) {
        btn.style.borderColor = "red";
      } else {
        btn.style.borderColor = "green";
      }
    });

    imageOptionsEl.appendChild(btn);
  });

  answerEl.style.display = "none";
  answerEl.parentElement.style.display = "none";
  checkBtn.style.display = "none";

  questionEl.innerHTML = `<div class="code-block">${currentQuestion}</div>`;

  return;
}
  
  
  
  if (topic === "binshift") {
    const registerSize = difficulty === "hard" ? 8 : 4;
    const maxValue = Math.pow(2, registerSize) - 1;
    const num = randomInt(maxValue - 1) + 1;
    const shift = Math.random() < 0.5 ? "left" : "right";
    const places = difficulty === "hard" ? (Math.random() < 0.5 ? 1 : 2) : 1;

    const binary = num.toString(2).padStart(registerSize, "0");

    let shifted = binary;

    for (let i = 0; i < places; i++) {
      if (shift === "left") {
        shifted = shifted.slice(1) + "0";
      } else {
        shifted = "0" + shifted.slice(0, -1);
      }
    }

    currentQuestionType = "binShift";
    currentSourceValue = { binary, shift, registerSize };

    currentQuestion = `In a ${registerSize}-bit register, shift ${binary} ${shift} by ${places}`;
    currentAnswer = shifted;

    questionEl.textContent = currentQuestion;
    return;
  }


  

  if (topic === "binadd") {
    const num1 = randomInt(15);
    const num2 = randomInt(15);

    currentQuestionType = "binAdd";
    currentSourceValue = { num1, num2 };

    const bin1 = num1.toString(2);
    const bin2 = num2.toString(2);

    currentQuestion = `Add binary ${bin1} + ${bin2}`;
    currentAnswer = (num1 + num2).toString(2);

    questionEl.textContent = currentQuestion;
    return;
  }

  if (topic === "twos") {
    const registerSize = 8;
    const maxPositive = Math.pow(2, registerSize - 1) - 1;

    let num;

    if (difficulty === "easy") {
      do {
        num = randomInt(19) + 1; // 1–20
      } while (num % 2 === 0);
    } else if (difficulty === "medium") {
      num = randomInt(maxPositive) + 1;
      if (num === 1) num = 2;
    } else {
      num = randomInt(maxPositive) + 1;
    }

    const negative = -num;
    const reverse = Math.random() < 0.5;

    if (!reverse) {
      currentQuestionType = "twos";
      currentSourceValue = { num, registerSize };

      currentQuestion = `Convert ${negative} into ${registerSize}-bit two’s complement binary.`;

      let binary = num.toString(2).padStart(registerSize, "0");
      let inverted = binary.split("").map(b => b === "0" ? "1" : "0").join("");
      let twos = (parseInt(inverted, 2) + 1)
        .toString(2)
        .padStart(registerSize, "0");

      currentAnswer = twos;
    } else {
      let binary = num.toString(2).padStart(registerSize, "0");
      let inverted = binary.split("").map(b => b === "0" ? "1" : "0").join("");
      let twos = (parseInt(inverted, 2) + 1)
        .toString(2)
        .padStart(registerSize, "0");

      currentQuestionType = "twosToDen";
      currentSourceValue = { binary: twos, registerSize, num };

      currentQuestion = `Convert ${twos} (${registerSize}-bit two’s complement) to denary.`;
      currentAnswer = String(negative);
    }

    questionEl.textContent = currentQuestion;
    return;
  }

  if (topic === "overflow") {
    const registerSize = difficulty === "hard" ? 8 : 4;
    const maxValue = Math.pow(2, registerSize) - 1;

    let num1, num2, total, overflow;

    do {
      num1 = randomInt(maxValue + 1);
      num2 = randomInt(maxValue + 1);

      if (num1 === 0 && num2 === 0) continue;

      total = num1 + num2;
      overflow = total > maxValue;
    } while (
      (difficulty === "easy" && overflow && Math.random() < 0.7) ||
      (difficulty === "medium" && !overflow && Math.random() < 0.7)
    );

    const binary1 = num1.toString(2).padStart(registerSize, "0");
    const binary2 = num2.toString(2).padStart(registerSize, "0");

    currentQuestionType = "overflow";
    currentSourceValue = { binary1, binary2, registerSize, total, overflow };

    const width = Math.max(binary1.length, binary2.length);

    currentQuestion = `A ${registerSize}-bit register is used.

When these binary numbers are added, will overflow occur?

<span class="binary">
${binary1.padStart(width + 1, " ")}
${("+" + binary2).padStart(width + 1, " ")}
</span>

(Overflow means the result is too large to fit in ${registerSize} bits)

Answer Yes or No.`;

    currentAnswer = overflow ? "yes" : "no";

    questionEl.innerHTML = currentQuestion;
    return;
  }

  const max = getMaxValue(difficulty);
  const num = randomInt(max);

  let chosenMode = mode;

  if (mode === "mixed") {
    if (topic === "hex") {
      const options = ["denToHex", "hexToDen", "binToHex", "hexToBin"];
      chosenMode = options[Math.floor(Math.random() * options.length)];
    } else {
      chosenMode = Math.random() < 0.5 ? "denToBin" : "binToDen";
    }
  }

  if (topic === "hex") {
    if (chosenMode === "denToHex") {
      currentQuestionType = "denToHex";
      currentSourceValue = num;
      currentQuestion = `Convert denary ${num} to hexadecimal`;
      currentAnswer = num.toString(16).toUpperCase();
    } else if (chosenMode === "hexToDen") {
      currentQuestionType = "hexToDen";
      currentSourceValue = num;
      const hex = num.toString(16).toUpperCase();
      currentQuestion = `Convert hexadecimal ${hex} to denary`;
      currentAnswer = String(num);
    } else if (chosenMode === "binToHex") {
      currentQuestionType = "binToHex";
      currentSourceValue = num;
      const binary = difficulty === "hard" ? padBinary(num.toString(2)) : num.toString(2);
      currentQuestion = `Convert binary ${binary} to hexadecimal`;
      currentAnswer = num.toString(16).toUpperCase();
    } else if (chosenMode === "hexToBin") {
      currentQuestionType = "hexToBin";
      currentSourceValue = num;
      const hex = num.toString(16).toUpperCase();
      currentQuestion = `Convert hexadecimal ${hex} to binary`;
      currentAnswer = difficulty === "hard" ? padBinary(num.toString(2)) : num.toString(2);
    }
  } else {
    if (chosenMode === "denToBin") {
      currentQuestionType = "denToBin";
      currentSourceValue = num;
      currentQuestion = `Convert denary ${num} to binary`;
      currentAnswer = difficulty === "hard" ? padBinary(num.toString(2)) : num.toString(2);
    } else {
      currentQuestionType = "binToDen";
      currentSourceValue = num;
      const binary = difficulty === "hard" ? padBinary(num.toString(2)) : num.toString(2);
      currentQuestion = `Convert binary ${binary} to denary`;
      currentAnswer = String(num);
    }
  }

  questionEl.textContent = currentQuestion;
}

function checkAnswer() {
  const userAnswer = answerEl.value.trim();
  const difficulty = difficultyEl.value;

  let isCorrect = false;
  let working = "";

  if (getTopic() === "pseudocode") {
  feedbackEl.innerHTML =
    `<strong>Model Answer:</strong><br><br>${currentAnswer.replace(/\n/g, "<br>")}` +
    `<br><br><strong>Check your answer:</strong><br>` +
    (currentHints ? currentHints.map(h => `✔ ${h}`).join("<br>") : "") +
    `<br><br><div class="exam-tip">💡 Your answer may look different but could still gain full marks, as long as your pseudocode is clear, consistent, and logically correct.</div>`;

  feedbackEl.classList.remove("correct", "incorrect");
  checkBtn.disabled = true;
  return;
}

if (
  currentQuestionType === "standardAlgorithmsWrite" ||
  currentQuestionType === "standardAlgorithmsExplain"
) {

  const isWrite = currentQuestionType === "standardAlgorithmsWrite";

  feedbackEl.innerHTML =
    `<strong>Model Answer:</strong><br><br>` +

`<div class="code-block" style="line-height:1.5;">${currentAnswer
  .replace(/\n/g, "<br>")
  .replace(/Start:/g, "<strong>Start:</strong>")
  .replace(/Pass \d+:/g, match => `<br><strong>${match}</strong>`)
}</div>`+
    
    `<br><br><div class="exam-tip">💡 ${
      isWrite
        ? "Your answer may look different but could still be correct if the logic and structure are sound."
        : "Your explanation may be worded differently and still be correct if the key idea is clear."
    }</div>`;

  feedbackEl.classList.remove("correct", "incorrect");
  checkBtn.disabled = true;
  return;
}

if (currentQuestionType === "validationExam") {

  feedbackEl.innerHTML =
    `<strong>Model Answer:</strong><br><br>` +
    `<div class="code-block" style="line-height:1.5;">${currentAnswer.replace(/\n/g, "<br>")}</div>` +
    `<br><br><div class="exam-tip">💡 Your answer may be worded differently and still be correct if the key idea is clear.</div>`;

  feedbackEl.classList.remove("correct", "incorrect");
  checkBtn.disabled = true;
  return;
}


  
  
    if (currentQuestionType === "flowSymbol") {
      isCorrect = userAnswer === currentAnswer;
      working = `Correct symbol: ${currentAnswer}`;
    }


if (currentQuestionType === "standardAlgorithmsIdentify") {
  isCorrect = userAnswer.toLowerCase() === currentAnswer.toLowerCase();
  working = "";
}

  if (currentQuestionType === "validationIdentify") {
  isCorrect = userAnswer.toLowerCase().trim() === currentAnswer.toLowerCase().trim();
  working = "";
}

  if (currentQuestionType === "verificationIdentify") {
  isCorrect = userAnswer.toLowerCase().trim() === currentAnswer.toLowerCase().trim();
  working = "";
}


  if (currentQuestionType === "errorTypeIdentify") {
  isCorrect = userAnswer.toLowerCase().trim() === currentAnswer.toLowerCase().trim();

  if (currentAnswer === "syntax") {
    working = "A syntax error breaks the rules of the programming language, so the program will not run properly.";
  } else if (currentAnswer === "runtime") {
    working = "A runtime error happens while the program is running and can cause the program to crash.";
  } else if (currentAnswer === "logic") {
    working = "A logic error means the program runs, but the output is wrong.";
  }
}
  

  if (currentQuestionType === "standardAlgorithmsFill") {
  isCorrect =
    userAnswer.toLowerCase().replace(/\s+/g, "") ===
    currentAnswer.toLowerCase().replace(/\s+/g, "");
  working = "";
}

  if (currentQuestionType === "standardAlgorithmsTrace") {
 isCorrect = userAnswer.toLowerCase().trim() === currentAnswer.toLowerCase().trim();
  working = "";
}

  
  if (currentQuestionType === "denToBin") {
    const normalisedUser = userAnswer.replace(/\s+/g, "");
    const acceptedAnswer = currentAnswer;
    const unpaddedAnswer = currentSourceValue.toString(2);

    isCorrect = normalisedUser === acceptedAnswer || normalisedUser === unpaddedAnswer;
    working = denaryToBinaryWorking(currentSourceValue, difficulty);
  }

  else if (currentQuestionType === "binToDen") {
    isCorrect = userAnswer === currentAnswer;
    const binaryShown = currentQuestion.match(/[01]+/)[0];
    working = binaryToDenaryWorking(binaryShown);
  }

  else if (currentQuestionType === "soundUnits") {
    isCorrect = userAnswer === currentAnswer;
    working = `Key fact:\n${currentSourceValue}`;
  }

    
  else if (currentQuestionType === "asciiBits") {
      isCorrect = userAnswer === currentAnswer;
      working = "Standard ASCII uses 7 bits per character.";
    }

    else if (currentQuestionType === "soundBitsToBytes") {
  isCorrect = userAnswer === currentAnswer;
  working = `${currentSourceValue.bitsPerSecond} ÷ 8 = ${currentAnswer} bytes`;
  }
    
  else if (currentQuestionType === "denToHex") {
    isCorrect = userAnswer.toUpperCase() === currentAnswer;

    const quotient = Math.floor(currentSourceValue / 16);
    const remainder = currentSourceValue % 16;
    const remainderHex = remainder.toString(16).toUpperCase();

    working =
      `${currentSourceValue} ÷ 16 = ${quotient} remainder ${remainder}\n`;

    if (remainder >= 10) {
      working += `${remainder} = ${remainderHex}\n\n`;
    } else {
      working += `\n`;
    }

    working += `Answer: ${currentAnswer}`;
  }

  else if (currentQuestionType === "hexToDen") {
    isCorrect = userAnswer === currentAnswer;

    const hexShown = currentSourceValue.toString(16).toUpperCase();
    const digits = hexShown.split("");
    const placeValues = [];
    const steps = [];
    let total = 0;

    for (let i = 0; i < digits.length; i++) {
      const digitValue = parseInt(digits[i], 16);
      const placeValue = Math.pow(16, digits.length - 1 - i);
      const result = digitValue * placeValue;

      placeValues.push(placeValue);
      total += result;

      if (digitValue >= 10) {
        steps.push(`${digits[i]} = ${digitValue}`);
      }

      steps.push(`${digitValue} × ${placeValue} = ${result}`);
    }

    working =
      `Hex: ${hexShown}\n\n` +
      `Place values:\n${placeValues.join("   ")}\n\n` +
      `Digits:\n${digits.join("   ")}\n\n` +
      `Working:\n${steps.join("\n")}\n\n` +
      `Total = ${total}\n\n` +
      `Answer: ${currentAnswer}`;
  }

  else if (currentQuestionType === "binToHex") {
    isCorrect = userAnswer.toUpperCase() === currentAnswer;

    const binaryShown = currentQuestion.match(/[01]+/)[0];
    const paddedBinary = binaryShown.padStart(Math.ceil(binaryShown.length / 4) * 4, "0");
    const grouped = paddedBinary.match(/.{1,4}/g);
    const converted = grouped.map(group => parseInt(group, 2).toString(16).toUpperCase());

    working =
      `Binary: ${binaryShown}\n\n` +
      `Pad to groups of 4:\n${grouped.join(" ")}\n\n` +
      `Convert each group:\n${grouped.map((group, i) => `${group} = ${converted[i]}`).join("\n")}\n\n` +
      `Answer: ${currentAnswer}`;
  }

  else if (currentQuestionType === "hexToBin") {
    const normalisedUser = userAnswer.replace(/\s+/g, "");
    const correct = currentAnswer.replace(/\s+/g, "");
    const unpaddedCorrect = currentSourceValue.toString(2);

    isCorrect = normalisedUser === correct || normalisedUser === unpaddedCorrect;

    const hexShown = currentSourceValue.toString(16).toUpperCase();
    const binaryParts = hexShown
      .split("")
      .map(d => parseInt(d, 16).toString(2).padStart(4, "0"));

    working =
      `Hex: ${hexShown}\n\n` +
      `Convert each digit:\n${hexShown.split("").map((d, i) => `${d} = ${binaryParts[i]}`).join("\n")}\n\n` +
      `Answer: ${currentAnswer}`;
  }

  else if (currentQuestionType === "binAdd") {
    const normalisedUser = userAnswer.replace(/\s+/g, "");
    isCorrect = normalisedUser === currentAnswer;

    const { num1, num2 } = currentSourceValue;

    const bin1 = num1.toString(2);
    const bin2 = num2.toString(2);

    const width = Math.max(bin1.length, bin2.length, currentAnswer.length);
    const padded1 = bin1.padStart(width, "0");
    const padded2 = bin2.padStart(width, "0");
    const paddedAnswer = currentAnswer.padStart(width, "0");

    let carry = 0;
    let carryLine = Array(width).fill(" ");

    for (let i = width - 1; i >= 0; i--) {
      const bit1 = Number(padded1[i]);
      const bit2 = Number(padded2[i]);
      const total = bit1 + bit2 + carry;

      if (total >= 2 && i > 0) {
        carryLine[i - 1] = "1";
      }

      carry = total >= 2 ? 1 : 0;
    }

    const carries = carryLine.join("");

    working =
      `   ${carries}\n` +
      `   ${padded1}\n` +
      `+  ${padded2}\n` +
      `   ${"-".repeat(width)}\n` +
      `   ${paddedAnswer}`;
  }

  else if (currentQuestionType === "binShift") {
    const normalisedUser = userAnswer.replace(/\s+/g, "");
    
    isCorrect = normalisedUser === currentAnswer;

    const { binary, shift, registerSize } = currentSourceValue;

    working =
      `Register: ${registerSize} bits (fixed size)\n\n` +
      `   ${binary}\n` +
      `${shift === "left" ? "←" : "→"} shift\n` +
      `   ${currentAnswer}\n\n` +
      `Bits move ${shift}.\n` +
      `A 0 is added on the ${shift === "left" ? "right" : "left"}.\n` +
      `Number of bits stays the same.\n\n` +
      `${shift === "left"
        ? "This multiplies the value by 2."
        : "This divides the value by 2 (integer division)."
      }`;
  }
 
    else if (currentQuestionType === "twos") {
      const normalisedUser = userAnswer.replace(/\s+/g, "");
      const { num, registerSize } = currentSourceValue;
      const wrongBitLength = normalisedUser.length !== registerSize;
      isCorrect = normalisedUser === currentAnswer;
    
      const positiveBinary = num.toString(2).padStart(registerSize, "0");
      const inverted = positiveBinary
        .split("")
        .map(b => b === "0" ? "1" : "0")
        .join("");
      const twos = (parseInt(inverted, 2) + 1)
        .toString(2)
        .padStart(registerSize, "0");
    
      working =
        `${wrongBitLength ? `Your answer must use ${registerSize} bits.\n\n` : ""}` +
        `Step 1: Write +${num} in binary using ${registerSize} bits\n` +
        `${positiveBinary}\n\n` +
        `Step 2: Invert the bits\n` +
        `${inverted}\n\n` +
        `Step 3: Add 1\n` +
        `${inverted}\n` +
        `+0001\n` +
        `-----\n` +
        `${twos}`;
    }

    else if (currentQuestionType === "twosToDen") {
      isCorrect = userAnswer === currentAnswer;
    
      const { binary, num, registerSize } = currentSourceValue;
    
      const inverted = binary
        .split("")
        .map(b => b === "0" ? "1" : "0")
        .join("");
    
      const plusOne = (parseInt(inverted, 2) + 1)
        .toString(2)
        .padStart(registerSize, "0");
    
      working =
        `MSB is 1, so this is a negative number.\n\n` +
        `Step 1: Invert the bits\n` +
        `${inverted}\n\n` +
        `Step 2: Add 1\n` +
        `${inverted}\n` +
        `+00000001\n` +
        `--------\n` +
        `${plusOne}\n\n` +
        `Step 3: Convert to denary\n` +
        `${plusOne} = ${num}\n\n` +
        `Answer: -${num}`;
    }

    else if (currentQuestionType === "soundTotalBits") {
      isCorrect = userAnswer === currentAnswer;
      working = `${currentSourceValue.sampleRate} × ${currentSourceValue.bitDepth} × ${currentSourceValue.seconds} = ${currentAnswer} bits`;
    }
      
  else if (currentQuestionType === "overflow") {
    const normalisedUser = userAnswer.trim().toLowerCase();
    isCorrect = normalisedUser === currentAnswer;

    const { binary1, binary2, registerSize, total, overflow } = currentSourceValue;
    const maxValue = Math.pow(2, registerSize) - 1;

    working =
      `   ${binary1}\n` +
      `+  ${binary2}\n` +
      `   -----\n\n` +
      `Register size: ${registerSize} bits\n` +
      `Largest value that can be stored: ${maxValue}\n` +
      `Total (denary): ${total}\n\n` +
      `${overflow
        ? "The result is bigger than the largest value that can be stored, so overflow occurs."
        : "The result is within the range that can be stored, so no overflow occurs."
      }`;
  }

  else if (currentQuestionType === "soundBitsPerSecond") {
    isCorrect = userAnswer === currentAnswer;
    working = `${currentSourceValue.sampleRate} × ${currentSourceValue.bitDepth} = ${currentAnswer} bits per second`;
  }

else if (currentQuestionType === "testDataIdentify") {
  isCorrect = userAnswer.toLowerCase().trim() === currentAnswer.toLowerCase().trim();

  if (currentAnswer === "normal") {
    working = "Normal data is valid input within the expected range.";
  } else if (currentAnswer === "abnormal") {
    working = "Abnormal data is invalid and should be rejected.";
  } else if (currentAnswer === "extreme") {
    working = "Extreme data uses the lowest and highest valid values.";
  } else if (currentAnswer === "boundary") {
    working = "Boundary data tests values just inside and just outside the limits.";
  }
}
  
if (
  currentQuestionType === "standardAlgorithmsIdentify" ||
  currentQuestionType === "standardAlgorithmsFill" ||
  currentQuestionType === "standardAlgorithmsTrace" ||
  currentQuestionType === "validationIdentify" ||
  currentQuestionType === "verificationIdentify" ||
  currentQuestionType === "errorTypeIdentify" ||
  currentQuestionType === "testDataIdentify"
) {



  if (currentQuestionType === "errorTypeIdentify") {
    feedbackEl.textContent =
      isCorrect
        ? `✔ Correct!\n${working}`
        : `✖ Incorrect.\nCorrect answer: ${currentAnswer}\n${working}`;

  } else if (currentQuestionType === "testDataIdentify") {
    feedbackEl.textContent =
      isCorrect
        ? `✔ Correct!\n${working}`
        : `✖ Incorrect.\nCorrect answer: ${currentAnswer}\n${working}`;

  } else {
    feedbackEl.textContent =
      isCorrect
        ? `✔ Correct!`
        : `✖ Incorrect.\nCorrect answer: ${currentAnswer}`;
  }

} else {
  feedbackEl.textContent =
    isCorrect
      ? `✔ Correct!\n\nWorking:\n${working}`
      : `✖ Incorrect.\nCorrect answer: ${currentAnswer}\n\nWorking:\n${working}`;
}
  

  feedbackEl.classList.remove("correct", "incorrect");
  feedbackEl.classList.add(isCorrect ? "correct" : "incorrect");

  if (isCorrect) {
    correctCount++;
    currentStreak++;

    if (currentStreak > bestStreak) {
      bestStreak = currentStreak;
    }
  } else {
    incorrectCount++;
    currentStreak = 0;
  }

  updateScoreDisplay();
  checkBtn.disabled = true;
}



checkBtn.addEventListener("click", checkAnswer);

nextBtn.addEventListener("click", () => {
  checkBtn.disabled = false;
  nextBtn.disabled = false;

  if (getTopic() === "flowcharts" && modeEl.value === "draw") {
    if (drawQuestionIndex >= 4) {
      drawQuestionIndex = 0;
      questionNumber = 0;
    } else {
      drawQuestionIndex++;
    }
  }

if (getTopic() === "pseudocode" && questionNumber >= window.pseudocodeQuestions.length) {
  showSummary();
  return;
}

if (getTopic() === "pseudocode") {
  const pseudoCategory = document.getElementById("pseudoCategory").value;

  const filteredQuestions = pseudoCategory === "all"
    ? window.pseudocodeQuestions
    : window.pseudocodeQuestions.filter(q => q.category === pseudoCategory);

  if (questionNumber >= filteredQuestions.length) {
    showSummary();
    return;
  }
}

if (getTopic() === "standardalgorithms" && questionNumber >= 5) {
  showSummary();
  return;
}

if (getTopic() === "validationchecks" && questionNumber >= 5) {
  showSummary();
  return;
}

  if (getTopic() === "verificationchecks" && questionNumber >= 4) {
  showSummary();
  return;
}

 if (getTopic() === "errortypes" && questionNumber >= 10) {
  showSummary();
  return;
}

if (getTopic() === "testdata" && questionNumber >= 10) {
  showSummary();
  return;
}

if (getTopic() === "tracetables" && questionNumber >= 6) {
  showSummary();
  return;
}

  if (getTopic() === "tracetables" && questionNumber >= 6) {
  showSummary();
  return;
}
  
questionNumber++;
updateScoreDisplay();
generateQuestion();
});

newSetBtn.addEventListener("click", () => {
  answerEl.disabled = false;
  checkBtn.disabled = false;
  nextBtn.disabled = false;
  questionNumber = 1;
  correctCount = 0;
  incorrectCount = 0;
  currentStreak = 0;
  bestStreak = 0;
  drawQuestionIndex = 0;

  updateScoreDisplay();
  generateQuestion();
});

difficultyEl.addEventListener("change", generateQuestion);

modeEl.addEventListener("change", () => {
  questionNumber = 1;
  correctCount = 0;
  incorrectCount = 0;
  currentStreak = 0;
  bestStreak = 0;
  answerEl.disabled = false;
  checkBtn.disabled = false;
  nextBtn.disabled = false;

  if (getTopic() === "standardalgorithms" && modeEl.value === "standardmethods") {
    difficultyEl.style.display = "inline-block";
  } else if (getTopic() === "standardalgorithms") {
    difficultyEl.style.display = "none";
  }

  updateScoreDisplay();
  generateQuestion();
});

document.getElementById("pseudoCategory").addEventListener("change", () => {
  questionNumber = 1;
  generateQuestion();
});


answerEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});


const hintBtn = document.getElementById("hintBtn");

hintBtn.addEventListener("click", function () {
  console.log("hint button clicked", getTopic(), currentHints);
  if (getTopic() === "pseudocode" && currentHints) {
    feedbackEl.innerHTML =
      "<strong>Hints:</strong><br><br>" +
      currentHints.map(h => `✔ ${h}`).join("<br>");

    feedbackEl.classList.remove("correct", "incorrect");
  }
});


const flowSymbolsBtn = document.getElementById("flowSymbolsBtn");
const flowDrawBtn = document.getElementById("flowDrawBtn");

flowSymbolsBtn.addEventListener("click", function () {
  modeEl.value = "symbols";
  questionNumber = 1;
  drawQuestionIndex = 0;
  generateQuestion();
});

flowDrawBtn.addEventListener("click", function () {
  modeEl.value = "draw";
  questionNumber = 1;
  drawQuestionIndex = 0;
  generateQuestion();
});




function showSummary() {

if (getTopic() === "pseudocode") {
  questionEl.textContent = "Set complete!";
  feedbackEl.innerHTML = `
    <p>You've worked through all the questions.</p>
    <p>Use "New set" to practise again or choose a different category.</p>
  `;

  feedbackEl.classList.remove("correct", "incorrect");

  answerEl.value = "";
  answerEl.disabled = true;
  checkBtn.disabled = true;

  return;
}

  if (getTopic() === "tracetables") {
  questionEl.textContent = "Set complete!";
  feedbackEl.innerHTML = `
    <p>You've worked through all the ${window.traceTableMode === "flowchart" ? "flowchart" : "pseudocode"} trace table questions.</p>
    <p>Use "New set" to practise again or switch to the other Trace Tables button.</p>
  `;

  feedbackEl.classList.remove("correct", "incorrect");

  imageOptionsEl.innerHTML = "";
  answerEl.value = "";
  answerEl.disabled = true;
  checkBtn.disabled = true;

  return;
}
  
  const totalAnswered = correctCount + incorrectCount;
  const accuracy = totalAnswered > 0
    ? Math.round((correctCount / totalAnswered) * 100)
    : 0;

  questionEl.textContent = "Set Complete!";
  feedbackEl.textContent =
    `Score: ${correctCount}/${totalAnswered}\n` +
    `Accuracy: ${accuracy}%\n` +
    `Best streak: ${bestStreak}`;

  feedbackEl.classList.remove("correct", "incorrect");

  answerEl.value = "";
  answerEl.disabled = true;
  checkBtn.disabled = true;
}

updateScoreDisplay();
updatePracticeHeader();
updateModeOptions();

 const controls = document.getElementById("controls");


if (getTopic() === "sound" || getTopic() === "pseudocode" || getTopic() === "tracetables") {
  controls.style.display = "none";
} else {
  controls.style.display = "flex";
}

const difficultySelect = document.getElementById("difficulty");

if (
  getTopic() === "validationchecks" ||
  getTopic() === "verificationchecks" ||
  getTopic() === "errortypes" ||
  getTopic() === "testdata" ||
  getTopic() === "tracetables"
) {
  difficultySelect.style.display = "none";
}


else if (getTopic() === "standardalgorithms") {
  if (modeEl.value === "standardmethods") {
    difficultySelect.style.display = "inline-block";
  } else {
    difficultySelect.style.display = "none";
  }
} else {
  difficultySelect.style.display = "inline-block";
}


  
if (getTopic() === "pseudocode") {
  document.querySelector(".practice-stats").style.display = "none";
}

questionNumber = 1;
updateScoreDisplay();
generateQuestion();
