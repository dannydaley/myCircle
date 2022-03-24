import { Divider } from "@mui/material";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

export default class ShowMessages extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {  } = this.props
		return (
			<div style={{zIndex: '3', padding: '10px 10px 0px', backgroundColor: 'white', marginTop: '50px', position: 'fixed', right: '0',borderRadius: '5px', boxShadow: '0px 2px 10px 0px grey', width: '300px'}}>
				{/* {notifications.map( item => {
					if (item.type === "friendRequest") {
					 return <FriendRequest key={item} seen={item.seen}  firstName={item.firstName} lastName={item.lastName} senderUsername={item.sender} loggedInUser={item.recipient} message={item.message} confirmFriendRequest={confirmFriendRequest} refuseFriendRequest={refuseFriendRequest} getNotifications={getNotifications}/>			
					} else {
						return <ReactionNotification key={item.actionId} actionId={item.actionId}  seen={item.seen} firstName={item.firstName} lastName={item.lastName} senderUsername={item.sender} loggedInUser={item.recipient} message={item.message} relativePost={item.relativePost} recipientUsername={item.recipient} />
					}
					})}
					{notifications.length > 1 ? <p onClick={() =>  alert("cleared")} >clear all</p>  : ""} */}									
					<Divider sx={{mt: 0}}variant="middle" />
					<Link to="/messages">
              			<h4 style={{color: '#217cd8'}}>Go to messages</h4>	
            		</Link>					
			</div>
		)
	}
}