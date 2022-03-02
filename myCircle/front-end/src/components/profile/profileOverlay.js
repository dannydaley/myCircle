import * as React from 'react';
import ProfileRightBar from "./profileRightBar";
import ProfileLeftBar from "./profileLeftBar";
            
export default class  ProfileOverlay extends React.Component {
    constructor() {
        super();
    }    

    render () {
        
        return (
            <div style={{width: '100vw', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>            
                <ProfileRightBar />
                
                <ProfileLeftBar />
            </div>

        )       
    }

}