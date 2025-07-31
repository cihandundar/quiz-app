import React from "react";

export default function TimerCircle({ timeLeft }) {
  const circlePercent = (timeLeft / 60) * 283;

  return (
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
  );
}
