import { defineConfig } from 'vite'

export default defineConfig({
  base: '',
  root: 'src',
  build: {
    assetsDir: "assets",
    outDir: "../dist",
  }
})
