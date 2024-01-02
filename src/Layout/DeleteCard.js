import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { deleteCard } from '../utils/api/index';

function DeleteCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const handleDelete = async () => {
    await deleteCard(cardId);
    history.push(`/decks/${deckId}`);
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <h2>Delete Card</h2>
      <p>Are you sure you want to delete this card?</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default DeleteCard;