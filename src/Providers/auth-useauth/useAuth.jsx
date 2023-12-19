import React from "react";
import { auth } from "../../App";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { AppContex } from "../contex-provider";

//Maneja la lógica que interactúa con Firebase auth a un hook personalizado useAuth.
function UseAuth() {
    const [user, setUser] = React.useState(null); //inicialmente se establece en null
    const {notifyToast} = React.useContext(AppContex)
    const navigate = useNavigate()
    
 
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => { // suscribirse a cambios en auth de firebase
      setUser(user);//Actualizar el usuario
    });

    return () => unsubscribe();
  }, []);

  const logOut = () => {
    signOut(auth)
    .then(() => {
        notifyToast('Usuario cerro sesion')
        navigate('/home')
    }).catch((error) => {
        console.log("Error al cerrar sesion", error)
    })
}

  return { user, logOut };
}

export default UseAuth;
