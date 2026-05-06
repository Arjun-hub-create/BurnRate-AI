/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#eaeeff',
          200: '#cfd8ff',
          300: '#adb4ff',
          400: '#7c83ff',
          500: '#4f5bff',
          600: '#3846e6',
          700: '#2f3bb8',
          800: '#28338d',
          900: '#242e70',
        },
      },
      boxShadow: {
        soft: '0 24px 60px rgba(15, 23, 42, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
