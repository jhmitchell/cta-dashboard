const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

const API_KEY = process.env.CTA_API_KEY;
const ROUTE = '6';

app.get('/api/getvehicles', async (req, res) => {
    const url = `http://www.ctabustracker.com/bustime/api/v2/getvehicles?key=${API_KEY}&rt=${ROUTE}&format=json`;
    console.log('Fetching vehicles from:', url)

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.log('Error fetching vehicles:', error);
        res.status(500).json({ error: 'Error fetching vehicles' }); 
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});