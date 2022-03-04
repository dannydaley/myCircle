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

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


export default class MyInformation extends React.Component {

    constructor(props) {
        super();
        this.state = {
            firstName: '',
            lastName: '',            
            aboutMe : '',
            location : "Falmouth, UK",
            education : '',
            work: '',
            dataIsLoaded: false
        }

      }
      text = "This is my about me section and this is dummy text, This is my about me section and this is dummy text, This is my about me section and this is dummy text, This is my about me section and this is dummy text, This is my about me section and this is dummy text, This is my about me section and this is dummy text, This is my about me section and this is dummy text, This is my about me section and this is dummy text, "

      componentDidMount = async (newCircle) => {
        if (!newCircle) {
          newCircle = 'general'
        }  
        this.setState({ dataIsLoaded: false,  })   
        //FETCH IS A GET REQUEST BY DEFAULT, POINT IT TO THE ENDPOINT ON THE BACKEND
        fetch('http://localhost:3001/getUserGeneralInfo', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
          user: 'DannyDaley'
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
            dataIsLoaded: true
          });
        })
      }

    render() {
        const { settings } = this.props; 
        const { firstName,lastName, aboutMe,location,education, work, dataIsLoaded } = this.state
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
                        
                 
                    <PersonIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}} /> 
                    <TextField
                        sx={{mr: '5%' ,maxWidth: '30%', width: '25%', borderColor: 'red', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '4px'}}
                        id="outlined-textarea"
                        label="First name"
                        placeholder="Your first name"                     
                        multiline                    
                        defaultValue={firstName}
                    />
                    
                    <TextField
                        sx={{maxWidth: '30%', width: '30%', borderColor: 'red', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '4px'}}
                        id="outlined-textarea"
                        label="Last name"
                        placeholder="Your last name"                     
                        multiline                    
                        defaultValue={lastName}
                    />
                    </div>
                    <div  style={{marginTop: '30px'}}>
                    <InfoIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}} /> 
                    <TextField
                        sx={{maxWidth: '60%', width: '60%', borderColor: 'red', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '4px'}}
                        id="outlined-textarea"
                        label="About me"
                        placeholder="Tell them who you are!"  
                        
                        multiline
                        minRows={4}
                        defaultValue={aboutMe}
                        // value={this.text}
                        />
                    </div>
                    <div style={{marginTop: '30px'}}>
                    <LocationCityIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}} /> 
                    <TextField
                        sx={{maxWidth: '60%', width: '60%', borderColor: 'red', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '4px'}}
                        id="outlined-textarea"
                        label="Location"
                        placeholder="Tell them where you are!"                     
                        multiline 
                        defaultValue={location}                   
                        // value={this.text}
                        />
                    </div>
                    <div style={{marginTop: '30px'}}>
                    <SchoolIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}}/> 
                    <TextField
                        sx={{maxWidth: '60%', width: '60%', borderColor: 'red', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '4px'}}
                        id="outlined-textarea"
                        label="School/University"
                        placeholder="Tell them where you went to school!"                     
                        multiline 
                        defaultValue={education}                   
                        // value={this.text}
                        />
                    </div>
                    <div style={{marginTop: '30px'}}>
                    <WorkIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}} /> 
                    <TextField
                        sx={{maxWidth: '60%', width: '60%', borderColor: 'red', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '4px'}}
                        id="outlined-textarea"
                        label="Work"
                        placeholder="Tell them where you work!"                     
                        multiline                    
                        defaultValue={work}
                        />
                    </div>
                </div>
            )
        }
    }
}