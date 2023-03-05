
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      colors: {
        'my-bg-primary': '#121212',
        'my-bg-secondary':'#1D1D1D',
        'my-text-primary':'#ffffff',
        'my-text-secondary':'#C4C5C5',
        'my-blue':'#0077FF',
        'my-indigo':'#5453E0',
        'my-green':'#20BD5F',
        'my-red':'#F44336',
        'my-pink':'#E91E63'
  
      },
    }
  },
  plugins: [],
}
