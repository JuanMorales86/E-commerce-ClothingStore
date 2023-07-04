import React from 'react'
import {Container, Typography, Grid, Link, Box, IconButton} from '@mui/material'
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Link as Lirouter } from 'react-router-dom';



function Footer() {
    return (
      <Box sx={{ backgroundColor: '#f9f9f9', padding: '2rem', marginTop: "2rem" }}>
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
                  <Link href="/ofertas">Ofertas</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/contacto">Contacto</Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3">
                Contacto
              </Typography>
              <Typography component="p">Dirección: Gallo 606, Almagro, CABA</Typography>
              <Typography component="p">Teléfono: 9-(11) 2356-0969</Typography>
              <Typography component="p">Email: clothingStore@gmail.com</Typography>
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
                <IconButton component={Link} href="https://facebook.com/tiendaropa">
                  <Facebook />
                </IconButton>
                <IconButton component={Link} href="https://instagram.com/sal.pimienta_shop?igshid=OGQ5ZDc2ODk2ZA==">
                  <Instagram />
                </IconButton>
                <IconButton component={Link} href="https://twitter.com/tiendaropa">
                  <Twitter />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: '1px solid #ddd', paddingTop: '1rem', marginTop: '1rem', textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              &copy; 2023 ClothingStore. Todos los derechos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }
  
  export default Footer;