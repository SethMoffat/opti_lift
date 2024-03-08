import React, { useState } from 'react';
import axios from 'axios';
import './AddClientScreen.css';

const AddClientScreen = () => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientData = {
      name: clientName,
      email: clientEmail,
      dayOfWeek,
      description,
    };

    try {
      const response = await axios.post('https://api.example.com/clients', clientData);
      console.log(response.data);
      setClientName('');
      setClientEmail('');
      setDayOfWeek('');
      setDescription('');
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
        <label>
          Day of the Week:
          <select value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)}>
            <option value="">Select...</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </label>
        <label>
          Description:
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </label>
        <button type="submit">Add Client</button>
      </form>
    </div>
  );
};

export default AddClientScreen;