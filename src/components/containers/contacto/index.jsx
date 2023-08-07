import React from 'react'
import { Typography, Box, TextField, Button, Paper } from '@mui/material'
import { useForm } from 'react-hook-form'
import { AppContex } from '../../contex-provider'
import emailjs from '@emailjs/browser';



function Contacto() {
    const {register, handleSubmit, reset, formState: { errors }} = useForm()
    const {notifyToast} = React.useContext(AppContex)
    const form = React.useRef()

    //     try {
    //         const form = document.createElement('form');
    //         form.action = 'https://formsubmit.co/juanjosemorales1986@gmail.com';
    //         form.method = 'POST';

    //         // Crear un elemento de entrada para cada campo de datos y añadirlos al formulario
    //         Object.entries(data).forEach(([key, value]) => {
    //             const input = document.createElement('input');
    //             input.type = 'hidden';
    //             input.name = key;
    //             input.value = value;
    //             form.appendChild(input);
    //         });

    //         // Añadir el formulario al documento y enviarlo
    //         document.body.appendChild(form);
    //         form.submit();
            
    //         //quitar el formulario del documento despues de enviarlo
    //         document.body.removeChild(form);

    //         notifyToast('Formulario enviado exitosamente.');
    //         reset();
    //     } catch (error) {
    //         console.log('Error al enviar el formulario:', error);
    //         notifyToast('Error al enviar el formulario.');
    //     }
    // };

    // const onSubmit = async (data) => {
    //     try {
    //         await emailjs.sendForm('react_contact_detail', 'template_dybd6hl', form.current, 'Ab9gNllYCT5UB5o8m');

    //         notifyToast('Formulario enviado exitosamente.');
    //         reset();
    //     } catch (error) {
    //         console.log('Error al enviar el formulario:', error);
    //         notifyToast('Error al enviar el formulario.');
    //     }
    // };

    const onSubmit = async (formData) => {
        try {

        await emailjs.send('React_Sal_&_Pimienta', 'template_dybd6hl', formData, 'Ab9gNllYCT5UB5o8m');
    
          notifyToast('Formulario enviado exitosamente.');
          
        } catch (error) {
          console.log('Error al enviar el formulario:', error.text);
          notifyToast('Error al enviar el formulario.');
        }
        reset();
      };
       
    

  return (
    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:"1rem"}}>
    <Typography variant='h4' component="h5">Contacto</Typography>
    
    <Paper sx={{ p: 2, maxWidth:400, width:'600px', margin: '0 auto', backgroundColor: '#f0f0f0' }}>
    <form ref={form} onSubmit={handleSubmit(onSubmit)}> 
    <Box component='form'  sx={{display:"flex",flexDirection:"column", gap:"1rem", marginTop:"1rem"}}>
        
        <TextField label='Nombre y Apellido' placeholder='Nombre y Apellido...' variant='outlined' name='user_name'
        {...register("user_name", {required:true, validate: {
          minLength: (value) => value.split("").length >= 4,
        }
        })}
        helperText={
          errors.user_name ? errors.user_name.type === "required"
          ? "Campo requerido"
          : "Minimo 4 palabras"
        : ""
        }
        error={Boolean(errors.user_name)}
        sx={{
          "& input": {
            borderColor: errors.user_name ? "red" : "",
            backgroundColor: errors.user_name ? "#ffeeee" : "",
          }
        }} fullWidth/>

        <TextField label='Email' placeholder='Email...' variant='outlined' name='user_email'
        {...register("user_email", {required:true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/})} helperText={errors.user_email ? "Correo electrónico inválido: algo@gmail.com" : ""}  error={Boolean(errors.user_email)} sx={{
          // Estilo para resaltar el campo cuando hay un error
          "& input": {
            borderColor: errors.user_email ? "red" : "", // Cambiar el borde a rojo si hay error
            backgroundColor: errors.user_email ? "#ffeeee" : "", // Cambiar el fondo a rojo claro si hay error
          }
        }}/>

        <TextField id="outlined-multiline-static" multiline rows={4} label='Consultas' placeholder='Deja aqui tu Consulta...'variant='outlined' name='message'
        {...register("message", {required:true,
        validate: {
          minLength: (value) => value.split("").length >= 5,
        },

        })}
        helperText={
          errors.message ? errors.message.type === "required"
          ? "Campo requerido"
          : "Minimo 5 palabras"
        : ""
        }
        error={Boolean(errors.message)}
        sx={{
          "& textarea": {
            borderColor: errors.message ? "red" : "",
            backgroundColor: errors.message ? "#ffeeee" : "",
          }
        }}
        />
    </Box>

    <Box sx={{margin:'1rem auto', textAlign:"center"}}>
    <Button variant='contained' type='submit' onClick={handleSubmit(onSubmit)} >Submit</Button>
    </Box>
    </form>
    </Paper>

    </Box>
  )
}

export default Contacto