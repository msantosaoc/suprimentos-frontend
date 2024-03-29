/** @type {import('tailwindcss').Config} */
export const important = true;
export const content = [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",
  ".app/components/**/*.{js,ts,jsx,tsx}",

  // Or if using `src` directory:
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const darkMode = "class";
export const theme = {
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px'
    }
  },
  extend: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
    backgroundColor: {
      'background': '#f7f6f6',
      'light-blue': '#5ea9d3',
      'light-gray': '#d9d9d9',
      'gray-menu-icon': '#5f5f61',
    },
    textColor: {
      'smaller': '#2f2f2f',
      'padrao': '#333',
      'light-gray': '#d9d9d9',
      'light-blue': '#5ea9d3',
      'gray-menu-icon': '#5f5f61',
      'desativado': '#E5E5E5',
      'white': '#fff',
      'title': '#4A4545',
      'subTitle': '#4A4545 '
    },
    outlineColor: {
      'indian-red': '#E25662'
    },
    borderColor: {
      'gray-menu-icon': '#5f5f61',
    }
  },
};
export const plugins = ["@tailwindcss/forms"];
