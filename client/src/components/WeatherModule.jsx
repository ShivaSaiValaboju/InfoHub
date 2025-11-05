import React, { useState, useEffect } from 'react';

const WeatherModule = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('Mumbai');

    // Popular Indian cities
    const cities = [
        { value: 'Mumbai', label: 'Mumbai' },
        { value: 'Delhi', label: 'Delhi' },
        { value: 'Bangalore', label: 'Bangalore' },
        { value: 'Hyderabad', label: 'Hyderabad' },
        { value: 'Chennai', label: 'Chennai' },
        { value: 'Kolkata', label: 'Kolkata' },
        { value: 'Pune', label: 'Pune' },
        { value: 'Ahmedabad', label: 'Ahmedabad' },
        { value: 'Jaipur', label: 'Jaipur' },
        { value: 'Surat', label: 'Surat' }
    ];

    const fetchWeather = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`http://localhost:3001/api/weather?city=${city}`);
            if (!response.ok) throw new Error('Weather data fetch failed');
            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [city]);

    const getWeatherIcon = (condition) => {
        const lowerCondition = condition?.toLowerCase() || '';
        if (lowerCondition.includes('rain')) {
            return '🌧️';
        } else if (lowerCondition.includes('cloud')) {
            return '☁️';
        } else if (lowerCondition.includes('clear')) {
            return '☀️';
        } else if (lowerCondition.includes('snow')) {
            return '❄️';
        } else if (lowerCondition.includes('thunder')) {
            return '⛈️';
        }
        return '🌤️';
    };

    return (
        <div className="module-container">
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ marginRight: '10px', verticalAlign: 'middle' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                Weather Information
            </h2>
            <div className="input-group">
                <div className="select-wrapper">
                    <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="city-select"
                    >
                        {cities.map(city => (
                            <option key={city.value} value={city.value}>
                                {city.label}
                            </option>
                        ))}
                    </select>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        className="select-icon"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                <button onClick={fetchWeather} disabled={loading}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {loading ? 'Updating...' : 'Update Weather'}
                </button>
            </div>
            
            {error && <div className="error">{error}</div>}
            
            {loading && (
                <div className="loading">
                    Fetching weather data
                </div>
            )}

            {weatherData && !loading && !error && (
                <div className="weather-info">
                    <div className="weather-grid">
                        <div className="weather-main">
                            <div className="weather-icon-temp">
                                <span style={{ fontSize: '4rem' }}>
                                    {getWeatherIcon(weatherData.condition)}
                                </span>
                                <div className="weather-temp">
                                    <span className="temp-value">{Math.round(weatherData.temperature)}°</span>
                                    <span className="temp-unit">C</span>
                                </div>
                            </div>
                            <h3 className="weather-city">
                                {weatherData.city}
                            </h3>
                            <p className="weather-condition">
                                {weatherData.condition}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherModule;