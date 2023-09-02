import React from 'react'
//Libreria Material
import {Box, Button , Typography, Modal} from '@mui/material';
import AuthProvider from '../../Providers/auth-provider';
import AuthMessage from '../../Providers/auth-message';
import SignInContent from '../../Providers/sign-In-content';



const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const paperStyle = {
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

function ModalLogin({widgetL }) {
        const [open, setOpen] = React.useState(false);
        // const [isVisible, setIsVisible] = React.useState(false)
        // const [isAuthenticated, setIsAuthenticated] = React.useState(false);
        

        const handleOpen = () => {
          setOpen(true)
          // setIsVisible(true)
        };
        const handleClose = () => {
          setOpen(false)
          // setIsVisible(false)
        };


        // console.log(isAuthenticated)
        // console.log(isVisible)
        return (
          <Box>
              <Button variant="text" onClick={handleOpen}>
                {widgetL}
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={modalStyle}//centro el modal
            >
              <Box sx={paperStyle}>
              <Box textAlign={"center"}>
                <Typography fontFamily={"sans-serif"} fontSize={"1.5rem"} fontWeight={"bold"}>Acceso al Sistema</Typography>
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
        console.log(handleClose)
        console.log(isAuthenticated)
     
        if (isAuthenticated) {
          return <AuthMessage onClose={handleClose} />;
        } else {
          return <SignInContent onClose={handleClose} />;
        }
      }

export default ModalLogin

// {isVisible && <AuthProvider id="modal-modal-description" onClose={handleAuthentication}/>}