import React from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ShieldIcon from '@mui/icons-material/Shield';





import LockIcon from '@mui/icons-material/Lock';

export default class MyLoginInfo extends React.Component {

    constructor(props) {
        super();

      }

    render() {
        const { settings } = this.props; 
        return(
            <div style={{
                // backgroundColor: 'white',
             height: '100%'}}>
                <Typography variant="h3" component="div" color="white" sx={{textAlign: 'center', mt: 2, paddingTop: 1, paddingBottom: 2, bgcolor: 'none' }}>{settings}</Typography>
                
                <div style={{marginTop: '150px'}}>
                    <ContactMailIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}} /> 
                    <TextField
                        sx={{maxWidth: '60%', width: '60%', borderColor: 'red', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '4px'}}
                        id="outlined-textarea"
                        label="Email"
                        placeholder="Change email adress"                     
                        multiline                    
                        // value={this.text}
                        />
                </div>
                <div style={{marginTop: '30px'}}>
                <LockOpenIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}}/> 
                <TextField
                    sx={{maxWidth: '60%', width: '60%', borderColor: 'red', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '4px'}}
                    id="outlined-textarea"
                    label="Verify password"
                    placeholder="Verify password to apply changes"                     
                    multiline                    
                    // value={this.text}
                    />
                </div>
                <div style={{marginTop: '30px'}}>
                <LockIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}} /> 
                <TextField
                    sx={{maxWidth: '60%', width: '60%', borderColor: 'red', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '4px'}}
                    id="outlined-textarea"
                    label="New password"
                    placeholder="Change password"
                    multiline                    
                    defaultValue={this.text}
                    />
                </div>
                <div style={{marginTop: '30px'}}>
                <ShieldIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}} /> 
                <TextField
                    sx={{maxWidth: '60%', width: '60%', borderColor: 'red', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '4px'}}
                    id="outlined-textarea"
                    label="Confirm password"
                    placeholder="Confirm new password"
                    multiline                    
                    defaultValue={this.text}
                    />
                </div>

            </div>

        )
    }
}