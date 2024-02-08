import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import react from "@vitejs/plugin-react"
import copy from "rollup-plugin-copy"
import csp from "vite-plugin-csp"
// import million from "million/compiler"
// https://github.com/oven-sh/bun/issues/43

export default defineConfig({
  /**
   * Configuration of the Vite project with Content Security Policy, PWA cache, mkcert, headers and so on.
   * 
   * @asyncWebAssembly null
   * @default UserConfigExport
   */
  base: "/sissel/",
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          xterm: ["xterm"]
        },
      }
    }
  },
  manifest: true,
  plugins: [
    copy({
      targets: [{ src: "assets/*", dest: "dist/assets" }],
      hook: "writeBundle"
    }),
    csp({
      enabled: true,
      hashingMethod: "sha512",
      policy: {
        "base-uri": ["'none'"],
        "connect-src": ["'self'"],
        "default-src": ["'self'"],
        "font-src": ["'none'"],
        "form-action": ["'none'"],
        "frame-src": ["'none'"],
        "img-src": ["'self'", "blob:"],
        "manifest-src": ["'self'"],
        "media-src": ["'self'"],
        "object-src": ["'none'"],
        "script-src": [
          "'strict-dynamic'",
          "'sha512-hBx09HEbZXOt6XswFsFHoylmRP9YSvK2mEqV/loDQSNHs8DWBgw+uj9Z+9RgxQYO/Y5Z+99sk67FxM2aVOfXkQ=='", // pyodide.mjs
          "https:",
          "'wasm-unsafe-eval'", // Needed for Pyodide
        ],
        "script-src-elem": ["'self'"],
        "style-src": ["'self'"],
        "style-src-elem": ["'self'",
          "'sha512-CdVXISmlrixDx1PbcRuiWVx3sZIWUWP0+cxJiplsIQdTzopyyEUutwwwvkf2ZDDvbIcvTmBHUhkVa8MnvTku7w=='", // .xterm-dom-renderer-owner-1 .xterm-rows span
          "'sha512-z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg=='", // Empty hash
          "'sha512-j6tSXa6Yx/Whp8ra7DfhmbyBA4iNAx/s1lhqcbsMDBJU4B6IIw4aHBGS060qkgsD5sOSNndJoxkNLA1r/pA+eg=='", // width dynamic
          "'sha512-5V+mbF/yWInmfBAKEzYB4X1Y4JTGx05EuyO4aG4DiEv6FiuW9aF5/dGaBfnOhXS/Tg9kTnwLPxEf6ilCG7p9aA=='", // .xterm-bg-1
          "'sha512-AVUwX86yevxWTFF5S3pXmfyvu2psSDt4AVQnfwl2VbAH6oUAPCxqB5p9W7V6TTmL3NmUkoTjHgZZBYhAEOntxw=='", // 8px Firefox
          "'sha256-Ot28rRDpuBkn69l5TRxj02UcsadcuEWPGelNYsmzUkA='", "'unsafe-inline'" // On MacOS
        ],
        "worker-src": ["'self'"],
        "require-trusted-types-for": ["'script'"],
        "upgrade-insecure-requests": 1
      }
    }),
    react(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      workbox: {
        maximumFileSizeToCacheInBytes: 9e6,
        globPatterns: ["**/*.{bz2,css,data,html,ico,js,json,manifest,map,mjs,ogg,py,scss,tar,wasm,webmanifest,whl,zip}"],
      },
      devOptions: {
        enabled: false,
        type: "module"
      }
    })
  ],
  resolve: {
    alias: {
      "node-fetch": "axios" // Externalized for browser compatibility
    },
  },
  server: {
    headers: {
      "Access-Control-Allow-Origin": "https://sissel.github.io",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin" // "Service-Worker-Allowed": "/",
    },
    hmr: false, // One instance
    https: true
  }
})
