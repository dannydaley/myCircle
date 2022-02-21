import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

export default class SignInForm extends React.Component 
{
    constructor(props) {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

onSubmitSignIn = () => {
    fetch('http://localhost:3001/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'email': this.state.signInEmail,
            'password': this.state.signInPassword
        })
    })
    this.props.onRouteChange('home')
}

    render () {
        const { onRouteChange } = this.props;
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
                            onChange={this.onEmailChange}
                            />
                            <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={this.onPasswordChange}
                            />
                            <Button variant="contained" sx={{width: '33ch'}} type="submit" value="Sign In" 
                            // onClick={() => onRouteChange('home')}
                            onClick={()=> this.onSubmitSignIn()}>
                                Sign In
                            </Button>
                            <p><a href="#">Forgotten Password?</a></p>
                        </form>
                        <Divider variant="middle" style={{marginTop: '20px', marginBottom: '40px'}}/>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Button variant="contained" sx={{width: '33ch'}} onClick={()=>onRouteChange('signup')}>Sign Up</Button>        
                        </div>
                    </Box>
                </div>
            );
        }

}