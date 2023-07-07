import React, { useState } from 'react'

//Libreria Material
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';//Minus icon
import AddBoxIcon from '@mui/icons-material/AddBox';//Add icon
import { Button, Typography, Box } from '@mui/material';



function ItemCount({ stock }) {
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

  return (
    <>
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
    </>
  )
}

export default ItemCount