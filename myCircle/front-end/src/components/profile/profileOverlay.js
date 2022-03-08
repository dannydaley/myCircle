import * as React from 'react';
import ProfileRightBar from "./profileRightBar";
import ProfileLeftBar from "./profileLeftBar";
            
export default class  ProfileOverlay extends React.Component {
    constructor(props) {
        super(props);
    }    

    render () {
        const { userFirstName, userLastName, changeAlertNotifications, userProfilePicture } = this.props
        return (
            <div style={{width: '100vw', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>            
                <ProfileRightBar userFirstName={userFirstName} userLastName={userLastName} />                
                <ProfileLeftBar userFirstName={userFirstName} userLastName={userLastName} changeAlertNotifications={changeAlertNotifications} userProfilePicture={userProfilePicture} />
            </div>

        )       
    }

}