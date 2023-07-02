import React from 'react'
import { Box, CircularProgress } from '@mui/material'//Libreria Material
// import {v4 as uuidv4} from 'uuid'
import CardItems from '../item'//Mis Componenetes

//My lista de item 
const  ListElements = ({ loading, items, onItemClick }) => {//se agregan las props
  console.log(items)

  const handleItemClick = (productId) => {//se crea la funcion handleclick que maneja va a recibir otra funcion onitemclick y dentro se le pasa la propiedad productId en el boton
    console.log("Product ID:", productId)
    onItemClick(productId)
  
  }
  return (
    <Box display={'flex'} justifyContent={'center'} flexDirection={"row"} gap={5} flexWrap={'wrap'} marginTop={'2em'} >
        {
            (loading) ? 
            <CircularProgress variant='indeterminate'/>
            :
            items?.map((item, index) => {
              // console.log(item)
              //  const key = index + item.title
              const key = index + item.title
              // console.log(key)
                return (
                        <CardItems key={key} data={item} onItemClick={handleItemClick}/>//se pasa la funcion para que llame a handleclick desde el boton
                )
            })
        }
    </Box>
  )
}

export default ListElements

// items?.map((item, index) => { })
// key={index + item.title}