
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import me from '../me.svg'




export default function RightBar() {
  return (
    <div style={{position: 'fixed', width: '100vw'}}>
        
      {/* <Box spacing={2} sx={{ bgcolor: '#cfe8fc', height: '80vh', width: 300, ml: 2, mt: 2, justifyContent: 'flex-start', alignItems: 'center'}}>
          <img src={me} width="200px" height="200px" />
      
      <Button variant="contained">Contained</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="contained">Contained</Button>
      </Box> */}
      <React.Fragment >
      <CssBaseline />
      
      <Container  maxWidth="sm" sx={{float: 'right',  bgcolor: '#343434', height: '80vh', width: 300, mr: 4 ,mt: 16, justifyContent: 'flex-start', alignItems: 'center'}} >
        <Box sx={{ paddingTop: 1, bgcolor: 'none'
         }}>
            {/* <img src={me} width="200px" height="150px" style={{ boxShadow: "1px 3px 5px 0px gray", mb: 3 }} /> */}
            <Stack spacing={2} sx={{  width: 250, margin: '100px auto 0'       }}>      
        {/* A FOR EACH LOOP LISTING A BUTTON FOR EACH CIRCLE FOLLOWED IN USER DATA */}
                <Button variant="contained" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <img src={me} width="50px" height="50px" style={{  mb: 3, borderRadius: '50%' }} />
                FRIEND ONE</Button>

                <Button variant="contained" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <img src={me} width="50px" height="50px" style={{  mb: 3, borderRadius: '50%' }} />
                FRIEND TWO</Button>
                <Button variant="contained" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <img src={me} width="50px" height="50px" style={{  mb: 3, borderRadius: '50%' }} />
                FRIEND THREE</Button>
                <Button variant="contained" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <img src={me} width="50px" height="50px" style={{  mb: 3, borderRadius: '50%' }} />
                FRIEND FOUR</Button>
            </Stack>

        </Box>
      </Container>
    </React.Fragment>
    </div>
  );
}