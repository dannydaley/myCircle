import ProfileHeader from '../components/profile/profileHeader'
import ProfileOverlay from '../components/profile/profileOverlay'
import ProfileFeed from '../components/profile/profileFeed'
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

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
          user: this.props.userUserName
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
     render() {
          const { changeAlertNotifications, userUserName } = this.props 
          const {  firstName,lastName,aboutMe, profilePicture, contentIsLoaded, coverPicture } = this.state
          if (contentIsLoaded) {
               console.log(this.state.profilePicture)
               return (
                    <>               
                         <ProfileOverlay userFirstName={firstName} userLastName={lastName} userProfilePicture={profilePicture} userUserName={userUserName} changeAlertNotifications={changeAlertNotifications} />
                         <ProfileHeader  coverPicture={coverPicture}/>
                         <ProfileFeed userUserName={userUserName}/>
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
