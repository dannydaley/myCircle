import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ShowNotifications from './showNotifications';

export default class NotificationsButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			openNotifications: false
		}	


	}

	componentDidMount = () => {
		// this.props.getNotifications()
	}
	

	render() {
		
		const { alertNotifications, notifications, confirmFriendRequest, refuseFriendRequest, getNotifications } = this.props
		return(<>
			<IconButton size="large" aria-label="show 17 new notifications" color="inherit" onClick={() => this.setState({openNotifications: !this.state.openNotifications})}>
			<Badge badgeContent={alertNotifications} color="error">
			  <NotificationsIcon />
			</Badge>
		  </IconButton>
		  {this.state.openNotifications ? <ShowNotifications notifications={notifications} confirmFriendRequest={confirmFriendRequest} refuseFriendRequest={refuseFriendRequest} getNotifications={getNotifications}/> : ''}
</>
		)
	}
}