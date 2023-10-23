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
import MenuIcon from "@mui/icons-material/Menu";//Material Icon Burguer

//Mis Components
import ModalSlide from "../modals";
import CartWidget from "../cart-widget/CartWidget";
import { AppContex } from "../../Providers/contex-provider";
import ModalLogin from "../modals/modal-login";
import LoginWidget from "../cart-widget/LoginWidget";
import LogOutWidget from "../cart-widget/logOutWidget";
import AuthManager from "../../Providers/auth-manager";




const MenuPages = [
  { label: "Home", path: "/home" },
  { label: "Prendas", path: "/products/all" },
  { label: "Nosotros", path: "/nosotros" },
  { label: "Contacto", path:"/contacto"}
];


const NavBar = () => {
  //Funcionalidad Abrir y cerrar Navbar en el burguer
  const [anchorElNav, setAnchorElNav] = React.useState(null);//acciones de material para abrir y cerrar burguer
  
  
  const {quantityC} = React.useContext(AppContex)//Contex
  
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AuthManager>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{  backgroundColor: "primary.dark", }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ overflowX: "auto" }}>
            
          
            {/* Icono Tienda */}
            <Link component={RouterLink} to={'/home'} underline="none" color={'inherit'} mr={'1rem'}>
            <CheckroomIcon
              htmlColor="#fff"
              fontSize="large"
              sx={{display: { xs: "flex", md: "flex" } }}
            ></CheckroomIcon>
            </Link>

            {/* Titel Brand */}
            <Box sx={{display:"flex", alignItems:"center"}}>
            <Link component={RouterLink} to={'/home'} underline="none" color={'inherit'} mr={'1rem'}>
            <Typography
              variant="h6"
              href="/home"
              noWrap
              className="clothing-store-text"
              sx={{
                flexGrow: 1,
                mr: 2,
                display: {  md: "flex" },
                placeItems: "left",
                fontweight: "bold",
                fontSize: "1.5rem",
                textTransform: "capitalize",
                color: "white",
                letterSpacing: ".2rem",
                textDecoration: "none",
                whiteSpace:"nowrap"
              }}
            >
              Sal&Pimienta
            </Typography>
            </Link>
            </Box>
            

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
           

            {/* Brand */}
            <Typography
              variant="h5"
              href="/home"
              component="a"
              noWrap
              className="clothing-store-text"
              sx={{
                flexGrow: 1,
                mr: 2,
                display: { xs: "none", md:"none" },
                placeItems: "left",
                fontweight: "bold",
                fontSize: "1.5rem",
                textTransform: "capitalize",
                color: "white",
                letterSpacing: ".1rem",
                textDecoration: "none",
              }}
            >
              Sal&Pimienta
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
            {/* Fin otra resolucion d */}
          
              <Box display={'flex'}>
              
              <ModalSlide widget={<CartWidget cartQuantity={quantityC}/>}/>
              
             
              <ModalLogin widgetL={<LoginWidget/>}/>
              
              <Box sx={{alignSelf:'center', justifyContent:"center"}}>
              <LogOutWidget/>
              </Box>
              </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
    </AuthManager>
  );
};

export default NavBar;
