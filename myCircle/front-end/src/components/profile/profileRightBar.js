import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import RightBarImages from './rightBarImages';

import me from '../../Images/me.jpg'

export default class ProfileRightBar extends React.Component {
  

  render () {
  const { userFirstName, userLastName, loggedInUsername, userProfileToGet } = this.props
    return (
      <div style={{position: 'fixed', width: '100vw'}}>
        <React.Fragment >
        <CssBaseline />      
        <Container  maxWidth="sm" sx={{float: 'right',  bgcolor: '#343434', height: '80vh', width: 300, mr: 4 ,mt: 16, display: 'flex', flexDirection: 'column',  justifyContent: 'flex-start', alignItems: 'center'}} >
        <Typography variant="h6" component="div" color="white" sx={{textAlign: 'center', mt: 2, paddingTop: 1, paddingBottom: 2, bgcolor: 'none' }}>{userFirstName}'s imagesss</Typography>
          <div style={{height: '100%', overflow: 'hidden'}}>
            <RightBarImages loggedInUsername={loggedInUsername} userProfileToGet={userProfileToGet} />
          </div>
        </Container>
      </React.Fragment>
      </div>
    );
  }
}