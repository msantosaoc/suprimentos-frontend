/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'background': '#f7f6f6',
        'light-blue': '#5ea9d3',
        'light-gray': '#d9d9d9'
      },
      textColor: {
        'smaller': '#2f2f2f',
        'padrao': '#333',
        'light-gray': '#d9d9d9',
        'light-blue': '#5ea9d3',
        'gray-menu-icon': '#5f5f61'
      }
    },

  },
  plugins: [],
}
