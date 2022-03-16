import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Backdrop } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';
import NavBar from './navBar';
import { styled } from '@mui/system';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';

export default class NewPost extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            'author': this.props.loggedInUsername,
            'authorFirstName': this.props.userFirstName,
            'authorLastName': this.props.userLastName,
            'image': this.props.userProfilePicture,
            "link":"",            
            'postContent': '',
            "date":"28-12-2019",
            "postStrict": false,
            "recipient": this.props.recipient        
        }
    }

    blue = {
        500: '#007FFF',
      };
      
      grey = {
        400: '#BFC7CF',
        500: '#AAB4BE',
        600: '#6F7E8C',
      };
      
      Root = styled('span')(
        ({ theme }) => `
        font-size: 0;
        position: relative;
        display: inline-block;
        width: 40px;
        height: 20px;
        margin: 10px;
        cursor: pointer;      
        &.${switchUnstyledClasses.disabled} {
          opacity: 0.4;
          cursor: not-allowed;
        }      
        & .${switchUnstyledClasses.track} {
          background: ${theme.palette.mode === 'dark' ? this.grey[600] : this.grey[400]};
          border-radius: 10px;
          display: block;
          height: 100%;
          width: 100%;
          position: absolute;
        }      
        & .${switchUnstyledClasses.thumb} {
          display: block;
          width: 14px;
          height: 14px;
          top: 3px;
          left: 3px;
          border-radius: 16px;
          background-color: #fff;
          position: relative;
          transition: all 200ms ease;
        }      
        &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
          background-color: ${this.grey[500]};
          box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
        }      
        &.${switchUnstyledClasses.checked} {
          .${switchUnstyledClasses.thumb} {
            left: 22px;
            top: 3px;
            background-color: #fff;
          }      
          .${switchUnstyledClasses.track} {
            background: ${this.blue[500]};
          }
        }      
        & .${switchUnstyledClasses.input} {
          cursor: inherit;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          z-index: 1;
          margin: 0;
        }
        `,
      );
      label = { componentsProps: { input: { 'aria-label': 'Demo switch' } } };
      
  delay = ms => new Promise(res => setTimeout(res, ms));

  delayFunction = async () => {
    await this.delay(1000);
  };
    onStrictChange = async() => {
        this.setState({postStrict: !this.state.postStrict})
        await this.delayFunction(2000)
        console.log(this.state.postStrict)
    }
    onContentChange = (event) => {
        this.setState({postContent: event.target.value})        
    }
    onPostSubmit = () => {
        if (this.state.postContent.length < 5) {
            console.log("post not long enough")
            return
        }  
        fetch('http://localhost:3001/newPost', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'postData': this.state,
                'circle' : this.props.circle                
            })
        }).then(response => response.json())
        .then(data => {
            if (data === 'success') {              
                this.props.changeCircle(this.props.circle) 
            } else {
                console.log(data)
            } 
        })
    }

    render () {
        const { onRouteChange, userFirstName, userLastName, userUserName, circle } = this.props;           
        return (
            <div style={{marginTop: '20px'}}>
                <label for="file-input">
                    <ImageIcon fontSize="large" sx={{ mt: 3, fontSize: 70,  color: 'white', mr: 2}} />
                </label>
                <input id="file-input" type="file" name="file" hidden/>   
                <TextField style={{backgroundColor: 'white', opacity: '0.5', borderRadius: '5px', width: '50%'}} sx={{mt: 2, mr: 2}}
                    id="filled-textarea"
                    label="New Post"
                    
                    placeholder="I've got something to say!"
                    multiline
                    onChange={this.onContentChange}                    
                />
                <LoadingButton                
                onClick={()=> this.onPostSubmit()}                
                    endIcon={<SendIcon />}
                    loadingPosition="end" 
                    variant="contained"
                    sx={{mb: 3}}
                >
                    Post
                </LoadingButton>
                <SwitchUnstyled component={this.Root} {...this.label}  onChange={this.onStrictChange} />                     
                <Divider variant="middle" sx={{mt: 5}} />
            </div>
        );
    }
}