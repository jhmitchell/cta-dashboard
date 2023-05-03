import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import './App.css';

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
      <Sidebar />
      <div className='content'>
        <h1>CTA Bus Tracker</h1>
        <h2>Route #6</h2>
        <h2>Aliquip qui voluptate dolore aliquip. Esse in dolor incididunt fugiat non non ut aliquip enim eiusmod nisi ut enim aliqua. Id Lorem occaecat veniam esse aliqua excepteur deserunt. Sunt tempor aliquip qui quis nulla mollit laborum voluptate id nisi mollit.

Do ad do laborum amet do in velit dolor consequat. Sunt deserunt cillum nostrud aliqua officia magna minim veniam voluptate sint. Ea consequat tempor culpa irure do anim. Aliquip ut ea commodo mollit ex nulla ut.

Quis laboris sunt veniam do deserunt sint est non labore minim aliqua ea. Proident sint anim quis deserunt cillum incididunt eu anim deserunt quis aute exercitation aute aute. Aliqua ipsum ad eu sit nulla. Elit irure occaecat laborum do irure laborum enim proident esse minim ullamco in ad. Laborum ex sint esse elit velit qui. Proident sunt culpa laborum ea amet.

Sint incididunt nisi ea mollit sunt officia. Mollit pariatur proident reprehenderit cillum excepteur enim quis aliqua duis ipsum ipsum consectetur fugiat. In aute et id dolor laboris.

Enim aliqua sit anim ullamco velit proident irure et dolore enim duis culpa amet. Nulla excepteur qui sunt ex dolore do cupidatat. Duis est sit ea cupidatat fugiat labore consectetur aute sit culpa excepteur ad.

Sunt ullamco incididunt culpa eu reprehenderit minim excepteur in. Minim mollit consequat sit enim ullamco anim. Ipsum anim cillum aute commodo ipsum mollit laborum in do non. Qui labore adipisicing amet et commodo et sint pariatur eiusmod cupidatat.</h2>
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
    </>
  );
}

export default App;