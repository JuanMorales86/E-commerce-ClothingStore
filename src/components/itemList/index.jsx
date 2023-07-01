import React from 'react'
import { Box, CircularProgress } from '@mui/material'//Libreria Material
// import {v4 as uuidv4} from 'uuid'
import CardItems from '../item'//Mis Componenetes

//My lista de item 
const  ListElements = ({ loading, items }) => {
  return (
    <Box display={'flex'} justifyContent={'center'} flexDirection={"row"} gap={5} flexWrap={'wrap'} marginTop={'2em'} >
        {
            (loading) ? 
            <CircularProgress variant='indeterminate'/>
            :
            items?.map((item, index) => {
              console.log(item)
              //  const key = index + item.title
              const key = index
              console.log(key)
                return (
                        <CardItems data={item}/>
                )
            })
        }
    </Box>
  )
}

export default ListElements

// items?.map((item, index) => { })
// key={index + item.title}