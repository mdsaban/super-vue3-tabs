import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    dts(), 
    cssInjectedByJsPlugin() // This plugin merges the output css into js
  ],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src/") }],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "SuperVue3Tabs",
      // the proper extensions will be added
      fileName: "super-vue3-tabs",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
