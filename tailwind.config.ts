import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2rem', lg: '2.5rem' },
      screens: { '2xl': '1360px' },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: '#071B33',
          50: '#EAF0F7',
          100: '#CBDBEA',
          200: '#9AB6D3',
          300: '#6690BC',
          400: '#38699E',
          500: '#0A4D8C',
          600: '#093F70',
          700: '#0A2E52',
          800: '#0C233E',
          900: '#071B33',
          950: '#040F1D',
        },
        royal: {
          DEFAULT: '#0A4D8C',
          light: '#3AA8FF',
        },
        gold: {
          DEFAULT: '#C89A2B',
          light: '#E4C468',
          dark: '#9A7620',
        },
        sky: { DEFAULT: '#3AA8FF' },
        success: { DEFAULT: '#00A86B' },
        surface: { DEFAULT: '#F7F8FA', dark: '#0A2033' },
        ink: { DEFAULT: '#1B1F23' },
      },
      fontFamily: {
        heading: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(7,27,51,0.08), 0 2px 8px -2px rgba(7,27,51,0.06)',
        premium: '0 20px 60px -15px rgba(7,27,51,0.25)',
        gold: '0 8px 30px -8px rgba(200,154,43,0.45)',
        glass: '0 8px 32px 0 rgba(7,27,51,0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #071B33 0%, #0A2E52 50%, #0A4D8C 100%)',
        'gold-gradient': 'linear-gradient(135deg, #E4C468 0%, #C89A2B 50%, #9A7620 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 100%)',
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'slide-up': { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        ripple: { '0%': { transform: 'scale(0)', opacity: '0.6' }, '100%': { transform: 'scale(4)', opacity: '0' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'slide-up': 'slide-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        ripple: 'ripple 0.6s linear',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
