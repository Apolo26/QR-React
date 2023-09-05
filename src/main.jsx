import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./ThemeContext";
import { useTheme } from "./ThemeContext";


const root = document.getElementById('root');
const app = (
  <ThemeProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);

ReactDOM.createRoot(root).render(app);
