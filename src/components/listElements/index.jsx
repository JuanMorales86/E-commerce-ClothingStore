import React from 'react'
import { Box, CircularProgress } from '@mui/material'//Libreria Material
// import {v4 as uuidv4} from 'uuid'
import CardItems from '../card-item'//Mis Componenetes

const  ElementsList = ({ loading, items }) => {
  return (
    <Box display={'flex'} justifyContent={'center'} flexDirection={"row"} gap={5} flexWrap={'wrap'} marginTop={'2em'} >
        {
            (loading) ? 
            <CircularProgress variant='indeterminate'/>
            :
            items?.map((item, index) => {
              //  const key = index + item.title
              const key = index
              console.log(key)
                return (
                        <CardItems key={key + item.title} id={key} imageURL={item.image} type={item.type} name={item.title} price={item.price} stock={item.stock} description={item.description} shipping={item.shipping} brand={item.brand} />
                )
            })
        }
    </Box>
  )
}

export default ElementsList

// items?.map((item, index) => { })
// key={index + item.title}