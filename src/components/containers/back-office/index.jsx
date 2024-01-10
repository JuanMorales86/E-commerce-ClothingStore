import React from "react";
import { useForm } from "react-hook-form";//HookForm
import { v4 as uuidv4 } from "uuid";//Generador de id aleatorio
//BD Firestore
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";
//Libreria Material
import { Box, Typography, CircularProgress } from "@mui/material";
//Mis Componentes
import CardBackStage from "../item-backstage";
import { AppContex } from "../../../Providers/contex-provider";
import { formattedDate } from "../../utilities/helpers";



function BackOffice() {
  const [productBD, setProductBD] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [updateComponent, setUpdateComponent] = React.useState(false);
  const {reset} = useForm()
  const { notifyToastBD, notifyToastContainer, handleAdminChanger } = React.useContext(AppContex)
  // const currentDate = new Date().toDateString('es-AR')
  // const currentDate = new Date()
  // const day = currentDate.getDate();// Obtiene el día del mes (1-31)
  // const month = currentDate.getMonth() +1;// Obtiene el mes (0-11) y se suma 1 para ajustar
  // const year = currentDate.getFullYear();// Obtiene el año de cuatro dígitos
  
  // Formatea la fecha como "d/m/yyyy"
  // const formattedDate = `${day}/${month}/${year}`

  React.useEffect(() => {
    handleAdminChanger(true)
    return () => handleAdminChanger(false)
  },[handleAdminChanger])



  const currentDate = new Date();
  const formattedDateValue = formattedDate(currentDate);// Formatea la fecha como "dd/mm/yyyy"

  const [, setFormData] = React.useState({
    thumbnail: "",
    title: "",
    price: 0,
    stock: 0,
    addressShipping: "",
    addressPlace: "",
    brand: "",
    color: "",
    condition: "",
    categoryType: "",
    customId: "",
    description: "",
    specialproduct:"",
    discountSelected:"",
    size:"",
  });

  const resetForm = () => {
    setFormData({
      thumbnail: "",
      title: "",
      price: 0,
      stock: 0,
      addressShipping: "",
      addressPlace: "",
      brand: "",
      color: "",
      condition: "",
      categoryType: "",
      customId: "",
      description: "",
      specialproduct:"",
      discountSelected:"",
      size:"",
    });
  };
  

  React.useEffect(() => {//Obtener la data y actualizar
    const db = getFirestore();
    const products = collection(db, "productos"); //tabla
    getDocs(products) //tabla
      .then((snapshot) => {
        const items = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setProductBD(items);
        setUpdateComponent(false);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        notifyToastBD(`🎉 Documentos cargados`);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateComponent, notifyToastBD]);

//Modificar el producto
  const handleItemModify = async (item, id) => {//Modificar Productos
    const db = getFirestore();
    const product = collection(db, "productos");
    const customId = item.customid //El  customId que se quiere crear

   // Realiza una consulta para buscar productos con el mismo customId
    const q = query(product, where("customid", "==", customId))

    const querySnapshot = await getDocs(q)

    // Filtra los productos para excluir el producto actual (con el mismo id)
    const filteredProducts = querySnapshot.docs.filter((doc) => doc.id !== id)

    if(filteredProducts.length > 0) {
      //Si ya existe un producto con el mismo customid, muestra un mensaje de error
      notifyToastBD('⚠️ El IdPersonalizable del producto a crear ya existe')
      return
    }

    // Continúa con la actualización del producto
    const paper = doc(db, "productos", id);
    updateDoc(paper, item)
      .then(() => {
        notifyToastBD("💨 Producto Modificado Correctamente");
        setUpdateComponent(true);
      })
      .catch((error) => {
        console.error("Error al modificar el producto:", error);
      });
  };

//Crear el producto
  const handleItemCreate = async (item) => {//Crear Productos
    const db = getFirestore();
    const product = collection(db, "productos"); 
    const customId = item.customid //El  customId que se quiere crear

    //Verificar si ya existe un producto con el mismo customId
    const q = query(product, where("customid", "==", customId))
    const querySnapshot = await getDocs(q)

    if(querySnapshot.size > 0) {
      //Si ya existe un producto con el mismo customid, muestra un mensaje de error
      notifyToastBD('⚠️ El CustomID del producto a crear ya existe')
      return
    }

    //Si no existe un producto con el mimso customid, procede a creal el nuevo producto
    const idAleatorio = uuidv4();// Generar una clave única usando uuidv4()
    const newProduct = {
      ...item,
      idAleatorio,
      createAt: formattedDateValue,
    }
    addDoc(product, newProduct)
      .then(() => {
        notifyToastBD("🎉 Nuevo Producto Creado");
        setUpdateComponent(true);
        reset()
      })
      .catch((error) => {
        console.error("Error al crear el producto:", error);
      });
  };
//Borrar el producto
  const handleDeletion = (id) => {//Borrar Productos
    const db = getFirestore();
    const productId = doc(db, "productos", id);

    deleteDoc(productId)
      .then(() => {
        setProductBD((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
        notifyToastBD("🗑️ Producto eliminado correctamente ID:" + id);
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error);
      });
  };

  return (
    <Box textAlign={"center"} >
      <Box >
        <Typography
          className="degradado-texto"
          
          fontFamily={"letters.fontM"}
          fontSize={"2.5rem"}
          fontWeight={600}
          marginBottom={4}
          padding={"2rem 4rem"}
          
        >
          Administrador de Productos
         
        </Typography>
      </Box>
      {loading ? (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <CircularProgress />
        </Box>
      ) : productBD.length ? (
        <Box
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {notifyToastContainer()}
          {productBD.map((items) => {
            return (
        <CardBackStage
          key={items.id}
          data={items}
          onClick={handleItemModify}
          createButtonText="Modificar"
          showDeleteButton={true}
          showResetButton={false}
          onDelete={() => handleDeletion(items.id)}
        />
          );
          })}
        </Box>
      ) : (
        <Typography textTransform="capitalize" fontSize={"2rem"}>
          No existen items en la base de datos o hubo un error
        </Typography>
      )}

      <Box sx={{ maxWidth: "400", marginBottom: "1rem", marginTop:"2rem",display:"flex", flexFlow:"column", justifyContent:"center", alignItems:"center" }}>
        <Typography letterSpacing={2} variant="h1" component={'h2'} fontFamily={'letters.fontM'} fontWeight={'bold'} fontSize={'2rem'} color={'balck'} borderBottom={'solid 4px black'} borderTop={'solid 4px black'} width={"100%"} marginBottom={'2rem'}>Crear Nuevos Productos</Typography>
        
        <CardBackStage  
          onClick={handleItemCreate}
          onResetFields={resetForm}
          createButtonText= "Crear"
          showDeleteButton={false}
          showResetButton={true}
          className="create-product-card"
          data={{
            thumbnail: "",
            title: "",
            price: 0,
            stock: 0,
            addressShipping: "",
            addressPlace: "",
            brand: "",
            color: "",
            condition: "",
            categoryType: "",
            customId: "",
            description: "",
            specialproduct:"",
            discountSelected:"",
            size:"",
          }}
        />
      </Box>
    </Box>
  );
}

export default BackOffice;
