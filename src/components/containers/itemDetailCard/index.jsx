import React from 'react'

//Libreria zoom-pan-pinch
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

//LibreriaMaterial
import { Box, Button, CardActions, Card, CardContent, CardMedia, Typography } from '@mui/material';

//Iconos Material
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

//Mis componentes
import ItemCount from '../item-count';
import { AppContex } from '../../../Providers/contex-provider';
//import SlideritemDetailCard from '../../slider-swiper/slider-itemDetailCard';//!!Trabajo pendiente

const styletters={
  fontWeight:600,
}

//Mi card DETAIL
function CardDetail({data}) {
  const {id, customid, title, thumbnail, description, soldquantity, stock, price, discountSelected, size, color } = data

  const [isHovered, setIsHovered] = React.useState(false)//estado para el hover

  const [, setShowZoomMessage] = React.useState(false)//estado para el mensage de hacer zoom


  const {handlePrToTrolley} = React.useContext(AppContex)//!Llamo a handlePrToTrolley gracias a AppContex

  //Parte de cart
  const addHandleToTrolley = (quantity, stock) => {//cuando se dispare este evento va a devolver los datos del array trolley relevantes gracias al spread en contex y el quantity de items del mimso producto que selecciono el user 
      handlePrToTrolley({//esta seleccion de items va tambie a taskOrder
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

  const handleMouseEnter = () => {
    setIsHovered(true)
    setShowZoomMessage(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => {
      setShowZoomMessage(false)
    }, 2000)
  }

  return (
 
    <Card className='cardItemDetail' sx={{ display: 'flex', flexDirection:['column-reverse', 'row'], backgroundColor: '#f9f9f9', borderRadius: ['10px', '15px'], boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height:"auto", margin:"0 auto"  }}>
        <CardContent sx={{ flex: '2 1 200px', width:'auto', height:"auto", display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center' }}>{/*(flex-grow: 1), no se encogerá (flex-shrink: 0) y tomará su tamaño base automático (flex-basis: auto). */}
          <Typography variant="h1" fontSize={'1.2rem'} textTransform={'capitalize'} fontWeight={"bold"} textAlign={'center'} style={styletters} fontFamily={"letters.fontM"} >
            {title}
          </Typography>
         
          <Typography variant="h5" color="text.secondary"  marginTop={'1rem'} fontSize={'0.9rem'} textAlign={'center'} style={styletters} fontFamily={"letters.fontM"}>
          {description || 'Sin descripcion'}
        </Typography>

        <Box sx={{marginTop:'1rem',display:'flex', flexDirection:'column', alignItems:'center'}}>
          <Typography variant="h5" fontSize={'0.8rem'} textTransform={'capitalize'} fontWeight={700}  textAlign={'center'} marginBottom={2} style={styletters} fontFamily={"letters.fontM"}>
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
            <Typography  color="text.secondary" style={styletters} fontFamily={"letters.fontM"}>
              Precio-Original: $ {price} Pesos
            </Typography>
            {/* <Typography  color="text.secondary" >
              Precio-Oferta: {originalprice ? `${originalprice} Pesos` : 'Sin datos'}
            </Typography> */}
           
        </Box>
        </CardContent>

        <Box sx={{ display:'flex', flexDirection:'column' , alignItems: ['center', 'center'] }}>
      
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
          <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"end"}}>
        <TransformComponent>
          <CardMedia
            className='cardDetailImage'
            component="img"
            sx={{ width:["350px","480px"], height: "100%", objectFit:"cover",  borderTopRightRadius: '15px', borderBottomRightRadius: ['0', '15px'],borderTopLeftRadius: ['15px', '0'], border:'2px solid black' ,
            transition: "transform 0.5s ease",
            transform: isHovered ? 'scale(1.3)' : 'scale(1)', // Aplicar zoom solo cuando se hace hover(me parece que no funciona)
            position:"relative", 
          }}
            image={thumbnail}
            alt={title}
            onMouseEnter={handleMouseEnter}//activar hover
            onMouseLeave={handleMouseLeave}//desactivar hover
          />
          {/* <SlideritemDetailCard isHovered={isHovered} thumbnail={thumbnail} /> */}
             </TransformComponent>
          {/* Componente para la funcionabilidad del zoom */}
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems: 'center', position:"absolute", gap:1, mb:"1rem", border:"2px solid white", borderRadius:"20px"  }} className="tools">
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