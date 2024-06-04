import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const AppointmentForm = ({ doctor }) => {
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const appointment = {
      doctor: doctor.id,
      user_email: email,
      appointment_date: date,
      details: details,
    };

    axios.post('http://localhost:8000/api/appointments/', appointment)
      .then(response => {
        alert('Appointment booked successfully');
        setEmail('');
        setDate('');
        setDetails('');
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <h2>Book Appointment with {doctor.name}</h2>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Date:</label>
        <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Details:</label>
        <textarea value={details} onChange={e => setDetails(e.target.value)} required></textarea>
      </div>
      <button type="submit" className="btn">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;
