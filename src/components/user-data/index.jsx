import React from "react";
//Libreria Firebase
import { getFirestore, doc, updateDoc } from "firebase/firestore";
//Libreria MaterialUi
import { Box, TextField, Button, Typography } from "@mui/material";
//Contex Provider
import { AppContex } from "../../Providers/contex-provider";
//Libreria hook form
import { useForm } from "react-hook-form";
import handleSoldQuantity from "../utilities/soldquantity";
//Libreria emailjs
import emailjs from "@emailjs/browser";

//Orden, capturar la informacion del cliente almacenarla como ticked al finalizar la compra
const UserData = ({ trolley, createNewDispach, onClose, total }) => {
  //para usar useform la variable principal o el componente tiene que comenzar con letra mayusculas si no da error
  // const [purchaseDate, setPurchaseDate] = React.useState(
  //   new Date().toLocaleDateString()
  // );
  const formatteDate = new Date().toLocaleDateString();
  console.log(formatteDate)
  const refForm = React.useRef(); //es un objeto
  // const cartBuyer = trolley;
  const cartTotalBuyer = total;
  const defaultReplayTo = "salpimienta.shop23@gmail.com";
  // const trolleyContent = trolley.map((item, index) => ({
  //   codigoSistema: item.id,
  //   codigoPersonalizado: item.customid,
  //   producto: item.producto,
  //   cantidadProductos: item.quantity,
  //   StockRestanteAlmacen: item.stock,
  //   PrecioCadaUnidad: item.pricePerUnit,
  //   ColorPrenda: item.color,
  //   TallePrenda: item.size,
  //   AplicaDescuento: item.discountSelected,
  //   PrecioXUnidad: item.pricePerUnit,
  // }));

  const trolleyContentAdmin = trolley.map(item => (
          `{
            ----Identificador del Producto en el sistema: ${item.id}---- 
            ----Identificador del Producto personalizado: ${item.customid}---- 
            ----Nombre del Producto: ${item.producto}---- 
            ----Cantidad de Productos: ${item.quantity}---- 
            ----Stock restante en el Almacen: ${item.stock}---- 
            ----Precio por cada Unidad:${item.pricePerUnit} Pesos c/u----
            ----Color: ${item.color}---- 
            ----Talle: ${item.size}---- 
            ----${item.discountSelected ? `Aplica descuento: ${item.discountSelected.toUpperCase()}%.` : 'Sin descuento.'}----
          }`
  ));
  const trolleyContentClient = trolley.map(item => (
          `{ 
            ----IDENTIFICADOR DEL PRODUCTO: ${item.customid}----
            ----NOMBRE DEL PRODUCTO: ${item.producto}---- 
            ----CANTIDAD DE PRODUCTOS: ${item.quantity} Unidades.----  
            ----COLOR: ${item.color}----
            ----TALLE: ${item.size}----
            ----${item.discountSelected ? `APLICA DESCUENTO: ${item.discountSelected.toUpperCase()}%.` : 'Sin descuento.'}----
          }`
  ));
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm(); //Declaraciones de estado y funciones. //formState por react-hook-form contiene información sobre el estado del formulario, incluyendo si es válido o no.
  const { notifyToast } = React.useContext(AppContex);

  //!Elminar
  // React.useEffect(() => {
  //   setPurchaseDate(new Date().toLocaleDateString());
  //   console.log(purchaseDate);
  // }, [purchaseDate]);

  const modifierStockProducts = async (trolley) => {
    //Funcion para modificar stock en la base de datos segun lo que lleve el comprador
    const db = getFirestore();

    try {
      for (const producto of trolley) {
        const productRef = doc(db, "productos", producto.id);
        const currentStock = parseInt(producto.stock);

        if (currentStock >= producto.quantity) {
          await updateDoc(productRef, {
            stock: currentStock - producto.quantity,
          });
        } else {
          throw new Error(`No hay stock suficiente: ${producto.producto}`);
        }
      }
    } catch (error) {
      throw error;
    }
    // onClose()
  };

  const onSubmit = async (data) => {
    //react-hook-form se encarga automáticamente de prevenir la recarga de la página cuando se envía el formulario.
    const serviceId = "react_contact_detail";
    const templateId = "template_47721fl"; //my replay message
    const apikey = process.env.REACT_APP_EMAILJS_KEY;

    if (!createNewDispach || !trolley.length) {
      //si no se cumplen no retornara nada
      return;
    }
    try {
      await modifierStockProducts(trolley);

      // Formatea la fecha al formato deseado antes de insertarla en el objeto `order`
      const formatteDate = new Date().toLocaleDateString(); // Esto utilizará el formato predeterminado

      //! Llama a handleSoldQuantity para actualizar el campo soldquantity en la base de datos
      for (const item of trolley) {
        await handleSoldQuantity(item.id, item.quantity);
      }

      createNewDispach({
        buyer: {
          name: data.username,
          lastname: data.userlastname,
          direction: data.userpdirection,
          dataoptional: data.userdoptional,
          telephone: data.usertelephone,
          email: data.useremail,
        },
        items: trolley,
        createAt: formatteDate,
        total: total,
        status: "Pendiente", // Agregar el campo 'status' con valor 'Pendiente'
        // trolley.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0)
      });

      // refForm.current.setValue("dateofpurchase", formatteDate);
      // refForm.current.setValue("itemsbuyer", JSON.stringify(cartBuyer));
      // Envía el correo de respuesta automática
      await emailjs
        .sendForm(serviceId, templateId, refForm.current, apikey)
        .then((result) => console.log(result.text)) //se cumple
        .catch((error) => console.error(error)); //manejar errores

      notifyToast("💨 Compra Terminada Correctamente");
      onClose();
      reset(); // Resetear el formulario
    } catch (error) {
      notifyToast("Error al modificar stock de productos", error);
      console.error("Error", error);
    }
  };

  return (
    <Box sx={{ textAlign: "center", marginBottom: "1rem" }}>
      <Typography fontSize={"1rem"} fontWeight={"bold"}>
        Datos requeridos para la factura
      </Typography>
      <form ref={refForm} onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "block",
            justifyContent: "center",
            textAlign: "center",
            rowGap: 2,
            columnGap: 3,
          }}
        >
          <TextField
            label="Nombre"
            variant="outlined"
            placeholder="Nombre..."
            // name='username'
            {...register("username", { required: true })}
            style={{ marginTop: "1rem", marginLeft: "1rem" }}
          />
          <TextField
            label="Apellido"
            variant="outlined"
            placeholder="Apellido..."
            // name='userlastname'
            {...register("userlastname", { required: true })}
            style={{ marginTop: "1rem", marginLeft: "1rem" }}
          />
          <TextField
            label="Dirección"
            variant="outlined"
            placeholder="Tu Dirección de entraga..."
            // name='userpdirection'
            {...register("userpdirection", { required: true })}
            style={{ marginTop: "1rem", marginLeft: "1rem" }}
          />
          <TextField
            label="Datos Opcionales"
            variant="outlined"
            placeholder="Deagonal casa azul..."
            // name='userdoptional'
            {...register("userdoptional", { required: false })}
            style={{ marginTop: "1rem", marginLeft: "1rem" }}
          />
          <TextField
            label="Telefono"
            variant="outlined"
            placeholder="Telefono..."
            // name='usertelephone'
            {...register("usertelephone", { required: true })}
            style={{ marginTop: "1rem", marginLeft: "1rem" }}
          />
          <TextField
            label="Email"
            variant="outlined"
            placeholder="Email..."
            // name='useremail'
            {...register("useremail", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })} //pattern valida el formato del campo de correo electrónico.
            error={errors.email}
            helperText={errors.email ? "Correo electrónico inválido" : ""}
            style={{ marginTop: "1rem", marginLeft: "1rem" }}
          />
          <TextField
            name="itemsbuyer"
            value={trolleyContentAdmin}
            style={{ display: "none" }}
          />
          <TextField
            name="itemsbuyershow"
            value={trolleyContentClient}
            style={{ display: "none" }}
          />
          <TextField
            name="totalcart"
            value={cartTotalBuyer}
            style={{ display: "none" }}
          />
          <TextField
            name="replyto"
            value={defaultReplayTo}
            style={{ display: "none" }}
          />
          
          <TextField
            name="dateofp"
            value={new Date()}
            style={{ display: "none" }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!trolley.length || !isValid} //si no hay nda en el carrito desactiva el boton y si ningun textField tiene informacion o falte uno por llenar se desctivara tambien.
            style={{ marginTop: "1rem" }}
          >
            Enviar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UserData;
