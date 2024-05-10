/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '1a1': 'auto 1fr auto',
      },
    },
  },
  plugins: [require('daisyui')],
  /** @type {import('daisyui').Config} */
  daisyui: {
    themes: ['dark'],
    logs: false,
  },
};
