/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/Components/Table.jsx"],
  theme: {
     extend: {
       backgroundColor: {
         'header-bg': '#bfdbfe',
         'row-bg': '#f5f5f4',
         'row-bg-alt': '#ffffff',
         'text-blue': '#1e3a8a',
       },
       textColor: {
         'text-blue': '#1e3a8a',
       },
     },
  },
  variants: {},
  plugins: [],
 };
 