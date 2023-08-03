import React from "react";

//Libreria firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../App";

//Librerua material
import { Box } from "@mui/material";

//Mis Componentes
import SignInContent from "../containers/sign-in-auth";
import { AppContex } from "../contex-provider";

function AuthProvider({ children, onClose }) {
  const [isControl, setIsControl] = React.useState(false);
  const { notifyToast } = React.useContext(AppContex);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsControl(false);
        notifyToast("No estas logeado");
        
      } else {
        if (!isControl) {
          setIsControl(true);
          notifyToast("Estas logeado");
        }
      }
    });

    return () => unsubscribe();
  }, [isControl, notifyToast]);

  return (
    <Box>{isControl ? children : <SignInContent onClose={onClose} />}</Box>
  );
}

export default AuthProvider;
