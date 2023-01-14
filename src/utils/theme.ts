import { createTheme } from "@mui/material/styles";

export const initTheme = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            borderLeft: "5px solid #6d61f4",
            backgroundColor: "#e3e8ed",
            color: "#6d61f4",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          fontWeight: "bold",
          fontSize: "1rem",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      contrastText: "#ffcc00",
    },
  },
});
