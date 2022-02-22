import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Backdrop } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';

export default class NewPost extends React.Component { 
    constructor(props) {
        super();
        this.state = {
            'postContent': ''            
        }
    }

    onContentChange = (event) => {
        this.setState({postContent: event.target.value})
    }

    onPostSubmit = () => {
        fetch('http://localhost:3001/newPost', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'content': this.state.postContent,                
            })
        })
        this.props.onRouteChange('home')
    }

        // const [loading, setLoading] = React.useState(false);
        // const handleChange = (event) => {
        //     setValue(event.target.value);
        //   };
        //   const [value, setValue] = React.useState('Controlled');
        //   function handleClick() {
        //       setLoading(true);
        //   }

    render () {
        const { onRouteChange } = this.props;    
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
                    // loading={loading}
                    loadingPosition="end" 
                    variant="contained"
                    sx={{mb: 3}}
                >
                    Post
                </LoadingButton>                
                <Divider variant="middle" sx={{mt: 5}} />
            </div>
        );
    }
}