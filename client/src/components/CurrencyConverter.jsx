import React, { useState } from 'react';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState('');
    const [conversion, setConversion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleConvert = async () => {
        if (!amount || isNaN(amount)) {
            setError('Please enter a valid amount');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/currency?amount=${amount}`);
            if (!response.ok) throw new Error('Currency conversion failed');
            const data = await response.json();
            setConversion(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleConvert();
        }
    };

    return (
        <div className="module-container">
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ marginRight: '10px', verticalAlign: 'middle' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Currency Converter
            </h2>
            
            <div className="input-group">
                <div style={{ position: 'relative', flex: 1 }}>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter amount..."
                        style={{ paddingLeft: '3rem' }}
                    />
                    <span style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-secondary)',
                        fontWeight: '500'
                    }}>
                        ₹
                    </span>
                </div>
                <button onClick={handleConvert} disabled={loading}>
                    {loading ? 'Converting...' : 'Convert'}
                </button>
            </div>

            {error && <div className="error">{error}</div>}
            
            {loading && (
                <div className="loading">
                    Converting currency
                </div>
            )}
            
            {conversion && !loading && (
                <div className="conversion-results">
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        gap: '1rem'
                    }}>
                        <div style={{ 
                            flex: 1,
                            padding: '1.5rem',
                            borderRadius: '0.75rem',
                            backgroundColor: 'var(--bg-secondary)',
                            textAlign: 'center'
                        }}>
                            <p style={{ 
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary)',
                                marginBottom: '0.5rem'
                            }}>USD</p>
                            <p style={{ 
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                color: 'var(--text-primary)'
                            }}>
                                ${conversion.usd}
                            </p>
                        </div>
                        <div style={{ 
                            flex: 1,
                            padding: '1.5rem',
                            borderRadius: '0.75rem',
                            backgroundColor: 'var(--bg-secondary)',
                            textAlign: 'center'
                        }}>
                            <p style={{ 
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary)',
                                marginBottom: '0.5rem'
                            }}>EUR</p>
                            <p style={{ 
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                color: 'var(--text-primary)'
                            }}>
                                €{conversion.eur}
                            </p>
                        </div>
                    </div>
                    <p style={{ 
                        textAlign: 'center',
                        marginTop: '1rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem'
                    }}>
                        Rate updated every hour
                    </p>
                </div>
            )}
        </div>
    );
};

export default CurrencyConverter;