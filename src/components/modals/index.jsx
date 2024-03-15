import * as React from "react";

//Libreria Material
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
//Libreria sweetAlert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//Mis Componentes
import UserData from "../user-data";
import { AppContex } from "../../Providers/contex-provider"; //ContexProvider
import RenderItemDetails from "../containers/typographys-anidados/tipographyscontainer";

//!Se definen dos componentes Transition y AlertDialogSlide
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />; //se setea una transicion de aparicion del modal.
  //El componente Transition es una función que utiliza React.forwardRef para pasar una referencia a otro componente. en este caso devuelve un tipo slide
});

function ModalSlide({ widget }) {//Padre Carrito
   //El componente AlertDialogSlide (Nombre de MaterialUI) o ModaSlide(nombre que le coloque yo) es un componente funcional que utiliza el hook useState de React para manejar el estado de open, que representa si el diálogo está abierto o cerrado. El diálogo se abre cuando se hace clic en el botón "Carrito" y se cierra cuando se hace clic en los botones.
  const [open, setOpen] = React.useState(false); //Habilitar el componente modal
  const {
    trolley,
    quantityC,
    handleEmptyTrolley,
    notifyToastContainer,
    notifyToast,
    createNewDispach,
    lastDispach,
    showUserData,
    setShowUserData,
    removeFromTrolley,
  } = React.useContext(AppContex); //ContexProvider


  
  const handleUserDataComplete = () => {
    setShowUserData(false); // Cierra el componente UserData
    setOpen(false); // Cerrar el modal cuando UserData haya completado el proceso userdata
  };

  const MySwal = withReactContent(Swal); //instancia sweetalert
  const handleClickSwal = () => {
    //evento sweetalert

    if (quantityC >= 1) {
      // setOpen(false)//cierro el modal
      setShowUserData(true);

      setTimeout(() => {
        setOpen(false);
        setShowUserData(false);

        MySwal.fire({
          //abro sweetalert
          title: "Compra Casi Lista",
          html: `Muchas gracias por preferirnos, su monto a abonar es de ${calcwithIva()} Pesos.<br>Le estaremos enviando la factura a su correo electronico con la cantidad de # ${calcTotalPerItemsCart()} productos,tambien le adjuntaremos el link de pago y estaremos a la espera de confirmar el mismo, una vez corroborado el abono le enviaremos sus respectivos productos, Ahora debe ingresar los siguientes datos requeridos que se habilitaran un poco mas abajo`,
          icon: "success",
          showConfirmButton: true,
          timer: 4000,
        }).then((result) => {
          if (result.isConfirmed) {
            setOpen(true); // Reabrir el modal si se hace click en ok
            setShowUserData(true);
          } else {
            // El usuario clickea fuera o presiona escape para cerrar el sweetalert
            // Here you can handle the cancel event and cancel any ongoing operation
            setOpen(true);
            setShowUserData(true);
            // You might want to show a message to inform the user that the operation was cancelled
            notifyToast("💨 Compra en espera....");
          }
        });
      });
    } else {
      //este else es cuando no hay nada en el trolley
      setOpen(false); //cierro el modal
      setShowUserData(false); //cierro el estado componente userData
      MySwal.fire({
        //abro sweetalert
        title: "Debe anadir un producto al carrito",
        icon: "warning",
        showConfirmButton: true,
        timer: 2000,
      }).then((result) => {
        if (result.isConfirmed) {
          setOpen(false); // Reabrir el modal si se hace click en ok
          setShowUserData(false);
        } else {
          setOpen(false);
          setShowUserData(false);
        }
      });
    }
  };
  
 
  //Calculos de Precios
  // Función para calcular el precio con descuento
  const calculateDiscountedPrice = (pricePerUnit, discountSelected) => {
    // Verifica si se ha seleccionado un descuento y aplica el descuento correspondiente
    if (discountSelected === 2) {
      return pricePerUnit * 0.98; // Aplica un descuento del 2%
    } else if (discountSelected === 3) {
      return pricePerUnit * 0.97; // Aplica un descuento del 3%
    } else if (discountSelected === 4) {
      return pricePerUnit * 0.96; // Aplica un descuento del 4%
    } else if (discountSelected === 5) {
      return pricePerUnit * 0.95; // Aplica un descuento del 5%
    } else if (discountSelected === 10) {
      return pricePerUnit * 0.9; // Aplica un descuento del 10%
    } else if (discountSelected === 12) {
      return pricePerUnit * 0.88; // Aplica un descuento del 12%
    } else if (discountSelected === 14) {
      return pricePerUnit * 0.86; // Aplica un descuento del 14%
    } else if (discountSelected === 15) {
      return pricePerUnit * 0.85; // Aplica un descuento del 15%
    } else if (discountSelected === 16) {
      return pricePerUnit * 0.84; // Aplica un descuento del 16%
    } else if (discountSelected === 20) {
      return pricePerUnit * 0.8; // Aplica un descuento del 20%
    } else {
      return pricePerUnit; // Si no hay descuento, devuelve el precio original
    }
  };

  const formatNWCS = (num) => {
    //Formatear los totales de miles con decimales
    return num.toLocaleString("es-Es", {
      minimunFractionDigits: 2,
      maximunFractionDigits: 2,
    }); //predefinidos toLocaleString minimunFractionDigits maximunFractionDigits
  };

  const calcTotalPerItemsCart = () => {
    //Calcular la cantidad de items que lleva entre productos (no tiene nada que ver con calculo de precios)
    let totalQuantity = 0;

    for (const item of trolley) {
      totalQuantity += item.quantity;
    }
    return totalQuantity;
  };

  const calcTotalQuantityPerPrice = (item) => {
    //Calcular la cantidad que lleva con el precio y la unidad
    const discountedPricePerUnit = calculateDiscountedPrice(
      item.pricePerUnit,
      item.discountSelected
    );
    return discountedPricePerUnit * item.quantity;
  };

  // eslint-disable-next-line
  const calcTotalGlobalPay = () => {
    //Calcular el total de todo el carrito sin iva
    let totalGlobal = 0;

    for (const item of trolley) {
      totalGlobal += calcTotalQuantityPerPrice(item);
    }
    return formatNWCS(totalGlobal);
  };

  const calcwithIva = () => {
    //Calcular el total de todo el carrito con iva
    let totalWithIva = 0;
    for (const item of trolley) {
      totalWithIva += calcTotalQuantityPerPrice(item) * 1.21;
    }
    return formatNWCS(totalWithIva);
  };

  const handleClickOpen = () => {
    //abrir y cerrar el modal
    setOpen(true);
  };

  const handleClose = () => {
    //abrir y cerrar el modal
    setOpen(false);
  };



  return (
    <Box>
      {/*Cuando se hace clic en el botón "Carrito", se invoca la función handleClickOpen, lo que establece el estado open en true y muestra el diálogo. */}
      <Box onClick={handleClickOpen}>{widget}</Box>

      {/* El diálogo está representado por el componente Dialog de React. Se le pasa la prop open para indicar si el diálogo debe estar visible o no. La prop TransitionComponent se establece en el componente Transition que mencioné anteriormente para proporcionar la transición animada. */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className="cardModalsDialog"
       
      >
        {/* formato UI del card en el modal */}
        <DialogTitle

          fontFamily={"letters.fontM"}
          fontWeight={"bold"}
          className="cardModalsDialgTitle"
        >
          {"tus productos"}
        </DialogTitle>
        <DialogContent >
          <DialogContentText
            id="alert-dialog-slide-description"
            className="cardModalsContentText"
            
          >
            {trolley.map((item) => (
              <Box key={item.id}className="cardModalsContainer">
              <Card
                key={item.id}
                className="cardModalsStyle"
              >
                <Box key={item.id} className="cardModalsInner">

                <CardMedia
                  component="img"
                  className="cardModalsImage"
          
                  image={item.imagen}
                  alt={item.producto}
                />
                <CardContent
                  className="cardModalsContent"
                >
                  <RenderItemDetails items={item} calcTotalQuantityPerPrice={calcTotalQuantityPerPrice} />
                </CardContent>
                </Box>
                <Box>
                <Box className="cardModalsInnerButtons" size="small" variant="text" key={item} onClick={() => {removeFromTrolley(item)}}>🗑️🔻</Box>
                </Box>
              </Card>
              {/* <Button style={{position:"absolute", top: 0, right: 0, minWidth:"40px"}} size="small" variant="text" key={item} onClick={() => {removeFromTrolley(item)}}>🗑️🔻</Button> */}
              </Box>
            ))}
          </DialogContentText>
        </DialogContent>

        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-around"}
          flexWrap={"wrap"}
          margin={"0 1rem"}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"row"}
            textAlign={"center"}
            gap={"1rem"}
            textTransform={"capitalize"}
          >
            <Typography fontWeight={"bold"} fontFamily={"letters.fontM"}>
              Items en Carrito: {quantityC}
            </Typography>
            <Typography fontWeight={"bold"} fontFamily={"letters.fontM"}>
              Cantidad Productos: {calcTotalPerItemsCart()}
            </Typography>
          </Box>

          <Box textAlign={"center"}>
            <Typography fontFamily={"letters.fontM"}>
              Total Pago: {calcwithIva()} Pesos
            </Typography>
          </Box>
          {/* <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="body1" component="p">
                C/Iva: {calcwithIva()} Pesos
            </Typography>
            </Box> */}
        </Box>

        <DialogActions>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button onClick={handleEmptyTrolley}>Vaciar</Button>
            {notifyToastContainer()}
            <Button onClick={handleEmptyTrolley}>Eliminar</Button>
            <Button onClick={handleClickSwal} disabled={showUserData}>
              Terminar Compra
            </Button>
          </Box>
        </DialogActions>
        <Box>
          {showUserData && (
            <UserData
              trolley={trolley}
              createNewDispach={createNewDispach}
              lastDispach={lastDispach}
              total={calcwithIva()}
              onClose={handleUserDataComplete}
            />
          )}
        </Box>
      </Dialog>
    </Box>
  );
}

export default ModalSlide;
