import React from 'react'
//Mis Componentes
import CardDetail from '../itemDetailCard'

//Libreria Material
import { CircularProgress, Box } from '@mui/material'

//My lista itemDetail card
function ListElementsDetail( {item, loading}) {
  // console.log(item)

  return (
    <Box display={'flex'} justifyContent={'center'} flexDirection={"row"} gap={5} flexWrap={'wrap'} marginTop={'2em'} >
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