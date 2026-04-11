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
  
  if (topic === "flowcharts") {
    modeEl.innerHTML = `
      <option value="symbols">Flowchart Symbols</option>
      <option value="draw">Draw from Prompt</option>
    `;
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
  const flowchartModeButtons = document.getElementById("flowchartModeButtons");

  const statsBox = document.querySelector(".practice-stats");
  const pseudoCategoryWrap = document.getElementById("pseudoCategoryWrap");
  window.pseudocodeQuestions = window.pseudocodeQuestions || [];

const writeTip = document.querySelector(".question-card .exam-tip");
  
 if (topic === "flowcharts") {
  flowchartModeButtons.style.display = "block";
  if (writeTip) writeTip.style.display = "none";
} else {
  flowchartModeButtons.style.display = "none";
  if (writeTip) writeTip.style.display = "block";
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
     <div class="stat-box">Question: <span id="questionNumber">${questionNumber}</span>/<span id="totalQuestions">10</span></div>`;
  pseudoCategoryWrap.style.display = "none";
}

  document.getElementById("answer").parentElement.style.display = "block";
  hintBtn.style.display = "none";

  if (topic === "flowcharts" && mode === "draw") {
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
    <img src="images/practice/flowcharts/solutions/${currentAnswer}" alt="Flowchart solution" style="max-width:100%; max-height:420px; object-fit:contain;">
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
  (currentHints ? currentHints.map(h => `✔ ${h}`).join("<br>") : "");
    
      feedbackEl.classList.remove("correct", "incorrect");
      checkBtn.disabled = true;
      return;
    }

  
    if (currentQuestionType === "flowSymbol") {
      isCorrect = userAnswer === currentAnswer;
      working = `Correct symbol: ${currentAnswer}`;
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


  
    feedbackEl.textContent =
    isCorrect
    ? `✔ Correct!\n\nWorking:\n${working}`
    : `✖ Incorrect.\nCorrect answer: ${currentAnswer}\n\nWorking:\n${working}`;

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
modeEl.addEventListener("change", generateQuestion);

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
const statsBox = document.querySelector(".practice-stats");

if (getTopic() === "sound" || getTopic() === "pseudocode") {
  controls.style.display = "none";
} else {
  controls.style.display = "flex";
}

if (getTopic() === "pseudocode") {
  statsBox.style.display = "none";
}

questionNumber = 1;
updateScoreDisplay();
generateQuestion();
