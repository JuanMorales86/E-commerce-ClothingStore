import React from 'react'
import { collection, getFirestore, onSnapshot } from 'firebase/firestore'
import { List, Paper, Typography, ListItem, ListItemText, Button, Menu, MenuItem, Grid } from '@mui/material'
import { useContext } from 'react'
import { AppContex } from '../../Providers/contex-provider'
import SearchBar from '../utilities/searchbar'



function OrderList() {
    const {orders, markOrderStatus, orderStatuses, filteredOrders} = useContext(AppContex)
    const [anchorEl, setAnchorEl] = React.useState(null)//tiene que ser anchorEl por que mui lo entiende asi //Estado para el menu desplegable
    const [selectedOrder, setSelectedOrder] = React.useState('')// Estado para la orden seleccionada
    const [displayedOrders, setdisplayedOrders] = React.useState([])// Estado para las órdenes a mostrar
    // const [updatestatus, setUpdateStatus] = React.useState('')
    
    // console.log(anchorEl)
    // console.log(selectedOrder)
    // console.log(orderStatuses)
  

    // const truncateEmail = (email, maxWidth) => {

    //   if (email.length > maxWidth)  {
      
    //   return email.slice(0, maxWidth) + " ..." ;
    //   }
    //   return email
    // }


    React.useEffect(() => {
       // Cuando el componente se carga o cuando cambian las órdenes o las órdenes filtradas,
        // actualizamos las órdenes que se muestran.
        const ordersToDisplay = filteredOrders.length > 0 ? filteredOrders : orders;
        setdisplayedOrders(ordersToDisplay);
    }, [orders, filteredOrders])

    const setupRealtimeListener = () => {
      const db = getFirestore()
      const taskOrderCollection = collection(db, 'taskOrder')
      onSnapshot(taskOrderCollection, (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => doc.data())
        setdisplayedOrders(ordersData)
        
      })
    }

    React.useEffect(() => {
      setupRealtimeListener()
      
    },[])

    const handleMenuDes = (e, order) => {//Funcion para abrir le menu desplegable
      console.log(order)
      setAnchorEl(e.currentTarget)
      setSelectedOrder(order)
    }

    const handleCloseMenu = () => {// Funcion para cerrar el menu desplegable
      setAnchorEl(null)
    }

    const handleStatusChange = (newStatus) => {//cerrar el menú desplegable y actualizar el estado de la orden.
    
      if(selectedOrder) {
        markOrderStatus(selectedOrder.customOrderId, newStatus)
      }
      handleCloseMenu()
    }


    
    return (
      <>
      <Grid container item xs={12} justifyContent={'center'} alignContent={'center'}  >
      <Typography variant="h3" mt={4} mb={4}>
        Lista de Órdenes
      </Typography>
      </Grid>

      <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} mb={6} mt={2}>
        <SearchBar/>
      </Grid>

        <Grid container flexDirection={['column', 'row']} alignItems={"center"} justifyContent={'center'}  spacing={2} >
        
      
          
          {displayedOrders.map((order, index) => (

          <Grid item xs={12} sm={6} md={4} key={`${order.customOrderId}_${index}`} m={0.05} >
            <Paper
              elevation={3}
              sx={{ p: '16px', backgroundColor: '#F5F5F5', width:"100%", margin:"0 0.05rem" }}
              
            >
                <Typography variant="h6" color="primary" fontWeight={"bold"}>
                  Número de Orden: {order.customOrderId.toUpperCase()}
                </Typography>
               
                <Typography>Total A Facturar: ${order.total} Pesos.</Typography>
                <Typography>Fecha de Creación: {order.createAt}</Typography>
                <Typography>Estado de la Orden: {orderStatuses[order.customOrderId]}</Typography>
                <Button 
                  aria-controls='order-status-menu'
                  aria-haspopup='true'
                  onClick={(e) => handleMenuDes(e, order)}
                  >
                  Cambiar Estado
                </Button>
                <Menu
                id='order-status-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}            
                >
                  <MenuItem onClick={() => handleStatusChange("Pendiente")}>Pendiente</MenuItem>
                  <MenuItem onClick={() => handleStatusChange("Enviada")}>Enviada</MenuItem>
                  <MenuItem onClick={() => handleStatusChange("Entregada")}>Entregada</MenuItem>
                  <MenuItem onClick={() => handleStatusChange("Devuelta")}>Devuelta</MenuItem>
                </Menu>
               
                <Typography variant="h6" color="primary" marginTop={"0.8rem"}>
                  Información del Cliente
                </Typography>
                {/* <List>
                  {Object.entries(order.buyer).map(([key, value]) => (
                    <ListItem key={key}>
                      <ListItemText primary={`${key}: ${value}`} />
                    </ListItem>
                  ))}
                </List> */}
                <List  >
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
            
              
                <Typography align={"center"} variant="h6" color="primary" fontWeight={"bold"}>
                  Productos
                </Typography>
                <List>
                  {order.items.map((item, itemIndex) => (
                    <Paper
                      key={itemIndex}
                      elevation={2}
                      style={{
                        p: 1,
                        my: 1,
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DDDDDD',
                        borderRadius: '4px',
                      }}
                    >
                      <ListItem>
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
                    </Paper>
                  ))}
                </List>
            </Paper>
          </Grid>
          ))}
        </Grid>
        </>
      );
    }
export default OrderList