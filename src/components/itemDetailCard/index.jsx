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
import { AppContex } from '../contex-provider';

//Mi card DETAIL
function CardDetail({data}) {
  const {id, customid, title, thumbnail, description, sold_quantity, stock, original_price, price } = data

  const [isHovered, setIsHovered] = React.useState(false)//estado para el hover

  const [showZoomMessage, setShowZoomMessage] = React.useState(false)//estado para el mensage de hacer zoom


  const {handlePrToTrolley} = React.useContext(AppContex)//!Llamo a handlePrToTrolley gracias a AppContex

  //Parte de cart
  const addHandleToTrolley = (quantity, stock) => {//cuando se dispare este evento va a devolver los datos del array trolley relevantes gracias al spread en contex y el quantity de items del mimso producto que selecciono el user 
      handlePrToTrolley({//esta seleccion de items va tambie a task
          id:id,
          producto: title,
          pricePerUnit: price,
          imagen: thumbnail,
          quantity: quantity,//tiene la cantidad del producto seleccionado en el carrito
          stock: stock// tiene el stock original de el producto
      })
  }

  const handleMouseEnter = () => {
    console.log("Mouse enter")
    setIsHovered(true)
    setShowZoomMessage(true)
  }

  const handleMouseLeave = () => {
    console.log("Mouse Leave")
    setIsHovered(false);
    setTimeout(() => {
      setShowZoomMessage(false)
    }, 2000)
    console.log(setShowZoomMessage)
  }

  return (
 
    <Card sx={{ display: 'flex', flexDirection:['column-reverse', 'row'], backgroundColor: '#f9f9f9', borderRadius: ['10px', '15px'], boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height:"auto", margin:"0 auto" }}>
        <CardContent sx={{ flex: '1 0 auto', width:'auto', height:"auto" }}>{/*(flex-grow: 1), no se encogerá (flex-shrink: 0) y tomará su tamaño base automático (flex-basis: auto). */}
          <Typography component="div" variant="h5" fontSize={'1rem'} textTransform={'capitalize'} fontWeight={'bold'} letterSpacing={'.2rem'} textAlign={'center'} >
            {title}
          </Typography>
         
          <Typography variant="body2" color="text.secondary" fontWeight={'bold'} marginTop={'1rem'} fontSize={'0.9rem'} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
          {description || 'Sin descripcion'}
        </Typography>

        <Box sx={{marginTop:'1rem',display:'flex', flexDirection:'column', alignItems:['center', 'start']}}>
          <Typography component="div" variant="h5" fontSize={'0.8rem'} textTransform={'capitalize'} fontWeight={700} letterSpacing={'.1rem'} textAlign={'start'} >
              Codigo:{customid}
            </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
              !Ya vendidos: {sold_quantity} Unid.
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Stock Almac.: {stock} Unid.
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Precio-Original: $ {original_price} Pesos
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Precio-Oferta: $ {price} Pesos
            </Typography>
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
        onPointerEnter={() => setIsHovered(true)}//activar hover
        onPointerLeave={() => setIsHovered(false)}//desactivar hover
      >
      
        {/* si le quiero agregar botones */}
        {({ zoomIn, zoomOut, resetTransform }) => (
          <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"end"}}>
         <TransformComponent>
          <CardMedia
            component="img"
            sx={{ width:"350px", height: "auto", objectFit:"cover",  borderTopRightRadius: '8px', borderBottomRightRadius: ['0', '10px'],
            transition: "transform 0.5s ease",
            transform: isHovered ? 'scale(1.3)' : 'scale(1)', // Aplicar zoom solo cuando se hace hover(me parece que no funciona)
            position:"relative"  
          }}
            image={thumbnail}
            alt={title}
          />
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

{/* <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position:"absolute", marginLeft:["2rem", "17.5rem"],  marginTop:["2.1rem", "19.1rem"], marginBottom: ['22rem', null], border:"2px solid black"  }} className="tools"> */}