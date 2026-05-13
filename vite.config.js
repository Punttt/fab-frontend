import { defineConfig } from "vite";
import { resolve } from "path";

// Vite-konfiguration
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        booking: resolve(__dirname, 'booking.html'),
      },
    },
  },
});