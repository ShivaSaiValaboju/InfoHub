// Keep-alive utility to prevent server from sleeping
const keepAlive = () => {
    const ping = async () => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/health`);
            console.log('Keep-alive ping sent at:', new Date().toLocaleTimeString());
        } catch (error) {
            console.log('Keep-alive ping failed:', error);
        }
    };

    // Ping every 14 minutes
    setInterval(ping, 14 * 60 * 1000);
    
    // Initial ping
    ping();
};

export default keepAlive;