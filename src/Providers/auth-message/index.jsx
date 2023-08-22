import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'

function AuthMessage() {
    const navigate = useNavigate()
    
    
    const navegar = () => {
      navigate('/admin')
      
    }
  return (
    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
    <Typography>¡Ya estás autenticado!</Typography>
    <Button variant="contained" onClick={navegar}>Ir a Admin</Button>
  </Box>
  )
}

export default AuthMessage