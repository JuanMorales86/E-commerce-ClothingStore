import React from 'react'
//Mis Componentes
import CardDetail from '../itemDetailCard/index'

//Libreria Material
import { CircularProgress, Box } from '@mui/material'

//My lista itemDetail card
function ListElementsDetail( {item, loading}) {

  return (
    <Box display={'flex'} justifyContent={'center'} flexDirection={"row"} gap={5} flexWrap={'wrap'} margin={'2rem 2rem'} >
    {
        (loading) ? 
        <CircularProgress variant='indeterminate'/>
        :
        <CardDetail data={item}/>

            
        }
</Box>
  )
}

export default ListElementsDetail