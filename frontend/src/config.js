// Frontend Configuration
const config = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    appName: 'Black Friday Deals',
    promoCode: 'BFSALE25',
    discountPercent: 50
};

export default config;
