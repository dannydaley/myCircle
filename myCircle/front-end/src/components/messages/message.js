import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


import { Link, useParams } from 'react-router-dom';
import { flexbox } from '@mui/system';



export default function Message(props) {
    
    const {
        messageId, 
        chatId,
        chatUser1,
        chatUser2,
        loggedInUsername, 
        userFirstName,
        userLastName,
        userProfilePicture,
        partnerFirstName,
        partnerLastName,
        partnerProfilePicture,
        message,
        messageSender,
        date
         } = props; 

        let  partnerUsername = '';
        if (chatUser1 !== loggedInUsername) {
            partnerUsername = chatUser1
            console.log(chatUser1)
            console.log("hereeee")
        } else {
            partnerUsername = chatUser2
        }
        console.log(partnerUsername)
         if(messageSender === loggedInUsername) {
                return (
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent:'right', width: '100%'}}>
                    <div style={{width: '50%'}}>
                        <CardContent sx={{display: 'flex', mb: 2}} >
                            <Link to={`/${loggedInUsername}`}>
                                <img src={
                                    'http://localhost:3001/public/' + userProfilePicture
                                    }
                                    width="100px"
                                    height="100px"
                                    style={{ boxShadow: "1px 3px 5px 0px black", mb: 3 }}                        
                                />
                            </Link>                     
                            <div style={{width: '80%', marginLeft: '5%'}} id={"postId=$" + messageId}>
                                <Link to={`/${loggedInUsername}`} style={{textDecoration: 'none'}}>
                                    <Typography
                                    variant="h5"
                                    component="div"
                                    color="white"
                                    sx={{textAlign: 'left', ml: -2, mb: 2, fontWeight: 'bold'}}>                            
                                        {userFirstName} {userLastName}
                                    </Typography>
                                </Link>
                                <Typography sx={{ mb: 1.5 , overflowX: 'hidden', color:"white", fontSize: 16 , textAlign: 'left'}}>
                                    {message}
                                </Typography>
                                            </div>
                        </CardContent>            
                    </div>
                    </div>
                )
         } else {
            return (
                <div style={{display: 'flex', flexDirection: 'row', justifyContent:'left', width: '100%'}}>
                <div style={{width: '40%'}}>
                    <CardContent sx={{display: 'flex', mb: 2}} >
                        <Link to={`/${partnerUsername}`}>
                            <img src={
                                'http://localhost:3001/public/' + partnerProfilePicture
                                }
                                width="100px"
                                height="100px"
                                style={{ boxShadow: "1px 3px 5px 0px black", mb: 3 }}                        
                            />
                        </Link>                     
                        <div style={{width: '80%', marginLeft: '5%'}} id={"postId=$" + messageId}>
                            <Link to={`/${partnerUsername}`} style={{textDecoration: 'none'}}>
                                <Typography
                                variant="h5"
                                component="div"
                                color="white"
                                sx={{textAlign: 'left', ml: -2, mb: 2, fontWeight: 'bold'}}>                            
                                    {partnerFirstName} {partnerLastName}
                                </Typography>
                            </Link>
                            <Typography sx={{ mb: 1.5 , overflowX: 'hidden', color:"white", fontSize: 16 , textAlign: 'left'}}>
                                {message}
                            </Typography>

                                        </div>
                    </CardContent>
        
                </div>
                </div>
            )
         }

}