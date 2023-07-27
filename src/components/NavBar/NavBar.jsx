import React from "react";
import { Link as RouterLink } from "react-router-dom";//Le coloque un alias para que no choque con la libreria material Link y me acepte los estilos de material sobre el Link

//Libreria Material
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  Container,
  MenuItem,
  Link
} from "@mui/material"; //Componentes Material

import CheckroomIcon from "@mui/icons-material/Checkroom"; //Material Icon
import MenuIcon from "@mui/icons-material/Menu";//Material Icon

//Mis Components
import ModalSlide from "../modals";
import CartWidget from "../cartWidget/CartWidget";
import { AppContex } from "../contex-provider";
import ModalLogin from "../modals/modal-login";
import LoginWidget from "../cartWidget/loginWidget";
import LogOutWidget from "../cartWidget/logOutWidget";



const MenuPages = [
  { label: "Home", path: "/home" },
  { label: "Prendas", path: "/products/:category" },
  { label: "Nosotros", path: "/nosotros" },
  { label: "Contacto", path:"/contacto"}
];


const NavBar = () => {
  //Funcionalidad Abrir y cerrar Navbar en el burguer
  const [anchorElNav, setAnchorElNav] = React.useState(null);//acciones de material para abrir y cerrar burguer
  const [_, setAnchorElUser] = React.useState(null);//acciones de material para abrir y cerrar burguer
  
  const {quantityC} = React.useContext(AppContex)//Contex
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{  backgroundColor: "primary.dark", }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ overflowX: "auto" }}>
            {/*con space-between no se activa el gap */}

            {/* Icono Tienda */}
            <CheckroomIcon
              htmlColor="#fff"
              fontSize="large"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            ></CheckroomIcon>

            {/* Brand */}
            <Link component={RouterLink} to={'/'} underline="none" color={'inherit'} mr={'1rem'}>
            <Typography
              variant="h6"
              href="/"
              component="a"
              noWrap
              sx={{
                flexGrow: 1,
                mr: 2,
                display: { xs: "none", md: "flex" },
                placeItems: "left",
                fontweight: "bold",
                fontSize: "1.5rem",
                textTransform: "capitalize",
                color: "white",
                letterSpacing: ".2rem",
                textDecoration: "none",
                
              }}
            >
              ClothingStore
            </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              {/* Burguer */}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {/* Fin Burguer */}

              {/* Menu Cuando se retrae a mobile */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {MenuPages.map((page, index) => (
                  <MenuItem key={page.label + index } onClick={handleCloseNavMenu}>
                    <Link component={RouterLink}
                      color={"inherit"}
                      underline="none"
                      textAlign="center"
                      to={page.path}
                    >
                      {page.label}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Otra resolucion (grande) */}
            {/* Icono Tienda */}
            <CheckroomIcon
              htmlColor="#fff"
              fontSize="large"
              sx={{ mr: 1, display: { xs: "flex", md: "none" } }}
            ></CheckroomIcon>

            {/* Brand */}
            <Typography
              variant="h5"
              href="/"
              component="a"
              noWrap
              sx={{
                flexGrow: 1,
                mr: 2,
                display: { xs: "flex", md: "none" },
                placeItems: "left",
                fontweight: "bold",
                fontSize: "1.5rem",
                textTransform: "capitalize",
                color: "white",
                letterSpacing: ".2rem",
                textDecoration: "none",
              }}
            >
              ClothingStore
            </Typography>

            {/* Anchors del menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              
              {MenuPages.map((page) => (
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link component={RouterLink} to={page.path} color={"inherit"} underline="none">
                    {page.label}
                  </Link>
                </Button>
              ))}

            </Box>
            {/* Fin otra resolucion */}
              
              <ModalSlide widget={<CartWidget cartQuantity={quantityC}/>}/>
              <ModalLogin widgetL={<LoginWidget/>}/>
              <LogOutWidget/>

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;
