import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

import { blue, blueGrey } from "@material-ui/core/colors";

import App from "./App/chrome-cast-wrapper";

import "./index.css";

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: blue,
  },
  overrides: {
    MuiCardHeader: {
      title: {
        fontSize: "1.25rem",
        fontWeight: 500,
      },
    },
    MuiCardContent: {
      root: {
        paddingTop: 0,
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.5)",
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
