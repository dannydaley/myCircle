import * as React from 'react';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FeedPost from '../feedPost';
import NewPost from '../newPost';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import Overlay from '../overlay'

import hero from '../../Images/hero.jpg'


export default class ProfileHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render () { 
    const coverPicture = this.props
    console.log(this.props.coverPicture)     
      return(
     <div style={{height: '50vh', backgroundImage: `url(http://localhost:3001/public/${this.props.coverPicture})`}}></div>     
      )    
  } 
}