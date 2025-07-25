/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        wave: 'wave 5s ease-in-out infinite',
        'pixelate-out': 'pixelate-out 600ms ease-in-out forwards',
        'pixelate-in': 'pixelate-in 600ms ease-out forwards',
        'teleport-in-1': 'teleport-in 0.8s ease-out 0.2s both',
        'teleport-in-2': 'teleport-in 0.8s ease-out 0.4s both',
        'teleport-in-3': 'teleport-in 0.8s ease-out 0.6s both',
        'teleport-in-4': 'teleport-in 0.8s ease-out 0.8s both',
        'teleport-in-5': 'teleport-in 0.8s ease-out 1.0s both',
        'flicker-1': 'flicker-1 0.15s ease-in-out infinite alternate',
        'flicker-2': 'flicker-2 0.12s ease-in-out infinite alternate',
        'flicker-3': 'flicker-3 0.18s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        wave: {
          '0%': { transform: 'rotate(0deg)', transformOrigin: 'bottom right' },
          '2%': { transform: 'rotate(7deg)', transformOrigin: 'bottom right' },
          '4%': { transform: 'rotate(-4deg)', transformOrigin: 'bottom right' },
          '6%': { transform: 'rotate(7deg)', transformOrigin: 'bottom right' },
          '8%': { transform: 'rotate(-2deg)', transformOrigin: 'bottom right' },
          '10%': { transform: 'rotate(5deg)', transformOrigin: 'bottom right' },
          '12%': { transform: 'rotate(0deg)', transformOrigin: 'bottom right' },
          '100%': { transform: 'rotate(0deg)', transformOrigin: 'bottom right' },
        },
      },
      transitionDuration: {
        600: '600ms',
        800: '800ms',
      },
    },
  },
  plugins: [],
}
