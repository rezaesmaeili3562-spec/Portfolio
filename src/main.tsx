import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { AdminStoreProvider } from "./app/providers/AdminStoreProvider";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AdminStoreProvider>
        <App />
      </AdminStoreProvider>
    </ThemeProvider>
  </React.StrictMode>
);
