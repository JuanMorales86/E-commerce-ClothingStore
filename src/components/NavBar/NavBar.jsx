import React from 'react'

//Libreria Material
import { AppBar, Stack, Toolbar, Typography, Button, Box, IconButton, Menu, Container, Tooltip, MenuItem } from '@mui/material'//Componentes Material
import { styled } from '@mui/material/styles'//Material Styled Libreria
import { amber, purple, blue, lightBlue } from '@mui/material/colors'//Material Colors customizables
import CheckroomIcon from '@mui/icons-material/Checkroom';//Material Icon
import MenuIcon from '@mui/icons-material/Menu';

//Components
import CartWidget from '../CartWidget/CartWidget'

//Botones Custom
const CustomButtonsNavBar = styled(Button)(({ theme }) => ({
    //Estilos perzonalizados tipo jsx
    color: theme.palette.getContrastText(lightBlue[50]),
    backgroundColor: blue[400],
    '&:hover': {
        backgroundColor: amber[700],
    },
 }))


const MenuPages = ['Home', 'Prendas', 'Contacto']





const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{backgroundColor:'primary.dark'}}>{/*con space-between no se activa el gap */}

            {/* Icono Tienda */}
            <CheckroomIcon htmlColor='#fff' fontSize='large' sx={{mr: 2,display:{xs: 'none', md: 'flex'}}}></CheckroomIcon>

            {/* Brand */}
            <Typography variant="h6" href="/" component="a" noWrap sx={{ flexGrow: 1, mr:2, display: {xs: 'none', md: 'flex'}, placeItems: 'left', fontweight: 'bold', fontSize: '1.5rem', textTransform: 'capitalize', color:'white', letterSpacing: '.2rem', textDecoration: 'none' }}>ClothingStore</Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            
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

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {MenuPages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
            </Box>

            {/* Otra resolucion */}
            {/* Icono Tienda */}
            <CheckroomIcon htmlColor='#fff'fontSize='large' sx={{mr: 1, display:{xs:'flex', md: 'none'}}}></CheckroomIcon>

            {/* Brand */}
            <Typography variant="h5" href="/" component="a" noWrap sx={{ flexGrow: 1, mr: 2, display: {xs: 'flex', md: 'none'}, placeItems: 'left', fontweight: 'bold', fontSize: '1.5rem', textTransform: 'capitalize', color:'white', letterSpacing: '.2rem', textDecoration: 'none' }}>ClothingStore</Typography>
            
            {/* Anchors del menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {MenuPages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

           
            
            {/* <Button variant="outline" color='secondary' href="/">
                Home
            </Button>
            <CustomButtonsNavBar href="/">
                Prendas
            </CustomButtonsNavBar>
            <Button variant="text" sx={{ color: 'white' }} href="/">
                Nosotros
            </Button>
            <Button variant="text" sx={{ color: 'white' }} href="/">
                Contacto
            </Button> */}



            <CartWidget/>

            
        </Toolbar>
        </Container>
    </AppBar>
    </Box>
    )
} 

export default NavBar