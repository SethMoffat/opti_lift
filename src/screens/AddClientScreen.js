import React, { useState } from 'react';
import axios from 'axios';

const AddClientScreen = () => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientData = {
      name: clientName,
      email: clientEmail,
    };

    try {
      const response = await axios.post('https://api.example.com/clients', clientData);
      console.log(response.data);
      setClientName('');
      setClientEmail('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} />
        </label>
        <button type="submit">Add Client</button>
      </form>
    </div>
  );
};

export default AddClientScreen;