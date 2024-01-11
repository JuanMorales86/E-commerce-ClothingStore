import React from 'react'
//Libreria Material
import {Box, Typography, Modal} from '@mui/material';
import AuthProvider from '../../Providers/auth-provider';
import AuthMessage from '../../Providers/auth-message';
import SignInContent from '../../Providers/sign-In-content';
import CustomTheme from '../Custom-Styles/themes';
import { AppContex } from '../../Providers/contex-provider';
const {breakpoints} = CustomTheme


const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const paperStyle = {
  
  // width: ['90%','93%','80%', '70%','70%', '60%', '50%','50%'],
 
  [`@media (min-width: ${breakpoints.values.sm}px) and (max-width: ${breakpoints.values.md2 - 1}px)`]: {
    // Estilos entre 600px y 627px
    width: "92%",
  },

  [`@media (min-width: ${breakpoints.values.md2}px) and (max-width: ${breakpoints.values.md - 1}px)`]: {
    // Estilos entre 600px y 899px
    width: "90%" 
  },
  [`@media (min-width: ${breakpoints.values.md3}px) and (max-width: ${breakpoints.values.xl - 1}px)`]: {
    // Estilos entre 600px y 899px
    width: "65%" 
  },
  [`@media (min-width: ${breakpoints.values.xl}px)`]:{
    width:"40%"
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

function ModalLogin({widgetL}) {
        // const [open, setOpen] = React.useState(false);// Evito confundir con el state open
        // const controllerOpen = isOpen || open;
        const { ismodalOpen ,toggleModal} = React.useContext(AppContex)
        
        // const [isVisible, setIsVisible] = React.useState(false)
        // const [isAuthenticated, setIsAuthenticated] = React.useState(false);
        

        // const handleOpen = () => {
        //   setOpen(true)
        //   // setIsVisible(true)
        // };

        // const handleClose = () => {
        //   setOpen(false)
          
        //   if(onClose){
        //     onClose()
        //   }
        //   // setIsVisible(false)
        // };

        return (
          <Box>
            <Box fontFamily={"letters.fontM"}  onClick={toggleModal}>
              {widgetL}
            </Box>
            
            
            <Modal
              open={ismodalOpen}
              onClose={toggleModal}
              style={modalStyle}//centro el modal
            >
            
              <Box sx={paperStyle}>
              <Box textAlign={"center"}>
                <Typography fontSize={"1.5rem"} fontFamily={"letters.fontM"} fontWeight={"bold"}>Acceso al Sistema</Typography>
              </Box>
              
              <AuthProvider>
            <RenderBasedOnAuthState handleClose={toggleModal} />
              </AuthProvider>
              </Box>
            </Modal>
          
          </Box>
        );
      }

      function RenderBasedOnAuthState({ isAuthenticated, handleClose }) {
     
        if (isAuthenticated) {
          return <AuthMessage onClose={handleClose} />;
        } else {
          return <SignInContent onClose={handleClose} />;
        }
      }

export default ModalLogin

// {isVisible && <AuthProvider id="modal-modal-description" onClose={handleAuthentication}/>}

// min-width define el ancho mínimo a partir del cual se aplicarán los estilos dentro de la media query.
//@media (min-width: 500px) {
  /* estilos que se aplican cuando el ancho de pantalla es de 500px o más */
//}
// max-width define el ancho máximo hasta el cual se aplicarán los estilos dentro de la media query.
//@media (max-width: 767px) {
  /* estilos que se aplican cuando el ancho de pantalla es de 767px o menos */
//}

// min-width: Aplica los estilos a partir del ancho indicado y superiores.
// max-width: Aplica los estilos hasta el ancho indicado.