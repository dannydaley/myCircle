
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import me from '../me.svg'




export default function BasicStack() {
  return (
    <div>
        
      {/* <Box spacing={2} sx={{ bgcolor: '#cfe8fc', height: '80vh', width: 300, ml: 2, mt: 2, justifyContent: 'flex-start', alignItems: 'center'}}>
          <img src={me} width="200px" height="200px" />
      
      <Button variant="contained">Contained</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="contained">Contained</Button>
      </Box> */}
      <React.Fragment>
      <CssBaseline />
      <Container position="fixed" maxWidth="sm" sx={{ position: 'fixed', bgcolor: '#343434', border: '', height: '80vh', width: 300, ml: 2, mr:2,  mt: 16, justifyContent: 'flex-start', alignItems: 'center'}} >
        <Box sx={{ padding: 2, bgcolor: 'none'
         }}>
            <img src={me} width="200px" height="150px" style={{ boxShadow: "1px 3px 5px 0px black", mb: 3 }} />
            <Stack spacing={2} sx={{  width: 200, margin: '50px auto 0'       }}>      
        {/* A FOR EACH LOOP LISTING A BUTTON FOR EACH CIRCLE FOLLOWED IN USER DATA */}
                <Button variant="contained" >GAMING</Button>
                <Button variant="contained">CODING</Button>
                <Button variant="contained">ART</Button>
                <Button variant="contained">ANIME</Button>
            </Stack>

        </Box>
      </Container>
    </React.Fragment>
    </div>
  );
}