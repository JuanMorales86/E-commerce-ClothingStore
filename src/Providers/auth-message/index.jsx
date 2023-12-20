import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import UseAuth from '../auth-useauth/useAuth'
import CustomTheme from '../../components/Custom-Styles/themes'//justamente este componente no esta montado en el app.jsx por eso importe o supongo q tenia que importar el CustomTheme


function AuthMessage({onClose}) {
  const {buttonStyles} = CustomTheme
    const {logOut, user} = UseAuth()
    const navigate = useNavigate()
    
    const handleLogout = () => {
      if (user) { 
        // cerrar sesión  
        onClose();
      } else {
        onClose(); // solo cierra el modal
      }
    }
    
    const navegar = () => {
      navigate('/admin')
    }

    const navegarOrdenes = () => {
      navigate('/ordenes')
    }
      
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "10vh", // Altura mínima del contenedor
      padding: "1rem",
      gap:"1rem",
    }}>
    <Typography textAlign={"center"} fontWeight={"bold"}>¡Ya estás autenticado!</Typography>
    <Box sx={{display: "flex", flexDirection:['column', 'row'], justifyContent:"center", gap:"0.75rem"}}>
    <Button style={buttonStyles.primary} variant="contained" onClick={navegar}>Ir a Admin</Button>
    <Button variant="contained" onClick={navegarOrdenes}>Ir a Odenes</Button>
    <Button variant="contained" onClick={handleLogout}>Cerrar</Button>
    <Button style={buttonStyles.danger} variant="contained" onClick={logOut}>Deslogearse</Button>
    </Box>
    
  </Box>
  )
}

export default AuthMessage