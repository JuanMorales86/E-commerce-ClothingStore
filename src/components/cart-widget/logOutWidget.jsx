import React, { useContext } from 'react'
import {Box, Tooltip} from '@mui/material'

//Libreria firebase
import { signOut } from 'firebase/auth'
import { auth } from '../../App'

//Libreria Material
import { IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

//Mis Componentes
import { AppContex } from '../../Providers/contex-provider';
import { useNavigate } from 'react-router-dom';

function LogOutWidget() {
    const {notifyToast, notifyToastContainer} = useContext(AppContex)
    const navigate = useNavigate()
    
    const handleLogOut = () => {
        signOut(auth)
        .then(() => {
            notifyToast('Usuario cerro sesion')
            navigate('/home')
        }).catch((error) => {
            console.log("Error al cerrar sesion", error)
        })
    }
  return (
    <Box sx={{ minWidth: "unset", mr: 0 }}>
        {notifyToastContainer()}
        <Tooltip title="Cerrar Sesión">
        <IconButton variant={"inherent"} color="error"  onClick={handleLogOut} >
            <Box>
            <ExitToAppIcon/>
            </Box>
        </IconButton>
        </Tooltip>
    </Box>
  )
}

export default LogOutWidget