import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import {
  readDeck,
  createCard,
} from '../utils/api/index';
import CardForm
 from './CardForm';
function AddCard() {
  const { deckId } = useParams();
  const history = useHistory(); 
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({ front: '', back: '' });

  useEffect(() => {
    async function loadDeckAndCards() {
      const loadedDeck = await readDeck(deckId);
      const loadedCards = loadedDeck.cards;

      setDeck(loadedDeck);
      setCards(loadedCards);
    }
    loadDeckAndCards();
  }, [deckId]);

  async function handleCreateCard(e) {
    e.preventDefault();
    const newCard = await createCard(deckId, formData);
    setCards([...cards, newCard]);
    setFormData({ front: '', back: '' }); // Reset the form data
  }

  return (
    <div>
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck ? deck.name : 'Deck'}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>

      <h2>{deck.name} : Add Card</h2>

      {/* Use the CardForm component here */}
      <CardForm
        formData={formData}
        onChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        onSubmit={handleCreateCard}
        onCancel={() => {
          setFormData({ front: '', back: '' });
          history.push(`/decks/${deckId}`);
        }}
        submitLabel="Save"  
        cancelLabel="Done"
      />
    </div>
  );
}

export default AddCard;
