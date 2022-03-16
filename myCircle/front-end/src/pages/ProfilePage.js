import ProfileHeader from '../components/profile/profileHeader'
import ProfileOverlay from '../components/profile/profileOverlay'
import ProfileFeed from '../components/profile/profileFeed'
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default class ProfilePage extends React.Component {      
     constructor(props) {
        super(props);
        this.state = {      
               isFriendsWithLoggedInUser: '',      
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
               loggedInUsername: this.props.loggedInUsername,
               userProfileToGet: this.props.userProfileToGet
          })    
     })
     //TURN THE RESPONSE INTO A JSON OBJECT
     .then(response => response.json())     
     // WHAT WE DO WITH THE DATA WE RECEIVE (data => console.log(data)) SHOULD SHOW WHAT WE GET
     .then(data => {
          this.setState({
               isFriendsWithLoggedInUser: data.isFriendsWithLoggedInUser,
               firstName: data.profileData.firstName,
               lastName: data.profileData.lastName,
               aboutMe: data.profileData.aboutMe,
               profilePicture: data.profileData.profilePicture,
               coverPicture: data.profileData.coverPicture
          })
     }).then(               
          this.setState({contentIsLoaded: true })         
     )
}
     render() {
          
          const { changeAlertNotifications, loggedInUsername, userProfileToGet } = this.props 
          const {  firstName,lastName,aboutMe, profilePicture, contentIsLoaded, coverPicture } = this.state
          if (contentIsLoaded) {
               console.log(this.state.profilePicture)
               return (
                    <>               
                         <ProfileOverlay userFirstName={firstName} userLastName={lastName} userProfilePicture={profilePicture} userProfileToGet={userProfileToGet} changeAlertNotifications={changeAlertNotifications} />
                         <ProfileHeader  coverPicture={coverPicture}/>
                         {this.state.isFriendsWithLoggedInUser ? <ProfileFeed userProfileToGet={userProfileToGet} loggedInUsername={loggedInUsername}  userFirstName={this.props.userFirstName} userLastName={this.props.userLastName} userProfilePicture={this.props.userProfilePicture}/> : ''}
                         {/* <ProfileFeed userProfileToGet={userProfileToGet} loggedInUsername={loggedInUsername}  userFirstName={this.props.userFirstName} userLastName={this.props.userLastName} userProfilePicture={this.props.userProfilePicture}/> */}
                    </>
               )
          } else {
               return (
                    <div style={{paddingTop: '40vh'}}>
                         <CircularProgress />
                    </div>
               )
          }
     }   
}
