import React from 'react'
//Firestore BD
import { addDoc, collection, getDoc, getFirestore, doc, updateDoc } from 'firebase/firestore'

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
    const [orderCount, setOrderCount] = React.useState()//Comenzar el contador
    const [showUserData, setShowUserData] = React.useState(false)//Habilitar el componente UserData
    const MySwal = withReactContent(Swal)

    // Efecto para cargar el valor inicial del contador de órdenes
    React.useEffect(() => {
      const db = getFirestore()

      //Obtener el valor del contador de la base de datos y establecer el estado
      const getCounterValue = async () => {
        const counterDoc = await getDoc(doc(db, 'contador', 'orderCounter'))
        if(counterDoc.exists()){
          setOrderCount(counterDoc.data().counterDocId)
        }
      }
      getCounterValue();
    }, []);
    
    //Ordenes
    const createNewDispach = async (task) => {
      const db = getFirestore()
      const taskOrder = collection(db, 'taskOrder')

      try{

        // Obtener el valor actual del contador desde el estado
        const currentCounterValue = orderCount;

        // Crear un identificador personalizado en formato "orden 1001", "orden 1002".....
        const customOrderId = `orden${currentCounterValue}`;
    
        // Incrementar el conteo de ordenes para la próxima vez
        const newCounterValue = currentCounterValue + 1;
        setOrderCount(newCounterValue);
    
        // Actualizar el valor del contador en la base de datos
        await updateDoc(doc(db, 'contador', 'orderCounter'), { counterDocId: newCounterValue });

      //Agregar el identificador personalizado
        await addDoc(taskOrder, { ...task, customOrderId })//crea una coleccion en firestore llamada taskOrder y le pasa el objeto task que contiene los datos del cliente lo que lleva y la fecha que se crea
      .then(() =>{
        setDispatchId(customOrderId)
        setTrolley([])
        MySwal.fire(
          'Perfecto!',
          `Su orden #${customOrderId} fué procesada correctamente!`,
          'success'
        )
      })
    } catch (err) {
        console.log(err)
      }
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
  autoClose: 200,
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
  position: "bottom-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  })
}

    const notifyToastBD = (message) => {//un toast
  return toast.success( `'${message}'`, {
  position: "top-right",
  autoClose: 3000,
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
      
        const updatedTrolley =[...trolley]
        const newQuantity = updatedTrolley[productIndex].quantity + product.quantity

        if(newQuantity <= parseInt(product.stock)) {
          updatedTrolley[productIndex].quantity = newQuantity

          setTrolley(updatedTrolley)
          // setTrolley(updatedTrolley)//Se actualiza el estado del carrito utilizando setTrolley con la copia actualizada del carrito.
        }else {
          MySwal.fire({
            title: 'No hay suficiente stock disponible',
            icon: 'error',
            text: 'Lo sentimos, no podemos agregar este producto al carrito debido a la falta de stock.',
          });
        }
        
      } else {
        //El producto no esta en el carrito, agregarlo si cumple las condiciones de stock
        const existingTrolley = trolley.reduce((total, item) => {//Se utiliza la función reduce para calcular la cantidad total de productos con el mismo id en el carrito actual
          if(item.id === product.id) {
            return total + item.quantity
          }
          return total//ojo con este return si no lo agrego no funciona la comparacion me comienza a dar error de que el poducto no tiene stock teniendo stock
        }, 0)

        const totalQuantity = existingTrolley + product.quantity //Luego de calcular la cantidad total de productos con el mismo id en el carrito
        // se verifica que no exceda el stock disponible y el límite máximo

        if(totalQuantity <= parseInt(product.stock)){// se verifica si la cantidad total de un producto en el carrito, incluida la cantidad que se desea agregar, es menor o igual al stock disponible para ese producto (product.stock).
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
   <Provider value={{notifyToastContainer, notifyToast, notifyToastAdd, notifyToastBD, handlePrToTrolley, handleEmptyTrolley, trolley, quantityC: trolley.length, createNewDispach, lastDispach: dispatchId, showUserData, setShowUserData}}>{children}</Provider>
)}

export default AppContexProvider

/*1. createNewDispach: Esta función toma un objeto task que contiene la información de la orden, como los detalles del comprador, los ítems del carrito, la fecha de creación y el total de la compra.

2. const db = getFirestore(): Aquí se obtiene una instancia de Firestore para interactuar con la base de datos.

3. const taskOrder = collection(db, 'taskOrder'): Se crea una referencia a la colección llamada "taskOrder" en Firestore. En esta colección se almacenarán las órdenes.

4. addDoc(taskOrder, task): Se agrega un nuevo documento a la colección "taskOrder" con los datos del objeto task. Esto crea un nuevo registro en la base de datos que representa una orden.

5. .then((snapshot) => {...}): Si la adición del documento a la colección es exitosa, se ejecuta este bloque de código. snapshot es una instantánea del documento recién creado.

6. setDispatchId(snapshot.id): Aquí se establece el ID de la orden recién creada en el estado. Esto podría ser útil para realizar acciones adicionales en el componente que llama esta función.

7. setTrolley([]): Se limpia el carrito, eliminando todos los elementos después de que la orden se haya completado.

8. MySwal.fire(...): Este es un mensaje de notificación para el usuario, indicándole que la orden ha sido procesada correctamente. Está utilizando la librería SweetAlert para mostrar esta notificación.

9. const getDoc = doc(db, 'taskOrder', snapshot.id): Se obtiene una referencia al documento recién creado en la colección "taskOrder".

10. updateDoc(getDoc, {dispatchId: snapshot.id}): Aquí se actualiza el documento recién creado con un nuevo campo llamado dispatchId, que se establece con el mismo valor que el ID de la orden. Esto puede ser útil para realizar búsquedas o filtrar órdenes en el futuro.

11. .catch((err) => {...}): Si ocurre algún error durante el proceso de creación de la orden, se captura y se muestra en la consola. */