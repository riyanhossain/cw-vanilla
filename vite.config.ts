import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/widget.ts",
      name: "ChatWidget",
      fileName: "chat-widget",
      formats: ["umd"],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    minify: "terser",
  },
});
