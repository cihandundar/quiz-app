import React from "react";

export default function AudienceVotes({ currentQ, showAudienceVotes, onClose }) {
  // Seyirci oylarını hesapla
  const getAudienceVotes = () => {
    const votes = {};
    currentQ.options.forEach(option => {
      if (option === currentQ.answer) {
        // Doğru cevaba daha yüksek oy ver
        votes[option] = Math.floor(Math.random() * 30) + 40; // 40-70 arası
      } else {
        votes[option] = Math.floor(Math.random() * 25) + 5; // 5-30 arası
      }
    });
    
    // Toplam %100 olacak şekilde normalize et
    const total = Object.values(votes).reduce((sum, vote) => sum + vote, 0);
    Object.keys(votes).forEach(key => {
      votes[key] = Math.round((votes[key] / total) * 100);
    });
    
    return votes;
  };

  if (!showAudienceVotes) return null;

  const audienceVotes = getAudienceVotes();

  return (
    <div className="audience-votes">
      <div className="audience-header">
        <h3>👥 Seyirci Oyları:</h3>
        {onClose && (
          <button 
            onClick={onClose} 
            className="close-btn"
            title="Oyları kapat"
          >
            ✕
          </button>
        )}
      </div>
      <div className="votes-container">
        {currentQ.options.map((option, index) => (
          <div key={index} className="vote-item">
            <span className="vote-option">{option}</span>
            <div className="vote-bar">
              <div 
                className="vote-fill" 
                style={{width: `${audienceVotes[option]}%`}}
              ></div>
            </div>
            <span className="vote-percentage">{audienceVotes[option]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
} 