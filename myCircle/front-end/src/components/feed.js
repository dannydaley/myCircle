
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import me from '../me.svg'
import me3 from '../me3.svg'


const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </React.Fragment>
  );


export default function Feed() {
  return (

    <div style={{
        backgroundColor: '#010101', display: 'flex', justifyContent: 'center'}}>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ bgcolor: '#343434', border: '', width: '100%', ml: 2, mr:2,  mt: 12}}>
        <Box sx={{ padding: 2, bgcolor: 'none'
         }}>
            
            <Stack spacing={2} sx={{  width: '100%', margin: '50px auto 0'       }}>      
        {/* A FOR EACH LOOP LISTING A BUTTON FOR EACH CIRCLE FOLLOWED IN USER DATA */}

            <CardContent sx={{display: 'flex'}}>
                <img src={me} width="200px" height="150px" style={{ boxShadow: "1px 3px 5px 0px black", mb: 3 }} />
                <div style={{width: '80%', marginLeft: '5%'}}>
                    <Typography variant="h5" component="div" color="white" sx={{textAlign: 'left', ml: -2}}>
                        username
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="white" sx={{ fontSize: 16 }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Typography>
                </div>
            </CardContent>
            <Divider variant="middle" />

            <CardContent sx={{display: 'flex'}}>
                <img src={me3} width="200px" height="150px" style={{ boxShadow: "1px 3px 5px 0px black", mb: 3 }} />
                <div style={{width: '80%', marginLeft: '5%'}}>
                    <Typography variant="h5" component="div" color="white" sx={{textAlign: 'left', ml: -2}}>
                        username
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="white" sx={{ fontSize: 16 }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Typography>
                </div>
            </CardContent>
            <Divider variant="middle" />

            <CardContent sx={{display: 'flex'}}>
                <img src={me} width="200px" height="150px" style={{ boxShadow: "1px 3px 5px 0px black", mb: 3 }} />
                <div style={{width: '80%', marginLeft: '5%'}}>
                    <Typography variant="h5" component="div" color="white" sx={{textAlign: 'left', ml: -2}}>
                        POSTERS USERNAME
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="white" sx={{ fontSize: 16 }}>
                        POST CONTENT
                    </Typography>
                </div>
            </CardContent>
            <Divider variant="middle" />

            <CardContent sx={{display: 'flex'}}>
                <img src={me} width="200px" height="150px" style={{ boxShadow: "1px 3px 5px 0px black", mb: 3 }} />
                <div style={{width: '80%', marginLeft: '5%'}}>
                    <Typography variant="h5" component="div" color="white" sx={{textAlign: 'left', ml: -2}}>
                        POSTERS USERNAME
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="white" sx={{ fontSize: 16 }}>
                        POST CONTENT
                    </Typography>
                </div>
            </CardContent>
            <Divider variant="middle" />

            <CardContent sx={{display: 'flex'}}>
                <img src={me} width="200px" height="150px" style={{ boxShadow: "1px 3px 5px 0px black", mb: 3 }} />
                <div style={{width: '80%', marginLeft: '5%'}}>
                    <Typography variant="h5" component="div" color="white" sx={{textAlign: 'left', ml: -2}}>
                        POSTERS USERNAME
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="white" sx={{ fontSize: 16 }}>
                        POST CONTENT
                    </Typography>
                </div>
            </CardContent>
            <Divider variant="middle" />

            <CardContent sx={{display: 'flex'}}>
                <img src={me} width="200px" height="150px" style={{ boxShadow: "1px 3px 5px 0px black", mb: 3 }} />
                <div style={{width: '80%', marginLeft: '5%'}}>
                    <Typography variant="h5" component="div" color="white" sx={{textAlign: 'left', ml: -2}}>
                        POSTERS USERNAME
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="white" sx={{ fontSize: 16 }}>
                        POST CONTENT
                    </Typography>
                </div>
            </CardContent>
            <Divider variant="middle" />

            <CardContent sx={{display: 'flex'}}>
                <img src={me} width="200px" height="150px" style={{ boxShadow: "1px 3px 5px 0px black", mb: 3 }} />
                <div style={{width: '80%', marginLeft: '5%'}}>
                    <Typography variant="h5" component="div" color="white" sx={{textAlign: 'left', ml: -2}}>
                        POSTERS USERNAME
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="white" sx={{ fontSize: 16 }}>
                        POST CONTENT
                    </Typography>
                </div>
            </CardContent>
            <Divider variant="middle" />

            </Stack>

        </Box>
      </Container>
    </React.Fragment>
 </div>


   


  
  
  );
}