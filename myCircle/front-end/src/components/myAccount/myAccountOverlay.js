import * as React from 'react';
import MyAccountRightBar from "./myAccountRightBar";
import MyAccountLeftBar from "./myAccountLeftBar";
            
export default class  MyAccountOverlay extends React.Component {
    constructor() {
        super();
    }    

    render () {
        const { userFirstName, userLastName, changeSettings } = this.props
        return (
            <div style={{width: '100vw', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>            
                <MyAccountRightBar userFirstName={userFirstName} userLastName={userLastName} />
                
                <MyAccountLeftBar userFirstName={userFirstName} userLastName={userLastName} changeSettings={changeSettings} />
            </div>

        )       
    }

}