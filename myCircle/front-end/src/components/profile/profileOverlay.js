import * as React from 'react';
import ProfileRightBar from "./profileRightBar";
import ProfileLeftBar from "./profileLeftBar";
            
export default class  ProfileOverlay extends React.Component {
    constructor() {
        super();
    }    

    render () {
        const { userFirstName, userLastName } = this.props
        return (
            <div style={{width: '100vw', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>            
                <ProfileRightBar />
                
                <ProfileLeftBar userFirstName={userFirstName} userLastName={userLastName}/>
            </div>

        )       
    }

}