import { createRoot } from "react-dom/client";
import React, { useState,useEffect } from "react";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
   </Provider>
);
