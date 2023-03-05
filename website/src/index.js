import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CacheProvider from "./components/cacheProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CacheProvider>
        <App />
      </CacheProvider>
    </BrowserRouter>
  </React.StrictMode>
);
