import '@mantine/core/styles.css'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext.jsx";

import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  black: '#3b4948FF',
  colors: {
    primaryBlue: ['#27BFD3FF'],
    secondaryBlue: ['#209CD8FF'],
    orange : ['#EC8C70FF'],
    darkText: ['#3b4948FF'],
    white: ['#ffffffff'],
    lightBackground: ['#E8F3F3FF'],
  },
})

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

