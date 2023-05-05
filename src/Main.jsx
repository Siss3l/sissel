import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { registerSW } from "virtual:pwa-register"
import { cleanupOutdatedCaches } from "workbox-precaching"
import "./Index.scss"
import "./Loading.scss"


console.debug = () => {};
if (window?.trustedTypes?.createPolicy) {
  /**
   * Some web browsers require `TrustedScriptURL` assignment shenanigans.
   * Indeed plugins like `uMatrix` may have conflicts with service workers.
   * 
   * @default TrustedTypePolicyOptions
   */
  window.trustedTypes.createPolicy("default", {
    createScriptURL: (url) => {
      if (typeof url !== "string") {
        throw new TypeError("Invalid URL");
      }
      if (new URL(url, window.location.origin)?.origin !== window.location.origin) {
        throw new TypeError("Invalid URL");
      }
      return url;
    },
  });
}

cleanupOutdatedCaches();
registerSW({onNeedRefresh() {}, onOfflineReady() {}, });

ReactDOM.createRoot(document.getElementById("root")).render(<><App/></>);
