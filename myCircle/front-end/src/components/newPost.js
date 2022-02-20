import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Backdrop } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import Divider from '@mui/material/Divider';


export default function NewPost() {
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
      setValue(event.target.value);
    };
    
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
        />
            <SendIcon fontSize="large" sx={{ mt: 3, fontSize: 70,color: 'white'}}/>
            <Divider variant="middle" sx={{mt: 5}} />
        </div>
    )
}