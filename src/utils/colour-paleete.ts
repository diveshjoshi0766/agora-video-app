import { createMuiTheme } from "@material-ui/core/styles";

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      light: "",
      main: "#006bb6",
      dark: "",
    },
    secondary: {
      light: "",
      main: "#f5821e",
      dark: "",
    },
    error: {
      light: "e57373",
      main: "#fb4143",
      dark: "d32f2f",
    },
    warning: {
      light: "#ffb74d",
      main: "#fab914",
      dark: "#f57c00",
    },
    info: {
      light: "#64b5f6",
      main: "#5a23a0",
      dark: "#1976d2",
    },
    success: {
      light: "#81c784",
      main: "#ABCF38",
      dark: "#388e3c",
    },
  },
  typography: {
    fontFamily: [
      "Open Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
