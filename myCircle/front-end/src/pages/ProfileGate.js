import ProfileHeader from '../components/profile/profileHeader'
import ProfileOverlay from '../components/profile/profileOverlay'
import ProfileFeed from '../components/profile/profileFeed'
import ProfilePage from './ProfilePage'
import * as React from 'react';

import { useParams, useLocation } from "react-router-dom";

export default function ProfileGate (props) {    

     
     const { userFirstName, userLastName, changeAlertNotifications, userProfilePicture, userUserName } = props
     const params = useLocation();
     console.log(params);
     let pathname = params.pathname;
     var username = pathname.substring(1);
  
// console.log(params)


    return (
        <> <ProfilePage
        user={username}
            />                        
        </>
    )  
}  
