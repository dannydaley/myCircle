import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import me from '../Images/me.jpg'

export default class LeftBar extends React.Component  {

  constructor(props) {
    super();
  } 
  render () {
    const { changeCircle } = this.props;
    return (
      <div>
        <React.Fragment>
        <CssBaseline />
        <Container position="fixed" maxWidth="sm" sx={{ position: 'fixed', bgcolor: '#343434', border: '', height: '80vh', width: 300, ml: 2, mr:2,  mt: 16, justifyContent: 'flex-start', alignItems: 'center'}} >
          <Box sx={{ padding: 2, bgcolor: 'none'}}>
              <img src={me} width="200px" height="150px" style={{ boxShadow: "1px 3px 5px 0px black", mb: 3 }}  onClick={()=>this.props.onRouteChange('profile')}/>
              <Stack spacing={2} sx={{  width: 200, margin: '50px auto 0' }}>
                  <Button variant="contained" onClick={()=>changeCircle('general')}>GENERAL</Button>
                  <Button variant="contained" onClick={()=>changeCircle('gaming')}>GAMING</Button>
                  <Button variant="contained" onClick={()=>changeCircle('coding')}>CODING</Button>
                  <Button variant="contained">ART</Button>
                  <Button variant="contained">ANIME</Button>
              </Stack>
            </Box>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}