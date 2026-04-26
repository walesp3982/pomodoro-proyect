import { defineConfig } from 'vite';

export default defineConfig({
  content:
    [
      './index.html',
      './src/**/*.{tsx,ts,jsx,js}',
    ],
  theme: {
    extend: {},
  },
  plugins: [],
});