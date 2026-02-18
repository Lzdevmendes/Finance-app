/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Theme background classes
    'bg-emerald-50',
    'bg-blue-50',
    'bg-purple-50',
    'bg-rose-50',
    'bg-emerald-900/20',
    'bg-blue-900/20',
    'bg-purple-900/20',
    'bg-rose-900/20',
    // Theme text classes
    'text-emerald-600',
    'text-blue-600',
    'text-purple-600',
    'text-rose-600',
    // Theme border classes
    'border-emerald-600',
    'border-blue-600',
    'border-purple-600',
    'border-rose-600',
    // Theme primary classes
    'bg-emerald-600',
    'bg-blue-600',
    'bg-purple-600',
    'bg-rose-600',
    // Theme hover classes
    'bg-emerald-700',
    'bg-blue-700',
    'bg-purple-700',
    'bg-rose-700',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}