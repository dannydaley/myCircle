import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import me from '../Images/me.jpg'

export default function RightBar() {
  return (
    <div style={{position: 'fixed', width: '100vw'}}>
      <React.Fragment >
      <CssBaseline />      
      <Container  maxWidth="sm" sx={{float: 'right',  bgcolor: '#343434', height: '80vh', width: 300, mr: 4 ,mt: 16, justifyContent: 'flex-start', alignItems: 'center'}} >
        <Box sx={{ paddingTop: 1, bgcolor: 'none' }}>
            <Typography variant="h6" component="div" color="white" sx={{textAlign: 'center', mt: 2}}>Online friends</Typography>
            <Stack spacing={1} sx={{  width: 250, margin: '50px auto 0'       }}>      
                {/* A FOR EACH LOOP LISTING A BUTTON FOR EACH CIRCLE FOLLOWED IN USER DATA */}
                <Button variant="contained" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'}} color="success">
                    <img src={me} width="50px" height="50px" style={{  mb: 3, borderRadius: '50%' }} />
                    FRIEND ONE
                </Button>
                <Button variant="contained" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2, }}color="success"  >
                    <img src={me} width="50px" height="50px" style={{  mb: 3, borderRadius: '50%' }} />
                    FRIEND TWO
                </Button>
                <Button variant="contained" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2, backgroundColor: 'gray'}}>
                    <img src={me} width="50px" height="50px" style={{  mb: 3, borderRadius: '50%' }} />
                    FRIEND THREE
                </Button>
                <Button variant="contained" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2, backgroundColor: 'gray'}}>
                    <img src={me} width="50px" height="50px" style={{  mb: 3, borderRadius: '50%' }} />
                    FRIEND FOUR
                </Button>
            </Stack>
        </Box>
      </Container>
    </React.Fragment>
    </div>
  );
}