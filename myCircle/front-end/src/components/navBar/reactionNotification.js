import RadioGroupContext from "@mui/material/RadioGroup/RadioGroupContext";
import React from "react";
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

export default class ReactionNotification extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			seen: this.props.seen
		}
	}

	setNotificationAsSeen =  () => { 
		console.log("merrrrrrr")
        //FETCH IS A GET REQUEST BY DEFAULT, POINT IT TO THE ENDPOINT ON THE BACKEND
        fetch('http://localhost:3001/setNotificationAsSeen', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
			actionId: this.props.actionId
          })    
        })
        //TURN THE RESPONSE INTO A JSON OBJECT
        .then(response => response.json())
        // WHAT WE DO WITH THE DATA WE RECEIVE (data => console.log(data)) SHOULD SHOW WHAT WE GET
        .then(data => data === "success" ? this.setState({seen: true}) : "")
      }

	render() {
		const { firstName, lastName, message, senderUsername, recipientUsername, relativePost, loggedInUser, confirmFriendRequest, refuseFriendRequest, getNotifications, seen, actionId } = this.props
		if (!this.state.seen) {
			console.log(seen)
			return(
			< div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'blue' }}>
							<Link to={`/${senderUsername}`} onClick={this.setNotificationAsSeen}>
								<p style={{color: 'black'}}>{firstName} {lastName} </p>
							</Link> 
							<Link to={`/${recipientUsername}#postId=${relativePost}`} onClick={this.setNotificationAsSeen}>
							<p style={{color: 'black', marginLeft: '5px'}}> {message}</p>
							</Link>
						</div>
			)		
		} else {
			return (
				< div style={{display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				<Link to={`/${senderUsername}`}>
					<p style={{color: 'black'}}>{firstName} {lastName} </p>
				</Link> 
				<Link to={`/${recipientUsername}#postId=${relativePost}`}>
				<p style={{color: 'black', marginLeft: '5px'}}> {message}</p>
				</Link>
			</div>
			)

		}		
	}
}