import React from 'react'
//Mis Componentes
import CardDetail from '../itemCount'

//Libreria Material
import { CircularProgress, Box } from '@mui/material'

//My lista itemDetail card
function ListElementsDetail( item, loading) {

  return (
    <Box display={'flex'} justifyContent={'center'} flexDirection={"row"} gap={5} flexWrap={'wrap'} marginTop={'2em'} >
    {
        (loading) ? 
        <CircularProgress variant='indeterminate'/>
        :
        item?.map((items, index) => {
          //  const key = index + item.title
          const key = index
          console.log(key)
            return (
                <CardDetail item={items}/>

            )
        })
    }
</Box>
  )
}

export default ListElementsDetail