import { Divider } from "@mui/material";
import React from "react";
import FriendRequest from './friendRequest'
import ReactionNotification from './reactionNotification'

export default class ShowNotifications extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		const { notifications, confirmFriendRequest, refuseFriendRequest, getNotifications } = this.props
		return (
			<div style={{zIndex: '3', padding: '0 10px', backgroundColor: 'white', marginTop: '50px', position: 'fixed', right: '0',borderRadius: '5px', boxShadow: '0px 2px 10px 0px grey', width: '300px'}}>
				{notifications.map( item => {
					if (item.type === "friendRequest") {
					 return <FriendRequest key={item.actionId} actionId={item.actionId} seen={item.seen}  firstName={item.firstName} lastName={item.lastName} senderUsername={item.sender} loggedInUser={item.recipient} message={item.message} confirmFriendRequest={confirmFriendRequest} refuseFriendRequest={refuseFriendRequest} getNotifications={getNotifications}/>			
					} else {
						return <ReactionNotification key={item.actionId} actionId={item.actionId}  seen={item.seen} firstName={item.firstName} lastName={item.lastName} senderUsername={item.sender} loggedInUser={item.recipient} message={item.message} relativePost={item.relativePost} recipientUsername={item.recipient} />
					}
				})}
				<Divider sx={{mt: 2}}variant="middle" />
				{notifications.length > 1 ?
					<h4 style={{color: '#217cd8', marginLeft: '5px'}}onClick={() =>  alert("cleared")}>Clear all</h4>
					: 
					""
				}			
			</div>
		)
	}
}