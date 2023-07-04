import React from 'react'
import { Link } from 'react-router-dom';

//LibreriaMaterial

import { Box, Button, CardActions, Card, CardContent, CardMedia, Typography } from '@mui/material';

//Mi card DETAIL
function CardDetail({data, selectedProductId}) {
  // console.log(data)
  // console.log(selectedProductId)
  return (
 
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto', width:'300px', height:"200px" }}>
          <Typography component="div" variant="h5" fontSize={'1rem'} textTransform={'capitalize'} fontWeight={'bold'} letterSpacing={'.2rem'} textAlign={'center'} >
            {data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={'bold'} marginTop={'1rem'} fontSize={'0.5rem'}>
          {data.description || ''}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
            Ya vendidos: {data.sold_quantity} Unid.
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Precio: ${data.price}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <CardActions>
                <Button variant='contained' size="small">Agregar</Button>
                <Button variant='contained' size="small">Eliminar</Button>
                <Button sx={{ marginLeft:1 }} variant='contained' size="small" component={Link} to="/products/all" state={{ selectedProductId }}>Volver</Button>
                </CardActions>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 250, objectFit:"cover" }}
        image={data.thumbnail}
        alt={data.title}
      />
    </Card>
  );
}

export default CardDetail