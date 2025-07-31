import TimerCircle from "components/TimerCircle";
import Jokers from "components/Jokers";
import AudienceVotes from "components/AudienceVotes";
import PhoneHelp from "components/PhoneHelp";
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
  jokers,
  useFiftyJoker,
  useAudienceJoker,
  usePhoneJoker,
  eliminatedOptions,
  showAudienceVotes,
  showPhoneHelp,
  closeAudienceVotes,
  closePhoneHelp,
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

      {/* Seyirci Oyları */}
      <AudienceVotes
        currentQ={currentQ}
        showAudienceVotes={showAudienceVotes}
        onClose={closeAudienceVotes}
      />

      {/* Telefon Yardımı */}
      <PhoneHelp
        showPhoneHelp={showPhoneHelp}
        onClose={closePhoneHelp}
        currentQ={currentQ}
      />

      <div className="quiz-options">
        {currentQ.options.map((opt, i) => {
          let optionClass = "quiz-option";

          // Elenen seçenekleri gizle
          if (eliminatedOptions.includes(opt)) {
            optionClass += " eliminated";
          }

          if (showFeedback) {
            if (opt === currentQ.answer) optionClass += " correct";
            else if (opt === selectedAnswer) optionClass += " wrong";
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className={optionClass}
              disabled={showFeedback || eliminatedOptions.includes(opt)}
            >
              {opt}
            </button>
          );
        })}

        {/* Joker Butonları */}
        <Jokers
          jokers={jokers}
          useFiftyJoker={useFiftyJoker}
          useAudienceJoker={useAudienceJoker}
          usePhoneJoker={usePhoneJoker}
          showFeedback={showFeedback}
        />
      </div>
    </div>
  );
}
