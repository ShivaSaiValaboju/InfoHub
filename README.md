# InfoHub

InfoHub is a single-page application that brings together three everyday utilities:
- Weather Information
- Currency Conversion (INR → USD/EUR)
- Motivational Quote Generator

## Project Structure

```
InfoHub/
├── client/                      (React Frontend)
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherModule.jsx
│   │   │   ├── CurrencyConverter.jsx
│   │   │   └── QuoteGenerator.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
└── server/                      (Node.js/Express Backend)
    ├── server.js
    ├── .env
    └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Setup Instructions

1. Clone this repository
2. Set up the backend:
   ```bash
   cd server
   npm install
   ```
   Create a .env file in the server directory with your API keys:
   ```
   OPENWEATHER_API_KEY=your_openweather_api_key
   EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key
   PORT=3001
   ```

3. Set up the frontend:
   ```bash
   cd client
   npm install
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm start
   ```
   The server will run on http://localhost:3001

2. Start the frontend development server:
   ```bash
   cd client
   npm run dev
   ```
   The application will be available at http://localhost:5173

## Features

### Weather Information
- Displays current temperature and weather conditions
- Allows searching for weather by city name
- Shows loading and error states

### Currency Converter
- Converts Indian Rupees (INR) to USD and EUR
- Real-time exchange rates
- Input validation and error handling

### Quote Generator
- Displays random motivational quotes
- "New Quote" button to fetch different quotes
- Clean presentation with author attribution

## Technologies Used

### Frontend
- React (Vite)
- CSS for styling
- Axios for API calls

### Backend
- Node.js
- Express.js
- CORS for cross-origin requests
- Axios for external API calls
- dotenv for environment variables

## API Integration

- Weather data: OpenWeather API
- Currency conversion: ExchangeRate-API
- Quotes: Local JSON data (can be replaced with an external API)