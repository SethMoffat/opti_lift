import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './AddClientScreen.css';

const supabaseUrl = 'https://gqeuwuskthqhzypobrmf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxZXV3dXNrdGhxaHp5cG9icm1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5MjYyNDgsImV4cCI6MjAyNTUwMjI0OH0.o-VhM1UxIe-75_iPn5HfQUnIwOub9oWnzbh7CJhY-5M';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

  const handleAddClient = async (e) => {
    e.preventDefault();

    const clientData = {
      name: clientName,
      email: clientEmail,
      dayOfWeek: selectedDays.join(','),
      description,
    };

    console.log('Client data to be sent:', clientData);

    try {
      console.log('Attempting to insert data into Supabase...'); // New log
      const { data, error } = await supabase
        .from('clients')
        .insert(clientData);

      console.log('Supabase response:', data, error); // Log response and error

      if (error) {
        console.error('Error during insert:', error);
        setIsSuccess(false);
        return;
      }

      console.log('Client added successfully:', data);
      setClientName('');
      setClientEmail('');
      setSelectedDays([]);
      setDescription('');
      setIsSuccess(true);
    } catch (error) {
      console.error('Error in insert operation:', error);
      setIsSuccess(false);
    }
  };

  const handleSubmit = async (e) => {
    handleAddClient(e);
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