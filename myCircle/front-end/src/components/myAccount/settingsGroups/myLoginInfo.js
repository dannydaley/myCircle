import React from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ShieldIcon from '@mui/icons-material/Shield';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';





import LockIcon from '@mui/icons-material/Lock';

export default class MyLoginInfo extends React.Component {

    constructor(props) {
        super();

      }

    render() {
        const { settings } = this.props; 
        return(
            <form style={{
                // backgroundColor: 'white',
             height: '100%'}}>
                <Typography variant="h3" component="div" color="white" sx={{textAlign: 'center', mt: 2, paddingTop: 1, paddingBottom: 2, bgcolor: 'none' }}>{settings}</Typography>
                
                <div style={{marginTop: '100px'}}>
                    <ContactMailIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}} />                    
                    <TextField
                    sx={{maxWidth: '60%', width: '60%', borderColor: 'red', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '4px'}}                
                    id="outlined-password-input"
                    label="Email address"
                    type="email"
                    />
                </div>
                <div style={{marginTop: '30px'}}>
                    <LockOpenIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}}/> 
                    <TextField
                        sx={{maxWidth: '60%', width: '60%', borderColor: 'red', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '4px'}}                
                        id="outlined-password-input"
                        label="Verify password"
                        type="password"
                        autoComplete="no"                    
                    />
                </div>
                <div style={{marginTop: '30px'}}>
                    <LockIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}} />                 
                    <TextField
                    sx={{maxWidth: '60%', width: '60%', borderColor: 'red', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '4px'}}                
                    id="outlined-password-input"
                    label="New password"
                    type="password"
                    />
                    <DoneIcon sx={{color: 'lightGreen', position: 'absolute'}} />
                </div>
                <div style={{marginTop: '30px'}}>
                    <ShieldIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}} />
                    <TextField
                        sx={{maxWidth: '60%', width: '60%', borderColor: 'red', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '4px'}}                    
                        id="outlined-password-input"
                        label="Confirm password"
                        type="password"
                    />
                    <DoneAllIcon variant="success" sx={{color: 'lightGreen', position: 'absolute'}} />                                        
                </div>
            </form>
        )
    }
}