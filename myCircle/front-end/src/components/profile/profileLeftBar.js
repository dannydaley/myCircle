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

  constructor(props) {
    super(props);
  } 

  render () {
    const { userFirstName, userLastName, loggedInUsername, changeAlertNotifications, userProfilePicture, isFriendsWithLoggedInUser, sendFriendRequest } = this.props
    console.log(userProfilePicture)
    return (
      <div>
        <React.Fragment>
        <CssBaseline />
        <Container position="fixed" maxWidth="sm" sx={{ position: 'fixed', bgcolor: '#343434', border: '', height: '80vh', width: 300, ml: 2, mr:2,  mt: 16, justifyContent: 'flex-start', alignItems: 'center'}} >
          <Box sx={{ padding: 2, bgcolor: 'none'}}>
            <img src={"http://localhost:3001/public/" + userProfilePicture} width="200px" height="150px" style={{ boxShadow: "1px 3px 5px 0px black", mb: 3, ":hover": { cursor: 'pointer' } }} />
            <Typography variant="h5" component="div" color="white" sx={{textAlign: 'center', mt: 2}}>{userFirstName} {userLastName}</Typography>
            {isFriendsWithLoggedInUser? "" : <Button variant="contained"  startIcon={<PersonAddIcon />} sx={{textTransform: 'none', mt: 2}} onClick={sendFriendRequest}>Add Friend</Button>}
          </Box>
          <Typography variant="h6" component="div" color="white" sx={{textAlign: 'center', mt: 2}}>Users info</Typography>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}