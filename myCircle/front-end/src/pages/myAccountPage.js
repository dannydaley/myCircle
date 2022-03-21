import React from "react";
import MyAccountSettings from '../components/myAccount/myAccountSettings'


export default class MyAccountPage extends React.Component {

    render() {
        const { userFirstName, userLastName, userProfilePicture, loggedInUsername, getNotifications,refreshData } = this.props
        return (
            <div>
                <MyAccountSettings userFirstName={userFirstName} userLastName={userLastName} userProfilePicture={userProfilePicture} loggedInUsername={loggedInUsername} getNotifications={getNotifications}refreshData={refreshData}/>
            </div>
        )
    }
}