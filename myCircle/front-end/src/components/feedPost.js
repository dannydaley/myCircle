import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PostActions from './postActions';

import me from '../Images/me.jpg'
import { Link, useParams } from 'react-router-dom';



export default function FeedPost(props) {
    
    const { authorUsername, authorFirstName, authorLastName, profilePicture, content, postId, likes, dislikes, loggedInUsername } = props;


    return (
        <div>
            <CardContent sx={{display: 'flex', mb: 2}}>
                <Link to={`/${authorUsername}`}>
                    <img src={
                        'http://localhost:3001/public/' + profilePicture
                        }
                        width="100px"
                        height="100px"
                        style={{ boxShadow: "1px 3px 5px 0px black", mb: 3 }}                        
                    />
                </Link>                     
                <div style={{width: '80%', marginLeft: '5%'}} id={"postId=$" + postId}>
                    <Link to="/">
                        <Typography
                        variant="h5"
                        component="div"
                        color="white"
                        sx={{textAlign: 'left', ml: -2, mb: 2, fontWeight: 'bold'}}>                            
                            <a href={authorUsername} style={{color: 'white'}}>{authorFirstName} {authorLastName}</a>
                        </Typography>
                    </Link>
                    <Typography sx={{ mb: 1.5 , overflowX: 'hidden', color:"white", fontSize: 16 , textAlign: 'left'}}>
                        {content}
                    </Typography>
                </div>
            </CardContent>
            <PostActions
                postId={postId}
                likes={likes}
                dislikes={dislikes}
                loggedInUsername={loggedInUsername}
                authorUsername={authorUsername}
            />
            <Divider variant="middle" />
        </div>
    )
}