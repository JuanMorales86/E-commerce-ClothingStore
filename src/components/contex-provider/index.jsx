import React from 'react'
//Firestore BD
import { addDoc, collection, doc, getFirestore, updateDoc } from 'firebase/firestore'

//Libreria Toastify
import { ToastContainer, toast } from 'react-toastify';

//Libreria SweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//Padre de todo y 
export const AppContex = React.createContext()
const {Provider} = AppContex
// const {Provider: TrolleyProvider} = CustomContexProvider// ejemplo con alias



const AppContexProvider = ({children}) => {
    const [trolley, setTrolley] = React.useState([])
    const [dispatchId, setDispatchId] = React.useState('')//para el historial de la compra
    const [showUserData, setShowUserData] = React.useState(false)//Habilitar el componente UserData
    const MySwal = withReactContent(Swal)
    
    //Ordenes
    const createNewDispach = (task) => {
      const db = getFirestore()
      const taskOrder = collection(db, 'taskOrder')

      addDoc(taskOrder, task)
      .then((snapshot) =>{
        setDispatchId(snapshot.id)
        setTrolley([])
        MySwal.fire(
          'Perfecto!',
          `Su orden #${snapshot.id} fué procesada correctamente!`,
          'success'
        )

        const getDoc = doc(db, 'taskOrder', snapshot.id)

        updateDoc(getDoc, {dispatchId: snapshot.id})
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    
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
      autoClose: 400,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })
    }

    const notifyToastAdd = (message) => {//un toast
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

    
    //Manejador del carrito
    const handlePrToTrolley = (product) => {
      // Verificar si ya esta el producto en el carrito
      const productIndex = trolley.findIndex(item => item.id === product.id)

      if(productIndex !== -1){
        //El producto ya esta en el carrito, actuliza la cantidad
        const updatedTrolley = [...trolley]//Se crea una copia actualizada del carrito utilizando el operador spread ([...trolley]) para evitar modificar directamente el estado original del carrito.
        
        updatedTrolley[productIndex] = {//Se accede a la entrada del producto en la copia actualizada del carrito utilizando el productIndex. Luego, se actualiza la propiedad quantity de ese producto sumándole la cantidad del nuevo producto que se desea agregar (product.quantity).
          ...updatedTrolley[productIndex],
          quantity: updatedTrolley[productIndex].quantity + product.quantity
        };
        
        setTrolley(updatedTrolley)//Se actualiza el estado del carrito utilizando setTrolley con la copia actualizada del carrito.
      } else {
        //El producto no esta en el carrito, agregarlo si cumple las condiciones de stock
        const existingTrolley = trolley.reduce((total, item) => {//Se utiliza la función reduce para calcular la cantidad total de productos con el mismo id en el carrito actual. Comienza con un valor inicial de 0 y, para cada elemento del carrito, se verifica si el id coincide con el del producto que se desea agregar. Si es así, se suma la cantidad del producto actual al total acumulado.
          if(item.id === product.id) {
            return total + item.quantity
          }
        }, 0)

        const totalQuantity = existingTrolley + product.quantity //Luego de calcular la cantidad total de productos con el mismo id en el carrito
        // se verifica que no exceda el stock disponible y el límite máximo

        console.log('totalQuantity:', totalQuantity);
        console.log('product.stock:', product.stock);

        if(totalQuantity <= product.stock){// se verifica si la cantidad total de un producto en el carrito, incluida la cantidad que se desea agregar, es menor o igual al stock disponible para ese producto (product.stock).
        // Restar la cantidad agregada al carrito del stock original
        setTrolley((prevTrolley) => [...prevTrolley, product])
        
        }else{
          MySwal.fire({
            title: 'No hay suficiente stock disponible',
            icon: 'error',
            text: 'Lo sentimos, no podemos agregar este producto al carrito debido a la falta de stock.',
          });
        }
      }

      
    }

    const notifyClose = () => notifyToast('💨 Carrito Vaciado');
    const handleEmptyTrolley = () => {
      setTrolley([])
      setShowUserData(false)
      notifyClose()
    }
    
  return (
   <Provider value={{notifyToastContainer, notifyToast, notifyToastAdd, handlePrToTrolley, handleEmptyTrolley, trolley, quantityC: trolley.length, createNewDispach, lastDispach: dispatchId, showUserData, setShowUserData}}>{children}</Provider>
)}

export default AppContexProvider

// value={{trolley, handlePrToTrolley, cartQuantity: trolley.length}}: cuando se define de esta forma un objeto, cuando no se coloca la clave: valor  > la clave va a hacer igual al nombre de la variable, es igual que dejar carrito: carrito que dejarlo solo carrito


    //const [trolley, setTrolley] = React.useState([])//!carrito va  manejar un array de objetos //Estados Globales
 
    // const user = 'juan'
    // const age = 27

    //setTrolley((prevTrolley) => [...prevTrolley, product]) //!recibe un producto nuevo gracias a la prop product, setTrolley va  actualizar trolley con un nuevo producto y le voy a pasar lo que tenia carrito mas el nuevo product ademas agrege prevTrolley para verificar si hay o no un nuevo objeto para agregar correctamente indistintamente si habia algo o no