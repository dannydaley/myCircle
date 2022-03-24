import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Routes, Route, Link } from "react-router-dom";
import { CircularProgress, Typography } from '@mui/material';

export default class MessagesLeftBar extends React.Component  {

  constructor(props) {
    super(props);
      this.state = {
        chatsAreLoaded: false,
        chats: []
      }  
  }
  // getFeed = async (newCircle) => { 
  //   if (!newCircle || newCircle === undefined) {
  //     newCircle = 'general'
  //   }  
  //   this.setState({ dataIsLoaded: false, circle: newCircle })   
  //   //FETCH IS A GET REQUEST BY DEFAULT, POINT IT TO THE ENDPOINT ON THE BACKEND
  //   fetch('http://localhost:3001/getFeedFriendsOnly', {
  //     method: 'post',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({
  //       user: this.props.loggedInUsername,
  //       profilePicture: this.props.userProfilePicture,
  //       circle: newCircle
  //     })    
  //   }) 
  

  componentDidMount = () => {
    this.setState({ chatsAreLoaded: false })
    fetch('http://localhost:3001/getAllUsersChats', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user: this.props.loggedInUsername  
      })    
    })
    //TURN THE RESPONSE INTO A JSON OBJECT
    .then(response => response.json())    
    // WHAT WE DO WITH THE DATA WE RECEIVE (data => console.log(data)) SHOULD SHOW WHAT WE GET
    .then(data => {      
      this.setState({chats: data, chatsAreLoaded: true})
      console.log(data)
    })

  }
  
  
  render () {
    const { changeCircle, userProfilePicture, loggedInUsername, getChat } = this.props;
    const { chatsAreLoaded, chats } = this.state;
    if (!chatsAreLoaded) {
      return (
        <div>
        <React.Fragment>
        <CssBaseline />
        <Container position="fixed" maxWidth="sm" sx={{ position: 'fixed', bgcolor: '#343434', border: '', height: '80vh', width: 300, ml: 2, mr:2,  mt: 16, justifyContent: 'flex-start', alignItems: 'center'}} >
          <Box sx={{ padding: 2, bgcolor: 'none'}}>
          <Link to="/myProfile">
            <img src={"http://localhost:3001/public/" + userProfilePicture} width="200px" height="150px" sx={{ ":hover": { cursor: 'pointer' }}} style={{ boxShadow: "1px 3px 5px 0px black", mb: 3, "hover": { cursor: 'pointer' } }}  
            // onClick={()=>this.props.onRouteChange('profile')}
            />
          </Link>              
              <Typography variant="h5" component="div" color="white" sx={{textAlign: 'center', mt: 2}}>Chats</Typography>              
              <CircularProgress sx={{mt: 6}}/>
              <Typography variant="h6" component="div" color="white" sx={{textAlign: 'center', mt: 2}}>Loading chats..</Typography> 
            </Box>
          </Container>
        </React.Fragment>
      </div>
      )
    } else {
          return (
      <div>
        <React.Fragment>
        <CssBaseline />
        <Container position="fixed" maxWidth="sm" sx={{ position: 'fixed', bgcolor: '#343434', border: '', height: '80vh', width: 300, ml: 2, mr:2,  mt: 16, justifyContent: 'flex-start', alignItems: 'center'}} >
          <Box sx={{ padding: 2, bgcolor: 'none'}}>
          <Link to="/myProfile">
              <img src={"http://localhost:3001/public/" + userProfilePicture} width="200px" height="150px" sx={{ ":hover": { cursor: 'pointer' }}} style={{ boxShadow: "1px 3px 5px 0px black", mb: 3, "hover": { cursor: 'pointer' } }}  
              // onClick={()=>this.props.onRouteChange('profile')}
              />
            </Link>    
              <Typography
                variant="h5"
                component="div"
                color="white"
                sx={{textAlign:
                'center',
                mt: 2}}>
                Chats
              </Typography>
              <Stack
                spacing={2}
                sx={{
                  width: 200,
                  margin: '50px auto 0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                  }}>


                  {this.state.chats.map(chat => (                    
                      (chat.user1 === loggedInUsername && chat.seenByUser1) || (chat.user2 === loggedInUsername && chat.seenByUser2) ?
                      <Button variant="contained"
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        backgroundColor: 'gray',
                        width: '270px'}}
                        onClick={()=>getChat(loggedInUsername, chat.chatId)}>
                          <img 
                            src={"http://localhost:3001/public/" + chat.profilePicture}
                            width="50px"
                            height="50px"
                            style={{
                              borderRadius:'50%'
                            }}/>                                          
                            {chat.firstName} {chat.lastName}
                      </Button> 
                      : 
                      <Button variant="contained"
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',  
                          width: '270px'}}
                          onClick={()=>getChat(loggedInUsername, chat.chatId)}>
                            <img 
                              src={"http://localhost:3001/public/" + chat.profilePicture}
                              width="50px"
                              height="50px"
                              style={{
                                borderRadius:'50%'
                              }}/>                                          
                              {chat.firstName} {chat.lastName}
                        </Button>                    
                  ))}
              </Stack>
            </Box>
          </Container>
        </React.Fragment>
      </div>
    );
    }

  }
}