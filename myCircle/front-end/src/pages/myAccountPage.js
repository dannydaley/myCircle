import React from "react";
import MyAccountSettings from '../components/myAccount/myAccountSettings'


export default class MyAccountPage extends React.Component {

    render() {
        const { userFirstName, userLastName, userProfilePicture, userUserName } = this.props
        return (
            <div>
                <MyAccountSettings userFirstName={userFirstName} userLastName={userLastName} userProfilePicture={userProfilePicture} userUserName={userUserName}/>
            </div>
        )
    }
}