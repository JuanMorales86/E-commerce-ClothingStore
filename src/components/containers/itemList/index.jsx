import React from 'react'

//Libreria Material
import { Box, CircularProgress } from '@mui/material'//Libreria Material
//Mis Componenetes
import CardItems from '../../containers/item'



//My lista de item 
const  ListElements = ({ loading, items, onItemClick }) => {//se agregan las props
  const handleItemClick = (productId) => {//se crea la funcion handleclick que maneja  otra funcion onitemclick y dentro se le pasa la propiedad productId en el boton
  
  onItemClick(productId)
  
  }
  return (
    <Box display={'flex'} justifyContent={'center'} flexDirection={"row"} gap={2} flexWrap={'wrap'}  margin={"1rem 1rem"} minHeight={"100vh"} overflow={"visible"}>
        {
            (loading) ? 
            <CircularProgress variant='indeterminate'/>
            :
            items?.map((item, index) => {
              const key = index + item.title
                return (
                        <CardItems key={key} data={item} onItemClick={handleItemClick}/>//se pasa la funcion para que llame a handleclick desde el boton
                )
            })
        }
    </Box>
  )
}

export default ListElements
