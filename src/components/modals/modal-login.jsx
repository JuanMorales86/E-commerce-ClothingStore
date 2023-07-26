import React from 'react'
//Libreria Material
import {Box, Button , Typography, Modal} from '@mui/material';
import AuthProvider from '../auth-control';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "400px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
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
            >
              <Box sx={style}>
                <Typography>titulo</Typography>
              <AuthProvider id="modal-modal-description"/>
              </Box>
            </Modal>
          </Box>
        );
      }

export default ModalLogin