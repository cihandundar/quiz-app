import React, { useState, useEffect } from "react";
import quizData from "./data/questions.json";
import confetti from "canvas-confetti";

const correctSound = new Audio("/sounds/corrent.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");
const heartSound = new Audio("/sounds/heart.mp3");
const winnerSound = new Audio("/sounds/winner.mp3");

export default function App() {
  const [username, setUsername] = useState("");
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
    }, 250);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 400);

    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 },
      });
    }, 500);

    setTimeout(() => {
      clearInterval(confettiInterval);
    }, 4000);
  };

  const restartQuiz = () => {
    setStarted(false);
    setCurrentIndex(0);
    setScore(0);
    setFinished(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTimeLeft(60);
    setUsername("");
  };

  useEffect(() => {
    if (!started || finished) return;

    if (timeLeft === 0) {
      nextQuestion();
      return;
    }

    if (timeLeft % 10 === 0 && timeLeft > 0) {
      heartSound.currentTime = 0;
      heartSound.play().catch((e) => console.log("Audio play failed:", e));
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, started, finished]);

  const startQuiz = () => {
    if (username.trim() !== "") setStarted(true);
  };

  const handleAnswer = (selected) => {
    if (showFeedback) return;

    const currentQuestion = quizData.quiz[currentIndex];
    setSelectedAnswer(selected);
    setShowFeedback(true);

    if (selected === currentQuestion.answer) {
      setScore(score + 1);
      correctSound.currentTime = 0;
      correctSound.play().catch((e) => console.log("Audio play failed:", e));
    } else {
      wrongSound.currentTime = 0;
      wrongSound.play().catch((e) => console.log("Audio play failed:", e));
    }

    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setTimeLeft(60);

    const next = currentIndex + 1;
    if (next < quizData.quiz.length) {
      setCurrentIndex(next);
    } else {
      setFinished(true);
      winnerSound.currentTime = 0;
      winnerSound.play().catch((e) => console.log("Audio play failed:", e));
      triggerConfetti();
    }
  };

  if (!started) {
    return (
      <div className="quiz-container">
        <h1 className="quiz-title">Quiz'e Hoş Geldin!</h1>
        <input
          type="text"
          placeholder="Adınızı girin"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="quiz-input"
        />
        <button onClick={startQuiz} className="quiz-button">
          Başla
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="quiz-container">
        <h1 className="quiz-title">Tebrikler {username}! 🎉</h1>
        <p className="quiz-score">
          Skorunuz: {score} / {quizData.quiz.length}
        </p>
        <button onClick={restartQuiz} className="quiz-button">
          Quiz'i Yeniden Başlat
        </button>
      </div>
    );
  }

  const currentQ = quizData.quiz[currentIndex];
  const circlePercent = (timeLeft / 60) * 283;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2 className="quiz-user">Oyuncu: {username}</h2>
        <p className="quiz-progress">
          Soru {currentIndex + 1}/{quizData.quiz.length}
        </p>
      </div>

      <div className="timer-circle">
        <svg className="progress-ring" width="100" height="100">
          <circle className="progress-ring-bg" cx="50" cy="50" r="45" />
          <circle
            className="progress-ring-fill"
            cx="50"
            cy="50"
            r="45"
            strokeDasharray="283"
            strokeDashoffset={283 - circlePercent}
          />
        </svg>
        <div className="timer-text">{timeLeft}</div>
      </div>

      <p className="quiz-question">{currentQ.question}</p>
      <div className="quiz-options">
        {currentQ.options.map((opt, i) => {
          let optionClass = "quiz-option";

          if (showFeedback) {
            if (opt === currentQ.answer) optionClass += " correct";
            else if (opt === selectedAnswer) optionClass += " wrong";
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className={optionClass}
              disabled={showFeedback}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
