import "@mantine/core/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import { generateColors } from "@mantine/colors-generator";

import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  black: "#3b4948",
  primaryColor: "primary-blue",
  colors: { "primary-blue": generateColors("#209cd8") },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
