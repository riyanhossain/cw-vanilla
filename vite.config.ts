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
        // No separate CSS file, everything inlined into JS
        assetFileNames: () => {
          return '[name].[hash][extname]';
        },
      },
    },
    // Important: this inlines CSS into the JS bundle
    cssCodeSplit: false,
    minify: "terser",
  },
});
