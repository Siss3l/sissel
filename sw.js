if(!self.define){let e,s={};const i=(i,f)=>(i=new URL(i+".js",f).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(f,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let n={};const o=e=>i(e,t),a={module:{uri:t},exports:n,require:o};s[t]=Promise.all(f.map((e=>a[e]||o(e)))).then((e=>(r(...e),n)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/aesthetic.py",revision:"1aff987715a63fcf6af73cf877b80f29"},{url:"assets/favicon-18ad4208.ico",revision:null},{url:"assets/final.bz2",revision:"7b15746e41ca159f4adaaf902ca24c64"},{url:"assets/pyodide.asm.js",revision:"3281f8c2402d6d984b882e9e7f81297d"},{url:"assets/pyodide.asm.wasm",revision:"6d94afd16ce5fb348b68b111fb7fe7c9"},{url:"assets/pyodide.mjs",revision:"f99f6f3ed62889561642fd418bf60798"},{url:"assets/python_stdlib.zip",revision:"6b9080e44efcf375d9d50cd489396483"},{url:"assets/repodata.json",revision:"9f6e600f4588b7225e2c159198912cf6"},{url:"assets/wii.ogg",revision:"ef889c2c8cd6f7f5492894911b0b4514"},{url:"assets/xterm-4ed993c7.js",revision:null},{url:"index.html",revision:"cb220d4f0a04a63480841058b87d6a9d"},{url:"manifest.webmanifest",revision:"30fb00b373d2b47111314acd9a68f0af"},{url:"registerSW.js",revision:"2eeb8dc391a163a1b931f5c74764cad5"},{url:"manifest.webmanifest",revision:"30fb00b373d2b47111314acd9a68f0af"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));