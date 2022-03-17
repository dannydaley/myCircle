import RadioGroupContext from "@mui/material/RadioGroup/RadioGroupContext";
import React from "react";
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

export default class FriendRequest extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}


	}
	render() {
		const { firstName, lastName, message, senderUsername, loggedInUser, confirmFriendRequest, refuseFriendRequest, getNotifications} = this.props
		return (
			<>
				<Link to={`/${senderUsername}`}>
					<p style={{color: 'black'}}>{firstName} {lastName} {message}</p>
				</Link>
				<Button variant="contained" color="error" onClick={() => {
					refuseFriendRequest(senderUsername, loggedInUser)
					getNotifications()
				}}>
					refuse
				</Button>
				<Button variant="contained" color="success" onClick={() => {
					confirmFriendRequest(senderUsername, loggedInUser)
					getNotifications()
				}}>
					confirm
				</Button>
			</>
		)
	}
}