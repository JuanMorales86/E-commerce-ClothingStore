import React, { useContext } from 'react'
import { auth } from '../../App'
import { signOut } from 'firebase/auth'
import { IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AppContex } from '../contex-provider';

function LogOutWidget() {
    const {notifyToast} = useContext(AppContex)
    
    const handleLogOut = () => {
        signOut(auth)
        .then(() => {
            console.log('Usuario cerro sesion')
        }).catch((error) => {
            console.log("Error al cerrar sesion", error)
        })
    }
  return (
    <IconButton variant={"inherent"} color="error"  onClick={handleLogOut} aria-label="Deslogearse del el sistema administrativo">
        <ExitToAppIcon/>
    </IconButton>
  )
}

export default LogOutWidget