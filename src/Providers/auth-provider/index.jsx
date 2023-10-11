import React from "react";

//Libreria firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../App";

//Librerua material
import { Box } from "@mui/material";

//Mis Componentes
import { AppContex } from "../contex-provider";




function AuthProvider({ children, onClose }) {
  const [, setIsControl] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isNotificationShow, setIsNotificationShow] = React.useState(false)
  const { notifyToast } = React.useContext(AppContex);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsAuthenticated(false);
        setIsControl(false);
        if (isNotificationShow) {
          notifyToast("No estás logeado");
          setIsNotificationShow(false);
          localStorage.removeItem('isNotificationShow');
        }
      } else {
        setIsAuthenticated(true);
        setIsControl(true);
        if (!isNotificationShow) {
          notifyToast("Estás logeado");
          setIsNotificationShow(true);
          localStorage.setItem('isNotificationShow', 'true');//para setear la notificacion en el local storage en true
        }
      }
    });

    return () => unsubscribe();
  }, [notifyToast, isNotificationShow]);

  React.useEffect(() => {
    const storedNotificationShow  = localStorage.getItem('isNotificationShow');
    if (storedNotificationShow ) {
      setIsNotificationShow(true);
    }
  }, []);
  // console.log(typeof handleAuthentication)
  // console.log(isControl)
  // console.log(isAuthenticated)
  
  return (
    <Box>
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { isAuthenticated });
      }
      return child;
    })}
  </Box>
  );
}

export default AuthProvider;
//* <Box>{isControl ? children : <SignInContent onClose={onClose} />}</Box> */
//* <Box>{isAuthenticated ? children : <SignInContent onClose={onClose} onAuthentication={handleAuthentication} />}</Box> ultimo que me sirve

//otro enfoque     
// {isControl ? children : null
// //*Solo muestra children si el usuario está autenticado/
// } 

// {isControl ? null : <SignInContent onClose={onClose} />
// //* Muestra SignInContent si el usuario no está autenticado */} 
// }


//Sirve pero con detalles en el en el mensage y el boton
// {isControl ? (
//   <>
//     <Typography>¡Ya estás autenticado!</Typography>
//     <Button variant="contained" onClick={navegar}>Ir a Admin</Button>
//     {children}
//   </>
// ) : (
//   <>
    
//     <SignInContent onClose={onClose} />
//   </>
// )}

//Otro enfoque
// <>
// <AuthMessage/>

// </>
// ) : (
// <>

// <SignInContent onClose={onClose} />
// </>
// )}
// {isControl &&  children}