import * as React from 'react';

//Libreria Material
import { Box, Button, Card, CardContent,CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material';
//Libreria sweetAlert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//Mis Componentes
import UserData from '../user-data';
import { AppContex } from '../../Providers/contex-provider';//ContexProvider




//!Se definen dos componentes Transition y AlertDialogSlide
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;//se setea una transicion de aparicion del modal.
//El componente Transition es una función que utiliza React.forwardRef para pasar una referencia a otro componente. en este caso devuelve un tipo slide
});

function ModalSlide({widget}) {//Padre
  //El componente AlertDialogSlide (Nombre de MaterialUI) o ModaSlide(nombre que le coloque yo) es un componente funcional que utiliza el hook useState de React para manejar el estado de open, que representa si el diálogo está abierto o cerrado. El diálogo se abre cuando se hace clic en el botón "Carrito" y se cierra cuando se hace clic en los botones.
  const [open, setOpen] = React.useState(false);//Habilitar el componente modal
  const {showUserData, setShowUserData} = React.useContext(AppContex)//Habilitar el componente UserData
  const {trolley, quantityC, handleEmptyTrolley, notifyToastContainer, notifyToast, createNewDispach, lastDispach} = React.useContext(AppContex)//ContexProvider
  

  const handleUserDataComplete = () => {
    setShowUserData(false); // Cierra el componente UserData
    setOpen(false); // Cerrar el modal cuando UserData haya completado el proceso userdata
  };

  const MySwal = withReactContent(Swal)//instancia sweetalert
    const handleClickSwal = () => {//evento sweetalert 
      
      if(quantityC >= 1) {
        // setOpen(false)//cierro el modal
        setShowUserData(true)

        setTimeout(() => {
          setOpen(false)
          setShowUserData(false)

          MySwal.fire({//abro sweetalert
            title: 'Venta Casi Lista',
            html: `Muchas gracias por preferirnos, su monto a abonar es de ${calcwithIva()} Pesos.<br>Le estaremos enviando la factura a su correo electronico con la cantidad de # ${calcTotalPerItemsCart()} productos, Ahora debe ingresar los siguientes datos requeridos que se habilitaran un poco mas abajo`,
            icon: 'success',
            showConfirmButton: true,
            timer:4000,
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
              notifyToast('💨 Compra en espera....')
            }
          });
        })
      }else {//este else es cuando no hay nada en el trolley
        setOpen(false)//cierro el modal
        setShowUserData(false)//cierro el estado componente userData
          MySwal.fire({//abro sweetalert
              title: "Debe anadir un producto al carrito",
              icon: 'warning',
              showConfirmButton: true,
              timer:2000,
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

  // Función para calcular el precio con descuento
const calculateDiscountedPrice = (pricePerUnit, discountSelected) => {
  console.log(pricePerUnit)
  console.log(discountSelected)
  // Verifica si se ha seleccionado un descuento y aplica el descuento correspondiente
  if (discountSelected === 2) {
    return pricePerUnit * 0.98; // Aplica un descuento del 2%
  } else if (discountSelected === 3) {
    return pricePerUnit * 0.97;// Aplica un descuento del 3%
  } else if (discountSelected === 4) {
    return pricePerUnit * 0.96;// Aplica un descuento del 4%
  } else if (discountSelected === 5) {
    return pricePerUnit * 0.95;// Aplica un descuento del 5%
  } else if (discountSelected === 10) {
    return pricePerUnit * 0.90; // Aplica un descuento del 10%
  } else if (discountSelected === 12) {
    return pricePerUnit * 0.88;// Aplica un descuento del 12%
  } else if (discountSelected === 14) {
    return pricePerUnit * 0.86;// Aplica un descuento del 14%
  } else if (discountSelected === 15) {
    return pricePerUnit * 0.85; // Aplica un descuento del 15%
  } else if (discountSelected === 16) {
    return pricePerUnit * 0.84;// Aplica un descuento del 16%
  } else if (discountSelected === 20) {
    return pricePerUnit * 0.80; // Aplica un descuento del 20%
  } else {
    return pricePerUnit; // Si no hay descuento, devuelve el precio original
    
  }
  
};

  
  const formatNWCS = (num) => {//Formatear los totales de miles con decimales
    return num.toLocaleString('es-Es', {minimunFractionDigits: 2, maximunFractionDigits: 2}) //predefinidos toLocaleString minimunFractionDigits maximunFractionDigits
    
  }

  const calcTotalPerItemsCart = () => {//Calcular la cantidad de items que lleva entre productos (no tiene nada que ver con calculo de precios)
    let totalQuantity = 0

    for(const item of trolley){ totalQuantity += item.quantity } return totalQuantity }

  const calcTotalQuantityPerPrice = (item) => {//Calcular la cantidad que lleva con el precio y la unidad
    const discountedPricePerUnit = calculateDiscountedPrice(item.pricePerUnit , item.discountSelected)
    console.log(discountedPricePerUnit)
    return discountedPricePerUnit * item.quantity
  }
  
  // eslint-disable-next-line
  const calcTotalGlobalPay = () => {//Calcular el total de todo el carrito sin iva
    let totalGlobal = 0

    for (const item of trolley) { totalGlobal += calcTotalQuantityPerPrice(item) } return formatNWCS(totalGlobal)
  }

  const calcwithIva = () => {//Calcular el total de todo el carrito con iva
    let totalWithIva = 0
    for (const item of trolley) { totalWithIva += calcTotalQuantityPerPrice(item) * 1.21 }  console.log(totalWithIva); return formatNWCS(totalWithIva)
   
  } 

  const handleClickOpen = () => {//abrir y cerrar el modal
    setOpen(true);
  };

  const handleClose = () => {//abrir y cerrar el modal 
    setOpen(false);
    
  }; 

  return (
    <Box>
      {/*Cuando se hace clic en el botón "Carrito", se invoca la función handleClickOpen, lo que establece el estado open en true y muestra el diálogo. */}
      <Button variant="text" onClick={handleClickOpen}>
      {widget}
      </Button>

      {/* El diálogo está representado por el componente Dialog de React. Se le pasa la prop open para indicar si el diálogo debe estar visible o no. La prop TransitionComponent se establece en el componente Transition que mencioné anteriormente para proporcionar la transición animada. */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        
      >
        
        {/* formato UI del card en el modal */}
        <DialogTitle textAlign={"center"} fontFamily={"arial"} textTransform={"capitalize"} fontWeight={"bold"} >{"tus productos"}</DialogTitle>
        <DialogContent >
          <DialogContentText  id="alert-dialog-slide-description">
            {
              trolley.map((item) => (
              <Card key={item.id} sx={{display:"flex", justifyContent:"center", alignItems:"center",  marginBottom: '.3rem', width: "auto", height:"auto" , flexDirection:['column', 'row'],  background:
              "linear-gradient(to bottom, #ffffff, #f1f1f1)" /*de blanco a grisoscuro */, boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }} >
                  <CardMedia
                  component="img"
                  sx={{ width: "150px", height:"150px", aspectRatio: 10/9, alignSelf:'center', border:'solid 2px black', objectFit:"contain"}}
                  image={item.imagen}
                  alt={item.producto}
                  />
                <CardContent sx={{display:"flex", flexDirection:"column" ,alignItems:["center","self-start"]}}>
                  <Typography sx={{width:"150px", textAlign:['center','left'], lineHeight:1, marginBottom:"5px", alignItems:["center","self-start"]}} flexWrap="wrap" variant="h6" component="p">
                    {item.producto}
                  </Typography>
                  <Typography variant="body2" component='p' color="textSecondary">
                    Valor Unid: ${item.pricePerUnit} Pesos
                  </Typography>
                  <Typography variant="body2" component="p">
                    Vas a llevar: {item.quantity}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Descuento: {item.discountSelected} %
                  </Typography>
                  {/* <Typography variant="body2" component="p">
                    Sin iva: {calcTotalGlobalPay()}
                  </Typography> */}
                  <Typography variant="body2" component="p">
                    Total P. Unidad: ${calcTotalQuantityPerPrice(item) } Pesos
                    {/* calcTotalQuantityPerPrice(item) */}
                  </Typography>
                 
                </CardContent>
              
              </Card>
             ))}
          </DialogContentText>
        </DialogContent>

        <Box display={'flex'} flexDirection={'column'} justifyContent={"space-around"} flexWrap={'wrap'} margin={"0 1rem"}>
            
            <Box display={'flex'} justifyContent={"center"} flexDirection={'row'} textAlign={"center"} gap={"1rem"} textTransform={"capitalize"}>
            <Typography fontWeight={"bold"} fontFamily={"arial"} variant="body2" component="p">
                Items en Carrito: {quantityC} 
            </Typography>
            <Typography fontWeight={"bold"} fontFamily={"arial"} variant="body2" component="p">
                Cantidad Total Productos: {calcTotalPerItemsCart()} 
            </Typography>
            </Box>
            
            <Box textAlign={"center"}>
              <Typography variant="h6" component="p">
                Total Pago: {calcwithIva()} Pesos
            </Typography>
            </Box>
            {/* <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="body1" component="p">
                C/Iva: {calcwithIva()} Pesos
            </Typography>
            </Box> */}
        </Box>
      
        <DialogActions >
          <Box sx={{width:"100%", display:"flex", flexFlow:'row wrap', justifyContent:"center", alignItems:"center"}}>
          <Button onClick={handleEmptyTrolley}>Vaciar</Button>{notifyToastContainer()}
          <Button onClick={handleEmptyTrolley}>Eliminar</Button>
          <Button onClick={handleClickSwal} disabled={showUserData} >Terminar Compra</Button>
          </Box>
        </DialogActions>
        <Box>
        {showUserData && <UserData trolley={trolley} createNewDispach={createNewDispach} lastDispach={lastDispach} total={calcwithIva()} onClose={handleUserDataComplete}/>}
      </Box>
      </Dialog>
   
    </Box>
  );
}

export default ModalSlide
