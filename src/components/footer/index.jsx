import React from 'react'
import {Container, Typography, Grid, Link, Box, IconButton } from '@mui/material'
// import Tooltip from '@mui/material/Tooltip';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Link as Lirouter } from 'react-router-dom';



function Footer() {
    return (
      <Box sx={{ backgroundColor: '#f9f9f9', padding: '2rem', marginTop: "0" }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3">
                Enlaces
              </Typography>
              <ul sx={{ listStyleType: 'none', padding: 0 }}>
                <li>
                  <Link component={Lirouter} to="/">Inicio</Link>
                </li>
                <li>
                  <Link component={Lirouter} to="/products/vest">Productos</Link>
                </li>
                <li>
                  <Link href="/categorias">Categorías</Link>
                </li>
                <li>
                  <Link component={Lirouter} to="/products/descuentos">Ofertas</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/contacto">Consultas</Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3">
                Contacto
              </Typography>
              <Typography >Dirección: Tucuman 540, San Cristobal, CABA.</Typography>
              <Typography >Teléfono: 9-(11) 2843-3076</Typography>
              <Typography  sx={{ letterSpacing:2}}>Email: <wbr />salpimienta.<wbr />shop23@<wbr />gmail.com</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3">
                Políticas
              </Typography>
              <ul sx={{ listStyleType: 'none', padding: 0 }}>
                <li>
                  <Link href="/terminos">Términos y condiciones</Link>
                </li>
                <li>
                  <Link href="/privacidad">Política de privacidad</Link>
                </li>
                <li>
                  <Link href="/envios">Política de envío y devoluciones</Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3">
                Síguenos
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <IconButton component={Link} href="https://instagram.com/sal.pimienta_shop?igshid=OGQ5ZDc2ODk2ZA==">
                  <Facebook />
                </IconButton>
                <IconButton component={Link} href="https://instagram.com/sal.pimienta_shop?igshid=OGQ5ZDc2ODk2ZA==">
                  <Instagram />
                </IconButton>
                <IconButton component={Link} href="https://instagram.com/sal.pimienta_shop?igshid=OGQ5ZDc2ODk2ZA==">
                  <Twitter />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" component="h3">
                Puedes Pagar Con:
              </Typography>
              
              <Box sx={{ display: 'flex', flexFlow:"row, wrap", justifyContent:"center", alignItems:"center" }}>
             
             
                  <img style={{width:"40px",height:"40px"}} src="https://i.imgur.com/xm8TQC3.png" alt="visa" />
          
             
                  <img style={{width:"100px",height:"40px"}} src="https://i.imgur.com/uuLL15w.png" alt="MasterCard" />
             
            
                  <img style={{width:"40px",height:"40px"}} src="https://i.imgur.com/Ibf7JfX.png" alt="AmercanExpress" />  
            
                  <Typography sx={{width:"100%", ml:"20px"}} fontSize={"0.8rem"}>Tranferencia <wbr />/ Deposito Bancario</Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: '1px solid #ddd', paddingTop: '1rem', marginTop: '1rem', textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              &copy; 2023 Sal&Pimienta. Todos los derechos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }
  
  export default Footer;