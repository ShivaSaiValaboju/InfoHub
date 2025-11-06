require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS - allow all origins during development
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: false // Set to false to allow all origins
}));
app.use(express.json());

// Health check endpoint for keep-alive pings
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something broke!',
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Mock quotes data (can be replaced with a real API later)
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" }
];

// Weather API endpoint
app.get('/api/weather', async (req, res) => {
    try {
        console.log('Weather API called with city:', req.query.city);
        const city = req.query.city || 'London'; // Default city
        
        console.log('Using OpenWeather API key:', process.env.OPENWEATHER_API_KEY);
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );

        const weatherData = {
            temperature: response.data.main.temp,
            condition: response.data.weather[0].description,
            city: response.data.name
        };

        console.log('Weather data:', weatherData);
        res.json(weatherData);
    } catch (error) {
        console.error('Weather API error:', error.message);
        if (error.response) {
            console.error('Error response:', error.response.data);
        }
        res.status(500).json({ 
            error: 'Could not fetch weather data',
            message: error.message,
            details: error.response?.data
        });
    }
});

// Currency conversion endpoint
app.get('/api/currency', async (req, res) => {
    try {
        const amount = parseFloat(req.query.amount) || 1;
        const response = await axios.get(
            `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/INR`
        );

        const rates = response.data.conversion_rates;
        const conversion = {
            usd: (amount * rates.USD).toFixed(2),
            eur: (amount * rates.EUR).toFixed(2)
        };

        res.json(conversion);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch currency conversion data' });
    }
});

// Quote generator endpoint
app.get('/api/quote', (req, res) => {
    try {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        res.json(randomQuote);
    } catch (error) {
        res.status(500).json({ error: 'Could not generate quote' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});