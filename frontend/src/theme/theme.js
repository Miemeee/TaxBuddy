import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2f4f88",
      dark: "#243d6b",
    },

    background: {
      default: "#f4f6fb",
      paper: "#ffffff",
    },

    text: {
      primary: "#24467a",
      secondary: "#6b7280",
    },

    grey: {
      100: "#eef2f7",
      300: "#e5e7eb",
    },

    info: {
      main: "#2563eb",
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: "Noto Sans Thai, sans-serif",
  },
});

export default theme;
