import { createTheme } from '@mui/material/styles';
import {
  lightBlue,
  blueGrey,
  indigo,
  purple
} from "@mui/material/colors";
import 'typeface-lato'//Importacion fuente Roboto
import 'typeface-montserrat'//Importacion fuente Monserrate
import 'typeface-roboto'//Importacion fuente Roboto
import 'typeface-open-sans'//Import fuente Open-Sans
import 'typeface-alegreya'//Import fuente Alegreya
import 'typeface-nunito'//Import fuente nunito
import 'typeface-playfair-display'//Import fuente PlayFair Display


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

    tertiary: {
      main: purple[500], // Color Principal
      dark: purple[900], // Tono mas oscuro
      light: purple[50], // Tono mas claro
      A700: purple["A100"], // Variante A100 mas claro 
      A200: purple["A200"], // Variante A200 un poco mas oscuro 
      A400: purple["A400"], // Variante A400 mas oscuro
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
    letters: {
      fontA: "'Arial', sans-serif",
      fontR: "'Roboto', sans-serif",
      fontL: "'Lato', sans-serif",
      fontM: "'Montserrate', sans-serif",
      fontPF: "'Playfair Display', sans-serif",
      fontN: "'Nunito', sans-serif",
      fontALG: "'Alegreya', serif",
      sizeTitles: "2rem",
    }
  },

  customProps: {
    customColor: "#8DB7CC", //Azul tirando a gris entre oscuro y claro
    customColor2: "#32657F", // Entre Azul Oscuro y Verde
    customColor3: "#B0E5FF", //Azul claro pastel
    customSpacing: 8,
  },

  overrides: {
    MuiCard: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        // Estilos para pantallas pequeñas (menos de 600px)
        '@media (max-width:600px)': {
          flexDirection: 'column-reverse', // Cambiar el orden en pantallas pequeñas
          '& .MuiCardMedia-root': {
            borderTopRightRadius: '0',
            borderBottomRightRadius: '8px',
            borderBottomLeftRadius: '8px',
            borderTopLeftRadius: '8px',
            height: '200px',
          },
        },
      },
    },
  },
});

export default CustomTheme;
