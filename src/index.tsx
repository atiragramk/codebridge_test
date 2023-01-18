import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { StyledEngineProvider } from "@mui/material/styles";

import store from "./store";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  palette: {
    primary: {
      main: "#361176",
    },
    secondary: {
      main: "#a4a7b8",
    },
  },
} as ThemeOptions);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
