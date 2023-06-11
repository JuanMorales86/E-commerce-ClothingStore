import './App.css';
import { Typography } from '@mui/material';//Material
import Buttons from './components/modals/prueba'
import '@fontsource/roboto/400.css';//Material
import 'bootstrap/dist/css/bootstrap.min.css';//Boostrap
import  NavBar  from './components/NavBar/NavBar';//Boostrap
import ItemListContainer from './components/ItemListContainer/ItemListContainer';//Boostrap
import { ThemeProvider  } from '@mui/material/styles'//Material
import CustomTheme from "./components/Custom-Styles/themes";//Material





function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
    <div>
      <NavBar />
    <div>
      <ItemListContainer greeting={'Bienvenidos'}/>
      <Buttons />
    </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
