import React from "react";
import Routes from "./routes";
import GlobalStyle from "./assets/global";
import { Router } from "react-router-dom";
import history from "./services/history";
import Header from "./components/Header";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { ToastContainer } from "react-toastify";

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
        <Header />
        <GlobalStyle />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes />
      </MuiThemeProvider>
    </Router>
  );
}
