import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createCard, readCard, updateCard } from '../utils/api/index';
import Header from './Header';
import CardForm from './CardForm';

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({ front: '', back: '' });

  useEffect(() => {
    async function loadCard() {
      const card = await readCard(cardId);
      setFormData({
        front: card.front,
        back: card.back,
      });
    }
    loadCard();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard({ ...formData, id: cardId, deckId });
    history.push(`/decks/${deckId}`);
    console.log({ ...formData, id: cardId, deckId })
  };

  return (
    <div>
      <Header />
      <h2>Edit Card</h2>
{/* Use the CardForm component here */}
      <CardForm
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={() => history.push(`/decks/${deckId}`)}
      submitLabel="Submit"  // Customize button labels
      cancelLabel="Cancel"
    />
    </div>
  );
}

export default EditCard;