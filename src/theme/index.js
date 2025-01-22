import { responsiveFontSizes } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto-slab"; // Defaults to weight 400
import palette from "./palette";
import shadows from "./shadows";

const getTheme = (mode) =>
  responsiveFontSizes(
    createTheme({
      palette: palette(mode),
      layout: {
        contentWidth: 1236,
      },
      shadows: shadows(mode),
      typography: {
        fontFamily: '"Roboto Slab"',
        button: {
          textTransform: "none",
          fontWeight: "medium",
        },
      },
      zIndex: {
        appBar: 1200,
        drawer: 1300,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            label: {
              fontWeight: 600,
            },
            containedSecondary: mode === "light" ? { color: "white" } : {},
          },
        },
      },
    })
  );

export default getTheme;
