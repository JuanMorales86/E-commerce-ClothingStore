import React, { useContext } from 'react'
//Libreria Hook Form
import { useForm } from 'react-hook-form'
//Libreria MaterialUi
import { Box, TextField, Button, Typography } from '@mui/material'
//Contex Provider
import { AppContex } from '../contex-provider'


// const emailValidator = (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

const UserData = ({trolley, createNewDispach}) => {//para usar useform la variable principal o el componente tiene que comenzar con letra mayusculas si no da error
  const {register, handleSubmit, formState: { errors, isValid } } = useForm()//Declaraciones de estado y funciones. //formState por react-hook-form contiene información sobre el estado del formulario, incluyendo si es válido o no.
  const {handleEmptyTrolley, notifyToast} = useContext(AppContex)
  const onSubmit = (data) => {//react-hook-form se encarga automáticamente de prevenir la recarga de la página cuando se envía el formulario.
    
    if(!createNewDispach || !trolley.length){//si no se cumplen retornara nada
      return
    }

    const task = {
      buyer: {
        name : data.name,
        lastname: data.lastname,
        telephone: data.telephone,
        email: data.email
      },
      items: trolley,
      createAt: new Date(),
      total: trolley.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0)//pricePerUnit es igual a price es un alias
    }
    createNewDispach(task)
    notifyToast('💨 Compra Terminada Correctamente')
  }

  return (
    <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
      <Typography fontSize={'1rem'} fontWeight={'bold'}>Datos requeridos para la factura</Typography>
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
        
        variant='contained'
        color='primary'
        onClick={handleSubmit(onSubmit)}
        disabled={!trolley.length || !isValid}//si no hay nda en el carrito desactiva el boton y si ningun textField tiene informacion o falte uno por llenar se desctivara tambien.
        style={{ marginTop: '1rem'}}
       >
        Enviar
        </Button>
      </Box>
    </Box>
  )
}

export default UserData

//En este caso, register se utilizará para registrar los campos del formulario y establecer las reglas de validación. handleSubmit se encargará de manejar la acción de envío del formulario y llamará a la función onSubmit que definimos. El objeto formState proporciona información sobre el estado del formulario, como los errores de validación.

//Aquí, en lugar de llamar a isFormValid(), accedemos a formState.isValid para determinar si el formulario es válido o no. El atributo isValid en formState es proporcionado automáticamente por react-hook-form. Con este cambio, ya no necesitarás la función isFormValid() y su llamada, y estarás utilizando directamente la validación del formulario a través de react-hook-form.