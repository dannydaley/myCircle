import React from "react";
import MyAccountSettings from '../components/myAccount/myAccountSettings'


export default class MyAccountPage extends React.Component {


    constructor(props) {
        super(props);
    }


    render() {
        const { userFirstName, userLastName } = this.props
        return (
            <div>
                <MyAccountSettings userFirstName={userFirstName} userLastName={userLastName} />
            </div>


        )
    }
}