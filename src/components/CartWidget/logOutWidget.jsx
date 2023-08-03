import React, { useContext } from 'react'
import {Box} from '@mui/material'

//Libreria firebase
import { signOut } from 'firebase/auth'
import { auth } from '../../App'

//Libreria Material
import { IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

//Mis Componentes
import { AppContex } from '../contex-provider';

function LogOutWidget() {
    const {notifyToast, notifyToastContainer} = useContext(AppContex)
    
    const handleLogOut = () => {
        signOut(auth)
        .then(() => {
            notifyToast('Usuario cerro sesion')
        }).catch((error) => {
            console.log("Error al cerrar sesion", error)
        })
    }
  return (
    <Box sx={{marginLeft:"0.8rem"}}>
        {notifyToastContainer()}
        <IconButton variant={"inherent"} color="error"  onClick={handleLogOut} aria-label="Deslogearse del el sistema administrativo">
        
            <ExitToAppIcon/>
        </IconButton>
    </Box>
  )
}

export default LogOutWidget