import logo from './logo.svg';
import './App.css';
import React , { Component } from "react";
import DocumentMeta from 'react-document-meta';
import Button from '@mui/material/Button'
import SignIn from './pages/SignIn';
import NavBar from './components/navBar';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage'
import MyAccountPage from './pages/myAccountPage'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";





export default class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      route: 'signin',
      isSignedIn: false,
      mailNotifications: 0,
      alertNotifications: 0,
      userFirstName: '',
      userLastName: '',
      UIColor: ''
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  updateSession = (firstName, lastName) => {
    this.setState({ userFirstName: firstName, userLastName: lastName })
  }

  // THESE FUNCTIONS HANDLE INCREMENTING THE NOTIFICATIONS. THESE ARE CURRENTLY PASSED INTO THE NAV BAR
  changeMailNotifications = (mailNotifications) => {    
    this.setState({mailNotifications: this.state.mailNotifications+=1})
  }
  changeAlertNotifications = (mailNotifications) => {    
    this.setState({alertNotifications: this.state.alertNotifications+=1})
  }

  onColorChange = (event) => {
    this.setState({color: event.target.value})
    console.log(this.state.color)
  }
  /*
CUSTOM COLOR CHANGER FOR UI
onColorChange = (event) => {
  this.setState({color: event.target.value})
  console.log(this.state.color)
}
<input type="color" onChange={this.onColorChange}/>
*/

  router = (route) => {
    switch (route) {
      case 'home' : return <FeedPage changeMailNotifications={this.changeMailNotifications}  onRouteChange={this.onRouteChange}/>;
      case 'profile' : return <ProfilePage userFirstName={this.state.userFirstName} userLastName={this.state.userLastName}/>;
      case 'myAccount' :return <MyAccountPage />
      default: return <FeedPage />
  }
}

  render() {
    return (
      <DocumentMeta >      
      <div className="App"  >
        { this.state.isSignedIn === true ? 
            <div>
              <NavBar onRouteChange={this.onRouteChange} onColorChange={this.onColorChange} UIColor={this.state.UIColor} mailNotifications={this.state.mailNotifications} changeMailNotifications={this.changeMailNotifications} changeAlertNotifications={this.changeAlertNotifications} alertNotifications={this.state.alertNotifications} />              
              {this.router(this.state.route)}
            </div> 
          :        
            <SignIn onRouteChange={this.onRouteChange} route={this.state.route} updateSession={this.updateSession} />
         }  
      </div>
      </DocumentMeta>
    );
  }
}
