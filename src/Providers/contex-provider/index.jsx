import React from "react";
//Firestore BD
import {
  addDoc,
  collection,
  getDoc,
  getFirestore,
  doc,
  updateDoc,
  getDocs,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";

//Libreria Toastify
import { ToastContainer, toast } from "react-toastify";

//Libreria SweetAlert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//Api(prueba apiRest polling)
import { getOrders } from "../Api/api";


//Padre de todo y
export const AppContex = React.createContext();
const { Provider } = AppContex;//alias
// const {Provider: TrolleyProvider} = CustomContexProvider// ejemplo con alias

const AppContexProvider = ({ children }) => {
  const [trolley, setTrolley] = React.useState([]); //Estado para el carrito
  const [orders, setOrders] = React.useState([]); // Estado para almacenar las órdenes
  const [orders2, setOrders2] = React.useState([]); // Pruebas apiRest,Polling
  const [dispatchId, setDispatchId] = React.useState(""); //para el historial de la compra
  const [orderCount, setOrderCount] = React.useState(); //Comenzar el contador
  const [showUserData, setShowUserData] = React.useState(false); //Habilitar el componente UserData
  const [orderStatuses, setOrderStatuses] = React.useState({}); // Estados para las ordenes enviadas listas y en proceso
  const [filteredOrders, setFilteredOrders] = React.useState([]); // Estado para los resultados de la búsqueda
  const [solditems, setSoldItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [ismodalOpen, setIsModalOpen] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isOrderPage, setIsOrderPage] = React.useState(false);
  const [color, setColor] = React.useState([])//Estado para setear colores (OrderList)
  // const [forceUpdate, setForceUpdate] = React.useState(false)
  const MySwal = withReactContent(Swal);

  //Productos mas vendidos
  React.useEffect(() => {
    const selledProducts = async () => {
      const db = getFirestore();
      const productSelledRef = collection(db, "productos");
      const soldProductsQuery = query(
        productSelledRef,
        where("soldquantity", ">", 0) //! Cambia el valor: 0, a la cantidad deseada
      );

      try {
        const queryPromise = await getDocs(soldProductsQuery);
        const soldProducts = queryPromise.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }); //devuelvo especificamaente el id que lo necesito y el resto de los campos
        // Realiza alguna acción con los productos obtenidos
        setSoldItems(soldProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error obteniendo productos vendidos:", error);
        setLoading(false);
      }
    };

    selledProducts(); // Llama a la función asíncrona inmediatamente
  }, []); // El segundo argumento del useEffect indica que solo debe ejecutarse una vez al montarse el componente
  // Efecto para cargar el valor inicial del contador de órdenes

  React.useEffect(() => {
    const db = getFirestore();

    //Obtener el valor del contador de la base de datos y establecer el estado
    const getCounterValue = async () => {
      const counterDoc = await getDoc(doc(db, "contador", "orderCounter"));
      if (counterDoc.exists()) {
        setOrderCount(counterDoc.data().counterDocId);
      }
    };
    getCounterValue();
  }, []);

  React.useEffect(() => {//Effecto para agregar un color pastel y setearlo en el estado
    const newColor = getRandomPasteColor()
    setColor(newColor)
  },[])

  // const forceComponentUpdate = () => {
  //   setForceUpdate((prev) => !prev)
  // }

  // React.useEffect(() => {
  //   loadOrders()
  // }, [forceUpdate])

  //Crear Ordenes

  const getRandomPasteColor = () => {//Funcion para calcular un color pastel
    const hue = Math.floor(Math.random() * 600)
    return `hsl(${hue}, 80%, 90%)`
  }

  const handleAdminChanger = (show) => {
    //funcion que cambia en el slider imagen en admin
    setIsAdmin(show);
  };

  const handleOrderPageChanger = (show) => {
    //funcion que cambia en el slider imagen en el Orderlist
    setIsOrderPage(show);
  };

  const createNewDispach = async (task) => {
    const db = getFirestore();
    const taskOrder = collection(db, "taskOrder");

    try {
      // Obtener el valor actual del contador desde el estado
      const currentCounterValue = orderCount;

      // Crear un identificador personalizado en formato "orden 1001", "orden 1002".....
      const customOrderId = `orden${currentCounterValue}`;

      // Incrementar el conteo de ordenes para la próxima vez
      const newCounterValue = currentCounterValue + 1;
      setOrderCount(newCounterValue);

      // Actualizar el valor del contador en la base de datos
      await updateDoc(doc(db, "contador", "orderCounter"), {
        counterDocId: newCounterValue,
      });

      //Agregar el identificador personalizado
      await addDoc(taskOrder, { ...task, customOrderId }) //crea una coleccion en firestore llamada taskOrder y le pasa el objeto task que contiene los datos del cliente lo que lleva y la fecha que se crea
        .then(() => {
          setDispatchId(customOrderId);
          setTrolley([]);
          setOrders((prevOrders) => [
            ...prevOrders,
            { ...task, customOrderId },
          ]); // Actualizar el estado de orders después de crear una nueva orden
          MySwal.fire(
            "Perfecto!",
            `Su orden #${customOrderId} fué procesada correctamente!`,
            "success"
          );
        });
    } catch (err) {
      console.log(err);
    }
  };
  //Status en la Ordenes
  const updateOrderStatusInDatabase = async (orderId, newStatus) => {
    const db = getFirestore();
    const ordersCollection = collection(db, "taskOrder");
    const querySnapshot = await getDocs(
      query(ordersCollection, where("customOrderId", "==", orderId))
    );
    try {
      querySnapshot.forEach(async (queryDoc) => {
        const docId = queryDoc.id;
        const orderRef = doc(ordersCollection, docId);
        // Actualizar el campo 'status' en la base de datos con el nuevo estado
        await updateDoc(orderRef, { status: newStatus });
      });
      notifyToast(`El estado se actualizo ${orderId}`);

      // Actualiza el estado en el contexto con la nueva información
      setOrderStatuses((prevOrderStatuses) => ({
        ...prevOrderStatuses,
        [orderId]: newStatus,
      }));
    } catch (error) {
      notifyToast(`Error al actualizar el estado ${error}`);
      console.error(
        "Error al actualizar el estado en la base de datos:",
        error
      );
    }
  };
  //Uso del estado de cambio de ordenes
  const markOrderStatus = (orderId, newStatus) => {
    const updatedOrderStatuses = { ...orderStatuses }; // Copia del objeto de estados de órdenes
    updatedOrderStatuses[orderId] = newStatus; // Actualiza el estado de la orden específica

    // Actualiza el estado de los estados de órdenes
    setOrderStatuses(updatedOrderStatuses);

    // Llama a la función para actualizar el estado en la base de datos
    updateOrderStatusInDatabase(orderId, newStatus);

    notifyToast(`La orden ${orderId} ha sido marcada como "${newStatus}".`);
  };

  //Leer Ordenes ya creadas
  // Función para cargar las órdenes desde la base de datos
  // const loadOrders = async () => {
  //   try{
  //     const db = getFirestore()
  //     const ordersCollection = collection(db, 'taskOrder')
  //     const querySnapshot = await getDocs(ordersCollection)
  //     const ordersData = querySnapshot.docs.map((doc) => doc.data())
  //     setOrders(ordersData)

  //     const initialOrderStatuses = {}
  //     ordersData.forEach((order) => {
  //       initialOrderStatuses[order.customOrderId] = order.status
  //     })
  //     setOrderStatuses(initialOrderStatuses)
  //   } catch(error) {
  //     console.error('Error al cargar las ordenes:', error)
  //   }
  // }

  //!Pruebas integracion apirest polling (encapsulando la comunicacion con base de datos)
  React.useEffect(() => {
    const loadersOrder = async () => {
      const ordersSnapshot = await getOrders();
      //console.log("order laoded", ordersSnapshot);
      setOrders2(ordersSnapshot);
    };

    loadersOrder();
  }, []);
  //!Pruebas integracion apirest polling (encapsulando la comunicacion con base de datos)

  // React.useEffect(() => {
  //   console.log("15s", orders2);
  // }, [orders2]);

  const loadOrders = () => {
    try {
      const db = getFirestore();
      const ordersCollection = collection(db, "taskOrder");

      // Establece un oyente en tiempo real para la colección de órdenes
      const unsubscribe = onSnapshot(ordersCollection, (querySnapshot) => {
        const ordersData = querySnapshot.docs.map((doc) => doc.data());
        setOrders(ordersData);

        const initialOrderStatuses = {};
        ordersData.forEach((order) => {
          initialOrderStatuses[order.customOrderId] = order.status;
        });
        setOrderStatuses(initialOrderStatuses);
      });

      // Retorna una función para desvincular el oyente cuando sea necesario
      return unsubscribe;
    } catch (error) {
      console.log("Error al cargar las órdenes:", error);
    }
  };

  // React.useEffect(() => {
  //   loadOrders()// Cargar las órdenes al iniciar el contexto
  // }, [])

  React.useEffect(() => {
    // Al montar el componente, establece el oyente en tiempo real para cargar las órdenes
    const unsubscribe = loadOrders();

    // Al desmontar el componente, desvincula el oyente llamando a la función de desvinculación
    return () => {
      unsubscribe();
    };
  }, []);

  //Funcion para buscar ordenes en funcion del criterio de busqueda
  const searchOrders = (searchText) => {
    // Convertimos el texto de búsqueda a minúsculas
    const filteredOrders = orders.filter((order) => {
      // Verifica si alguno de los valores del objeto orderStatuses incluye el texto de búsqueda
      // Verifica si la propiedad "size" es una cadena y si incluye el texto de búsqueda
      const hasSize =
        typeof order.size === "string" && order.size.includes(searchText);
      // Verifica si la propiedad "color" es una cadena y si incluye el texto de búsqueda
      const hasColor =
        typeof order.color === "string" && order.color.includes(searchText);

      //Logica basa en criterios
      return (
        order.customOrderId.includes(searchText) || // Busca por numero de orden
        order.buyer.name.toLowerCase().includes(searchText.toLowerCase()) || // Buscar por nombre del cliente (insensible a mayúsculas/minúsculas)
        order.buyer.lastname.toLowerCase().includes(searchText.toLowerCase()) || // Buscar por apellido del cliente (insensible a mayúsculas/minúsculas)
        order.buyer.telephone.includes(searchText) || // Buscar por telefono del cliente
        order.buyer.email.toLowerCase().includes(searchText.toLowerCase()) || // Buscar por email del cliente
        order.createAt.includes(searchText) ||
        order.status.toLowerCase().includes(searchText.toLowerCase()) || // Buscar por status de órdenes
        hasSize || // Buscar por talle de órdenes
        hasColor // Buscar por color de ordenes
        // order.items.discountSelected.includes(searchText) // Buscar por descuento hecho(no funciona)
      );
    });

    setFilteredOrders(filteredOrders);
  };

  //Para que funcione el sweetalert2 necesito un:
  const notifyToastContainer = () => {
    //un toastcontainer
    return (
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        limit={1}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    );
  };

  const notifyToast = (message) => {
    //un toast
    return toast.success(`'${message}'`, {
      position: "top-right",
      autoClose: 200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const notifyToastAdd = (message) => {
    //un toast
    return toast.success(`'${message}'`, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyToastBD = (message) => {
    //un toast
    return toast.success(`'${message}'`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyToastError = (message) => {
    //un toast
    return toast.error(`'${message}'`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      
    });
  };



  //Manejador del carrito
  const handlePrToTrolley = (product) => {
    // Verificar si ya esta el producto en el carrito
    const productIndex = trolley.findIndex((item) => item.id === product.id);

    if (productIndex !== -1) {
      //El producto ya esta en el carrito, actualiza la cantidad

      const updatedTrolley = [...trolley];
      const newQuantity =
        updatedTrolley[productIndex].quantity + product.quantity;

      if (newQuantity <= parseInt(product.stock)) {
        updatedTrolley[productIndex].quantity = newQuantity;

        setTrolley(updatedTrolley);
        // setTrolley(updatedTrolley)//Se actualiza el estado del carrito utilizando setTrolley con la copia actualizada del carrito.
      } else {
        MySwal.fire({
          title: "No hay suficiente stock disponible",
          icon: "error",
          text: "Lo sentimos, no podemos agregar este producto al carrito debido a la falta de stock.",
        });
      }
    } else {
      //El producto no esta en el carrito, agregarlo si cumple las condiciones de stock
      const existingTrolley = trolley.reduce((total, item) => {
        //Se utiliza la función reduce para calcular la cantidad total de productos con el mismo id en el carrito actual
        if (item.id === product.id) {
          return total + item.quantity;
        }
        return total; //ojo con este return si no lo agrego no funciona la comparacion me comienza a dar error de que el poducto no tiene stock teniendo stock
      }, 0);

      const totalQuantity = existingTrolley + product.quantity; //Luego de calcular la cantidad total de productos con el mismo id en el carrito
      // se verifica que no exceda el stock disponible y el límite máximo

      if (totalQuantity <= parseInt(product.stock)) {
        // se verifica si la cantidad total de un producto en el carrito, incluida la cantidad que se desea agregar, es menor o igual al stock disponible para ese producto (product.stock).
        // Restar la cantidad agregada al carrito del stock original
        setTrolley((prevTrolley) => [...prevTrolley, product]);
      } else {
        MySwal.fire({
          title: "No hay suficiente stock disponible",
          icon: "error",
          text: "Lo sentimos, no podemos agregar este producto al carrito debido a la falta de stock.",
        });
      }
    }
  };

  const notifyClose = () => notifyToast("💨 Carrito Vaciado");
  const handleEmptyTrolley = () => {
    setTrolley([]);
    setShowUserData(false);
    notifyClose();
  };

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <Provider
      value={{
        notifyToastContainer,
        notifyToast,
        notifyToastAdd,
        notifyToastBD,
        notifyToastError,
        handlePrToTrolley,
        handleEmptyTrolley,
        trolley,
        quantityC: trolley.length,
        createNewDispach,
        lastDispach: dispatchId,
        showUserData,
        setShowUserData,
        orders,
        markOrderStatus,
        orderStatuses,
        filteredOrders,
        searchOrders,
        loadOrders,
        solditems,
        loading,
        setLoading,
        ismodalOpen,
        toggleModal,
        handleAdminChanger,
        setIsAdmin,
        isAdmin,
        handleOrderPageChanger,
        setIsOrderPage,
        isOrderPage,
        orders2,
        color,
      }}
    >
      {children}
    </Provider>
  );
};

export default AppContexProvider;

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
