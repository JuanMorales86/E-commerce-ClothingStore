import React, { useState } from 'react'
import { Card, Button, CardActions, CardContent, CardMedia, Typography, Box } from '@mui/material'//Libreria Material



function CardItems({id, imageURL, type, name, price, stock, description, shipping, brand}) {

  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Card sx={{ maxWidth: 345, boxShadow: '2px 2px 4px rgba(0,0,0,0.2)', overflow:"visible"}}>
        <CardMedia 
        component="img"
        alt={name}
        height="300"
        image={imageURL}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      
        sx={{ 
        
        objectFit:'contain',
        transition: 'transform 0.5s ease-out',
        '&:hover':{
          zIndex:1,
          borderRadius: 5,
          transform:'scale(1.8)',
          
        }
        }}//cover, contain, fill,scale-down
      />
      <CardContent  >
        <Box sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h7" component="div" fontWeight={"bold"} textAlign={"center"}    flexWrap={"wrap"}    sx={{
          maxHeight: '3rem',
          maxWidth: "100%",
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          { name }
      </Typography>
      <Typography gutterBottom component="div" variant="h7" sx={{display:"block"}}>
          Codigo: { id }
        </Typography>
      <Typography gutterBottom component="div" variant="h7" sx={{display:"block"}}>
          Tipo: { type }
        </Typography>
     
        <Typography variant="body2" color="text.secondary">
          Price: {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stock: {stock}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Envios: {shipping}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Marca: {brand}
        </Typography>
        </Box>
        {/* <Typography variant="body2" color="text.secondary" fontWeight={'bold'} marginTop={'1rem'} fontSize={'0.9rem'}>
          {description || ''}
        </Typography> */}
      </CardContent>
      <Box sx={{ display:'grid', height:'auto', placeItems:"center", marginBottom:"1rem" }}>
        {/* los pongo al fondo del card con margin top */}
      <CardActions > 
        <Button variant='contained' size="small">Comprar</Button>
        <Button variant='contained' size="small">Favoritos</Button>
      </CardActions>
      </Box>
    </Card>
  )
}

export default CardItems