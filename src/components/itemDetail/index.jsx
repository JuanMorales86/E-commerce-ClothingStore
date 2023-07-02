import React from 'react'
//Mis Componentes
import CardDetail from '../itemCount'

//Libreria Material
import { CircularProgress, Box } from '@mui/material'

//My lista itemDetail card
function ListElementsDetail( items, loading) {
  console.log(items)

  return (
    <Box display={'flex'} justifyContent={'center'} flexDirection={"row"} gap={5} flexWrap={'wrap'} marginTop={'2em'} >
    {
        (loading) ? 
        <CircularProgress variant='indeterminate'/>
        :
        items?.map((item, index) => {
          //  const key = index + item.title
          
            return (
                <CardDetail key={index} data={item}/>

            )
        })
    }
</Box>
  )
}

export default ListElementsDetail