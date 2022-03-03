import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import me from '../../Images/me.jpg'

export default class MyAccountRightBar extends React.Component {
  
  render () {
  const { userFirstName, userLastName } = this.props
  return (
    <div style={{position: 'fixed', width: '100vw'}}>
      <React.Fragment >
      <CssBaseline />      
      <Container  maxWidth="sm" sx={{float: 'right',  bgcolor: '#343434', height: '80vh', width: 300, mr: 4 ,mt: 16, justifyContent: 'flex-start', alignItems: 'center'}} >
      <Typography variant="h6" component="div" color="white" sx={{textAlign: 'center', mt: 2, paddingTop: 1, paddingBottom: 2, bgcolor: 'none' }}>{userFirstName}'s images</Typography>
        <Box sx={{ bgcolor: 'none'}}>
            {/* FOREACH HERE FOR USERS PICTURES */}
              <Grid container spacing={1}>
                <Grid item xs={6} md={4} style={{display:'flex'}}>
                  <img src={me} style={{width: '100%'}}/>
                </Grid>
                <Grid item xs={6} md={4} style={{display:'flex'}}>
                  <img src={me} style={{width: '100%'}}/>
                </Grid>
                <Grid item xs={6} md={4} style={{display:'flex'}}>
                  <img src={me} style={{width: '100%'}}/>
                </Grid>
                <Grid item xs={6} md={4} style={{display:'flex'}}>
                  <img src={me} style={{width: '100%'}}/>
                </Grid>
                <Grid item xs={6} md={4} style={{display:'flex'}}>
                  <img src={me} style={{width: '100%'}}/>
                </Grid>
                <Grid item xs={6} md={4} style={{display:'flex'}}>
                  <img src={me} style={{width: '100%'}}/>
                </Grid>
                <Grid item xs={6} md={4} style={{display:'flex'}}>
                  <img src={me} style={{width: '100%'}}/>
                </Grid>
              </Grid>
              
            
            {/* <Stack spacing={1} sx={{  width: 250, margin: '50px auto 0'       }}>      
                

            </Stack> */}
        </Box>
      </Container>
    </React.Fragment>
    </div>
  );
}
}