import React from 'react'
import { SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import { Box, Button } from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
//import { useNavigate } from 'react-router-dom';

function ClerkAuth() {
  //const navigate = useNavigate()
  return (

    <Box>
      <SignedOut>
      <SignInButton>
      <Button className='button-clerk' variant='contained' startIcon={<AccountBoxIcon/>}>Log in Clientes</Button>
      </SignInButton>
      </SignedOut>

      <SignedIn>
      <SignOutButton >
      <Button className='button-clerk' variant='contained' startIcon={<DisabledByDefaultIcon/>}>Clientes</Button>
      </SignOutButton>
      </SignedIn>
    </Box>
  )
}

export default ClerkAuth