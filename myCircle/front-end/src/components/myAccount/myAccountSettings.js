import * as React from 'react';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FeedPost from '../feedPost';
import NewPost from '../newPost';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import MyAccountOverlay from './myAccountOverlay'
import TextField from '@mui/material/TextField';

import MyInformation from './settingsGroups/myInformation'
import MyLoginInfo from './settingsGroups/myLoginInfo'
import MyCircles from './settingsGroups/myCircles'
import MyFriends from './settingsGroups/myFriends'

export default class MyAccountSettings extends React.Component {

  constructor(props) {
    super();
    this.state = {
      settings: 'My information',
        posts: [],
        dataIsLoaded: false
    }
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  delayFunction = async () => {
    await this.delay(1000);
    console.log("LOADING FEED");
  };


  //COMPONENT DID MOUNT IS BUILT IN AND RUNS WHEN THE COMPONENT MOUNTS
  componentDidMount = async (newSettings) => {
    if (!newSettings) {
      newSettings = this.state.settings
    }  
    this.setState({ dataIsLoaded: false, settings: newSettings })   
    //FETCH IS A GET REQUEST BY DEFAULT, POINT IT TO THE ENDPOINT ON THE BACKEND
    fetch('http://localhost:3001/getFeedByUser', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user: 'Daley',
        settings: newSettings
      })    
    })
    //TURN THE RESPONSE INTO A JSON OBJECT
    .then(response => response.json())
    .then(await this.delayFunction())
    // WHAT WE DO WITH THE DATA WE RECEIVE (data => console.log(data)) SHOULD SHOW WHAT WE GET
    .then(data => {    
      this.setState({ 
        settings: newSettings,     
        posts: data,
        dataIsLoaded: true
      });
    })
  }

  changeSettings = (newSettings) => { 
    console.log("clicckeeedddd")
    this.componentDidMount(newSettings); 
  }

  settingsGroup = (selection) => {
    switch (selection) {
      case 'My information' : return <MyInformation settings={this.state.settings}/>;
      case 'My Circles' : return <MyCircles settings={this.state.settings}/>;
      case 'My friends' :return <MyFriends settings={this.state.settings}/>
      case 'My login info' :return <MyLoginInfo settings={this.state.settings}/>
      default: return <MyInformation settings={this.state.settings}/>
  }
}

  render () {   
    const { onRouteChange, changeMailNotifications } = this.props; 
    //SETTING UP ACCESS TO THE STATE VARIABLES   
    const { circle, posts, dataIsLoaded } = this.state;
    // IF THE DATA ISNT LOADED YET, LOAD AN ALTERNATIVE WHILE WE WAIT   
    if (!dataIsLoaded) {
      return (
      <div>
        <MyAccountOverlay changeSettings={this.changeSettings}/>        
        <div style={{backgroundColor: '#010101', display: 'flex', justifyContent: 'space-between', paddingBottom: '100px', minHeight: '100vh'}}>          
          <div style={{width: '30%', height: '100px'}}></div>
            <React.Fragment>              
            <CssBaseline />
            <Container maxWidth="lg" sx={{zIndex: 10, bgcolor: '#343434', borderRadius: '0px 0px 30px 30px', width: '100%', pb: 2, ml: 2, mr:2,  mt: 12}}>
                {/* <NewPost /> */}

                
                <Box sx={{ padding: 2, bgcolor: 'none', display: 'flex', justifyContent: 'center', mt: 2}}>
                    <CircularProgress />                    
                </Box>
                <h1 style={{ color: 'white' }}>loading {this.state.settings}</h1>
                <Divider variant="middle" sx={{mt: 1.5, mb: 1.5}} />                
                <Typography sx={{ mb: 1.5 }} color="white" sx={{ fontSize: 16 }}>
                    End of posts
                </Typography>
              </Container>
            </React.Fragment>
          <div style={{width: '30%', height: '100px'}}></div>
        </div>
      </div>
      )
    } else {
    // OTHERWISE RUN THE GOOD STUFF
      return (
        <div>
          <MyAccountOverlay changeSettings={this.changeSettings}/>
          <div style={{backgroundColor: '#010101', display: 'flex', justifyContent: 'space-between', paddingBottom: '100px', minHeight: '100vh'}}>
            <div style={{width: '30%', height: '100px'}}></div>
                <React.Fragment>              
                    <CssBaseline />
                    <Container maxWidth="lg" sx={{zIndex: 10, bgcolor: '#343434', borderRadius: '0px 0px 30px 30px', width: '100%', pb: 2, ml: 2, mr:2,  mt: 12}}>
                    
                        {/* <NewPost /> */}
                        {/* <p>{this.feedPosts}</p>
                        <Box sx={{ padding: 2, bgcolor: 'none'}}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Multiline"
                            multiline
                            rows={4}
                            defaultValue="Default Value"
                          />
                            
                        </Box> */}
                        {this.settingsGroup(this.state.settings)}
                        <Typography sx={{ mb: 1.5 }} color="white" sx={{ fontSize: 16 }}>
                            End of posts
                        </Typography>
                    </Container>
                </React.Fragment>
            <div style={{width: '30%', height: '100px'}}></div>
          </div>       
        </div>
      );
    }
  } 
}