const quizData = [
  {
    question: "What does ADHD stand for?",
    options: [
      "Attention-Deficit/Hyperactivity Disorder",
      "Advanced Development Health Disorder",
      "Attention Disorder Hyper Drive",
      "Active Decision Hyper Disorder"
    ],
    answer: 0
  },
  {
    question: "ADHD is best described as:",
    options: [
      "A brain-based condition",
      "A choice",
      "A habit",
      "A learning style only"
    ],
    answer: 0
  },
  {
    question: "Which brain chemical is strongly linked to ADHD?",
    options: ["Dopamine", "Insulin", "Melatonin", "Adrenaline only"],
    answer: 0
  },
  {
    question: "ADHD mainly affects:",
    options: ["Attention and impulse control", "Vision", "Hearing", "Bones"],
    answer: 0
  },
  {
    question: "People with ADHD are always hyperactive.",
    options: ["False", "True"],
    answer: 0
  },
  {
    question: "ADHD can exist in adults.",
    options: ["True", "False"],
    answer: 0
  },
  {
    question: "Which part of the brain is linked to planning and focus?",
    options: [
      "Prefrontal cortex",
      "Heart",
      "Spinal cord",
      "Cerebellum only"
    ],
    answer: 0
  },
  {
    question: "ADHD is caused by bad parenting.",
    options: ["False", "True"],
    answer: 0
  },
  {
    question: "Which is a common ADHD trait?",
    options: [
      "Difficulty sustaining attention",
      "Perfect focus always",
      "No emotions",
      "Super strength"
    ],
    answer: 0
  },
  {
    question: "Hyperfocus means:",
    options: [
      "Intense focus on something interesting",
      "No focus at all",
      "Sleeping",
      "Confusion"
    ],
    answer: 0
  },
  {
    question: "ADHD is a learning disability.",
    options: ["False", "True"],
    answer: 0
  },
  {
    question: "ADHD affects intelligence.",
    options: ["False", "True"],
    answer: 0
  },
  {
    question: "Which is a symptom of ADHD?",
    options: [
      "Impulsivity",
      "Perfect memory always",
      "No movement ever",
      "Instant sleep"
    ],
    answer: 0
  },
  {
    question: "People with ADHD can be successful.",
    options: ["True", "False"],
    answer: 0
  },
  {
    question: "ADHD only affects children.",
    options: ["False", "True"],
    answer: 0
  },
  {
    question: "ADHD is related to dopamine regulation.",
    options: ["True", "False"],
    answer: 0
  },
  {
    question: "Which is NOT a core symptom?",
    options: [
      "Reading minds",
      "Inattention",
      "Impulsivity",
      "Hyperactivity"
    ],
    answer: 0
  },
  {
    question: "ADHD makes boring tasks harder to start.",
    options: ["True", "False"],
    answer: 0
  },
  {
    question: "ADHD means a person cannot focus at all.",
    options: ["False", "True"],
    answer: 0
  },
  {
    question: "People with ADHD can hyperfocus.",
    options: ["True", "False"],
    answer: 0
  },
  {
    question: "ADHD is diagnosed by:",
    options: [
      "Medical professionals",
      "Random guessing",
      "Online quizzes only",
      "Friends"
    ],
    answer: 0
  },
  {
    question: "Which is a challenge with ADHD?",
    options: [
      "Time management",
      "Superhuman strength",
      "Instant learning of everything",
      "No challenges ever"
    ],
    answer: 0
  },
  {
    question: "ADHD affects motivation systems in the brain.",
    options: ["True", "False"],
    answer: 0
  },
  {
    question: "ADHD is the same for everyone.",
    options: ["False", "True"],
    answer: 0
  },
  {
    question: "Which is a strength sometimes linked to ADHD?",
    options: [
      "Creativity",
      "No thinking ability",
      "No emotions",
      "Perfect memory always"
    ],
    answer: 0
  },
  {
    question: "ADHD symptoms can change over time.",
    options: ["True", "False"],
    answer: 0
  },
  {
    question: "ADHD is only about being energetic.",
    options: ["False", "True"],
    answer: 0
  },
  {
    question: "Which helps ADHD focus?",
    options: [
      "Interest in task",
      "Boredom",
      "Silence only",
      "Sleep deprivation"
    ],
    answer: 0
  },
  {
    question: "ADHD is caused by lack of effort.",
    options: ["False", "True"],
    answer: 0
  },
  {
    question: "ADHD involves differences in brain development.",
    options: ["True", "False"],
    answer: 0
  }
];

let current = 0;
let score = 0;
let selected = null;
let time = 15 * 60;
let timerStarted = false;

/* PAGE SWITCHING */
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));

  document.getElementById(id).classList.add("active");
}

/* START QUIZ */
function startQuiz() {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("quiz-screen").classList.add("active");

  current = 0;
  score = 0;

  loadQuestion();

  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }
}

/* LOAD QUESTION */
function loadQuestion() {
  selected = null;

  const q = quizData[current];
  document.getElementById("question").textContent = q.question;

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;

    btn.onclick = () => {
      selected = i;
      document.getElementById("next-btn").disabled = false;
    };

    answers.appendChild(btn);
  });

  updateProgress();
  document.getElementById("next-btn").disabled = true;
}

/* NEXT */
function nextQuestion() {
  if (selected === quizData[current].answer) score++;

  current++;

  if (current < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

/* PROGRESS */
function updateProgress() {
  document.getElementById("progress").style.width =
    (current / quizData.length) * 100 + "%";
}

/* TIMER */
function startTimer() {
  setInterval(() => {
    let m = Math.floor(time / 60);
    let s = time % 60;
    document.getElementById("timer").textContent = `${m}:${s < 10 ? "0" + s : s}`;
    time--;
  }, 1000);
}

/* RESULTS */
function showResults() {
  document.getElementById("quiz-screen").classList.remove("active");
  document.getElementById("result-screen").classList.add("active");

  document.getElementById("score").textContent =
    `${score} / ${quizData.length}`;

  document.getElementById("feedback").textContent =
    score >= quizData.length / 2
      ? "Good understanding of ADHD!"
      : "Keep learning!";
}

/* RESTART */
function restartQuiz() {
  document.getElementById("result-screen").classList.remove("active");
  document.getElementById("home-screen").classList.add("active");
}
