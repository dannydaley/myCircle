import * as React from 'react';
import ProfileRightBar from "./profileRightBar";
import ProfileLeftBar from "./profileLeftBar";
            
export default class  ProfileOverlay extends React.Component {
    constructor(props) {
        super(props);
    }    

    render () {
        const { userFirstName, userLastName, loggedInUsername, changeAlertNotifications, userProfilePicture, isFriendsWithLoggedInUser, friendRequest } = this.props
        return (
            <div style={{width: '100vw', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>            
                <ProfileRightBar userFirstName={userFirstName} userLastName={userLastName} loggedInUsername={loggedInUsername}/>                
                <ProfileLeftBar friendRequest={friendRequest} userFirstName={userFirstName} userLastName={userLastName} isFriendsWithLoggedInUser={isFriendsWithLoggedInUser} changeAlertNotifications={changeAlertNotifications} userProfilePicture={userProfilePicture} />
            </div>

        )       
    }

}