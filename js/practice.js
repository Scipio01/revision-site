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
  const max = getMaxValue(difficulty);

  const num = randomInt(max);

  let chosenMode = mode;
  if (mode === "mixed") {
    chosenMode = Math.random() < 0.5 ? "denToBin" : "binToDen";
  }

  feedbackEl.textContent = "";
  feedbackEl.classList.remove("correct", "incorrect");
  answerEl.value = "";
  answerEl.focus();

  if (chosenMode === "denToBin") {
    currentQuestionType = "denToBin";
    currentSourceValue = num;
    currentQuestion = `Convert ${num} to binary`;
    currentAnswer = difficulty === "hard" ? padBinary(toBinary(num)) : toBinary(num);
  } else {
    currentQuestionType = "binToDen";
    currentSourceValue = num;

    const binaryValue = difficulty === "hard" ? padBinary(toBinary(num)) : toBinary(num);
    currentQuestion = `Convert ${binaryValue} to denary`;
    currentAnswer = String(num);
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
