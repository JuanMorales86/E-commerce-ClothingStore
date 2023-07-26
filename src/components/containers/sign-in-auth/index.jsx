import React from 'react'

import { auth } from '../../../App'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Box, Button, TextField, Typography } from '@mui/material'

function SignInContent() {
    const [user, setUser] = React.useState('')
    const [pass, setPass] = React.useState('')

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
            console.log(userCredential)
        }).catch((err) => { console.log(err)
        alert('usuario o contrasena no es')})
    }
  return (
    <Box>
        <Typography variant='h2' component={'h2'}>Iniciar Session</Typography>
   
    <Box>
        <TextField type='text' value={user} onChange={handleUser}/>
        <TextField type="password" value={pass} onChange={handlePass}/>
        <Button onClick={handleLogIn} disabled={!user || !pass}>LogIn</Button>
    </Box>


    </Box>
  )
}

export default SignInContent