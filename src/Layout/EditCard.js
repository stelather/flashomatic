import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../utils/api/index';
import Header from './Header';
import CardForm from './CardForm';

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({ front: '', back: '' });
  const [card, setCard] = useState({})
  const [deck, setDeck] = useState({})

  useEffect(() => {
    async function loadCard() {
      const card = await readCard(cardId);
      setFormData({
        front: card.front,
        back: card.back,
      });

    }
    loadCard();
  }, [cardId]);

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId)
      setDeck(response)
    }
    loadDeck()
  }, [deckId])

  useEffect(() => {
    async function loadCard() {
      const response = await readCard(cardId)
      setCard(response)
    }
    loadCard()
  }, [cardId, setCard])

  // const handleChange = (event) => {
  //   setFormData({
  //     ...formData,
  //     [event.target.name]: event.target.value,
  //   });
  // };
  //
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   await updateCard({ ...formData, id: cardId, deckId });
  //   history.push(`/decks/${deckId}`);
  //   console.log({ ...formData, id: cardId, deckId })
  // };

  const cancelButtonHandler = () => {
    history.push(`/decks/${deckId}`)
  }

  const submitButtonHandler = async (event) => {
    event.preventDefault()
    await updateCard({...card})
    history.push(`/decks/${deckId}`)
  }

  const inputChangeHandler = (event) => {
    setCard({
      ...card,
      [event.target.name]: event.target.value
    });
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  return (
      <div>
        <Header />
        <h2>Edit Card</h2>
        {/* Use the CardForm component here */}
        <CardForm
            formData={formData}
            onChange={inputChangeHandler}
            onSubmit={submitButtonHandler}
            onCancel={cancelButtonHandler}
            submitLabel="Submit"  // Customize button labels
            cancelLabel="Cancel"
        />
      </div>
  );
}

export default EditCard;
