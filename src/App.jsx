import React from 'react';
import './App.css';
// import HomePage from './components/containers/Home/Home';

//Routing
import { BrowserRouter as RouterLink, Route, Routes, Navigate  } from 'react-router-dom';//Routing

//Librerias
import { Box, ThemeProvider } from '@mui/material'

//Mis componentes
import NavBar from './components/navBar/NavBar'
import Footer from './components/footer'
import TabsComponents from './components/Tabs/indexPrueba'
import CustomTheme from './components/Custom-Styles/themes'
import Nosotros from './components/containers/nosotros'
import ListContainerDetail from './components/containers/itemDetailContainer'
import ListContainerItem from './components/containers/itemListContainer'
import SliderSwiper from './components/slider-swiper'
import slides from './components/sdk/slides.json'


function App() {
  return (
    <RouterLink>
    <ThemeProvider theme={CustomTheme}>
      <Box>
      <NavBar />
      </Box>

      <Box>
        <SliderSwiper slides={slides}/>
      </Box>

      <Routes>
        {/* <Route path={'/'} element={<ItemListContainer greeting={"Bienvenidos"}/>} /> */}
        <Route path={'/'} element={<ListContainerItem/>}/>
        <Route path={'/products/:levels'} element={<ListContainerItem/>}/>
        <Route path={'/product/:selectedProductId'} element={<ListContainerDetail/>} />
        <Route path={'/nosotros'} element={<Nosotros/>}/>
        <Route path={'/cart'} element={<p>cart</p>} />
        <Route path='/*' element={<Navigate to="/" replace={true}/>}/> {/* vuelve al principal si colocan cualquier cosa */}
       
      </Routes>

      <Box>
      <Footer />
      </Box>

    </ThemeProvider>
    </RouterLink>
  );
}


export default App;
