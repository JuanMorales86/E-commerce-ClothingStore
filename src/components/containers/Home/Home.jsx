import React, { Fragment } from "react";

//Libreria Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//Mis Componentes
import NavBar from "../../NavBar/NavBar";
import ItemListContainer from "../../ItemListContainer/ItemListContainer";
import DrawerAppBar from "../../NavBar/NavBarWDrawer";
import Buttons from "../../modals/prueba";

//Material-UI
import { Typography } from "@mui/material"; //Material
import "@fontsource/roboto/400.css"; //Material
import { ThemeProvider } from "@mui/material/styles"; //Material
import CustomTheme from "../../Custom-Styles/themes";
import TabsComponents from "../../Tabs";
import Footer from "../../footer";

function HomePage() {
  return (
    <ThemeProvider theme={CustomTheme}>
     
        <NavBar />
        <ItemListContainer greeting={"Bienvenidos"} />
        <TabsComponents/>
        <Footer/>
      
    </ThemeProvider>
  );
}

export default HomePage;
