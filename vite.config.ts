/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      copyDtsFiles: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/VueComponentLiveDemo.ts"),
      name: "VueComponentLiveDemo",
      formats: ["es", "cjs"],
      fileName: (format) => {
        if (format === "es") return "vue-component-live-demo.es.js";
        if (format === "cjs") return "vue-component-live-demo.cjs";
        return "";
      },
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
    outDir: "dist",
  },
  test: {
    coverage: {
      reportsDirectory: "../test_coverage",
    },
  },
});
