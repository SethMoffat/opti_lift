import React from 'react';
import Calendar from 'react-calendar';
import Clock from 'react-live-clock';
import 'react-calendar/dist/Calendar.css';
import './CalendarScreen.css';

const CalendarScreen = () => {
  return (
    <div className="calendar-container">
      <h1>
        <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />
      </h1>
      <h2>This Month</h2>
      <Calendar />
    </div>
  );
};

export default CalendarScreen;