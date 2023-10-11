import { Box, List, Paper, Typography, ListItem, ListItemText, Button, Menu, MenuItem, Stack } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { AppContex } from '../../Providers/contex-provider'

function OderList() {
    const {orders, markOrderStatus} = useContext(AppContex)
    const [anchorEl, setAnchorEl] = React.useState(null)//tiene que ser anchorEl por que mui lo entiende asi //Estado para el menu desplegable
    const [selectedOrder, setSelectedOrder] = React.useState(null)// Estado para la orden seleccionada
    console.log(anchorEl)
    console.log(selectedOrder)
    
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
      if(selectedOrder) {
        markOrderStatus(selectedOrder.customOrderId, newStatus)
      }
      handleCloseMenu()
    }
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" mt={2} mb={2}>
            Lista de Órdenes
          </Typography>
          {orders.map((order, index) => (
            <Paper
              key={`${order.customOrderId}_${index}`}
              elevation={3}
              sx={{ p: 2, my: 2, display: 'flex', flexWrap:'wrap', justifyContent:['center', 'space-around'], backgroundColor: '#F5F5F5', width: '50%', overflow:'hidden' }}
            >
              <Stack direction={'column'}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" color="primary" fontWeight={"bold"}>
                  Número de Orden: {order.customOrderId.toUpperCase()}
                </Typography>
                <Box sx={{textAlign:['center','start'], alignItems:'center'}}>
                <Typography>Total A Facturar: ${order.total} Pesos.</Typography>
                <Typography>Fecha de Creación: {order.createAt.toDate().toLocaleDateString()}</Typography>
                <Typography>Estado de la Orden: {order.status}</Typography>
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
                </Box>
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
                    <ListItemText primary={`Email: ${order.buyer.email}`}></ListItemText>
                    <ListItemText primary={`Direccion: ${order.buyer.direction}`}></ListItemText>
                    <ListItemText primary={`Datos opcionales: ${order.buyer.dataoptional}`}></ListItemText>
                  </ListItem>
                </List>
              </Box>
              </Stack>
              <Stack flexDirection={'column'}>
              <Box sx={{ flex: 0.5 }}>
                <Typography align={"center"} variant="h6" color="primary" fontWeight={"bold"}>
                  Productos
                </Typography>
                <List>
                  {order.items.map((item, itemIndex) => (
                    <Paper
                      key={itemIndex}
                      elevation={2}
                      sx={{
                        p: 1,
                        my: 1,
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DDDDDD',
                        borderRadius: '4px',
                      }}
                    >
                      <ListItem>
                        <ListItemText primary={`Articulo: ${item.producto}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`ProductoID: ${item.id}`} />
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
              </Box>
              </Stack>
            </Paper>
          ))}
        </Box>
      );
    }
export default OderList