import RightBar from "./rightBar";
// import useMediaQuery from '@mui/material/useMediaQuery';
import LeftBar from "./LeftBar";


// const isCollapsed = useMediaQuery(theme.breakpoints.down('sm'));
            //  {{ if (isCollapsed) {
            //     <RightBar />
            //  } }}

            
export default function Overlay() {
    return (
        <div style={{width: '100vw', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>            
            <RightBar />
            <LeftBar />
        </div>

    )
}