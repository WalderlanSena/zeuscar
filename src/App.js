import React from "react";
import Routes from "./routes";
import { Router } from "react-router-dom";
import history from "./services/history";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

export default function App() {
  const theme = createMuiTheme({
    palette: {
      secondary: {
        main: "#ffdd55",
      },
      primary: {
        main: "#ffdd55",
      },
    },
  });

  return (
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    </Router>
  );
}
