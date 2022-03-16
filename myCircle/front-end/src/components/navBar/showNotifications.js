import React from "react";

export default class ShowNotifications extends React.Component {
	constructor(props) {
		super(props)

	}

	render() {
		const { notifications } = this.props
		return (
			<div style={{padding: '0 10px', backgroundColor: 'white', position: 'absolute', marginTop: '50px', marginLeft: '-200px', borderRadius: '5px', boxShadow: '0px 2px 10px 0px grey'}}>
				{notifications.map( item => (
					<h4 style={{color: 'black'}}>{item.sender}{item.message}</h4>
				))}
			
			</div>
		)
	}
}