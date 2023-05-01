import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [buses, setBuses] = useState([]);

  const fetchBuses = async () => {
    console.log('fetching buses')
    const url = 'http://localhost:5000/api/getvehicles';

    try {
      const response = await axios.get(url);
      const bustimeResponse = response.data['bustime-response']

      // If no buses are found, bustime-response will return an error
      // instead of an array of vehicles
      if (bustimeResponse.error) {
        throw new Error(bustimeResponse.error[0].msg);
      }

      const data = bustimeResponse.vehicle;
      setBuses(data);
    } catch (error) {
      setBuses([]);
    }
  };

  useEffect(() => {
    console.log('mounting fetchbuses')
    fetchBuses();
  }, []);

  return (
    <>
      <h1>CTA Bus Tracker</h1>
      <h2>Route #6</h2>
      {buses.length === 0 ? (
        <p>No buses found</p>
      ) : (
        <ul>
          {buses.map((bus) => (
            <li key={bus.vid}>
              Bus #{bus.vid} is at {bus.lat}, {bus.lon}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
