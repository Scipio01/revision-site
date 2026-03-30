let currentQuestion = "";
let currentAnswer = "";
let currentQuestionType = "";
let currentSourceValue = 0;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const feedbackEl = document.getElementById("feedback");
const difficultyEl = document.getElementById("difficulty");
const modeEl = document.getElementById("mode");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const newSetBtn = document.getElementById("newSetBtn");
const practiceTitleEl = document.getElementById("practiceTitle");
const practiceIntroEl = document.getElementById("practiceIntro");

function getTopicFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("topic") || "binary";
}

function setupTopicText() {
  const topic = getTopicFromUrl();
  if (topic === "binary") {
    practiceTitleEl.textContent = "Binary Practice";
    practiceIntroEl.textContent = "Practise converting between denary and binary with instant feedback and working.";
  }
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

function generateQuestion() {
  const difficulty = difficultyEl.value;
  const mode = modeEl.value;
  const topic = new URLSearchParams(window.location.search).get("topic");

  let max;
  if (difficulty === "easy") max = 15;
  else if (difficulty === "medium") max = 63;
  else max = 255;

  let num = Math.floor(Math.random() * (max + 1));

  let chosenMode = mode;
  if (mode === "mixed") {
    if (topic === "hex") {
      const options = ["denToHex", "hexToDen", "binToHex", "hexToBin"];
      chosenMode = options[Math.floor(Math.random() * options.length)];
    } else {
      chosenMode = Math.random() < 0.5 ? "denToBin" : "binToDen";
    }
  }

  feedbackEl.textContent = "";
  answerEl.value = "";
  answerEl.focus();

  // ===== HEX TOPIC =====
  if (topic === "hex") {

    if (chosenMode === "denToHex") {
      currentQuestionType = "denToHex";
      currentSourceValue = num;
      currentQuestion = `Convert ${num} to hexadecimal`;
      currentAnswer = num.toString(16).toUpperCase();
    }

    else if (chosenMode === "hexToDen") {
      currentQuestionType = "hexToDen";
      currentSourceValue = num;
      let hex = num.toString(16).toUpperCase();
      currentQuestion = `Convert ${hex} to denary`;
      currentAnswer = num.toString();
    }

    else if (chosenMode === "binToHex") {
      currentQuestionType = "binToHex";
      currentSourceValue = num;
      let binary = num.toString(2).padStart(8, "0");
      currentQuestion = `Convert ${binary} to hexadecimal`;
      currentAnswer = num.toString(16).toUpperCase();
    }

    else if (chosenMode === "hexToBin") {
      currentQuestionType = "hexToBin";
      currentSourceValue = num;
      let hex = num.toString(16).toUpperCase();
      currentQuestion = `Convert ${hex} to binary`;
      currentAnswer = num.toString(2).padStart(8, "0");
    }
  }

  // ===== BINARY TOPIC =====
  else {
    if (chosenMode === "denToBin") {
      currentQuestionType = "denToBin";
      currentSourceValue = num;
      currentQuestion = `Convert ${num} to binary`;
      currentAnswer = num.toString(2);
    } else {
      currentQuestionType = "binToDen";
      currentSourceValue = num;
      let binary = num.toString(2);
      currentQuestion = `Convert ${binary} to denary`;
      currentAnswer = num.toString();
    }
  }

  questionEl.textContent = currentQuestion;
}

function checkAnswer() {
  const userAnswer = answerEl.value.trim();
  const difficulty = difficultyEl.value;

  let isCorrect = false;
  let working = "";

  if (currentQuestionType === "denToBin") {
    const normalisedUser = userAnswer.replace(/\s+/g, "");
    const acceptedAnswer = currentAnswer;
    const unpaddedAnswer = currentSourceValue.toString(2);

    isCorrect = normalisedUser === acceptedAnswer || normalisedUser === unpaddedAnswer;

    working = denaryToBinaryWorking(currentSourceValue, difficulty);
  } else {
    isCorrect = userAnswer === currentAnswer;

    const binaryShown = currentQuestion.match(/[01]+/)[0];
    working = binaryToDenaryWorking(binaryShown);
  }

  feedbackEl.textContent =
    (isCorrect ? "✔ Correct!\n\n" : "✖ Incorrect.\n\n") +
    "Working:\n" +
    working;

  feedbackEl.classList.remove("correct", "incorrect");
  feedbackEl.classList.add(isCorrect ? "correct" : "incorrect");
}

setupTopicText();
generateQuestion();
