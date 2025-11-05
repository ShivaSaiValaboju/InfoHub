import React, { useState } from 'react';
import API_URL from '../config';

const QuoteGenerator = () => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQuote = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_URL}/quote`);
            if (!response.ok) throw new Error('Failed to fetch quote');
            const data = await response.json();
            setQuote(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className="module-container">
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ marginRight: '10px', verticalAlign: 'middle' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Daily Inspiration
            </h2>

            {error && <div className="error">{error}</div>}
            
            {loading ? (
                <div className="loading">
                    Finding inspiration
                </div>
            ) : (
                <>
                    {quote && (
                        <div className="quote-container" style={{
                            position: 'relative',
                            padding: '2rem',
                            backgroundColor: 'var(--bg-secondary)',
                            borderRadius: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            <svg 
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    left: '1rem',
                                    color: 'var(--primary-color)',
                                    opacity: 0.2
                                }}
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <div style={{ marginLeft: '2rem' }}>
                                <p className="quote-text" style={{
                                    fontSize: '1.5rem',
                                    lineHeight: '1.6',
                                    fontWeight: '500',
                                    color: 'var(--text-primary)',
                                    marginBottom: '1rem'
                                }}>
                                    {quote.text}
                                </p>
                                <p className="quote-author" style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '1.1rem',
                                    fontStyle: 'italic',
                                    textAlign: 'right'
                                }}>
                                    — {quote.author}
                                </p>
                            </div>
                        </div>
                    )}
                    <button 
                        onClick={fetchQuote} 
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        New Quote
                    </button>
                </>
            )}
        </div>
    );
};

export default QuoteGenerator;