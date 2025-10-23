/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    bg: '#0a0e27',
                    bgSecondary: '#131a35',
                    card: '#1a2238',
                    border: '#283593',
                },
                primary: {
                    DEFAULT: '#64b5f6',
                    hover: '#42a5f5',
                },
                text: {
                    primary: '#e8eaf6',
                    secondary: '#9fa8da',
                }
            },
        },
    },
    plugins: [],
}