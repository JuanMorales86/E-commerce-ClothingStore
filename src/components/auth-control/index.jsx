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
  const {notifyToast} = React.useContext(AppContex)

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      notifyToast("Usuario no esta logeado");
      setIsControl(false);
    } else {
      if (!isControl) {
        setIsControl(true);
        notifyToast("Usuario esta logeado");
      }
    }
  });

  return <Box >{isControl ? children : <SignInContent onClose={onClose} />}</Box>;
}

export default AuthProvider;
