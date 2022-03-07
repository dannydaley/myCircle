import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import me from '../../Images/me.jpg'
import PersonAddIcon from '@mui/icons-material/PersonAdd';


export default class ProfileLeftBar extends React.Component  {

  constructor(props, changeAlertNotifications) {
    super(props);
  } 
  render () {
    const { userFirstName, userLastName, changeAlertNotifications } = this.props
    return (
      <div>
        <React.Fragment>
        <CssBaseline />
        <Container position="fixed" maxWidth="sm" sx={{ position: 'fixed', bgcolor: '#343434', border: '', height: '80vh', width: 300, ml: 2, mr:2,  mt: 16, justifyContent: 'flex-start', alignItems: 'center'}} >
          <Box sx={{ padding: 2, bgcolor: 'none'}}>
              <img src={me} width="200px" height="150px" style={{ boxShadow: "1px 3px 5px 0px black", mb: 3, ":hover": { cursor: 'pointer' } }} />
              <Typography variant="h5" component="div" color="white" sx={{textAlign: 'center', mt: 2}}>{userFirstName} {userLastName}</Typography>
              <Button variant="contained"  startIcon={<PersonAddIcon />} sx={{textTransform: 'none'}} onClick={() => changeAlertNotifications}>Add Friend</Button>
              {/* <Stack spacing={2} sx={{  width: 200, margin: '50px auto 0' }}>
                  <Button variant="contained" onClick={()=>changeCircle('general')}>GENERAL</Button>
                  <Button variant="contained" onClick={()=>changeCircle('gaming')}>GAMING</Button>
                  <Button variant="contained" onClick={()=>changeCircle('coding')}>CODING</Button>
                  <Button variant="contained">ART</Button>
                  <Button variant="contained">ANIME</Button>
              </Stack> */}
            </Box>
            <Typography variant="h6" component="div" color="white" sx={{textAlign: 'center', mt: 2}}>Users info</Typography>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}