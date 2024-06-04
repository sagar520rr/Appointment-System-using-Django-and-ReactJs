import React, { useState } from 'react';
import DoctorList from './components/DoctorList';
import AvailabilityList from './components/AvailabilityList';
import AppointmentForm from './components/AppointmentForm';
import './App.css';

const App = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="container">
      {!selectedDoctor ? (
        <DoctorList selectDoctor={setSelectedDoctor} />
      ) : (
        <div className="appointment-container">
          <AvailabilityList doctor={selectedDoctor} />
          <AppointmentForm doctor={selectedDoctor} />
        </div>
      )}
    </div>
  );
};

export default App;
