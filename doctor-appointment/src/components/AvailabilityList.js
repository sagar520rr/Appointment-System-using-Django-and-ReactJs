import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './List.css';

const AvailabilityList = ({ doctor }) => {
  const [availabilities, setAvailabilities] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/availabilities/?doctor=${doctor.id}`)
      .then(response => setAvailabilities(response.data))
      .catch(error => console.error(error));
  }, [doctor]);

  return (
    <div className="availability-container">
      <h2>Available Slots for {doctor.name}</h2>
      <ul className="availability-list">
        {availabilities.map(availability => (
          <li key={availability.id}>
            {availability.date} from {availability.start_time} to {availability.end_time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailabilityList;
