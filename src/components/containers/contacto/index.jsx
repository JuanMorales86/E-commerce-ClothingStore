import React from 'react'
import { Typography, Box, TextField, Button, Paper } from '@mui/material'
import { useForm } from 'react-hook-form'
import { AppContex } from '../../contex-provider'

function Contacto() {
    const {register, handleSubmit, reset} = useForm()
    const {notifyToast} = React.useContext(AppContex)

    const onSubmit = async (data) => {
            try {
                // Realiza la solicitud POST a formsubmit.co con los datos del formulario
                const response = await fetch('https://formsubmit.co/salpimienta.shop23@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
    
                if (response.ok) {
                    notifyToast(':relaxed: Formulario enviado exitosamente.');
                    reset();
                } else {
                    notifyToast('Error al enviar el formulario.');
                }
            } catch (error) {
                notifyToast('Error al enviar el formulario:', error);
                console.log('Error al enviar el formulario:', error);
            }
            reset()
        };

       
    

  return (
    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:"1rem"}}>
    <Typography variant='h4' component="h7">Contacto</Typography>
    
    <Paper sx={{ p: 2, maxWidth:400, width:'600px', margin: '0 auto', backgroundColor: '#f0f0f0' }}>
    <Box component='form' sx={{display:"flex",flexDirection:"column", gap:"1rem", marginTop:"1rem"}}>
        
        <TextField label='Nombre y Apellido' placeholder='Nombre y Apellido...' variant='outlined'
        {...register("name", {required:true})} fullWidth/>

        <TextField label='Email' placeholder='Email...' variant='outlined'
        {...register("email", {required:true})}/>

        <TextField id="outlined-multiline-static" multiline rows={4} maxRows={4} label='Consultas' placeholder='Deja aqui tu Consulta...'variant='outlined'
        {...register("userquestions", {required:true})}/>
    </Box>

    <Box sx={{margin:'1rem auto', textAlign:"center"}}>
    <Button variant='contained' type='submit' onClick={handleSubmit(onSubmit)}>Submit</Button>
    </Box>
    
    </Paper>

    </Box>
  )
}

export default Contacto