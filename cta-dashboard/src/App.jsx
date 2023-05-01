import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    /* TODO */
  };

  return (
    <>
      <h1>CTA Bus Tracker</h1>
      <div>
        {buses.map((bus) => (
          /* TODO */
        ))}
      </div>
    </>
  );
}

export default App;
