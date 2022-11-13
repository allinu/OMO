import { fileURLToPath, URL } from "node:url";

// @ts-ignore
import { defineConfig } from "vite";
// @ts-ignore
import vue from "@vitejs/plugin-vue";
// @ts-ignore
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig({
  plugins: [vue(), vueJsx()],
  define: {
    global: {},
  },
  build: {
    target: "es2020",
    minify: false,
    commonjsOptions: {
      include: [],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {},
  },
  optimizeDeps: {
    // enable esbuild dep optimization during build https://github.com/vitejs/vite/issues/9703#issuecomment-1216662109
    // should be removable with vite 4 https://vitejs.dev/blog/announcing-vite3.html#esbuild-deps-optimization-at-build-time-experimental
    disabled: false,

    // target: es2020 added as workaround to make big ints work
    // - should be removable with vite 4
    // https://github.com/vitejs/vite/issues/9062#issuecomment-1182818044
    esbuildOptions: {
      target: "es2020",
    },
  },
});
