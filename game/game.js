const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Дата начала Второй мировой войны?",
    choice1: "2 сентября 1945",
    choice2: "1 сентября 1939",
    choice3: "1 ноября 1942",
    choice4: "1 июня 1941",
    answer: 2,
  },
  {
    question: "Кто нынешний президент США?",
    choice1: "Барак Обама",
    choice2: "Джордж Уокер Буш",
    choice3: "Дональд Трамп",
    choice4: "Джо Байден",
    answer: 4,
  },
  {
    question: "Столица Российской Федерации?",
    choice1: "Москва",
    choice2: "Санкт-Петербург",
    choice3: "Новосибирск",
    choice4: "Екатеринбург",
    answer: 1,
  },
  {
    question: "Самое высокое здание мира?",
    choice1: "Шанхайская башня",
    choice2: "Телебашня Гуанчжоу",
    choice3: "Останкинская телебашня",
    choice4: "Бурдж-Халифа",
    answer: 4,
  },
  {
    question: "Самый богатый человек в мире?",
    choice1: "Билл Гейтс",
    choice2: "Джефф Безос",
    choice3: "Марк Цукерберг",
    choice4: "Уоррен Баффетт",
    answer: 2,
  },
  {
    question: "Самая богатая страна мира в 2020 году?",
    choice1: "Катар",
    choice2: "Люксембург",
    choice3: "Сингапур",
    choice4: "Швейцария",
    answer: 1,
  },
  {
    question: "Страна с самой большрй площадью?",
    choice1: "Канада",
    choice2: "Россия",
    choice3: "Китай",
    choice4: "Соединённые Штаты Америки",
    answer: 2,
  },
  {
    question: "Самая населенная страна мира в 2020 году?",
    choice1: "Индия",
    choice2: "США",
    choice3: "Индонезия",
    choice4: "Китай",
    answer: 4,
  },
  {
    question: "Корабль поднявший человека на околоземную орбиту?",
    choice1: "Восход-1",
    choice2: "Аполлон-11",
    choice3: "Восток-1",
    choice4: "Спутник-5",
    answer: 3,
  },
  {
    question: "Действующий чемпион мира по шахматам?",
    choice1: "Гарри Каспаров",
    choice2: "Владимир Крамник",
    choice3: "Вишванатан Ананд",
    choice4: "Магнус Карлсен",
    answer: 4,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("./endGame/end.html");
  }

  questionCounter++;
  progressText.innerText = `Вопрос ${questionCounter} из ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${
    (questionCounter / MAX_QUESTIONS) * 100
  }%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) {
      return;
    }

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    // if(classToApply === 'incorrect'){
    //     return window.location.assign("./endGame/end.html");
    // }

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
