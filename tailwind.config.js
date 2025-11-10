/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',       // Navbar / Buttons
        accent: '#D4AF37',        // Hover / Highlights
        background: '#F5F5F5',     // Page background
        card: '#FFFFFF',           // Cards background
        text: '#374151',           // General text
        muted: '#6B7280',          // Muted text
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
