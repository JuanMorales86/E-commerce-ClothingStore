import React, { useContext } from 'react'
//Libreria Firebase
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
//Libreria MaterialUi
import { Box, TextField, Button, Typography } from '@mui/material'
//Contex Provider
import { AppContex } from '../../Providers/contex-provider'
//Libreria hook form
import { useForm } from 'react-hook-form'


//Orden, capturar la informacion del cliente almacenarla como ticked al finalizar la compra
const UserData = ({trolley, createNewDispach, onClose, total}) => {//para usar useform la variable principal o el componente tiene que comenzar con letra mayusculas si no da error

  const {register, handleSubmit, formState: { errors, isValid }, reset } = useForm()//Declaraciones de estado y funciones. //formState por react-hook-form contiene información sobre el estado del formulario, incluyendo si es válido o no.
  const { notifyToast } = useContext(AppContex)
  
  const modifierStockProducts = async (trolley) => {//Funcion para modificar stock en la base de datos segun lo que lleve el comprador
    const db = getFirestore()

    try{
      for (const producto of trolley) {
        const productRef = doc(db, 'productos', producto.id)
        const currentStock = parseInt(producto.stock)
      
      if(currentStock >= producto.quantity){
        await updateDoc(productRef, {stock: currentStock - producto.quantity})
        }else{
          throw new Error(`No hay stock suficiente: ${producto.producto}`)
      }
      }
    } catch (error) {
      throw error;
    }
    // onClose()
  }

  const onSubmit = async (data) => {//react-hook-form se encarga automáticamente de prevenir la recarga de la página cuando se envía el formulario.
    
    if(!createNewDispach || !trolley.length){//si no se cumplen no retornara nada
      return
    }
    try {
      await modifierStockProducts(trolley);
      
      // Formatea la fecha al formato deseado antes de insertarla en el objeto `order`
      const formatteDate = new Date().toLocaleDateString()// Esto utilizará el formato predeterminado

      createNewDispach({
        buyer: {
          name: data.name,
          lastname: data.lastname,
          direction: data.direction,
          dataoptional: data.dataoptional,
          telephone: data.telephone,
          email: data.email,
        },
        items: trolley,
        createAt: formatteDate,
        total: total,
        status: 'Pendiente', // Agregar el campo 'status' con valor 'Pendiente'
        // trolley.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0)
      });
      notifyToast('💨 Compra Terminada Correctamente');
      onClose();
      reset(); // Resetear el formulario
    } catch (error) {
      notifyToast("Error al modificar stock de productos", error);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
      <Typography fontSize={'1rem'} fontWeight={'bold'}>Datos requeridos para la factura</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{display:'block', justifyContent:'center', textAlign:'center' , rowGap:2, columnGap:3}}>
     
        <TextField 
        label="Nombre"
        variant='outlined'
        placeholder='Nombre...'
        {...register( "name", { required: true })}
        style={{ marginTop: '1rem', marginLeft: '1rem' }}
        />
           <TextField 
        label="Apellido"
        variant='outlined'
        placeholder='Apellido...'
        {...register( "lastname", { required: true })}
        style={{ marginTop: '1rem', marginLeft: '1rem' }}
        />
        <TextField 
        label="Dirección"
        variant='outlined'
        placeholder='Tu Dirección de entraga...'
        {...register( "direction", { required: true })}
        style={{ marginTop: '1rem', marginLeft: '1rem' }}
        />
        <TextField 
        label="Datos Opcionales"
        variant='outlined'
        placeholder='Deagonal casa azul...'
        {...register( "dataoptional", { required: false })}
        style={{ marginTop: '1rem', marginLeft: '1rem' }}
        />
        <TextField 
        label="Telefono"
        variant='outlined'
        placeholder='Telefono...'
        {...register( "telephone", { required: true })}
        style={{ marginTop: '1rem', marginLeft: '1rem' }}
        />
        <TextField
        label="Email"
        variant='outlined'
        placeholder='Email...'
        {...register( "email", {required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/})}//pattern valida el formato del campo de correo electrónico.
        error={errors.email}
        helperText={errors.email ? "Correo electrónico inválido" : ""}
        style={{ marginTop: '1rem', marginLeft: '1rem' }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
        type='submit'
        variant='contained'
        color='primary'
        disabled={!trolley.length || !isValid}//si no hay nda en el carrito desactiva el boton y si ningun textField tiene informacion o falte uno por llenar se desctivara tambien.
        style={{ marginTop: '1rem'}}
       >
        Enviar
        </Button>
      </Box>
      </form>
    </Box>
  )
}

export default UserData

