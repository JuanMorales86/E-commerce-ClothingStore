import React from 'react'

//LibreriaMaterial

import { Box, Button, CardActions, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';


function CardDetail({item}) {
  return (
 
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {item.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {item.price}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <CardActions>
                <Button variant='contained' size="small">Agregar</Button>
                <Button variant='contained' size="small">Eliminar</Button>
                </CardActions>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={item.imgURL}
        alt={item.name}
      />
    </Card>
  );
}

export default CardDetail