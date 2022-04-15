module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',

      primary:{

        DEFAULT: '#487690',
        dark: '#2D759E'


      },

      black: {
        DEFAULT: '#000000',
        100: '#1C1D1F',
        200: '#1F2023',
        300: '#2D2F36',
        400: '#373942',

      },
      white: {
        DEFAULT: '#ffffff',

      },
      gray: {
        100: '#7E8D96',
      }
    },
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
   // require('@tailwindcss/forms')
  ]
}
