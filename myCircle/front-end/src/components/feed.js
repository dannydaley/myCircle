import * as React from 'react';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FeedPost from './feedPost';
import NewPost from './newPost';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';

export default class Feed extends React.Component {

  constructor(props) {
    super();
    this.state = {
        circle: '',
        posts: [],
        dataIsLoaded: false
    }
}

delay = ms => new Promise(res => setTimeout(res, ms));

yourFunction = async () => {
  await this.delay(5000);
  console.log("LOADING FEED");

  // await this.delay(5000);
  // console.log("Waited an additional 5s");
};

//COMPONENT DID MOUNT IS BUILT IN AND RUNS WHEN THE COMPONENT MOUNTS
componentDidMount = async () => {
  //LOG TO MAKE SURE ITS ACTUALLY RUNNING (WILL BE IN BROWSER CONSOLE)
  console.log("RUNNNNNN")
  //FETCH IS A GET REQUEST BY DEFAULT, POINT IT TO THE ENDPOINT ON THE BACKEND
  fetch('http://localhost:3001/getFeed', {
  })
  //TURN THE RESPONSE INTO A JSON OBJECT
  .then(response => response.json())
  .then(await this.yourFunction())
  // WHAT WE DO WITH THE DATA WE RECEIVE (data => console.log(data)) SHOULD SHOW WHAT WE GET
  .then(data => {
    //UPDATE THE VARIABLES IN THE CONTRUCTOR ABOVE
    // for (let i = 0; i < 1000000; i++) {
    //   console.log(i)
    // }
    
    this.setState({
      posts: data,
      dataIsLoaded: true
  });
})
}

  render () {   
    const { onRouteChange } = this.props; 
    //SETTING UP ACCESS TO THE STATE VARIABLES   
    const { posts, dataIsLoaded } = this.state;
    // IF THE DATA ISNT LOADED YET, LOAD AN ALTERNATIVE WHILE WE WAIT
    if (!dataIsLoaded) {
      return (
        <div style={{backgroundColor: '#010101', display: 'flex', justifyContent: 'space-between', paddingBottom: '100px'}}>
        <div style={{width: '30%', height: '100px'}}></div>
            <React.Fragment>              
                <CssBaseline />
                <Container maxWidth="lg" sx={{zIndex: 10, bgcolor: '#343434', borderRadius: '0px 0px 30px 30px', width: '100%', pb: 2, ml: 2, mr:2,  mt: 12}}>
                    <NewPost />
                    <Box sx={{ padding: 2, bgcolor: 'none', display: 'flex', justifyContent: 'center', mt: 2}}>

                        <CircularProgress />
                        
                     
                    </Box>
                    <Divider variant="middle" sx={{mt: 1.5, mb: 1.5}} />
                    <Typography sx={{ mb: 1.5 }} color="white" sx={{ fontSize: 16 }}>
                        End of posts
                    </Typography>
                </Container>
            </React.Fragment>
        <div style={{width: '30%', height: '100px'}}></div>
    </div>  
      )
    } else {
    // OTHERWISE RUN THE GOOD STUFF
    console.log(this.state.posts)
      return (
    <div style={{backgroundColor: '#010101', display: 'flex', justifyContent: 'space-between', paddingBottom: '100px'}}>
        <div style={{width: '30%', height: '100px'}}></div>
            <React.Fragment>              
                <CssBaseline />
                <Container maxWidth="lg" sx={{zIndex: 10, bgcolor: '#343434', borderRadius: '0px 0px 30px 30px', width: '100%', pb: 2, ml: 2, mr:2,  mt: 12}}>
                    <NewPost /><p>{this.feedPosts}</p>
                    <Box sx={{ padding: 2, bgcolor: 'none'}}>
                        <Stack spacing={2} sx={{  width: '100%', margin: '50px auto 0'}}>         
                        
                        {/* .MAP IS OUR FOR EACH LOOP, 'ITEM' IS JUST WHAT WE CALL EACH ELEMENT IN THE LIST SO IS INTERCHANGEABLE */}
                            {this.state.posts.map(item => (                              
                              /* RENDER THE COMPONENT WITH PROPS PASSED IN FROM THE SPECIFIC ITEM WERE CURRENTLY ON FOR EACH ITEM PASSED OVER BY THE .MAP */
                                <FeedPost author={item.author} content={item.content} profilePicture={item.image} />                           
                            ))}
                        </Stack>
                    </Box>
                    <Typography sx={{ mb: 1.5 }} color="white" sx={{ fontSize: 16 }}>
                        End of posts
                    </Typography>
                </Container>
            </React.Fragment>
        <div style={{width: '30%', height: '100px'}}></div>
    </div>  
  );
    }
  }
}

// BACK END

/*
// MAKE SURE IT IS A GET REQUEST (OR MATCHES WITH WHATEVER IS CALLING THE ENDPOINT (GET/POST ETC))
app.get('/getFeed', (req, res, next) => {  
  // READY THE DB FOR A CALL
  let SQLdatabase = req.app.locals.SQLdatabase;  
  // grab all posts
  const GET_ALL_POSTS = "SELECT * FROM `blog` ORDER BY id DESC"; // SQL command
  //RUN THE COMMAND ON THE DATABASE, RETURNING EITHER AN ERROR, OR THE ROWS WE WANT
  SQLdatabase.all(GET_ALL_POSTS, [], (err, rows) => {
    //ERROR CASE..
    if (err) {
      console.log("errorrrrr")
      res.status(500).send(err.message);
      return;
    }       
    //OTHERWISE RESPOND WITH THE ROWS IN JSON FORMAT.
    res.json(rows);
  })
})
*/