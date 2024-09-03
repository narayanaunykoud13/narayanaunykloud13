import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      // input: {
      //   main: path.resolve(__dirname, "src", "index-app.jsx"),
      // },
      output: {
        entryFileNames: "index.js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name][extname]",
        // format: 'cjs',
      },
    },
  },
  plugins: [],
  base: "https://phoenixproject.vercel.app/",
  optimizeDeps: {
    include: ["react-multi-select-component"],
    esbuildOptions: {
      plugins: [],
    },
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
