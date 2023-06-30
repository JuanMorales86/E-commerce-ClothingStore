import React from 'react';
import './App.css';
// import HomePage from './components/containers/Home/Home';

//Routing
import { BrowserRouter, Router, Route, Switch, Routes  } from 'react-router-dom';//Routing

//Librerias
import { Box, ThemeProvider } from '@mui/material';

//Mis componentes
import NavBar from './components/NavBar/NavBar';
import Footer from './components/footer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import TabsComponents from './components/Tabs';
import CustomTheme from './components/Custom-Styles/themes';
import Nosotros from './components/containers/nosotros';
import ListVestidosDetail from './components/listElementsDetail';






function App() {
  return (
    <BrowserRouter>
    <ThemeProvider theme={CustomTheme}>
      <Box>
      <NavBar />
      </Box>

      <Routes>
        {/* <Route path={'/'} element={<ItemListContainer greeting={"Bienvenidos"}/>} /> */}
        <Route path={'/'} element={<TabsComponents/>}/>
        <Route path={'/products/:category'} element={<TabsComponents/>}/>
        <Route path={'/product'} element={<ListVestidosDetail item={2}/>} />
        <Route path={'/nosotros'} element={<Nosotros/>}/>
        <Route path={'/cart'} element={<p>cart</p>} />
      </Routes>

      <Box>
      <Footer />
      </Box>

    </ThemeProvider>
    </BrowserRouter>
  );
}


export default App;
