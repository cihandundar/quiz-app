import React, { useState, useEffect } from "react";
import quizData from "./data/questions.json";
import confetti from "canvas-confetti";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";

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

  const currentQ = quizData.quiz[currentIndex]; // ✅ Soru burada

  const startQuiz = () => {
    if (username.trim() !== "") setStarted(true);
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

  const handleAnswer = (selected) => {
    if (showFeedback) return;
    setSelectedAnswer(selected);
    setShowFeedback(true);

    if (selected === currentQ.answer) {
      setScore(score + 1);
      correctSound.play();
    } else {
      wrongSound.play();
    }

    setTimeout(() => nextQuestion(), 1000);
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
      winnerSound.play();
      confetti();
    }
  };

  useEffect(() => {
    if (!started || finished) return;
    if (timeLeft === 0) {
      nextQuestion();
      return;
    }

    if (timeLeft % 10 === 0 && timeLeft > 0) {
      heartSound.currentTime = 0;
      heartSound.play();
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, started, finished]);

  if (!started)
    return (
      <StartScreen
        username={username}
        setUsername={setUsername}
        startQuiz={startQuiz}
      />
    );

  if (finished)
    return (
      <ResultScreen
        username={username}
        score={score}
        total={quizData.quiz.length}
        restartQuiz={restartQuiz}
      />
    );

  return (
    <QuestionScreen
      username={username}
      currentQ={currentQ} // ✅ Soruyu gönderiyoruz
      currentIndex={currentIndex}
      total={quizData.quiz.length}
      handleAnswer={handleAnswer}
      selectedAnswer={selectedAnswer}
      showFeedback={showFeedback}
      timeLeft={timeLeft} // ✅ Zamanı gönderiyoruz
    />
  );
}
