import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/mi-repo/", // 👈 NOMBRE EXACTO DEL REPO
  plugins: [react()],
});
