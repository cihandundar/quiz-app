import React, { useState, useEffect } from "react";

export default function PhoneHelp({ showPhoneHelp, onClose, currentQ }) {
  const [suggestedAnswer, setSuggestedAnswer] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Metinlerin sırayla dönmesi ve cevap gösterme
  useEffect(() => {
    if (!showPhoneHelp) {
      setCurrentTextIndex(0);
      setShowAnswer(false);
      return;
    }

    // İlk 3 saniye metinler döner
    const textTimer = setInterval(() => {
      setCurrentTextIndex(prev => {
        if (prev >= 2) { // 3 metin gösterdikten sonra
          clearInterval(textTimer);
          setShowAnswer(true);
          return prev;
        }
        return prev + 1;
      });
    }, 1000); // Her 1 saniyede bir metin değişir

    return () => clearInterval(textTimer);
  }, [showPhoneHelp]);

  // Cevap gösterildikten 5 saniye sonra otomatik kapanma
  useEffect(() => {
    if (showAnswer) {
      const answerTimer = setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 5000); // 5 saniye sonra kapanır

      return () => clearTimeout(answerTimer);
    }
  }, [showAnswer, onClose]);

  // Arkadaşın önerdiği cevabı belirle
  useEffect(() => {
    if (showPhoneHelp && currentQ) {
      // %70 ihtimalle doğru cevabı öner, %30 ihtimalle yanlış cevap öner
      const shouldSuggestCorrect = Math.random() < 0.7;
      
      if (shouldSuggestCorrect) {
        setSuggestedAnswer(currentQ.answer);
      } else {
        // Yanlış cevaplardan rastgele birini seç
        const wrongAnswers = currentQ.options.filter(option => option !== currentQ.answer);
        const randomWrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
        setSuggestedAnswer(randomWrongAnswer);
      }
    }
  }, [showPhoneHelp, currentQ]);

  // Telefon yardımı metinleri (sırayla dönecek)
  const helpTexts = [
    "Bu soru biraz zor ama...",
    "Ben de tam emin değilim ama...",
    "Bu konuda biraz bilgim var..."
  ];

  if (!showPhoneHelp) return null;

  return (
    <div className="phone-help">
      <div className="phone-header">
        <h3>📞 Arkadaşın Diyor:</h3>
        {onClose && (
          <button 
            onClick={onClose} 
            className="close-btn"
            title="Yardımı kapat"
          >
            ✕
          </button>
        )}
      </div>
      
      {!showAnswer ? (
        <p>"{helpTexts[currentTextIndex]}"</p>
      ) : (
        <div className="suggested-answer">
          <strong>Şunu öneriyorum:</strong> 
          <span className="answer-text">"{suggestedAnswer}"</span>
        </div>
      )}
    </div>
  );
} 