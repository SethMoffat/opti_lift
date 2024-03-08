import React, { useState } from 'react';
import axios from 'axios';
import './AddClientScreen.css';

const AddClientScreen = () => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [selectedDays, setSelectedDays] = useState([]); // Array to store selected days
  const [description, setDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(null); // New state variable

  const handleDayClick = (day) => {
    const newSelectedDays = [...selectedDays];
    if (newSelectedDays.includes(day)) {
      // Remove day if already selected
      const index = newSelectedDays.indexOf(day);
      newSelectedDays.splice(index, 1);
    } else {
      // Add day if not selected
      newSelectedDays.push(day);
    }
    setSelectedDays(newSelectedDays);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientData = {
      name: clientName,
      email: clientEmail,
      dayOfWeek: selectedDays.join(','), // Join selected days with comma
      description,
    };

    try {
      const response = await axios.post('https://api.example.com/clients', clientData);
      console.log(response.data);
      setClientName('');
      setClientEmail('');
      setSelectedDays([]);
      setDescription('');
      setIsSuccess(true); // Set isSuccess to true if the client is successfully added
    } catch (error) {
      console.error(error);
      setIsSuccess(false); // Set isSuccess to false if there's an error
    }
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
        </label>
        <label>
          Day of the Week:
          <div className="calendar-container">
            {days.map(day => (
              <button 
                key={day} 
                type="button" 
                onClick={() => handleDayClick(day)} 
                className={selectedDays.includes(day) ? 'selected' : ''}
              >
                {day}
              </button>
            ))}
          </div>
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <button type="submit">Add Client</button>
      </form>
      {isSuccess === true && <p>Client successfully added!</p>}
      {isSuccess === false && <p>There was an error adding the client.</p>}
    </div>
  );
};

export default AddClientScreen;