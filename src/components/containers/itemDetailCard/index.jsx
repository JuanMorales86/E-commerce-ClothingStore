import React from 'react'

//Libreria zoom-pan-pinch
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

//LibreriaMaterial
import { Box, Button, CardActions, Card, CardContent, Typography } from '@mui/material';

//Iconos Material
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

//Mis componentes
import ItemCount from '../item-count';
import { AppContex } from '../../../Providers/contex-provider';
import SlideritemDetailCard from '../../slider-swiper/slider-itemDetailCard';//!!Trabajo pendiente Logrado

const styletters={
  fontWeight:600,
}

//Mi card DETAIL
function CardDetail({data}) {
  const {id, customid, title, thumbnail, description, soldquantity, stock, price, discountSelected, size, color, imagen } = data

  const {handlePrToTrolley} = React.useContext(AppContex)

  //Parte de cart
  const addHandleToTrolley = (quantity, stock) => {//cuando se dispare este evento va a devolver los datos del array trolley relevantes gracias al spread en contex y el quantity de items del mimso producto que selecciono el user 
      handlePrToTrolley({//esta seleccion de items va tambien a taskOrder
          id:id,
          customid,
          producto: title,
          pricePerUnit: price,
          imagen: thumbnail,
          quantity: quantity,//tiene la cantidad del producto seleccionado en el carrito
          stock: stock,// tiene el stock original de el producto
          discountSelected,
          color,
          size
      })
  }

  return (
 
    <Card className='cardItemDetail' style={{borderRadius:"15px"}}>
      <Box className='cardItemDetailInner' >
        <CardContent className='cardItemDetailContent' >{/*(flex-grow: 1), no se encogerá (flex-shrink: 0) y tomará su tamaño base automático (flex-basis: auto). */}
          <Typography variant="h1" fontSize={'1.2rem'} textTransform={'capitalize'} fontWeight={"bold"} textAlign={'center'} style={styletters} fontFamily={"letters.fontM"} >
            {title}
          </Typography>
         
          <Typography variant="h5" color="text.secondary"  marginTop={'1rem'} fontSize={'0.9rem'} textAlign={'center'} style={styletters} fontFamily={"letters.fontM"}>
          {description || 'Sin descripcion'}
        </Typography>

        <Box className="cardItemDetailInnerContentBox">
          <Typography fontSize={'0.8rem'} textTransform={'capitalize'} fontWeight={700}   marginBottom={2} style={styletters} fontFamily={"letters.fontM"}>
              Codigo:{customid}
            </Typography>
          <Typography  color="text.secondary" style={styletters} fontFamily={"letters.fontM"}>
              {soldquantity ? `!Ya Vendidos: ${soldquantity} Und.` : '!Ya Vendidos: 0 Und.'}
            </Typography>
            <Typography  color="text.secondary" style={styletters} fontFamily={"letters.fontM"}>
              {size ? `Talle: ${size.toUpperCase()}` : 'Talle sin especificar'}
            </Typography>
            <Typography  color="text.secondary" style={styletters} fontFamily={"letters.fontM"} >
              {color ? `Color: ${color.charAt(0).toUpperCase() + color.slice(1).toLowerCase()}` : 'Color sin especificar'}
            </Typography>
            <Typography  color="text.secondary" style={styletters} fontFamily={"letters.fontM"}>
              Stock Almac.: {stock} Unid.
            </Typography>
            <Typography textAlign={"center"}  color="text.secondary" style={styletters} fontFamily={"letters.fontM"}>
              Precio-Original: $ {price} Pesos
            </Typography>
            {/* <Typography  color="text.secondary" >
              Precio-Oferta: {originalprice ? `${originalprice} Pesos` : 'Sin datos'}
            </Typography> */}
           
        </Box>
        </CardContent>

        <Box className="cardItemDetailInnerActions">
      
                <CardActions>
                <ItemCount stock={stock} addHandleToTrolley={addHandleToTrolley}/>
                </CardActions>
        </Box>

      </Box>
      {/* Componente para la funcionabilidad del zoom */}

      <TransformWrapper
            initialScale={1}
            initialPositionX={0}
            initialPositionY={0}
            
      >
        {/* si le quiero agregar botones */}
        {({ zoomIn, zoomOut, resetTransform }) => (
          <Box className="cardDetailTranformWrapperContainer" >
        <TransformComponent>
          <SlideritemDetailCard imagen={imagen} resetTransform={resetTransform}/>
        </TransformComponent>
          {/* Componente para la funcionabilidad del zoom */}
              <Box  className="cardDetailTranformWrapperContainerInner">
                <Button variant="text" onClick={() => zoomIn()}><ZoomInIcon fontSize='small' color='secondary'/></Button>
                <Button variant="text" onClick={() => zoomOut()}><ZoomOutIcon fontSize='small' color='secondary'/></Button>
                <Button variant="text" onClick={() => resetTransform()}><RestartAltIcon fontSize='small' color='secondary'/></Button>
              </Box>
       
        </Box>
        )}
      </TransformWrapper>
    </Card>
  );
}

export default CardDetail


//     <Button sx={{ marginLeft:1 }} variant='contained' size="small" component={Link} to="/products/all" state={{ selectedProductId }}>Volver</Button>

/* <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position:"absolute", marginLeft:["2rem", "17.5rem"],  marginTop:["2.1rem", "19.1rem"], marginBottom: ['22rem', null], border:"2px solid black"  }} className="tools"> */


// En el fragmento de código que proporcionaste, estás llamando inmediatamente las funciones handleMouseEnter y handleMouseLeave en los eventos onPointerEnter y onPointerLeave. Esto provocará que las funciones se ejecuten inmediatamente cuando el componente se renderiza, en lugar de esperar a que ocurran los eventos de entrada y salida del mouse.

// Para utilizar correctamente las funciones en los eventos, debes pasar la referencia de las funciones sin los paréntesis para que se ejecuten solo cuando ocurran los eventos. Aquí está cómo debería verse: 
// onPointerEnter={handleMouseEnter} // No uses los paréntesis aquí
// onPointerLeave={handleMouseLeave} // No uses los paréntesis aquí