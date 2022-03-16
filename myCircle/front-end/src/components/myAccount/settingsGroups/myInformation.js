import React from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SchoolIcon from '@mui/icons-material/School';
import Container from '@mui/material/Container';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


export default class MyInformation extends React.Component {

    constructor(props) {
        super();
        this.state = {
            firstName: '',
            lastName: '',            
            aboutMe : '',
            location : "",
            education : '',
            work: '',
            profilePicture : '',
            dataIsLoaded: false
        }
    }


    onFirstNameChange = (event) => {
        this.setState({firstName: event.target.value})
    }
    onLastNameChange = (event) => {
        this.setState({lastName: event.target.value})
    }
    onAboutMeChange = (event) => {
        this.setState({aboutMe: event.target.value})
    }
    onLocationChange = (event) => {
        this.setState({location: event.target.value})
    }
    onEducationChange = (event) => {
        this.setState({education: event.target.value})
    }
    onWorkChange = (event) => {
        this.setState({work: event.target.value})
    }


    updateUserGeneralInfo = () => {
        const { firstName, lastName, aboutMe, location, education, work } = this.state
        fetch('http://localhost:3001/updateUserGeneralInfo', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            username: this.props.loggedInUsername,
            firstName: firstName,
            lastName: lastName,            
            aboutMe : aboutMe,
            location : location,
            education : education,
            work: work
            })    
        })
        //TURN THE RESPONSE INTO A JSON OBJECT
        .then(response => response.json())        
        // WHAT WE DO WITH THE DATA WE RECEIVE (data => console.log(data)) SHOULD SHOW WHAT WE GET
        .then(data => { 
            this.componentDidMount()
    })
}





    componentDidMount = async (newCircle) => {
        if (!newCircle) {
          newCircle = 'general'
        }  
        this.setState({ dataIsLoaded: false,  })   
        console.log(this.props.loggedInUsername)
        //FETCH IS A GET REQUEST BY DEFAULT, POINT IT TO THE ENDPOINT ON THE BACKEND
        fetch('http://localhost:3001/getUserGeneralInfo', {
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
          this.setState({ 
            firstName: data.firstName,
            lastName: data.lastName,
            aboutMe : data.aboutMe,
            location : data.location,
            education : data.education,
            work: data.work,
            profilePicture: data.profilePicture,
            dataIsLoaded: true
          });
        })
      }

    render() {
        const { settings } = this.props; 
        const { firstName,lastName, aboutMe,location,education, work, profilePicture, dataIsLoaded } = this.state
        if (!dataIsLoaded) {
            return(
                <Box sx={{ padding: 2, bgcolor: 'none', display: 'flex', justifyContent: 'center', mt: 2}}>
                    <CircularProgress />                    
                </Box>
            )
        }
        else {
            return (            
                <div style={{height: '100%'}}>
                    <Typography variant="h3" component="div" color="white" sx={{textAlign: 'center', mt: 2, paddingTop: 1, paddingBottom: 2, bgcolor: 'none' }}>{settings}</Typography>                    
                    <div style={{marginTop: '30px', display: 'block'}}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <img 
                            src={
                                'http://localhost:3001/public/' + profilePicture
                                // process.env.SERVER + process.env.SERVERPUBLICDIRECTORY + props.profilePicture 

                                } width="200px" height="150px" style={{ boxShadow: "1px 3px 5px 0px black", mb: 3 }}
                                // onClick={()=>this.props.onRouteChange('profile')}
                                /> 
                                <Typography variant="h6" component="div" sx={{textAlign: 'center', mt: 2, paddingTop: 1, paddingBottom: 3, bgcolor: 'none' }}>Change profile picture</Typography>
                            </div>   
  
                    {/* images/profilePictures/Daley-update-profile-picture-1640184634605-875098110.png */}
                    <PersonIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}} /> 
                    <TextField
                        sx={{mr: '5%' ,maxWidth: '30%', width: '25%', border: '6px solid white', borderRadius: '4px',backgroundColor: 'white' }}
                        id="outlined-textarea"
                        label="First name"
                        placeholder="Your first name"                     
                        multiline                    
                        defaultValue={firstName}
                        onChange={this.onFirstNameChange}
                    />
                    
                    <TextField
                        sx={{maxWidth: '30%', width: '30%', border: '6px solid white', borderRadius: '4px',backgroundColor: 'white'}}
                        id="outlined-textarea"
                        label="Last name"
                        placeholder="Your last name"                     
                        multiline                    
                        defaultValue={lastName}
                        onChange={this.onLastNameChange}
                    />
                    </div>
                    <div  style={{marginTop: '30px'}}>
                    <InfoIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}} /> 
                    <TextField
                        sx={{maxWidth: '60%', width: '60%', border: '6px solid white', borderRadius: '4px',backgroundColor: 'white'}}
                        id="outlined-textarea"
                        label="About me"
                        placeholder="Tell them who you are!"  
                        
                        multiline
                        minRows={4}
                        defaultValue={aboutMe}
                        onChange={this.onAboutMeChange}
                        // value={this.text}
                        />
                    </div>
                    <div style={{marginTop: '30px'}}>
                    <LocationCityIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}} /> 
                    <TextField
                        sx={{maxWidth: '60%', width: '60%', border: '6px solid white', borderRadius: '4px',backgroundColor: 'white'}}
                        id="outlined-textarea"
                        label="Location"
                        placeholder="Tell them where you are!"                     
                        multiline 
                        defaultValue={location}
                        onChange={this.onLocationChange}                   
                        // value={this.text}
                        />
                    </div>
                    <div style={{marginTop: '30px'}}>
                    <SchoolIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}}/> 
                    <TextField
                        sx={{maxWidth: '60%', width: '60%', border: '6px solid white', borderRadius: '4px',backgroundColor: 'white'}}
                        id="outlined-textarea"
                        label="School/University"
                        placeholder="Tell them where you went to school!"                     
                        multiline 
                        defaultValue={education}
                        onChange={this.onEducationChange}                   
                        // value={this.text}
                        />
                    </div>
                    <div style={{marginTop: '30px', marginBottom: '30px'}}>
                    <WorkIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}} /> 
                    <TextField
                        sx={{maxWidth: '60%', width: '60%', border: '6px solid white', borderRadius: '4px',backgroundColor: 'white'}}
                        id="outlined-textarea"
                        label="Work"
                        placeholder="Tell them where you work!"                     
                        multiline                    
                        defaultValue={work}
                        onChange={this.onWorkChange}
                        />
                    </div>
                    <div>
                        <Button variant="contained"
                        onClick={()=>this.updateUserGeneralInfo()}>Update</Button>   
                    </div>
                    
                </div>
            )
        }
    }
}