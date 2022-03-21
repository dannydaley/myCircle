import * as React from 'react';

export default class ProfileHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {    
      return(
     <div style={{height: '50vh', backgroundImage: `url(http://localhost:3001/public/${this.props.coverPicture})`}}></div>     
      )    
  } 
}