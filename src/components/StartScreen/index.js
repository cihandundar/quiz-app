import React from "react";

export default function StartScreen({ username, setUsername, startQuiz }) {
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
