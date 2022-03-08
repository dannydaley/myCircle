import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

export default function SignUpForm({ onRouteChange }) {
  return (
    <div style={{width: '30%', padding: '10ch',backgroundColor: 'white'}}>
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '30ch' } }} noValidate autoComplete="off">
            <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <TextField
                required
                id="outlined-required"
                type="email"
                label="Email Address"
                placeholder="Email Address"
              />  
              <TextField
                required
                id="outlined-required"
                type="text"
                label="Username"
                placeholder="Username"
              />                 
              <TextField
                required
                id="outlined-required"
                type="text"
                label="First name"
                placeholder="Email Address"
              />
              <TextField
                required
                id="outlined-required"
                type="text"
                label="Last name"
                placeholder="Email Address"
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="off"
              />
              <TextField
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                autoComplete="off"
              />
              <Button variant="contained" sx={{width: '33ch', marginTop: '20px'}} type="submit" value="Sign In" 
                onClick={() => onRouteChange('home')}
                >Sign Up
              </Button>
            </form>
            <Divider variant="middle" style={{marginTop: '20px', marginBottom: '40px'}}/>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Button variant="contained" sx={{width: '33ch'}} onClick={() => onRouteChange('signin')}>Sign In</Button>        
            </div>
        </Box>
    </div>
  );
}