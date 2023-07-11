import * as React from 'react';
import { Box, Button, Card, CardContent,CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material';//Libreria Material
import { AppContex } from '../contex-provider';



//!Se definen dos componentes Transition y AlertDialogSlide
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="top" ref={ref} {...props} />;//se setea una transicion de aparicion del modal.
  
//El componente Transition es una función que utiliza React.forwardRef para pasar una referencia a otro componente. En este caso, toma dos parámetros: props y ref. Dentro de la función, retorna un componente <Slide> con la dirección establecida como "up" y la referencia pasada mediante ref. Además, se utiliza el operador spread ({...props}) para pasar todas las demás propiedades recibidas a <Slide>. Esto permite que el componente que recibe la referencia también tenga acceso a las demás propiedades.
});



function ModalSlide({widget}) {
//El componente AlertDialogSlide o ModaSlide(nombre que le coloque yo) es un componente funcional que utiliza el hook useState de React para manejar el estado de open, que representa si el diálogo está abierto o cerrado. El diálogo se abre cuando se hace clic en el botón "Carrito" y se cierra cuando se hace clic en los botones "Disagree" o "Agree".
  const [open, setOpen] = React.useState(false);
  const {trolley, setTrolley, quantityC} = React.useContext(AppContex)//Contex de carrito

  const calcTotalPerItemsCart = () => {//Calcular la cantidad de items que lleva entre productos (no tiene nada que ver con calculo de precios)
    let totalQuantity = 0

    for(const item of trolley){ totalQuantity += item.quantity } return totalQuantity }

  const calcTotalQuantityPerPrice = (item) => {//Calcular la cantidad que lleva con el precio y la unidad
    return item.pricePerUnit * item.quantity
  }
  
  const calcTotalGlobalPay = () => {
    let totalGlobal = 0

    for (const item of trolley) { totalGlobal += calcTotalQuantityPerPrice(item) } return totalGlobal
  }

  const calcwithIva = () => {
    let totalWithIva = 0
    for (const item of trolley) { totalWithIva += calcTotalQuantityPerPrice(item) * 1.21 } return totalWithIva.toFixed(2)
  } 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleVaciar = () => {
    setTrolley([])
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
              <Card key={item.id} sx={{display:"flex", justifyContent:"space-between", alignItems:"strech",  marginBottom: '.3rem', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }} >
                  <CardMedia
                  component="img"
                  sx={{ width: 100, objectFit:"cover" }}
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

        <Box display={'flex'} flexDirection={'column'} justifyContent={"space-around"} flexWrap={'wrap'}>
            <Box display={'flex'} flexDirection={'row'} justifyContent={"center"} gap={"1rem"} textTransform={"capitalize"}>

            <Typography fontFamily={"fantasy"} variant="body2" component="p">
                Items en el Cart: {quantityC} 
            </Typography>
            <Typography fontFamily={"fantasy"} variant="body2" component="p">
                Cantidad Total por Items: {calcTotalPerItemsCart()}
            </Typography>
            </Box>
            
            <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="h6" component="p">
                Total a Pagar sin Iva: {calcTotalGlobalPay()}
            </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography variant="body1" component="p">
                Con Iva: {calcwithIva()}
            </Typography>
            </Box>
        </Box>
      
        <DialogActions>
          <Button onClick={handleVaciar}>Vaciar</Button>
          <Button onClick={handleClose}>Eliminar</Button>
          <Button onClick={handleClose}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalSlide

//La propiedad variant en Typography se utiliza para especificar el estilo o variante de tipografía que deseas utilizar. Puedes elegir entre diferentes valores predefinidos, como "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "caption" y "button". Cada valor tiene un estilo y tamaño de fuente asociado. Por ejemplo, variant="h6" aplicará un estilo de encabezado de nivel 6 a ese componente Typography.

//La propiedad component en Typography se utiliza para especificar el elemento HTML que se renderizará para ese componente Typography. Puedes elegir entre diferentes valores, como "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "caption", "button", "p", "span", etc. Por ejemplo, component="h2" indica que el componente Typography se renderizará como un elemento de encabezado de nivel 2 (<h2>).

{/* El componente <Dialog> se utiliza para representar el diálogo emergente. Tiene varias propiedades, incluyendo open que recibe el estado open, TransitionComponent que recibe el componente Transition definido anteriormente, onClose que recibe la función handleClose para manejar el cierre del diálogo, y aria-describedby para proporcionar una descripción accesible del diálogo. //Dentro de <Dialog>, se encuentran otros componentes como <DialogTitle>, <DialogContent>, <DialogContentText> y <DialogActions>, que se utilizan para estructurar y mostrar el contenido del diálogo. En este caso, muestra un título, un texto de contenido y dos botones de acciones ("Disagree" y "Agree") que llaman a la función handleClose cuando se hace clic en ellos.*/}

{/* La propiedad aria-describedby es una convención de accesibilidad que se utiliza para asociar un elemento en la página con una descripción que brinda más información sobre ese elemento. En este caso, el diálogo emergente tiene un elemento con id="alert-dialog-slide-description", y la propiedad aria-describedby se establece en ese ID para vincular la descripción al diálogo. */}