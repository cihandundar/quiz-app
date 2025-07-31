import React from "react";

export default function ResultScreen({ username, score, total, restartQuiz }) {
  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Tebrikler {username}! 🎉</h1>
      <p className="quiz-score">
        Skorunuz: {score} / {total}
      </p>
      <button onClick={restartQuiz} className="quiz-button">
        Quiz'i Yeniden Başlat
      </button>
    </div>
  );
}
