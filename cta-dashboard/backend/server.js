const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

const API_KEY = process.env.CTA_API_KEY;
const ROUTE = '171';

