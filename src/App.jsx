import React from 'react';
import './App.css';

//Firebase
import firebaseConfig from './components/database/firestore.json'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

//Routing
import { BrowserRouter as RouterLink, Route, Routes, Navigate  } from 'react-router-dom';//Routing

//Libreria Material
import { Box, ThemeProvider } from '@mui/material'

//Libreria toastify
import 'react-toastify/dist/ReactToastify.css'

//Mis componentes
import CustomTheme from './components/Custom-Styles/themes'
import HomePage from './components/home/Home'
import NavBar from './components/navbar/navbar'
import Footer from './components/footer'
import Nosotros from './components/nosotros'
import Contacto from './components/contacto';
import ListContainerDetail from './components/containers/itemDetailContainer'
import ListContainerItem from './components/containers/itemListContainer'
import SliderSwiper from './components/slider-swiper'
import slides from './components/sdk/slides.json'
import AppContexProvider from './Providers/contex-provider/index'
import ModalSlide from './components/modals';
import BackOffice from './components/containers/back-office/index';
import DiscountsBar from './components/discounts-bar'

import AuthManager from './Providers/auth-manager'
import AuthProvider from './Providers/auth-provider';





// Your web app's Firebase configuration
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// Initialize Firebase

function ProtectedBackOffice() {//Para poder pasar la autehntificacion dentro del route
  return (
    <AuthProvider>
      <BackOffice />
    </AuthProvider>
  );
}

function App() {
  const [showFixedImage, setShowFixedImage] = React.useState(false)
  const [, setAutoplayEnabled] = React.useState(true);
 

  const handleShowFixedImage = (show) => {
    setShowFixedImage(show);
    setAutoplayEnabled(show); // Deshabilitar el autoplay cuando showFixedImage sea true
  };

  React.useEffect(() => {
    setAutoplayEnabled(true);
  }, []);

  return (
    <RouterLink>
      <AppContexProvider>
        <ThemeProvider theme={CustomTheme}>
          <AuthManager>
          <Box>
            <NavBar />
          </Box>

          <Box>
            <DiscountsBar/>
          </Box>
          

          <Box>
            <SliderSwiper slides={slides} showFixedImage={showFixedImage}/>
          </Box>

          <Routes>
            <Route path={'/home'} element={<HomePage/>}/> 
            {/* <Route path={'/'} element={<ListContainerItem/>}/> */}
            <Route path={'/products/:levels'} element={<ListContainerItem/>}/>
            <Route path={'/product/:id'} element={<ListContainerDetail/>} />
            <Route path={'/nosotros'} element={<Nosotros/>}/>
            <Route path={'/cart'} element={<ModalSlide/>} />
            <Route path={'/contacto'} element={<Contacto setShowFixedImage={handleShowFixedImage}/>}  />
            <Route path={'/admin'} element={<ProtectedBackOffice/>} />
            <Route path='/*' element={<Navigate to="/home" replace={true}/>}/> {/* vuelve al principal {home} si coloca cualquier cosa */}
          
          </Routes>

          <Box>
            <Footer />
          </Box>
          </AuthManager>
        </ThemeProvider>
       
      </AppContexProvider>
      
    </RouterLink>
  );
}


export default App;
