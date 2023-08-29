import React from 'react'
//Libreria Material
import {Box} from '@mui/material'
import { useNavigate } from 'react-router-dom'

function DiscountsBar() {
    const navigate = useNavigate()

    
    const navegar = (e) => {
        navigate(`/products/descuentos`)


    }
  return (
    <Box className="bordInit" onClick={navegar}></Box>
  )
}

export default DiscountsBar