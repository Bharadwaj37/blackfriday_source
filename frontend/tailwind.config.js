/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#6366f1', // Indigo 500
                    dark: '#4338ca',    // Indigo 700
                },
                secondary: '#ec4899', // Pink 500
                dark: {
                    bg: '#0f172a',      // Slate 900
                    card: '#1e293b',    // Slate 800
                    text: '#f8fafc',    // Slate 50
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
