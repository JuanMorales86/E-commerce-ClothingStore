import React from 'react'
//Libreria Material
import {Box, Button , Typography, Modal} from '@mui/material';
import AuthProvider from '../auth-control';


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

function ModalLogin({widgetL}) {
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
      
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
              
              <AuthProvider id="modal-modal-description" onClose={handleClose}/>
              </Box>
            </Modal>
          </Box>
        );
      }

export default ModalLogin