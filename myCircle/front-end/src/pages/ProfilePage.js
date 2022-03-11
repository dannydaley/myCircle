import ProfileHeader from '../components/profile/profileHeader'
import ProfileOverlay from '../components/profile/profileOverlay'
import ProfileFeed from '../components/profile/profileFeed'
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams, useLocation } from "react-router-dom";

export default class ProfilePage extends React.Component {
      
     constructor(props) {
        super(props);
        this.state = {            
               firstName:'',
               lastName: '',
               username: this.props.username,
               aboutMe:'',
               profilePicture:'',
               coverPicture: '',
               contentIsLoaded:false   
          }
     }

componentDidMount = () => {   
     //FETCH IS A GET REQUEST BY DEFAULT, POINT IT TO THE ENDPOINT ON THE BACKEND
     fetch('http://localhost:3001/getUserProfile', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
          user: this.props.user
          })    
     })
     //TURN THE RESPONSE INTO A JSON OBJECT
     .then(response => response.json())     
     // WHAT WE DO WITH THE DATA WE RECEIVE (data => console.log(data)) SHOULD SHOW WHAT WE GET
     .then(data => {
          this.setState({
               firstName: data.firstName,
               lastName: data.lastName,
               aboutMe: data.aboutMe,
               profilePicture: data.profilePicture,
               coverPicture: data.coverPicture
          })
     }).then(               
          this.setState({contentIsLoaded: true })         
     )
}

      


// const { params } = useParams;
// console.log(params)

render() {
     const { userFirstName, userLastName, changeAlertNotifications, userProfilePicture, userUserName } = this.props 
     const {  firstName,lastName,aboutMe, profilePicture, contentIsLoaded, username, coverPicture } = this.state
        if (contentIsLoaded) {
             console.log(this.state.profilePicture)
          return (
               <>               
                    <ProfileOverlay userFirstName={firstName} userLastName={lastName} userProfilePicture={this.state.profilePicture} userUserName={this.props.user} changeAlertNotifications={changeAlertNotifications} />
                    <ProfileHeader  coverPicture={coverPicture}/>                     
                    <ProfileFeed userUserName={this.props.user}/>                         
               </>
          ) 
        }
        else {
             return (
                  <div style={{paddingTop: '40vh'}}>
                       <CircularProgress />
                       </div>
             )
        }

}

     
   
     
}
