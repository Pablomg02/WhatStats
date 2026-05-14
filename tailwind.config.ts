import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ws: {
          bg: '#111B21',
          surface: '#1F2C33',
          card: '#233137',
          border: '#2E3D43',
          text: '#E9EDEF',
          muted: '#8696A0',
          green: '#00A884',
          'green-bright': '#25D366',
          teal: '#128C7E',
        },
        whatsapp: {
          green: '#25D366',
          dark: '#075E54',
          teal: '#128C7E',
          bg: '#ECE5DD',
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
