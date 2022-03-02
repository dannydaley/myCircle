import ProfileHeader from '../components/profile/profileHeader'
import ProfileOverlay from '../components/profile/profileOverlay'
import ProfileFeed from '../components/profile/profileFeed'
import * as React from 'react';

export default class ProfilePage extends React.Component {    
     constructor({  }) {
        super();
        this.state = {
             circle: 'general'   
          }
     }

     render()
     {
          // changeMailNotifications = this.props;
               return (
                    <div ><ProfileOverlay />
                         <ProfileHeader  />  
                         
                         <ProfileFeed />
                         
                    </div>
               )    
          } 
     }
