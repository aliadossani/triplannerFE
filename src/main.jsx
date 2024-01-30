import "@mantine/core/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import { generateColors } from "@mantine/colors-generator";

<<<<<<< Updated upstream
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  black: "darkText",
  primaryColor: "primaryBlue",
  colors: {
    primaryBlue: generateColors("#27BFD3FF"),
    secondaryBlue: generateColors("#209CD8FF"),
    orange: generateColors("#EC8C70FF"),
    darkText: generateColors("#3b4948FF"),
    white: generateColors("#ffffffff"),
    lightBackground: generateColors("#E8F3F3FF"),
  },
});
=======
import { MantineProvider } from '@mantine/core';

>>>>>>> Stashed changes

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <MantineProvider>
          <App />
        </MantineProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
