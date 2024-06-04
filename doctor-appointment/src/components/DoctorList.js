import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './List.css';

const DoctorList = ({ selectDoctor }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/doctors/')
      .then(response => setDoctors(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="doctor-container">
      <h2>Select a Doctor</h2>
      <ul className="doctor-list">
        {doctors.map(doctor => (
          <li key={doctor.id} onClick={() => selectDoctor(doctor)} className="doctor-item">
            <img src={doctor.image ? `http://localhost:8000${doctor.image}` : 'default-image-url.jpg'} alt={doctor.name} className="doctor-image"/>
            <div className="doctor-info">
              <h3>{doctor.name}</h3>
              <p><strong>Specialty:</strong> {doctor.specialty}</p>
              <p><strong>Description:</strong> {doctor.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
