const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

const API_KEY = process.env.CTA_API_KEY;

// Get a list of vehicles for a specified route
app.get('/api/getvehicles', async (req, res) => {
    const { route } = req.query || '1';
    const url = `http://www.ctabustracker.com/bustime/api/v2/getvehicles?key=${API_KEY}&rt=${route}&format=json`;
    //console.log('Fetching vehicles from:', url)

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.log('Error fetching vehicles:', error);
        res.status(500).json({ error: 'Error fetching vehicles' }); 
    }
});

// Get a list of all bus routes
app.get('/api/getroutes', async (req, res) => {
    const url = `http://www.ctabustracker.com/bustime/api/v2/getroutes?key=${API_KEY}&format=json`;
  
    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      console.log('Error fetching routes:', error);
      res.status(500).json({ error: 'Error fetching routes' });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});