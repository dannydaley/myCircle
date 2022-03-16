import ProfilePage from './ProfilePage'
import * as React from 'react';

import { useLocation } from "react-router-dom";

export default function ProfileGate (props) {  
     const params = useLocation();
     let pathname = params.pathname;
     var username = pathname.substring(1);
    return (
        <> 
        <ProfilePage userUserName={username} thisUsername={props.thisUsername} userFirstName={props.userFirstName} userLastName={props.userLastName} userProfilePicture={props.userProfilePicture}/>                        
        </>
    )  
}  
