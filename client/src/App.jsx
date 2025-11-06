import { useState } from 'react'
import WeatherModule from './components/WeatherModule'
import CurrencyConverter from './components/CurrencyConverter'
import QuoteGenerator from './components/QuoteGenerator'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('weather')

  return (
    <div className="container">
      <h1>
        Info<span style={{ color: 'var(--primary-color)' }}>Hub</span>
      </h1>
      
      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === 'weather' ? 'active' : ''}`}
          onClick={() => setActiveTab('weather')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ marginRight: '8px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          Weather Info
        </button>
        <button 
          className={`tab-button ${activeTab === 'currency' ? 'active' : ''}`}
          onClick={() => setActiveTab('currency')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ marginRight: '8px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Currency
        </button>
        <button 
          className={`tab-button ${activeTab === 'quote' ? 'active' : ''}`}
          onClick={() => setActiveTab('quote')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ marginRight: '8px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          Quotes
        </button>
      </div>

      <div className="module-wrapper">
        {activeTab === 'weather' && <WeatherModule />}
        {activeTab === 'currency' && <CurrencyConverter />}
        {activeTab === 'quote' && <QuoteGenerator />}
      </div>
    </div>
  )
}

export default App
