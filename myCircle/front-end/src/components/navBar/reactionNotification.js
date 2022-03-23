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
        .then(data => data === "success" ? this.setState({seen: true}) : "")
      }

	render() {
		const { firstName, lastName, message, senderUsername, recipientUsername, relativePost, loggedInUser, confirmFriendRequest, refuseFriendRequest, getNotifications, seen, actionId } = this.props
		if (!this.state.seen) {
			return(
			< div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
							<Link to={`/${senderUsername}`} onClick={this.setNotificationAsSeen}>								
								<h4 style={{color: '#217cd8'}}>{firstName} {lastName}</h4>
							</Link> 
							<Link to={`/${recipientUsername}#postId=${relativePost}`} onClick={this.setNotificationAsSeen}>
							<h4 style={{color: '#217cd8', marginLeft: '5px'}}>{message}</h4>
							
							</Link>
						</div>
			)		
		} else {
			return (
				< div style={{display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<Link to={`/${senderUsername}`} onClick={this.setNotificationAsSeen}>								
								<h4 style={{color: 'black'}}>{firstName} {lastName}</h4>
							</Link> 
							<Link to={`/${recipientUsername}#postId=${relativePost}`} onClick={this.setNotificationAsSeen}>
							<h4 style={{color: 'black', marginLeft: '5px'}}>{message}</h4>							
							</Link>
			</div>
			)

		}		
	}
}