import React from 'react'
//import { collection, getFirestore, onSnapshot } from 'firebase/firestore'
import { List, Paper, Typography, ListItem, ListItemText, Grid, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material'
import { useContext } from 'react'
import { AppContex } from '../../Providers/contex-provider'
import SearchBar from '../utilities/searchbar'
import { onOrdersUpdate } from '../../Providers/Api/api'
import ButtonMenu from '../containers/menu-boton/menuboton'



function OrderList() {
    const { orders2, markOrderStatus, orderStatuses, filteredOrders, handleOrderPageChanger} = useContext(AppContex)
    const [anchorEl, setAnchorEl] = React.useState(null)//tiene que ser anchorEl por que mui lo entiende asi //Estado para el menu desplegable
    const [selectedOrder, setSelectedOrder] = React.useState('')// Estado para la orden seleccionada
    const [displayedOrders, setdisplayedOrders] = React.useState([])// Estado para las órdenes a mostrar
    const open = Boolean(anchorEl)
    // const truncateEmail = (email, maxWidth) => {

    //   if (email.length > maxWidth)  {
      
    //   return email.slice(0, maxWidth) + " ..." ;
    //   }
    //   return email
    // }

    //Escucha para cambiar la imagen en el orderlist
    React.useEffect(() => {
      handleOrderPageChanger(true)
      return () => handleOrderPageChanger(false)
    },[handleOrderPageChanger])

    React.useEffect(() => {
       // Cuando el componente se carga o cuando cambian las órdenes o las órdenes filtradas,
        // actualizamos las órdenes que se muestran.
        const ordersToDisplay = filteredOrders.length > 0 ? filteredOrders : orders2;
        setdisplayedOrders(ordersToDisplay);
    }, [orders2, filteredOrders])

    
    //Busco escuchar el cambio en las ordenes y mostrarlo en displayedOrders (Polling)
    React.useEffect(() => {
      const handleUpdate = (displayedOrders) => {
        setdisplayedOrders(displayedOrders)
      }

      const unsubscribe = onOrdersUpdate(handleUpdate)

      return unsubscribe
    },[])

    
    // const handleCloseMenu = () => {// Funcion para cerrar el menu desplegable
    //   setAnchorEl(null)
    // }

    const handleMenuDes = (e, order) => {//Funcion para abrir le menu desplegable
      if(e){

        setAnchorEl(e.currentTarget)
      }
      setSelectedOrder(order)
    }

    const handleStatusChange = (newStatus) => {// actualizar el estado de la orden.
      markOrderStatus(selectedOrder.customOrderId, newStatus) 
    }
    
    return (
      <>
      <Grid container item xs={12} justifyContent={'center'} alignContent={'center'}  >
      <Typography className='degradado-texto'  mt={4} mb={4} fontFamily={"letters.fontM"} fontSize={"2.5rem"} fontWeight={600}>
        Lista de Órdenes
      </Typography>
      </Grid>

      <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} mb={6} mt={2}>
        <SearchBar/>
      </Grid>

        <Grid container flexDirection={['column', 'row']} alignItems={"center"} justifyContent={'center'}  spacing={3} >

          {displayedOrders.map((order, index) => (

          <Grid item xs={12} sm={6} md={4} key={`${order.customOrderId}_${index}`} m={0.05} >
            <Paper
              elevation={4}
              sx={{ p: '16px', backgroundColor: '#F5F5F5',maxWidth:"100vw", margin:"0 0.05rem" }}
            >
                <Typography variant="h6" color="primary" fontWeight={"bold"}>
                  Número de Orden: {order.customOrderId.toUpperCase()}
                </Typography>
               
                <Typography>Total A Facturar: ${order.total} Pesos.</Typography>
                <Typography>Fecha de Creación: {order.createAt}</Typography>
                <Typography>Estado de la Orden:<span className='degradado-orderstatus'>
                        { orderStatuses[order.customOrderId]}</span>
                  </Typography>

                  <ButtonMenu orderSe={order} displayedOrders={displayedOrders} onSelectOrder={handleMenuDes} handleStatusChange={handleStatusChange} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} open={open}/>

         
              
                <Typography variant="h6" color="primary" fontWeight={"bold"} marginTop={"0.8rem"} fontFamily={"letters.fontM"}>
                  Información del Cliente
                </Typography>
                <List  className='list-element-orders'>
                  <ListItem sx={{display:"block", flexFlow:"row wrap"}}>
                    
                    <ListItemText primary={`Nombre: ${order.buyer.name}`}></ListItemText>
                    <ListItemText primary={`Apellido: ${order.buyer.lastname}`}></ListItemText>
                    <ListItemText primary={`Telefono: ${order.buyer.telephone}`}></ListItemText>
                    
                    <ListItemText primary={`Email: ${order.buyer.email}`} className='scroll-container'>
                    </ListItemText>
                    
                    <ListItemText primary={`Direccion: ${order.buyer.direction}`}></ListItemText>
                    <ListItemText primary={`Datos opcionales: ${order.buyer.dataoptional}`}></ListItemText>
                  
                  </ListItem>
                </List>
            
              <Accordion>
                <AccordionSummary sx={{display:"flex", flexFlow:"column wrap"}}>
                <Typography  variant="h6" color="primary" fontWeight={"bold"} fontFamily={"letters.fontM"}>
                  Productos
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <List>
                  {order.items.map((item, itemIndex) => (
                    <Paper
                      key={itemIndex}
                      elevation={0}
                      sx={{
                        p: 1,
                        border: '1px solid #DDDDDD',
                        borderRadius: '16px',
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"left",
                        
                      }}
                    >
                      <Box >
                      <ListItem   >
                        <ListItemText primary={`Articulo: ${item.producto}`}  />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`ProductoID: ${item.customid}`} className='scroll-container' />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Cantidad: ${item.quantity} Unidades.`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Color: ${item.color}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Talle: ${item.size}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Descuento hecho de: ${item.discountSelected}%`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Valor cada unidad: $${item.pricePerUnit} Pesos.`} />
                      </ListItem>

                      </Box>
                    </Paper>
                  ))}
                </List>
                </AccordionDetails>
              </Accordion>
               
            </Paper>
          </Grid>
          ))}
        </Grid>
        </>
      );
    }
export default OrderList