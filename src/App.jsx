import React from 'react';
import './App.css';
// import HomePage from './components/containers/Home/Home';

//Routing
import { BrowserRouter as RouterLink, Router, Route, Switch, Routes  } from 'react-router-dom';//Routing

//Librerias
import { Box, ThemeProvider } from '@mui/material';

//Mis componentes
import NavBar from './components/NavBar/NavBar';
import Footer from './components/footer';
import TabsComponents from './components/Tabs';
import CustomTheme from './components/Custom-Styles/themes';
import Nosotros from './components/containers/nosotros';
import ListContainerDetail from './components/containers/itemDetailContainer';
import ListContainerItem from './components/containers/itemListContainer';








function App() {
  return (
    <RouterLink>
    <ThemeProvider theme={CustomTheme}>
      <Box>
      <NavBar />
      </Box>

      <Routes>
        {/* <Route path={'/'} element={<ItemListContainer greeting={"Bienvenidos"}/>} /> */}
        <Route path={'/'} element={<ListContainerItem/>}/>
        <Route path={'/products/:levels'} element={<ListContainerItem/>}/>
        <Route path={'/product/:selectedProductId'} element={<ListContainerDetail/>} />
        <Route path={'/nosotros'} element={<Nosotros/>}/>
        <Route path={'/cart'} element={<p>cart</p>} />
      </Routes>

      <Box>
      <Footer />
      </Box>

    </ThemeProvider>
    </RouterLink>
  );
}


export default App;
