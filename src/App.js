import React, { useState, useEffect } from "react";
import quizData from "./data/questions.json";
import confetti from "canvas-confetti";
import { QuestionScreen, ResultScreen, StartScreen } from "components";

const correctSound = new Audio("/sounds/corrent.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");
const heartSound = new Audio("/sounds/heart.mp3");
const winnerSound = new Audio("/sounds/winner.mp3");

// Soruları karıştıran fonksiyon
const shuffleQuestions = (questions) => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function App() {
  const [username, setUsername] = useState("");
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // Joker state'leri
  const [jokers, setJokers] = useState({
    fifty: true,
    audience: true,
    phone: true,
  });
  const [eliminatedOptions, setEliminatedOptions] = useState([]);
  const [showAudienceVotes, setShowAudienceVotes] = useState(false);
  const [showPhoneHelp, setShowPhoneHelp] = useState(false);

  // Karıştırılmış sorular
  const [shuffledQuizData, setShuffledQuizData] = useState(null);

  // Sayfa yüklendiğinde soruları karıştır
  useEffect(() => {
    setShuffledQuizData({
      quiz: shuffleQuestions(quizData.quiz),
    });
  }, []);

  const currentQ = shuffledQuizData?.quiz[currentIndex];

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
    // Joker'ları sıfırla
    setJokers({
      fifty: true,
      audience: true,
      phone: true,
    });
    setEliminatedOptions([]);
    setShowAudienceVotes(false);
    setShowPhoneHelp(false);
    // Soruları yeniden karıştır
    setShuffledQuizData({
      quiz: shuffleQuestions(quizData.quiz),
    });
  };

  // %50 Joker fonksiyonu
  const useFiftyJoker = () => {
    if (!jokers.fifty) return;

    const wrongOptions = currentQ.options.filter(
      (opt) => opt !== currentQ.answer
    );
    const shuffled = wrongOptions.sort(() => 0.5 - Math.random());
    const toEliminate = shuffled.slice(0, 2);

    setEliminatedOptions(toEliminate);
    setJokers((prev) => ({ ...prev, fifty: false }));
  };

  // Seyirci Jokeri fonksiyonu
  const useAudienceJoker = () => {
    if (!jokers.audience) return;

    setShowAudienceVotes(true);
    setJokers((prev) => ({ ...prev, audience: false }));

    // Otomatik kapanmayı kaldırdık - sadece cevap verildiğinde kapanacak
  };

  // Telefon Jokeri fonksiyonu
  const usePhoneJoker = () => {
    if (!jokers.phone) return;

    setShowPhoneHelp(true);
    setJokers((prev) => ({ ...prev, phone: false }));

    // Otomatik kapanmayı kaldırdık - sadece cevap verildiğinde kapanacak
  };

  // Kapatma fonksiyonları
  const closeAudienceVotes = () => {
    setShowAudienceVotes(false);
  };

  const closePhoneHelp = () => {
    setShowPhoneHelp(false);
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
    setEliminatedOptions([]);
    setShowAudienceVotes(false);
    setShowPhoneHelp(false);

    const next = currentIndex + 1;
    if (next < shuffledQuizData.quiz.length) {
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

  // Sorular yüklenene kadar loading göster
  if (!shuffledQuizData) {
    return (
      <div className="quiz-container">
        <div className="loading">
          <h2>Sorular Yükleniyor...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

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
        total={shuffledQuizData?.quiz.length || 0}
        restartQuiz={restartQuiz}
      />
    );

  return (
    <QuestionScreen
      username={username}
      currentQ={currentQ}
      currentIndex={currentIndex}
      total={shuffledQuizData?.quiz.length || 0}
      handleAnswer={handleAnswer}
      selectedAnswer={selectedAnswer}
      showFeedback={showFeedback}
      timeLeft={timeLeft}
      jokers={jokers}
      useFiftyJoker={useFiftyJoker}
      useAudienceJoker={useAudienceJoker}
      usePhoneJoker={usePhoneJoker}
      eliminatedOptions={eliminatedOptions}
      showAudienceVotes={showAudienceVotes}
      showPhoneHelp={showPhoneHelp}
      closeAudienceVotes={closeAudienceVotes}
      closePhoneHelp={closePhoneHelp}
    />
  );
}
