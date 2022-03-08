import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import me from '../Images/me.jpg'

export default class FeedPost extends React.Component  {
    
    constructor(props) {
        super(props);

    }


    render() {
        const { 
            onRouteChange, 
            author, profilePicture, content } = this.props;
             return (
        <div>
            <CardContent sx={{display: 'flex', mb: 2}}>
                {/* <a href={author} > */}
                    <img src={
                    'http://localhost:3001/public/' + profilePicture
                    // process.env.SERVER + process.env.SERVERPUBLICDIRECTORY + props.profilePicture
                    } width="200px" height="150px" style={{ boxShadow: "1px 3px 5px 0px black", mb: 3 }}
                    onClick={()=>this.props.onRouteChange('profile')}
                     />
                     {/* </a> */}
                <div style={{width: '80%', marginLeft: '5%'}}>
                    <Typography variant="h5" component="div" color="white" sx={{textAlign: 'left', ml: -2, mb: 2, fontWeight: 'bold'}}>
                        <a href={author} style={{color: 'white'}}>{author}</a>
                    </Typography>
                    <Typography sx={{ mb: 1.5 , overflowX: 'hidden', color:"white", fontSize: 16 , textAlign: 'left'}}>
                        {content}
                    </Typography>
                </div>
            </CardContent>
            <Divider variant="middle" />
        </div>
    )}
}