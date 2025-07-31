import React from "react";

export default function Jokers({
  jokers,
  useFiftyJoker,
  useAudienceJoker,
  usePhoneJoker,
  showFeedback,
}) {
  return (
    <div className="jokers-container">
      <button
        onClick={useFiftyJoker}
        disabled={!jokers.fifty || showFeedback}
        className={`joker-btn ${!jokers.fifty ? 'used' : ''}`}
        title="İki yanlış seçeneği eler"
      >
        %50
      </button>
      <button
        onClick={useAudienceJoker}
        disabled={!jokers.audience || showFeedback}
        className={`joker-btn ${!jokers.audience ? 'used' : ''}`}
        title="Seyircinin oylarını gösterir"
      >
        👥 Seyirci
      </button>
      <button
        onClick={usePhoneJoker}
        disabled={!jokers.phone || showFeedback}
        className={`joker-btn ${!jokers.phone ? 'used' : ''}`}
        title="Arkadaşından yardım al"
      >
        📞 Telefon
      </button>
    </div>
  );
} 