import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory,useLocation } from 'react-router-dom';
import {
  readDeck,
  listCards,
  deleteCard,
  createCard,
  updateCard,
  deleteDeck,
} from '../utils/api/index';
import Header from './Header';
import AddCard from './AddCard';

function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [isEditingCard, setIsEditingCard] = useState(false);
  const [formData, setFormData] = useState({ front: '', back: '' });

  useEffect(() => {
    async function loadDeckAndCards() {
      const loadedDeck = await readDeck(deckId);
      const loadedCards = loadedDeck.cards;

      setDeck(loadedDeck);
      setCards(loadedCards);
    }
    loadDeckAndCards();
  }, []);  


  async function handleDeleteDeck() {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      await deleteDeck(deckId);
      history.push('/');
    }
  }

  async function handleAddCard() {
    setIsCreatingCard(true);
  }

  async function handleEditCard() {
    setIsEditingCard(true);
  }

  async function deleteCardHandler(cardId){
    if (
        window.confirm(
            "Delete this card? You will not be able to recover it."
        )
    ) {
      deleteCard(cardId)
          .then(history.go(0))
    }
  }


  async function handleDeleteCard(cardId) {
    if (window.confirm('Are you sure you want to delete this card?')) {
      await deleteCard(cardId);
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    }
  }

  if (deck.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
    {location.pathname === `/decks/${deck.id}` && (
    <div>
      <Header />
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <h2>{deck.name}</h2>
      <p>{deck.description}</p> 
     
 
      <Link to={`/decks/${deck.id}/cards/new`}>
        <button onClick={handleAddCard}>Add Cards</button>
      </Link>
      <Link to={`/decks/${deck.id}/edit`}>
      <button>Edit</button>
      </Link>
      <button onClick={handleDeleteDeck}>Delete</button>
      
      {/* {cards && ( */}
        <div>
          <h3>Cards</h3>
          {deck.cards && deck.cards.map((card) => (
            < div key={card.id}>
              <p>{card.front}</p>
              <p>{card.back}</p>
              <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                <button onClick ={handleEditCard}>Edit</button>
              </Link>
              <button onClick={() => deleteCardHandler(card.id)}>Delete</button>
            </div>
          ))}
        </div>
      
      </div>  
      )}
    </div>
  );
}

export default Deck;
