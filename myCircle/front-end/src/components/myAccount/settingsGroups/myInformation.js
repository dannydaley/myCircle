import React from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SchoolIcon from '@mui/icons-material/School';


export default class MyInformation extends React.Component {

    constructor(props) {
        super();

      }
      text = "This is my about me section and this is dummy text, This is my about me section and this is dummy text, This is my about me section and this is dummy text, This is my about me section and this is dummy text, This is my about me section and this is dummy text, This is my about me section and this is dummy text, This is my about me section and this is dummy text, This is my about me section and this is dummy text, "

    render() {
        const { settings } = this.props; 
        return(
            <div style={{
                // backgroundColor: 'white',
             height: '100%'}}>
                <Typography variant="h3" component="div" color="white" sx={{textAlign: 'center', mt: 2, paddingTop: 1, paddingBottom: 2, bgcolor: 'none' }}>{settings}</Typography>
                
                <div  style={{marginTop: '150px'}}>
                <PersonIcon sx={{mr: 2, color: 'rgba(255, 255, 255, 0.7)'}} /> 
                <TextField
                    sx={{maxWidth: '60%', width: '60%', borderColor: 'red', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '4px'}}
                    id="outlined-textarea"
                    label="About me"
                    placeholder="Tell them who you are!"  
                      
                    multiline
                    minRows={4}
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
                    defaultValue={this.text}
                    />
                </div>

            </div>

        )
    }
}