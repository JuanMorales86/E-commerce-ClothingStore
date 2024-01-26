import React from "react";
//import { collection, getFirestore, onSnapshot } from 'firebase/firestore'
import {
  List,
  Paper,
  Typography,
  ListItem,
  ListItemText,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import { useContext } from "react";
import { AppContex } from "../../Providers/contex-provider";
import SearchBar from "../utilities/searchbar";
import { onOrdersUpdate } from "../../Providers/Api/api";
import ButtonMenu from "../containers/menu-boton/menuboton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const stylesOrders = {
  borderBottom: "2px solid #eee",
  marginTop: "0.34rem",

  "&:hover": {
    backgroundColor: "#f8bbd0",
    borderRadius: "16px",
    borderBottom: "4px solid",
    cursor: "pointer",
  },
};

function OrderList() {
  const {
    orders2,
    markOrderStatus,
    orderStatuses,
    filteredOrders,
    handleOrderPageChanger,
    color,
  } = useContext(AppContex);
  const [anchorEl, setAnchorEl] = React.useState(null); //tiene que ser anchorEl por que mui lo entiende asi //Estado para el menu desplegable
  const [selectedOrder, setSelectedOrder] = React.useState(""); // Estado para la orden seleccionada
  const [displayedOrders, setdisplayedOrders] = React.useState([]); // Estado para las órdenes a mostrar
  const [expanded, setExpanded] = React.useState(false); //estado para cerrar el acordeon
  //const [timers, setTimers] = React.useState({})
  const [openSectionId, setOpenSectionId] = React.useState();
  //const [openSections, setOpenSections] = React.useState({});
  const [colorList, setColorList] = React.useState();
  const open = Boolean(anchorEl);

  //Escucha para cambiar la imagen en el orderlist

  React.useEffect(() => {
    //setear colores locales en orderList no pude cambiar colores por cada item ya q tienen el mismo index y el mismo id asi que use este local y color de contexprovider
    const newColors = [];

    displayedOrders.forEach((_) => {
      const hue = Math.floor(Math.random() * 360);
      newColors.push(`hsl(${hue}, 80%, 90%)`);
    });

    setColorList(newColors);
  }, [displayedOrders]);

  React.useEffect(() => {
    //Cambiar el slider de imagen
    handleOrderPageChanger(true);
    return () => handleOrderPageChanger(false);
  }, [handleOrderPageChanger]);

  React.useEffect(() => {
    //Carga de las ordenes
    // Cuando el componente se carga o cuando cambian las órdenes o las órdenes filtradas,
    // actualizamos las órdenes que se muestran.
    const ordersToDisplay =
      filteredOrders.length > 0 ? filteredOrders : orders2;
    setdisplayedOrders(ordersToDisplay);
  }, [orders2, filteredOrders]);

  React.useEffect(() => {
    //Busco escuchar el cambio en las ordenes y mostrarlo en displayedOrders (Polling)
    const handleUpdate = (displayedOrders) => {
      setdisplayedOrders(displayedOrders);
    };
    const unsubscribe = onOrdersUpdate(handleUpdate);
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    //Timer para cerrar la orden abierta
    if (openSectionId) {
      const timer = setTimeout(() => {
        setExpanded(false);
        setOpenSectionId(false);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [openSectionId]);

  // React.useEffect(() => {
  //   if (expanded) {
  //     const id = expanded //el Id de la orden expandida

  //     const timer = setTimeout(() => {
  //       console.log("Cerrando")
  //       setExpanded(prev => {
  //         const updated = {...prev}
  //         delete updated[id]
  //         return updated
  //       })
  //     }, 5000);

  //     setTimers(prev => ({...prev, [id]: timer}))
  //     // return () => clearTimeout(timer);
  //   }
  // }, [expanded]);

  //! const toggleExpanded = (id) => {
  //   setExpanded(prev => ({
  //     ...prev,
  //     [id]: !prev[id]
  //   }));

  //   // Limpiar timer anterior
  //   if (timers[id]) {
  //     clearTimeout(timers[id]);
  //     setTimers(prev => ({...prev, [id]: null}));
  //   }

  //   // Setear nuevo timer
  //   const timer = setTimeout(() => {
  //     setExpanded(prev => {
  //       const updated = {...prev};
  //       delete updated[id];
  //       return updated;
  //     });
  //   }, 5000);

  //   setTimers(prev => ({...prev, [id]: timer}));
  // }

  // const handleCloseMenu = () => {// Funcion para cerrar el menu desplegable
  //   setAnchorEl(null)
  // }

  const handleChange = () => {
    setExpanded((prev) => !prev);
    setOpenSectionId(true);
  };

  const handleMenuDes = (e, order) => {
    //Funcion para abrir le menu desplegable
    if (e) {
      setAnchorEl(e.currentTarget); //Estado para saber cual menu se abrio en cual orden para cerralo cuando seleccione el cambio de estado de la orden
    }
    setSelectedOrder(order); //Estado con la orden seleccionada
  };

  const handleStatusChange = (newStatus) => {
    // actualizar el estado de la orden.
    markOrderStatus(selectedOrder.customOrderId, newStatus);
  };

  return (
    <>
      <Grid
        container
        item
        xs={12}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Typography
          className="degradado-texto"
          mt={4}
          mb={4}
          fontFamily={"letters.fontM"}
          fontSize={"2.5rem"}
          fontWeight={600}
        >
          Lista de Órdenes
        </Typography>
      </Grid>

      <Grid
        container
        item
        xs={12}
        justifyContent={"center"}
        alignItems={"center"}
        mb={6}
        mt={2}
      >
        <SearchBar />
      </Grid>

      <Grid
        container
        flexDirection={["column", "row"]}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={3}
      >
        {displayedOrders.map((order, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={`${order.customOrderId}_${index}`}
            m={0.05}
          >
            <Paper
              elevation={4}
              sx={{
                p: "16px",
                backgroundColor: "#F5F5F5",
                maxWidth: "100vw",
                margin: "0 0.05rem",
              }}
            >
              <Typography variant="h6" color="primary" fontWeight={"bold"}>
                Número de Orden: {order.customOrderId.toUpperCase()}
              </Typography>

              <Typography>Total A Facturar: ${order.total} Pesos.</Typography>
              <Typography>Fecha de Creación: {order.createAt}</Typography>
              <Typography>
                Estado de la Orden:
                <span className="degradado-orderstatus">
                  {orderStatuses[order.customOrderId]}
                </span>
              </Typography>

              <ButtonMenu
                orderSe={order}
                displayedOrders={displayedOrders}
                onSelectOrder={handleMenuDes}
                handleStatusChange={handleStatusChange}
                selectedOrder={selectedOrder}
                setSelectedOrder={setSelectedOrder}
                open={open}
              />

              <Typography
                variant="h6"
                color="primary"
                fontWeight={"bold"}
                marginTop={"0.8rem"}
                fontFamily={"letters.fontM"}
              >
                Información del Cliente
              </Typography>
              <List className="list-element-orders">
                <ListItem sx={{ display: "block", flexFlow: "row wrap" }}>
                  <ListItemText
                    primary={`Nombre: ${order.buyer.name}`}
                  ></ListItemText>
                  <ListItemText
                    primary={`Apellido: ${order.buyer.lastname}`}
                  ></ListItemText>
                  <ListItemText
                    primary={`Telefono: ${order.buyer.telephone}`}
                  ></ListItemText>

                  <ListItemText
                    primary={`Email: ${order.buyer.email}`}
                    className="scroll-container"
                  ></ListItemText>

                  <ListItemText
                    primary={`Direccion: ${order.buyer.direction}`}
                  ></ListItemText>
                  <ListItemText
                    primary={`Datos opcionales: ${order.buyer.dataoptional}`}
                  ></ListItemText>
                </ListItem>
              </List>
              <Accordion
                key={order.id}
                id={order.id}
                expanded={expanded}
                // onClick={() => toggleExpanded(order.id, true)}
                onChange={() => handleChange(index)}
              >
                <AccordionInside
                  index={index}
                  color={color}
                  colorList={colorList}
                  order={order}
                  openSectionId={openSectionId}
                  setOpenSectionId={setOpenSectionId}
                />
              </Accordion>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
export default OrderList;

function AccordionInside({
  color,
  colorList,
  order,
  openSectionId,
  setOpenSectionId,
}) {
  // lifted up function

  const isOpen = openSectionId === order.id;

  return (
    <Box>
      <AccordionSummary
        onClick={() => setOpenSectionId(order.id)}
        expandIcon={<ExpandMoreIcon />}
        sx={{ display: "flex", flexFlow: "row wrap" }}
        // onClick={() => setExpanded(true)}
        id={order.id}
      >
        <Typography
          sx={{ width: "33%", flexShrink: 0 }}
          variant="h6"
          color="primary"
          fontWeight={"bold"}
          fontFamily={"letters.fontM"}
        >
          Productos
        </Typography>
      </AccordionSummary>
      {isOpen && (
        <AccordionDetails>
          <List>
            {order.items.map((item, itemIndex) => (
              <Paper
                key={itemIndex}
                elevation={0}
                sx={{
                  p: 1,
                  border: "1px solid #DDDDDD",
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                <Box>
                  <ListItem
                    key={1}
                    sx={stylesOrders}
                    style={{
                      backgroundColor: colorList[itemIndex],
                      borderRadius: "10px",
                    }}
                  >
                    <ListItemText primary={`Articulo: ${item.producto}`} />
                  </ListItem>
                  <ListItem
                    key={2}
                    sx={stylesOrders}
                    style={{
                      backgroundColor: color,
                      borderRadius: "10px",
                    }}
                  >
                    <ListItemText
                      primary={`ProductoID: ${item.customid}`}
                      className="scroll-container"
                    />
                  </ListItem>
                  {/* <ListItem>
                              <ListItemText primary={`Cantidad: ${item.quantity} Unidades.`} />
                            </ListItem> */}
                  <ListItem
                    key={3}
                    sx={stylesOrders}
                    style={{
                      backgroundColor: colorList[itemIndex],
                      borderRadius: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>Cantidad: </Typography>
                      <Typography marginLeft={"3px"}>
                        {item.quantity} Unidades.
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem
                    key={4}
                    sx={stylesOrders}
                    style={{
                      backgroundColor: color,
                      borderRadius: "10px",
                    }}
                  >
                    <ListItemText primary={`Color: ${item.color}`} />
                  </ListItem>
                  <ListItem
                    key={5}
                    sx={stylesOrders}
                    style={{
                      backgroundColor: colorList[itemIndex],
                      borderRadius: "10px",
                    }}
                  >
                    <ListItemText primary={`Talle: ${item.size}`} />
                  </ListItem>
                  <ListItem
                    key={6}
                    sx={stylesOrders}
                    style={{
                      backgroundColor: color,
                      borderRadius: "10px",
                    }}
                  >
                    <ListItemText
                      primary={`Descuento hecho de: ${item.discountSelected}%`}
                    />
                  </ListItem>
                  <ListItem
                    key={7}
                    sx={stylesOrders}
                    style={{
                      backgroundColor: colorList[itemIndex],
                      borderRadius: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>Valor C/Unidad: </Typography>
                      <Typography marginLeft={"3px"}>
                        ${item.pricePerUnit}
                      </Typography>
                    </Box>
                  </ListItem>
                </Box>
              </Paper>
            ))}
          </List>
        </AccordionDetails>
      )}
    </Box>
  );
}
