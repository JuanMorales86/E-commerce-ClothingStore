import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';//Libreria Material
import CartWidget from '../cartWidget/CartWidget';


//!Se definen dos componentes Transition y AlertDialogSlide
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="top" ref={ref} {...props} />;//se setea una transicion de aparicion del modal.
  
//El componente Transition es una función que utiliza React.forwardRef para pasar una referencia a otro componente. En este caso, toma dos parámetros: props y ref. Dentro de la función, retorna un componente <Slide> con la dirección establecida como "up" y la referencia pasada mediante ref. Además, se utiliza el operador spread ({...props}) para pasar todas las demás propiedades recibidas a <Slide>. Esto permite que el componente que recibe la referencia también tenga acceso a las demás propiedades.
});

const cart = 5

function ModalSlide({handleOpen, handleClose}) {
//El componente AlertDialogSlide o ModaSlide(nombre que le coloque yo) es un componente funcional que utiliza el hook useState de React para manejar el estado de open, que representa si el diálogo está abierto o cerrado. El diálogo se abre cuando se hace clic en el botón "Carrito" y se cierra cuando se hace clic en los botones "Disagree" o "Agree".


  return (
    <div>
      {/*Cuando se hace clic en el botón "Carrito", se invoca la función handleClickOpen, lo que establece el estado open en true y muestra el diálogo. */}
      <Button variant="text" onClick={handleOpen}>
      
      </Button>

      {/* El diálogo está representado por el componente Dialog de React. Se le pasa la prop open para indicar si el diálogo debe estar visible o no. La prop TransitionComponent se establece en el componente Transition que mencioné anteriormente para proporcionar la transición animada. */}
      <Dialog
        open={handleOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >{/* El componente <Dialog> se utiliza para representar el diálogo emergente. Tiene varias propiedades, incluyendo open que recibe el estado open, TransitionComponent que recibe el componente Transition definido anteriormente, onClose que recibe la función handleClose para manejar el cierre del diálogo, y aria-describedby para proporcionar una descripción accesible del diálogo. //Dentro de <Dialog>, se encuentran otros componentes como <DialogTitle>, <DialogContent>, <DialogContentText> y <DialogActions>, que se utilizan para estructurar y mostrar el contenido del diálogo. En este caso, muestra un título, un texto de contenido y dos botones de acciones ("Disagree" y "Agree") que llaman a la función handleClose cuando se hace clic en ellos.*/}
      {/* La propiedad aria-describedby es una convención de accesibilidad que se utiliza para asociar un elemento en la página con una descripción que brinda más información sobre ese elemento. En este caso, el diálogo emergente tiene un elemento con id="alert-dialog-slide-description", y la propiedad aria-describedby se establece en ese ID para vincular la descripción al diálogo. */}
        
        {/* formato UI del card en el modal */}
        <DialogTitle>{"Tus Productos"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            !aqui van los productos!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Eliminar</Button>
          <Button onClick={handleClose}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalSlide