import React from 'react'
//Libreria Material
import {Box, Button , Typography, Modal} from '@mui/material';
import AuthProvider from '../../Providers/auth-provider';
import AuthMessage from '../../Providers/auth-message';
import SignInContent from '../../Providers/sign-In-content';
import CustomTheme from '../Custom-Styles/themes';
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
  [`@media (min-width: ${breakpoints.values.md}px)`]:{
    width:"70%"
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

function ModalLogin({widgetL, open: isOpen, onClose}) {
        const [open, setOpen] = React.useState(false);// Evito confundir con el state open
        const controllerOpen = isOpen || open;
        
        // const [isVisible, setIsVisible] = React.useState(false)
        // const [isAuthenticated, setIsAuthenticated] = React.useState(false);
        

        const handleOpen = () => {
          setOpen(true)
          // setIsVisible(true)
        };
        const handleClose = () => {
          setOpen(false)
          if(onClose){
            onClose()
          }
          // setIsVisible(false)
        };
        return (
          <Box>
              <Button  onClick={handleOpen}>
                {widgetL}
            </Button>
            
            
            <Modal
              open={controllerOpen}
              onClose={handleClose}
              style={modalStyle}//centro el modal
            >
            
              <Box sx={paperStyle}>
              <Box textAlign={"center"}>
                <Typography fontSize={"1.5rem"} fontFamily={"letters.fontM"} fontWeight={"bold"}>Acceso al Sistema</Typography>
              </Box>
              
              <AuthProvider>
            <RenderBasedOnAuthState handleClose={handleClose} />
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