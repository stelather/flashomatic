import React, { useEffect, useState } from "react";
import { listDecks } from '../utils/api/index';
import 'font-awesome/css/font-awesome.min.css';
import { deleteDeck } from "../utils/api/index";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';



function Card({decks , deck, setDecks}) {
    const history = useHistory();

    const handleDeleteDeck = (deckId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this deck?");
        if (confirmDelete) {
          // Proceed with deletion
          deleteDeck(deckId);
          const updatedDecks = decks.filter((deck) => deck.id !== deckId);
          history.push('/');
          setDecks(updatedDecks);
        }
      };

    console.log(deck);
    return(
        < >
        <h4>{deck.name}</h4>
        <p>{deck.description}</p>
        <div>
        <button className="btn btn-secondary">
        <i style= {{margin:'5px'}} className="fa fa-eye"></i>
            View
        </button>
        <Link to={`/decks/${deck.id}/study`}>
        <button style= {{margin:'5px'}} className="btn btn-primary">
        <i className="fa fa-graduation-cap"></i>
            Study
        </button>
        </Link>
        <button style= {{marginLeft:'450px'}} className ="btn btn-danger" onClick={() => handleDeleteDeck(deck.id)}>
            <i className="fa fa-trash"></i>
        </button>
        </div>
        </>
    );
}

export default Card;