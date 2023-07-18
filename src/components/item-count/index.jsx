import React, { useState } from 'react'
import { Link } from 'react-router-dom';

//Libreria SweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//Libreria Material
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';//Minus icon
import AddBoxIcon from '@mui/icons-material/AddBox';//Add icon
import { Button, Typography, Box } from '@mui/material';





function ItemCount({ stock, addHandleToTrolley }) {
    const [score, setScore] = useState(1)
    
   

    const addHandleCount = () => {
        if (score < stock){
        setScore(score + 1)
        }
    }

    const minusHandleCount = () => {
        if (score <= 1 ){
            return
        }
        setScore(score - 1)
    }
      

    //Parte de cart
    const handleTrollyCount = () => {
       
            addHandleToTrolley(score)
            setScore(1)//resetaer el score despues de tomar los datos en 1  
        }


  return (
    <>
    <Box sx={{}}>
    <Box sx={{display:'flex', flexDirection:'row', justifyContent:'start', alignItems:'center'}}>
    <Button variant='text' size='small' onClick={minusHandleCount}>
        <IndeterminateCheckBoxIcon fontSize='small'/>
    </Button>
    <Box paddingX={'0.1rem'} >
        <Typography fontSize={'1rem'} fontWeight={'bold'}>{score}</Typography>
    </Box>
     <Button variant='text' size='small'  onClick={addHandleCount}>
     <AddBoxIcon fontSize='small'/>
    </Button>
    </Box>
    
    <Box sx={{ display: 'flex', pl: 1, pb: 1, marginTop:'1rem' }}>
    <Button variant='contained' size="small" sx={{marginRight:'1rem'}} onClick={handleTrollyCount}>Agregar</Button>
    <Button variant='contained' size="small" sx={{marginRight:'1rem'}}>Eliminar</Button>
    <Button variant='contained' size="small" component={Link} to="/products/all">Volver</Button>
    </Box>
    </Box>
    
    </>
  )
}

export default ItemCount