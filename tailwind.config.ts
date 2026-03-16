import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'ajax-black': '#131313',
        'ajax-white': '#FAFAFA',
        'ajax-purple': '#5E17EB',
        'ajax-purple-mid': '#7B3FFF',
        'ajax-depth': '#1A1A1A',
        'ajax-surface': '#F0F0F0',
        ok: '#34D399',
        err: '#F87171',
        warn: '#FBBF24',
      },
      skew: {
        '18': '18deg',
      },
    },
  },
  plugins: [],
} satisfies Config
