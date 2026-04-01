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

    feedbackEl.textContent = "";
    feedbackEl.classList.remove("correct", "incorrect");
    answerEl.value = "";
    answerEl.focus();

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

    feedbackEl.textContent = "";
    feedbackEl.classList.remove("correct", "incorrect");
    answerEl.value = "";
    answerEl.focus();

    questionEl.textContent = currentQuestion;
    return;
  }

    if (topic === "twos") {
      const registerSize = difficulty === "hard" ? 8 : 4;
    
      const maxPositive = Math.pow(2, registerSize - 1) - 1;
    
      const num = randomInt(maxPositive) + 1; // avoid 0
      const negative = -num;
    
      currentQuestionType = "twos";
      currentSourceValue = { num, registerSize };
    
      currentQuestion = `Convert ${negative} into ${registerSize}-bit two’s complement binary.`;
    
      // Step 1: positive binary
      let binary = num.toString(2).padStart(registerSize, "0");
    
      // Step 2: invert
      let inverted = binary.split("").map(b => b === "0" ? "1" : "0").join("");
    
      // Step 3: add 1
      let twos = (parseInt(inverted, 2) + 1)
        .toString(2)
        .padStart(registerSize, "0");
    
      currentAnswer = twos;
    
      feedbackEl.textContent = "";
      feedbackEl.classList.remove("correct", "incorrect");
      answerEl.value = "";
      answerEl.focus();
    
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

    feedbackEl.textContent = "";
    feedbackEl.classList.remove("correct", "incorrect");
    answerEl.value = "";
    answerEl.focus();

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

  feedbackEl.textContent = "";
  feedbackEl.classList.remove("correct", "incorrect");
  answerEl.value = "";
  answerEl.focus();

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
    const wrongBitLength = normalisedUser.length !== registerSize;
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
      isCorrect = normalisedUser === currentAnswer;
    
      const { num, registerSize } = currentSourceValue;
    
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
      `Use ${registerSize} bits at every step (given in the question).\n\n` +
    
      `Step 1: Write +${num} in binary\n` +
      `${positiveBinary}\n\n` +
    
      `Step 2: Invert the bits\n` +
      `${inverted}\n\n` +
    
      `Step 3: Add 1\n` +
      `${inverted}\n` +
      `+0001\n` +
      `-----\n` +
      `${twos}`;

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

  feedbackEl.textContent =
    (isCorrect ? "✔ Correct!\n\n" : "✖ Incorrect.\n\n") +
    "Working:\n" +
    working;

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
  if (questionNumber >= totalQuestions) {
    showSummary();
    nextBtn.disabled = true;
    return;
  }

  checkBtn.disabled = false;
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

  updateScoreDisplay();
  generateQuestion();
});

difficultyEl.addEventListener("change", generateQuestion);
modeEl.addEventListener("change", generateQuestion);

answerEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

function showSummary() {
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
questionNumber = 1;
updateScoreDisplay();
generateQuestion();
