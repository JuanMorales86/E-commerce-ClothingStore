import React from "react";

//Libreria firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../App";

//Librerua material
import { Box } from "@mui/material";

//Mis Componentes
import { AppContex } from "../contex-provider";




function AuthProvider({ children, onClose }) {
  const [isControl, setIsControl] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const { notifyToast } = React.useContext(AppContex);

  const handleAuthentication = React.useCallback((value) => {
    setIsAuthenticated(value);
    notifyToast(value ? "Estás logeado" : "No estás logeado");
  }, [notifyToast]);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // setIsControl(false);
        handleAuthentication(false);
        setIsControl(false);
      } else {
        // setIsControl(true);
        handleAuthentication(true);
        setIsControl(true);
      }
    });

    return () => unsubscribe();
  }, [handleAuthentication, notifyToast]);
  console.log(typeof handleAuthentication)
  console.log(isControl)
  console.log(onClose)
  return (
    <Box>
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { isAuthenticated, handleAuthentication, onClose });
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