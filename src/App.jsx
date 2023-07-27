import React from 'react';
import './App.css';
// import HomePage from './components/containers/Home/Home';

//Firebase
import firebaseConfig from './components/database/firestore.json'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

//Routing
import { BrowserRouter as RouterLink, Route, Routes, Navigate  } from 'react-router-dom';//Routing

//Librerias
import { Box, ThemeProvider } from '@mui/material'

//Libreria toastify
import 'react-toastify/dist/ReactToastify.css'

//Mis componentes
import NavBar from './components/navBar/NavBar'
import Footer from './components/footer'
import CustomTheme from './components/Custom-Styles/themes'
import Nosotros from './components/containers/nosotros'
import ListContainerDetail from './components/containers/itemDetailContainer'
import ListContainerItem from './components/containers/itemListContainer'
import SliderSwiper from './components/slider-swiper'
import slides from './components/sdk/slides.json'
import AppContexProvider, { AppContex } from './components/contex-provider/index'
import ModalSlide from './components/modals';
import BackOffice from './components/containers/back-office/index';
import AuthProvider from './components/auth-control';
import HomePage from './components/containers/home/Home';

// Your web app's Firebase configuration
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

console.log(firebaseConfig)
// Initialize Firebase

function ProtectedBackOffice() {//Para poder pasar la autehntificacion dentro del route
  return (
    <AuthProvider>
      <BackOffice />
    </AuthProvider>
  );
}

function App() {
  const {notifyToastContainer} = React.useState(AppContex)
  return (
    <RouterLink>
      <AppContexProvider>
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
            <Route path={'/home'} element={<HomePage/>}/>
            <Route path={'/products/:levels'} element={<ListContainerItem/>}/>
            <Route path={'/product/:id'} element={<ListContainerDetail/>} />
            <Route path={'/nosotros'} element={<Nosotros/>}/>
            <Route path={'/cart'} element={<ModalSlide/>} />
            <Route path={'/contacto'} element={<p>contacto</p>} />
            <Route path={'/admin'} element={<ProtectedBackOffice/>} />
            <Route path='/*' element={<Navigate to="/" replace={true}/>}/> {/* vuelve al principal si coloca cualquier cosa */}
          
          </Routes>

          <Box>
            <Footer />
          </Box>

        

        </ThemeProvider>
        {notifyToastContainer}
      </AppContexProvider>
    </RouterLink>
  );
}


export default App;
