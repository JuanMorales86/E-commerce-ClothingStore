import React from 'react'
//Libreria Toastify
import { ToastContainer, toast } from 'react-toastify';

//Libreria SweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//Padre de todo y 
export const AppContex = React.createContext()
const {Provider} = AppContex
// const {Provider: TrolleyProvider} = CustomContexProvider




const AppContexProvider = ({children}) => {
    const [trolley, setTrolley] = React.useState([])
    // console.log(trolley)
    
    //Para que funcione el sweetalert2 necesito un:
    const notifyToastContainer = () => {//un toastcontainer
      return <ToastContainer position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" />
    }

    const notifyToast = (message) => {//un toast
      return toast.success( `'${message}'`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })
    }

    


    const handlePrToTrolley = (product) => {
        setTrolley((prevTrolley) => [...prevTrolley, product])
    }

    const notifyClose = () => notifyToast('💨 Carrito Vaciado');
    const handleEmptyTrolley = () => {
      setTrolley([])
      notifyClose()
    }
    
  return (
   <Provider value={{notifyToastContainer, notifyToast, handlePrToTrolley, handleEmptyTrolley, trolley, quantityC: trolley.length}}>{children}</Provider>
)}

export default AppContexProvider

// value={{trolley, handlePrToTrolley, cartQuantity: trolley.length}}: cuando se define de esta forma un objeto, cuando no se coloca la clave: valor  > la clave va a hacer igual al nombre de la variable, es igual que dejar carrito: carrito que dejarlo solo carrito


    //const [trolley, setTrolley] = React.useState([])//!carrito va  manejar un array de objetos //Estados Globales
 
    // const user = 'juan'
    // const age = 27

    //setTrolley((prevTrolley) => [...prevTrolley, product]) //!recibe un producto nuevo gracias a la prop product, setTrolley va  actualizar trolley con un nuevo producto y le voy a pasar lo que tenia carrito mas el nuevo product ademas agrege prevTrolley para verificar si hay o no un nuevo objeto para agregar correctamente indistintamente si habia algo o no