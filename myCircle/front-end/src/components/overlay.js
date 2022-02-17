import RightBar from "./rightBar";

import BasicStack from "./circlesCard";

export default function Overlay() {


    return (
        <div style={{width: '100vw', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>            
            <RightBar />
            <BasicStack />
        </div>

    )
}