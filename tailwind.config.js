/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'hack-green': 'var(--primary)',
      'hack-dark': 'var(--bg)',
      'hack-darker': 'var(--bg-dark)',
      'hack-light': 'var(--secondary)',
      'black': '#000',
      'white': '#fff',
      'red': {'500': '#ef4444'},
      'yellow': {'400': '#facc15'},
    },
      fontFamily: {
        mono: ['"Fira Code"', '"Courier New"', 'monospace'],
      },
      backgroundImage: {
        'circuit-pattern': `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 H 90 V 90 H 10 L 10 10' fill='none' stroke='%230f0' stroke-width='0.5' opacity='0.1'/%3E%3Cpath d='M30 10 V 30 H 10 M70 10 V 30 H 90 M30 90 V 70 H 10 M70 90 V 70 H 90' fill='none' stroke='%230f0' stroke-width='0.5' opacity='0.1'/%3E%3C/svg%3E")`,
      }
    },
  },
  plugins: [],
}