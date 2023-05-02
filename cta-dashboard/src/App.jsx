import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const port = 5000;
  const route = 6;

  const fetchRoutes = async () => {
    const url = `http://localhost:${port}/api/getroutes`;

    try {
      const response = await axios.get(url);
      const bustimeResponse = response.data['bustime-response'];

      if (bustimeResponse.error) {
        throw new Error(bustimeResponse.error[0].msg);
      }

      const data = bustimeResponse.routes;
      setRoutes(data);
    } catch (error) {
      setRoutes([]);
    }
  };

  const fetchBuses = async () => {
    const url = `http://localhost:${port}/api/getvehicles?route=${route}`;

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
    fetchBuses();
  }, []);

  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <>
    <h1>CTA Bus Tracker</h1>
    <div className="page">
      <div className="column">
        <h2>Routes</h2>
        {routes.length === 0 ? (
          <p>No routes found</p>
        ) : (
        <ul>
          {routes.map((route) => (
            <li key={route.rt}>{route.rt} - {route.rtnm}</li>
          ))}
        </ul>
        )}
      </div>

      <div className="column">
        <h2>Route #{route}</h2>
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
      </div>

    </div>
    </>
  );
}

export default App;
