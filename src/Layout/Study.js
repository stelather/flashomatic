import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { readDeck } from '../utils/api/index';

function Study() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showRestartMessage, setShowRestartMessage] = useState(false);

  useEffect(() => {
    async function loadDeckAndCards() {
      const loadedDeck = await readDeck(deckId);
      const loadedCards = loadedDeck.cards;

      if (loadedCards.length <= 2) {
        setShowRestartMessage(true);
      } else {
        setShowRestartMessage(false);
      }

      setDeck(loadedDeck);
      setCards(loadedCards);
    }

    loadDeckAndCards();
  }, [deckId]);

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      setShowRestartMessage(true);
    }
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowRestartMessage(false);
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  if (cards.length <= 2) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>

        <h2>Study: {deck.name}</h2>
        <p>Not enough cards. You can add more cards to the deck.</p>

        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
      </div>
    );
  }

  const currentCard = cards[currentCardIndex];

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>

      <h2>Study: {deck.name}</h2>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {currentCardIndex + 1} of {cards.length}
          </h5>
          {isFlipped ? (
            <p className="card-text">{currentCard.back}</p>
          ) : (
            <p className="card-text">{currentCard.front}</p>
          )}
        </div>
      </div>

      <button className="btn btn-secondary mt-3" onClick={handleFlipCard}>
        {isFlipped ? 'Flip Back' : 'Flip Card'}
      </button>
      {isFlipped && (
  <button className="btn btn-primary mt-3 ml-3" onClick={handleNextCard}>
    Next
  </button>
)}

      {showRestartMessage && (
        <div className="alert alert-success mt-3">
          You've completed the deck! Do you want to restart?
          <button className="btn btn-warning ml-3" onClick={handleRestart}>
            Restart
          </button>
          <button className="btn btn-secondary ml-2" onClick={() => history.push('/')}>
            Return to Home
          </button>
        </div>
      )}
    </div>
  );
}

export default Study;