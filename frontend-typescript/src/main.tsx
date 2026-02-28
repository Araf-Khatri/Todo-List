import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App.js";
import store from "./redux/store";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
