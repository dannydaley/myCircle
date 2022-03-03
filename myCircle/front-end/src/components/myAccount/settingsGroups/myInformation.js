import React from "react";
import Typography from '@mui/material/Typography';

export default class MyInformation extends React.Component {

    constructor(props) {
        super();

      }

    render() {
        const { settings } = this.props; 
        return(
            <div>
<Typography variant="h3" component="div" color="white" sx={{textAlign: 'center', mt: 2, paddingTop: 1, paddingBottom: 2, bgcolor: 'none' }}>{settings}</Typography>
            </div>

        )
    }
}