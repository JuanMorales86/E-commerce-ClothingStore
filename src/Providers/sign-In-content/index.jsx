import React from 'react'
import { useNavigate } from 'react-router-dom'

//Libreria firebase
import { signOut } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'

//Libreria Material
import { Box, Button, Paper, TextField, Typography } from '@mui/material'

//Mis componentes
import { auth } from '../../App'
import { AppContex } from '../contex-provider'

function SignInContent({ onClose }) {
    const [user, setUser] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [userError, setUserError] = React.useState('');
    const [passError, setPassError] = React.useState('');
    const navigate = useNavigate()
    const {notifyToast, notifyToastContainer} = React.useContext(AppContex)

    //Validar correo electronico
    const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@(hotmail|gmail|yahoo)\.(com|es)$/;
        return emailRegex.test(email);
    }

    //Validar contrasena
    const isPasswordValid = (password) => {
           // Agrega tus criterios de validación aquí, por ejemplo, al menos 8 caracteres y una letra mayúscula.
        const passwordRegex = /(?=.*\d)(?=.*[A-Za-z])([^\s]){6,15}/
        return passwordRegex.test(password);
    }

    const handlePass = (e) => {
        const newPassword = e.target.value
        setPass(newPassword)
        
        if (!isPasswordValid(newPassword)) {
            setPassError('El password no es válido.');
          } else {
            setPassError(''); // Borrar el mensaje de error si es válido
          }
    }
    const handleUser = (e) => {
        const newUser = e.target.value
        setUser(newUser)

        // Validar el formato del correo electrónico mientras el usuario escribe
        if (!isEmailValid(newUser)) {
        setUserError('El correo electrónico no es válido (Formato: algo@gestordecorreo.com).');
      } else {
        setUserError(''); // Borrar el mensaje de error si es válido
      }
    }
    
    
   
    const handleLogIn = (e) => {
        e.preventDefault();
        e.stopPropagation()

        if(!user || !pass) {//si no es usuario o el pasword tampoco no hacer nada
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
            navigate('/home')
            onClose()
        }).catch((error) => {
            notifyToast('Error al cerrar sesión')
            console.log("Error al cerrar sesión,", error)
        })
    }

  return (
<Paper sx={{p: 2, maxWidth: 400, margin: '0 auto', backgroundColor: '#f0f0f0', marginTop:"2rem"}}>
    <Box sx={{textAlign:"center"}} >
        <Typography variant='h5' component={'text'} color={"primary.dark"} fontWeight={"bold"} >
        Iniciar Sesión
        </Typography>
   
        <Box sx={{display:"flex", flexDirection:"column",  gap:2, maxWidth:300, margin:"1rem auto"}}>
            <TextField type='text' label='Usuario' value={user} onChange={handleUser} sx={{backgroundColor:"white"}} fullWidth
              error={userError !== ''}
              helperText={userError}/>
            <TextField type="password" label='Contraseña' value={pass} onChange={handlePass} sx={{backgroundColor:"white"}} fullWidth
            error={passError !== ''}
            helperText={passError}/>
        </Box>
        
        <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:2, gap:2}}>
            <Button variant='contained' onClick={handleLogIn} disabled={!user || !pass}>LogIn</Button>
            <Button variant='contained' onClick={handleLogOut}>LogOut</Button>{notifyToastContainer()}
        </Box>
    </Box>
</Paper>   
  )
}

export default SignInContent