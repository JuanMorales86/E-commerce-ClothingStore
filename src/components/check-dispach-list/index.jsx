import { Box, List, Paper, Typography, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { AppContex } from '../../Providers/contex-provider'

function OderList() {
    const {orders} = useContext(AppContex)
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" mt={2} mb={2}>
            Lista de Órdenes
          </Typography>
          {orders.map((order, index) => (
            <Paper
              key={`${order.customOrderId}_${index}`}
              elevation={3}
              sx={{ p: 2, my: 2, display: 'flex', backgroundColor: '#F5F5F5', width: '80%' }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" color="primary">
                  Número de Orden: {order.customOrderId}
                </Typography>
                <Typography>Total A Facturar: ${order.total}</Typography>
                <Typography>Fecha de Creación: {order.createAt.toDate().toLocaleDateString()}</Typography>
                <Typography variant="h6" color="primary">
                  Información del Cliente
                </Typography>
                <List>
                  {Object.entries(order.buyer).map(([key, value]) => (
                    <ListItem key={key}>
                      <ListItemText primary={`${key}: ${value}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" color="primary">
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
                        <ListItemText primary={`Producto: ${item.producto}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`ProductoID: ${item.id}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Cantidad: ${item.quantity}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Descuento hecho de: ${item.discountSelected}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={`Valor cada unidad: $${item.pricePerUnit}`} />
                      </ListItem>
                    </Paper>
                  ))}
                </List>
              </Box>
            </Paper>
          ))}
        </Box>
      );
    }
export default OderList