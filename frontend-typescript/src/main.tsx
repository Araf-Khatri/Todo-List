import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import store from "./redux/store";
import App from "./App.js";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
