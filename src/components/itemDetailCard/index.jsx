import React from 'react'
//LibreriaMaterial
import { Box, CardActions, Card, CardContent, CardMedia, Typography } from '@mui/material';
//Mis componentes
import ItemCount from '../item-count';
import { AppContex } from '../contex-provider';

//Mi card DETAIL
function CardDetail({data, selectedProductId}) {
  const { id, title, thumbnail, description, sold_quantity, available_quantity, original_price, price } = data


  // console.log(data)
  // console.log(selectedProductId)

  // const {age, user} = React.useContext(AppContex)
  // console.log(age + user)

  const {handlePrToTrolley, quantityC} = React.useContext(AppContex)//!Llamo a handlePrToTrolley gracias a AppContex

  //Parte de cart
  const addHandleToTrolley = (quantity) => {//cuando se dispare este evento va a devolver los datos de la bd relevantes gracias al spread en contex y el quantity de items del mimso producto que selecciono el user 
      console.log({
        id: id,
        producto: title,
        pricePerUnit: price,
        imagen: thumbnail,
        quantity: quantity,
        quantityC
      });
      handlePrToTrolley({
          id:id,
          producto:title,
          pricePerUnit: price,
          imagen: thumbnail,
          quantity: quantity,
      })
  }

  return (
 
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height:"auto" }}>
        <CardContent sx={{ flex: '1 0 auto', width:'300px', height:"200px" }}>{/*(flex-grow: 1), no se encogerá (flex-shrink: 0) y tomará su tamaño base automático (flex-basis: auto). */}
          <Typography component="div" variant="h5" fontSize={'1rem'} textTransform={'capitalize'} fontWeight={'bold'} letterSpacing={'.2rem'} textAlign={'center'} >
            {title}
          </Typography>
         
          <Typography variant="body2" color="text.secondary" fontWeight={'bold'} marginTop={'1rem'} fontSize={'0.9rem'} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
          {description || 'Sin descripcion'}
        </Typography>
        <Box sx={{marginTop:'1rem'}}>
        <Typography component="div" variant="h5" fontSize={'0.8rem'} textTransform={'capitalize'} fontWeight={700} letterSpacing={'.1rem'} textAlign={'start'} >
            Codigo:{id}
          </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
            !Ya vendidos: {sold_quantity} Unid.
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Stock Almac.: {available_quantity} Unid.
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Precio-Original: $ {original_price} Pesos
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Precio-Oferta: $ {price} Pesos
          </Typography>
          </Box>
        </CardContent>

      
      
        <Box sx={{ marginTop:'3rem' }}>
      
                <CardActions>
                <ItemCount stock={available_quantity} addHandleToTrolley={addHandleToTrolley}/>
                </CardActions>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 250, objectFit:"cover" }}
        image={thumbnail}
        alt={title}
      />
    </Card>
  );
}

export default CardDetail

//     <Button sx={{ marginLeft:1 }} variant='contained' size="small" component={Link} to="/products/all" state={{ selectedProductId }}>Volver</Button>