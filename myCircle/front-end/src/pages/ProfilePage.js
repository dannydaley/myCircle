import ProfileHeader from '../components/profile/profileHeader'
import ProfileOverlay from '../components/profile/profileOverlay'
import ProfileFeed from '../components/profile/profileFeed'
import * as React from 'react';

export default class ProfilePage extends React.Component {    
     constructor(props) {
        super(props);
        this.state = {
             circle: 'general'   
          }
     }

     render()
     {
          const { userFirstName, userLastName, changeAlertNotifications, userProfilePicture } = this.props
          // changeMailNotifications = this.props;
               return (
                    <div >
                         <ProfileOverlay userFirstName={userFirstName} userLastName={userLastName} userProfilePicture={userProfilePicture} changeAlertNotifications={changeAlertNotifications} />
                         <ProfileHeader  />  
                         
                         <ProfileFeed />
                         
                    </div>
               )    
          } 
     }
