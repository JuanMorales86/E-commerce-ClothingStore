import React from "react";
import "./App.css";

//Firebase
import firebaseConfig from "./components/database/firebaseconfig";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//Routing
import {
  BrowserRouter as RouterLink,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom"; //Routing

//Libreria Material
import { Box, Portal, ThemeProvider } from "@mui/material";

//Libreria toastify
import "react-toastify/dist/ReactToastify.css";

//Mis componentes
import CustomTheme from "./components/Custom-Styles/themes";
import HomePage from "./components/home/Home";
import NavBar from "./components/navbar/navbar";
import Footer from "./components/footer";
import Nosotros from "./components/nosotros";
import Contacto from "./components/contacto";
import ListContainerDetail from "./components/containers/itemDetailContainer";
import ListContainerItem from "./components/containers/itemListContainer";
import SliderSwiper from "./components/slider-swiper/sliderBannersPrincipal";
import slides from "./components/sdk/slides.json";
import ModalSlide from "./components/modals";
import BackOffice from "./components/containers/back-office/index";
import DiscountsBar from "./components/discounts-bar";

import AuthManager from "./Providers/auth-manager";
import AuthProvider from "./Providers/auth-provider";
import { AuthContext } from "./Providers/auth-manager";
import OrderList from "./components/check-dispach-list";
import { dark, neobrutalism } from "@clerk/themes"; //libreria Clerk Themes
import { ClerkProvider } from "@clerk/clerk-react"; //libreria Clerk Auth
import WhatsAppComponent from "./components/utilities/whatsappchat";
import { AppContex } from "./Providers/contex-provider";

// Your web app's Firebase configuration
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Initialize Firebase

//Clerk Auth
const clerkey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
if (!clerkey) {
  //comprobar si esta la apikey
  throw new Error("Llave publicable no encontrada");
}
//Clerk Auth

//SPA
function App() {
  const [showFixedImage, setShowFixedImage] = React.useState(false);
  const [showComponent, setShowComponent] = React.useState(false);
  const [, setAutoplayEnabled] = React.useState(true);
  const { isAdmin, isOrderPage } = React.useContext(AppContex); //tuve que subir appcontexprovider un nivel mas en index.js para poder desestructurar aqui onContexClose por que me daba error de undefined cuando lo pasaba en el momento que appcontexprovider estaba aqui en app.jsx

  const handleShowFixedImage = (show) => {
    setShowFixedImage(show);
    setAutoplayEnabled(show); // Deshabilitar el autoplay cuando showFixedImage sea true
  };

  React.useEffect(() => {
    setAutoplayEnabled(true);
  }, []);

  return (
    <RouterLink>
      {/* <AppContexProvider> */}
      <ThemeProvider theme={CustomTheme}>
        <ClerkProvider
          appearance={{ dark, signIn: { baseTheme: neobrutalism } }}
          publishableKey={clerkey}
        >
          <AuthProvider>
            <AuthManager>
              <Box>
                <NavBar />
              </Box>

              <Box>
                <DiscountsBar />
              </Box>

              <Box>
                <SliderSwiper
                  slides={slides}
                  showFixedImage={showFixedImage}
                  isAdmin={isAdmin}
                  isOrderPage={isOrderPage}
                />
              </Box>

              <Routes>
                <Route
                  path={"/home"}
                  element={<HomePage setShowComponent={setShowComponent} />}
                ></Route>
                <Route
                  path={"/products/:levels"}
                  element={
                    <ListContainerItem setShowComponent={setShowComponent} />
                  }
                />
                <Route
                  path={"/product/:id"}
                  element={
                    <ListContainerDetail setShowComponent={setShowComponent} />
                  }
                />
                <Route
                  path={"/nosotros"}
                  element={<Nosotros setShowComponent={setShowComponent} />}
                />
                <Route path={"/cart"} element={<ModalSlide />} />
                <Route
                  path={"/contacto"}
                  element={
                    <Contacto
                      setShowFixedImage={handleShowFixedImage}
                      setShowComponent={setShowComponent}
                    />
                  }
                />
                <Route path={"/admin"} element={<ProtectedBackOffice />} />
                <Route
                  path={"/ordenes"}
                  element={
                    <ProtectedOrderList
                      setShowFixedImage={handleShowFixedImage}
                    />
                  }
                />

                <Route
                  path="/*"
                  element={<Navigate to="/home" replace={true} />}
                />
                {/* vuelve al principal {home} si coloca cualquier cosa */}
              </Routes>

              <Box>
                {showComponent && (
                  <Portal>
                    <WhatsAppComponent />
                  </Portal>
                )}
              </Box>

              <Box>
                <Footer />
              </Box>
            </AuthManager>
          </AuthProvider>
        </ClerkProvider>
      </ThemeProvider>

      {/* </AppContexProvider> */}
    </RouterLink>
  );
}

function ProtectedBackOffice() {
  //Para poder pasar la autehntificacion dentro del route
  const { user } = React.useContext(AuthContext); // Accede al contexto de autenticación
  const navigate = useNavigate();

  // Verifica si el usuario está autenticado
  React.useEffect(() => {
    // Verifica si el usuario está autenticado
    if (!user) {
      navigate("/home", { replace: true }); // Usa navigate para redirigir al usuario
    }
  }, [user, navigate]);

  // Verifica si el usuario está autenticado
  if (!user) {
    return null; // No necesitas renderizar nada aquí
  }

  return (
    //Renderiza el componente si el usuario está autenticado
    <BackOffice />
  );
}

function ProtectedOrderList() {
  //Para poder pasar la autehntificacion dentro del route
  const { user } = React.useContext(AuthContext); // Accede al contexto de autenticación
  const navigate = useNavigate();
  // Verifica si el usuario está autenticado
  React.useEffect(() => {
    if (!user) {
      navigate("/home", { replace: true }); // Usa navigate para redirigir al usuario
    }
  }, [user, navigate]);

  if (!user) {
    return null; // No necesitas renderizar nada aquí
  }

  return (
    //Renderiza el componente si el usuario está autenticado
    <OrderList />
  );
}

export default App;
