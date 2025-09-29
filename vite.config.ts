import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    lib: {
      entry: "./src/widget.ts",
      name: "ChatWidget",
      fileName: "chat-widget",
      formats: ["umd"],
    },
    rollupOptions: {
      output: {
        // Ensure CSS is inlined into the JS bundle for easy embedding
        inlineDynamicImports: true,
        exports: "named",
      },
    },
    cssCodeSplit: false,
    minify: "terser",
  },
});
