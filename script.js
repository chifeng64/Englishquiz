// Sample quiz questions
const quizData = [
    {
        word: "ability",
        options: ["能力、才能", "上午", "地址", "意外事故"],
        correct: 0
    },
    {
        word: "abroad",
        options: ["在前面", "在國外", "生氣的", "年齡"],
        correct: 1
    },
    {
        word: "accept",
        options: ["活動", "演員", "收受、接受", "害怕的"],
        correct: 2
    },
    {
        word: "achieve",
        options: ["同意", "冒險", "建議", "達到、完成"],
        correct: 3
    },
    {
        word: "action",
        options: ["行動、行為", "年齡", "天使", "任何人"],
        correct: 0
    },
    {
        word: "advantage",
        options: ["生氣的", "優點、優勢", "螞蟻", "救護車"],
        correct: 1
    },
    {
        word: "afraid",
        options: ["行動", "同意", "害怕的", "再也不"],
        correct: 2
    },
    {
        word: "airplane",
        options: ["救護車", "醫院", "計劃", "飛機"],
        correct: 3
    },
    {
        word: "alive",
        options: ["活著的", "死的", "睡著的", "生病的"],
        correct: 0
    },
    {
        word: "angry",
        options: ["開心的", "生氣的", "傷心的", "害怕的"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

// DOM elements
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const submitBtn = document.getElementById('submit-btn');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');

// Load question
function loadQuestion() {
    const question = quizData[currentQuestion];
    questionEl.textContent = `Choose the correct meaning for '${question.word}':`;
    
    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsEl.appendChild(button);
    });

    resultEl.textContent = '';
    submitBtn.disabled = false;
}

// Select option
function selectOption(index) {
    selectedOption = index;
    const options = document.querySelectorAll('.option');
    options.forEach((option, i) => {
        option.classList.toggle('selected', i === index);
    });
}

// Check answer
function checkAnswer() {
    if (selectedOption === null) {
        resultEl.textContent = 'Please select an answer!';
        return;
    }

    const correct = quizData[currentQuestion].correct;
    if (selectedOption === correct) {
        score++;
        scoreEl.textContent = score;
        resultEl.textContent = 'Correct!';
    } else {
        resultEl.textContent = 'Wrong! The correct answer is: ' + 
            quizData[currentQuestion].options[correct];
    }

    submitBtn.disabled = true;
    setTimeout(nextQuestion, 2000);
}

// Next question
function nextQuestion() {
    selectedOption = null;
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

// Finish quiz
function finishQuiz() {
    questionEl.textContent = 'Quiz completed!';
    optionsEl.innerHTML = '';
    submitBtn.style.display = 'none';
    resultEl.textContent = `Your final score is: ${score}/${quizData.length}`;
}

// Event listeners
submitBtn.addEventListener('click', checkAnswer);

// Start the quiz
loadQuestion();
