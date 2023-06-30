import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
//Mis Componentes
import CardDetail from '../card-detail'

//Libreria Material
import { CircularProgress, Box } from '@mui/material'

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