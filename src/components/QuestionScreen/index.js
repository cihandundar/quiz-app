import TimerCircle from "components/TimerCircle";
import React from "react";

export default function QuestionScreen({
  username,
  currentQ,
  currentIndex,
  total,
  handleAnswer,
  selectedAnswer,
  showFeedback,
  timeLeft,
}) {
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2 className="quiz-user">Oyuncu: {username}</h2>
        <p className="quiz-progress">
          Soru {currentIndex + 1}/{total}
        </p>
      </div>

      <TimerCircle timeLeft={timeLeft} />

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
