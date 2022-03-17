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
			<div style={{padding: '0 10px', backgroundColor: 'white', position: 'absolute', marginTop: '50px', marginLeft: '-200px', borderRadius: '5px', boxShadow: '0px 2px 10px 0px grey'}}>
				{notifications.map( item => {
					console.log(item.seen)
					if (item.type === "friendRequest") {
					 return <FriendRequest actionId={item.actionId} seen={item.seen}  firstName={item.firstName} lastName={item.lastName} senderUsername={item.sender} loggedInUser={item.recipient} message={item.message} confirmFriendRequest={confirmFriendRequest} refuseFriendRequest={refuseFriendRequest} getNotifications={getNotifications}/>			
					} else {
						return <ReactionNotification actionId={item.actionId}  seen={item.seen} firstName={item.firstName} lastName={item.lastName} senderUsername={item.sender} loggedInUser={item.recipient} message={item.message} relativePost={item.relativePost} recipientUsername={item.recipient} />
					}
					})}
					{notifications.length > 1 ? <p onClick={() =>  alert("cleared")} >clear all</p>  : ""}
			
			</div>
		)
	}
}