import * as React from 'react';
import RightBar from "./rightBar";
import LeftBar from "./LeftBar";
            
export default class  Overlay extends React.Component {
    constructor(props) {
        super();
    }    

    render () {
        const { changeCircle } = this.props;
        return (
            <div style={{width: '100vw', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>            
                <RightBar />
                
                <LeftBar changeCircle={changeCircle}  />
            </div>

        )       
    }

}