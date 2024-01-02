import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createDeck } from '../utils/api/index';
import Header from './Header';

function CreateDeck() {
  const history = useHistory();
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = await createDeck(formData);
    history.push(`/decks/${newDeck.id}`);
  };

  return (
    <div>
      <Header />
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" onChange={handleChange}></textarea>
        </div>
        <button type="submit">Submit</button>
        <button onClick={() => history.push('/')}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateDeck;