import { List, Paper, Typography, ListItem, ListItemText, Button, Menu, MenuItem, Grid, Box } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { AppContex } from '../../Providers/contex-provider'


function OderList() {
    const {orders, markOrderStatus, orderStatuses} = useContext(AppContex)
    const [anchorEl, setAnchorEl] = React.useState(null)//tiene que ser anchorEl por que mui lo entiende asi //Estado para el menu desplegable
    const [selectedOrder, setSelectedOrder] = React.useState('')// Estado para la orden seleccionada
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

    

    const handleMenuDes = (e, order) => {//Funcion para abrir le menu desplegable
      console.log(order)
      setAnchorEl(e.currentTarget)
      setSelectedOrder(order)
    }

    const handleCloseMenu = () => {// Funcion para cerrar el menu desplegable
      setAnchorEl(null)
    }

    const handleStatusChange = (newStatus) => {//cerrar el menú desplegable y actualizar el estado de la orden.
      console.log(newStatus)
      console.log(selectedOrder)
      console.log(selectedOrder.customOrderId)
    
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

        <Grid container flexDirection={['column', 'row']} justifyContent={"center"} alignItems={"center"} spacing={3}>
        
      
          
          {orders.map((order, index) => (

          <Grid item xs={6} key={`${order.customOrderId}_${index}`}>
            <Paper
              elevation={3}
              sx={{ p: '16px', backgroundColor: '#F5F5F5' }}
              
            >
                <Typography variant="h6" color="primary" fontWeight={"bold"}>
                  Número de Orden: {order.customOrderId.toUpperCase()}
                </Typography>
               
                <Typography>Total A Facturar: ${order.total} Pesos.</Typography>
                <Typography>Fecha de Creación: {order.createAt.toDate().toLocaleDateString()}</Typography>
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
                  <MenuItem onClick={() => handleStatusChange("Eviada")}>Enviada</MenuItem>
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
                    <Box className='scroll-container'>
                    <ListItemText primary={`Email: ${order.buyer.email}`} className='textScrolls'>
                    </ListItemText>
                    </Box>
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
                        <ListItemText primary={`ProductoID: ${item.id}`} className='scroll-container' />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Cantidad: ${item.quantity} Unidades.`} />
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

    // sx={{whiteSpace:'normal',
    //                 overflowY:'auto', maxHeight:'6rem'}}
export default OderList