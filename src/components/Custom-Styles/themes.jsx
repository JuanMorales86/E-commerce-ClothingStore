import { createTheme } from '@mui/material/styles';
import {
  lightBlue,
  blueGrey,
  indigo,
} from "@mui/material/colors";

const CustomTheme = createTheme ({
  palette: {
    primary: {
      main: blueGrey[500], // Color Principal
      dark: blueGrey[700], // Tono mas oscuro
      light: blueGrey[300], // Tono mas claro
      //contrasText: "#FFFFFF", // Color de texto que contrasta con el color secundario
    },

    secondary: {
      main: lightBlue[300], // Color Principal
      dark: lightBlue[700], // Tono mas oscuro
      light: lightBlue[200], // Tono mas claro
      //contrasText: "#FFFFFF", // Color de texto que contrasta con el color secundario
      A700: lightBlue["A700"], // Variante A700
    },

    accent: {
      main: indigo[500], // Color Principal
      dark: indigo[700], // Tono mas oscuro
      light: indigo[300], // Tono mas claro
      //contrasText: "#000000", // Color de texto que contrasta con el color secundario
      A700: indigo["A700"], // Variante A700
      A100: indigo["A100"], // Variante A700
    },
  },

  // ...otros estilos y configuraciones del tema
  typography: {
    fontFamily: "Arial, sans-serif",
    fontSize: 14,
  },

  customProps: {
    customColor: "#8DB7CC", //Azul tirando a gris entre oscuro y claro
    customColor2: "#32657F", // Entre Azul Oscuro y Verde
    customColor3: "#B0E5FF", //Azul claro pastel
    customSpacing: 8,
  },
});

export default CustomTheme;
