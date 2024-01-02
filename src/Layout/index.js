import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { listDecks, listCards, deleteDeck } from "../utils/api";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [deckCardCounts, setDeckCardCounts] = useState({}); // Declare deckCardCounts
  const [isCreating, setIsCreating] = useState(false);

  const history = useHistory();

  
  const loadDecksAndCardCounts = async () => {
    const loadedDecks = await listDecks();
    setDecks(loadedDecks);
  
    const cardCounts = {};
    loadedDecks.forEach(async(deck, index) => {
      const cards = deck.cards;
      if (cards) { // Check if cards is not undefined
        cardCounts[deck.id] = cards.length;
      } else {
        cardCounts[deck.id] = 0; // Set it to 0 or another default value if cards is undefined
      } 
    });
    setDeckCardCounts(cardCounts);
  };
  


  useEffect(() => {
    loadDecksAndCardCounts();
  }, []);

  const handleCreateDeck = () => {
    setIsCreating(true);
    history.push('/decks/new');
  };

  const handleDeleteDeck = async (deckId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this deck?');
    if (confirmDelete) {
      await deleteDeck(deckId);
      setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <Link to="/decks/new">
          <button className="btn btn-secondary" onClick={handleCreateDeck}>
            Create Deck
          </button>
        </Link>
        {decks.map((deck) => (
          <div key={deck.id}>
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <Link to={`/decks/${deck.id}`}>
              <button className="btn btn-secondary">
                <i style={{ margin: '5px' }} className="fa fa-eye"></i>
                View
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button style={{ margin: '5px' }} className="btn btn-primary">
                <i className="fa fa-graduation-cap"></i>
                Study
              </button>
            </Link>
            <button
              style={{ marginLeft: '450px' }}
              className="btn btn-danger"
              onClick={() => handleDeleteDeck(deck.id)}
            >
              <i className="fa fa-trash"></i>
              Delete
            </button>
            <div>
            {deckCardCounts[deck.id] !== undefined && (
                `${deckCardCounts[deck.id]} cards`
              )}           
           </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Layout;
