import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src/') },
    ],
} ,
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SabanTabs',
      // the proper extensions will be added
      fileName: 'saban-tabs'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
  
})
