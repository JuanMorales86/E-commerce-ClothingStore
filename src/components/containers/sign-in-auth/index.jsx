import React from 'react'
import { useNavigate } from 'react-router-dom'

//Libreria firebase
import { signOut } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'

//Libreria Material
import { Box, Button, TextField, Typography } from '@mui/material'

//Mis componentes
import { auth } from '../../../App'
import { AppContex } from '../../contex-provider'

function SignInContent({ onClose }) {
    const [user, setUser] = React.useState('')
    const [pass, setPass] = React.useState('')
    const navigate = useNavigate()
    const {notifyToast, notifyToastContainer} = React.useContext(AppContex)

    const handlePass = (e) => setPass(e.target.value)
    const handleUser = (e) => setUser(e.target.value)

    const handleLogIn = (e) => {
        e.preventDefault();
        e.stopPropagation()

        if(!user || !pass) {
            return;
        }

        signInWithEmailAndPassword(auth, user, pass)
        .then((userCredential) => { 
            notifyToast('Te has logeado al sistema')
            navigate('/admin')
            onClose()
        }).catch((err) => { console.log(err)
            notifyToast('Usuario o Contraseña no es correcta')})
    }
    const handleLogOut = () => {
        signOut(auth)
        .then(() => {
            notifyToast('A cerrado sesión')
        }).catch((error) => {
            notifyToast('Error al cerrar sesión')
            console.log("Error al cerrar sesión,", error)
        })
    }

  return (
    <Box textAlign={"center"} >
        <Typography variant='h6' component={'text'} color={"primary.dark"} fontWeight={"bold"}>Iniciar Sesión</Typography>
   
        <Box sx={{display:"flex", flexDirection:"row",  gap:2}}>
            <TextField type='text' label='Usuario' value={user} onChange={handleUser} fullWidth/>
            <TextField type="password" label='Contraseña' value={pass} onChange={handlePass} fullWidth/>
        </Box>
        
        <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:2, gap:2}}>
            <Button variant='contained' onClick={handleLogIn} disabled={!user || !pass}>LogIn</Button>{notifyToastContainer()}
            <Button variant='contained' onClick={handleLogOut}>LogOut</Button>
        </Box>
        
    


    </Box>
  )
}

export default SignInContent