import * as React from 'react';
import { AppContex } from '../contex-provider';//ContexProvider
//Libreria Material
import { Box, Button, Card, CardContent,CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material';
//Libreria swal fire
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//mi componente
import UserData from '../user-data';




//!Se definen dos componentes Transition y AlertDialogSlide
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="top" ref={ref} {...props} />;//se setea una transicion de aparicion del modal.
//El componente Transition es una función que utiliza React.forwardRef para pasar una referencia a otro componente. devuelve un tipo slide
});

function ModalSlide({widget}) {//Padre
  //El componente AlertDialogSlide (Nombre de MaterialUI) o ModaSlide(nombre que le coloque yo) es un componente funcional que utiliza el hook useState de React para manejar el estado de open, que representa si el diálogo está abierto o cerrado. El diálogo se abre cuando se hace clic en el botón "Carrito" y se cierra cuando se hace clic en los botones.
  const [open, setOpen] = React.useState(false);//Habilitar el componente modal
  const {showUserData, setShowUserData} = React.useContext(AppContex)//Habilitar el componente UserData
  const {trolley, quantityC, handleEmptyTrolley, notifyToastContainer, notifyToast, createNewDispach, lastDispach} = React.useContext(AppContex)//ContexProvider

  React.useEffect(() => {
    console.log(quantityC); // Verifica si quantityC se actualiza correctamente
  }, [quantityC]);
  
  const notifyFinish = () => notifyToast('💨 Compra Terminada Correctamente')//notificaciones

  const MySwal = withReactContent(Swal)//instancia sweetalert
    const handleClickSwal = () => {//evento sweetalert 
      console.log(quantityC)
      
      if(quantityC >= 1) {
        // setOpen(false)//cierro el modal
        setShowUserData(true)

        setTimeout(() => {
          setOpen(false)
          setShowUserData(false)

          MySwal.fire({//abro sweetalert
            title: 'Venta Casi Lista',
            html: `Muchas gracias por preferirnos, su factura a abonar es de ${calcwithIva()} Pesos.<br>Le estaremos enviando la factura a su correo electronico con la cantidad de # ${calcTotalPerItemsCart()} productos, Ahora debe ingresar los siguientes datos que requeridos habilitados un poco mas abajo`,
            icon: 'success',
            showConfirmButton: true,
            timer:4000,
          }).then((result) => {
            if (result.isConfirmed) {
              setOpen(true); // Reopen the modal if OK is clicked
              setShowUserData(true);
            } else {
              // User clicked outside or pressed ESC to close the SweetAlert
              // Here you can handle the cancel event and cancel any ongoing operation
              setOpen(true);
              setShowUserData(true);
              // You might want to show a message to inform the user that the operation was cancelled
            }
          });
        })
      }else {
        setOpen(false)//cierro el modal
        setShowUserData(false)
          MySwal.fire({//abro sweetalert
              title: 'Error',
              title: "Debe anadir un producto al carrito",
              icon: 'warning',
              showConfirmButton: true,
              timer:2000,
            }).then((result) => {
              if (result.isConfirmed) {
                setOpen(false); // Reopen the modal if OK is clicked
                setShowUserData(false);
              } else {
                // User clicked outside or pressed ESC to close the SweetAlert
                // Here you can handle the cancel event and cancel any ongoing operation
                setOpen(false);
                setShowUserData(false);
                // You might want to show a message to inform the user that the operation was cancelled
              }
            });
            }
    };

  const calcTotalPerItemsCart = () => {//Calcular la cantidad de items que lleva entre productos (no tiene nada que ver con calculo de precios)
    let totalQuantity = 0

    for(const item of trolley){ totalQuantity += item.quantity } return totalQuantity }

  const calcTotalQuantityPerPrice = (item) => {//Calcular la cantidad que lleva con el precio y la unidad
    return item.pricePerUnit * item.quantity
  }
  
  const calcTotalGlobalPay = () => {//Calcular el total de todo el carrito sin iva
    let totalGlobal = 0

    for (const item of trolley) { totalGlobal += calcTotalQuantityPerPrice(item) } return totalGlobal.toFixed(2)
  }

  const calcwithIva = () => {//Calcular el total de todo el carrito con iva
    let totalWithIva = 0
    for (const item of trolley) { totalWithIva += calcTotalQuantityPerPrice(item) * 1.21 } return totalWithIva.toFixed(2)
  } 

  const handleClickOpen = () => {//abrir y cerrar el modal
    setOpen(true);
  };

  const handleClose = () => {//abrir y cerrar el modal + setear a vacio el array cuando se cierre
    setOpen(false);
    
  };

  const handleCloseWithMessages = () => {
    setOpen(false)
    notifyFinish()
  }

 

  return (
    <div>
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
        <DialogTitle fontFamily={"fantasy"} >{"Tus Productos"}</DialogTitle>
        <DialogContent >
          <DialogContentText  id="alert-dialog-slide-description">
            {
              trolley.map((item) => (
              <Card key={item.id} sx={{display:"flex", justifyContent:"space-around", alignItems:"strech",  marginBottom: '.3rem', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }} >
                  <CardMedia
                  component="img"
                  sx={{ width: "100%",height:"50%", border:'solid 2px black', objectFit:"cover" }}
                  image={item.imagen}
                  alt={item.producto}
                  />
                <CardContent sx={{display:"flex", flexDirection:"column" ,alignItems:"self-start"}}>
                  <Typography sx={{width:'200px', textAlign:'left', lineHeight:1, marginBottom:"5px"}} flexWrap="nowrap" variant="h6" component="p">
                    {item.producto}
                  </Typography>
                  <Typography variant="body2" component='p' color="textSecondary">
                    Valor Unid: {item.pricePerUnit}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Vas a llevar: {item.quantity}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Total: {calcTotalQuantityPerPrice(item)}
                  </Typography>
                 
                </CardContent>
              
              </Card>
             ))}
          </DialogContentText>
        </DialogContent>

        <Box display={'flex'} flexDirection={'column'} justifyContent={"space-around"} flexWrap={'wrap'} margin={"0 1rem"}>
            <Box display={'flex'} flexDirection={'row'} justifyContent={"center"} gap={"1rem"} textTransform={"capitalize"}>

            <Typography fontFamily={"fantasy"} variant="body2" component="p">
                Items en Carrito: {quantityC} 
            </Typography>
            <Typography fontFamily={"fantasy"} variant="body2" component="p">
                Cantidad Total Items: {calcTotalPerItemsCart()} 
            </Typography>
            </Box>
            
            <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="h6" component="p">
                Total Pago S/Iva: {calcTotalGlobalPay()} Pesos
            </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="body1" component="p">
                C/Iva: {calcwithIva()} Pesos
            </Typography>
            </Box>
        </Box>
      
        <DialogActions>
          <Button onClick={handleEmptyTrolley}>Vaciar</Button>{notifyToastContainer()}
          <Button onClick={handleEmptyTrolley}>Eliminar</Button>
          <Button onClick={handleClickSwal} disabled={showUserData}>Terminar Compra</Button>
        </DialogActions>
        <Box>
        {showUserData && <UserData trolley={trolley} createNewDispach={createNewDispach} lastDispach={lastDispach}/>}
      </Box>
      </Dialog>
   
    </div>
  );
}

export default ModalSlide
