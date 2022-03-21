import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import me from '../Images/me.jpg'

import { Routes, Route, Link } from "react-router-dom";

export default class LeftBar extends React.Component  {

  constructor(props) {
    super(props);

  } 
  render () {
    const { changeCircle, userProfilePicture } = this.props;
    return (
      <div>
        <React.Fragment>
        <CssBaseline />
        <Container position="fixed" maxWidth="sm" sx={{ position: 'fixed', bgcolor: '#343434', border: '', height: '80vh', width: 300, ml: 2, mr:2,  mt: 16, justifyContent: 'flex-start', alignItems: 'center'}} >
          <Box sx={{ padding: 2, bgcolor: 'none'}}>
          <Link to="/myProfile">
              <img src={"http://localhost:3001/public/" + userProfilePicture} width="200px" height="150px" sx={{ ":hover": { cursor: 'pointer' }}} style={{ boxShadow: "1px 3px 5px 0px black", mb: 3, "hover": { cursor: 'pointer' } }}  
              // onClick={()=>this.props.onRouteChange('profile')}
              /></Link>
              <Stack spacing={2} sx={{  width: 200, margin: '50px auto 0' }}>              
                  <Button variant="contained" onClick={()=>changeCircle('general')}>GENERAL</Button>
                  <Button variant="contained" onClick={()=>changeCircle('gaming')}>GAMING</Button>
                  <Button variant="contained" onClick={()=>changeCircle('coding')}>CODING</Button>
              </Stack>
            </Box>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}