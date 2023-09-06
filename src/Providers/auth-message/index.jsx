import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'

function AuthMessage({onClose}) {
    const navigate = useNavigate()
    
    
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
    <Button variant="contained" onClick={navegar}>Ir a Admin</Button>
    <Button variant="contained" onClick={navegarOrdenes}>Ir a Odenes</Button>
    <Button variant="contained" onClick={onClose}>Cerrar</Button>
    </Box>
    
  </Box>
  )
}

export default AuthMessage