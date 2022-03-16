import React from "react";
import MyAccountSettings from '../components/myAccount/myAccountSettings'


export default class MyAccountPage extends React.Component {

    render() {
        const { userFirstName, userLastName, userProfilePicture, loggedInUsername } = this.props
        return (
            <div>
                <MyAccountSettings userFirstName={userFirstName} userLastName={userLastName} userProfilePicture={userProfilePicture} loggedInUsername={loggedInUsername}/>
            </div>
        )
    }
}