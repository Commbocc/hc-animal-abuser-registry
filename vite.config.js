import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { resolve } from 'path'
import { API_URL } from './src/lib'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  // build: {
  //   lib: {
  //     entry: resolve(__dirname, 'src/main.js'),
  //     name: 'MyLib',
  //   },
  // },
  server: {
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
