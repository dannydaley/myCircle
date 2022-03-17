import logo from './logo.svg';
import './App.css';

import React , { Component } from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import DocumentMeta from 'react-document-meta';
import Button from '@mui/material/Button'
import SignIn from './pages/SignIn';
import NavBar from './components/navBar';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage'
import MyAccountPage from './pages/myAccountPage'
import theme from './theme'
import { ThemeProvider } from '@material-ui/core/styles'
import Counter from './features/counter/counter'
import ProfileGate from './pages/ProfileGate'

import { useSelector, useDispatch } from 'react-redux'
import { signIn } from './actions';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

// import store from '../src/app/store'





export default class App extends Component {
  constructor(useSelector, useDispatch) {
    super();
    this.state = {
      input: '',
      route: 'signin',
      isSignedIn: false,
      mailNotifications: 0,
      notifications: ["1", "2", "3"],
      alertNotifications: 10,
      userFirstName: '',
      userLastName: '',
      loggedInUsername: '',
      userProfilePicture: '',
      UIColor: ''    
    }
  }
  // const isLoggedIn = useSelector(state => state.isLoggedIn),
  delay = ms => new Promise(res => setTimeout(res, ms));

  delayFunction = (time) => {
    this.delay(time);
  };



  
  getNotifications = async () => {
     fetch('http://localhost:3001/getNotifications', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user: this.state.loggedInUsername
      })    
    })
    //TURN THE RESPONSE INTO A JSON OBJECT
    .then(response => response.json())
    // .then(await this.delayFunction(1000))
    // WHAT WE DO WITH THE DATA WE RECEIVE (data => console.log(data)) SHOULD SHOW WHAT WE GET
    .then(data => {
      console.log(data)
    let count = 0;    
    data.forEach(element => (    
      element.seen === 0 ? count++ : ""))
    this.setState({ alertNotifications: count, notifications: data})  
    }) 
}


  componentDidMount() { 
      console.log(this.state.isSignedIn)
      this.interval = setInterval(() => this.getNotifications(), 5000);    
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }



  confirmFriendRequest = (sender, loggedInUser) => {
    fetch('http://localhost:3001/confirmFriendRequest', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        sender: sender,
        recipient: loggedInUser
   })    
 }).then(response => response.json())
 .then(data => {
      console.log(data)
 })
	}

	refuseFriendRequest = (sender, loggedInUser) => {
    fetch('http://localhost:3001/refuseFriendRequest', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
           sender: sender,
           recipient: loggedInUser
      })    
 }).then(response => response.json())
 .then(data => {
      console.log(data)
 })
	}


  sendFriendRequest = () => {
    fetch('http://localhost:3001/friendRequest', {
         method: 'post',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
              sender: this.props.loggedInUsername,
              recipient: this.props.userProfileToGet
         })    
    }).then(response => response.json())
    .then(data => {
         console.log(data)
    })
}

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      // this.dispatch({ type: 'SIGN_IN' })
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  updateSession = (firstName, lastName, userName, userProfilePicture) => {
    this.setState({ userFirstName: firstName, userLastName: lastName, loggedInUsername: userName, userProfilePicture: userProfilePicture })
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
  }

  render() {   

    return (
      <ThemeProvider theme={theme} >
      <DocumentMeta >      
      <div className="App"  >
        { this.state.isSignedIn === true ? 
          
            <div>
              <NavBar
              getNotifications={this.getNotifications}
                refuseFriendRequest={this.refuseFriendRequest}
                confirmFriendRequest={this.confirmFriendRequest}
                onRouteChange={this.onRouteChange}
                onColorChange={this.onColorChange}
                UIColor={this.state.UIColor}
                mailNotifications={this.state.mailNotifications}
                changeMailNotifications={this.changeMailNotifications}
                changeAlertNotifications={this.changeAlertNotifications}
                alertNotifications={this.state.alertNotifications}
                notifications={this.state.notifications}
              />     
              <Routes>
                <Route path="/" 
                  element={
                    <FeedPage
                    getNotifications={this.getNotifications}
                      setNotifications={this.setNotifications}
                      changeMailNotifications={this.changeMailNotifications}
                      onRouteChange={this.onRouteChange}
                      userFirstName={this.state.userFirstName}
                      userLastName={this.state.userLastName}
                      loggedInUsername={this.state.loggedInUsername}
                      userProfilePicture={this.state.userProfilePicture}
                    />
                  }
                />                 
                <Route path="myProfile"
                  element={
                    <ProfilePage
                    getNotifications={this.getNotifications}
                      loggedInUsername={this.state.loggedInUsername}
                      userFirstName={this.state.userFirstName}
                      userLastName={this.state.userLastName}
                      userProfileToGet={this.state.loggedInUsername}
                      changeAlertNotifications={this.changeAlertNotifications}
                      userProfilePicture={this.state.userProfilePicture}
                    />
                  }
                />
                {/* <Route path="myProfile"
                  element={
                    <ProfilePage
                    getNotifications={this.getNotifications}
                      userFirstName={this.state.userFirstName}
                      userLastName={this.state.userLastName}
                      username={this.state.loggedInUsername}
                      changeAlertNotifications={this.changeAlertNotifications}
                      userProfilePicture={this.state.userProfilePicture}
                    />
                  }
                /> */}
                <Route path="/:username" component={ProfilePage}
                  element={
                    <ProfileGate
                    getNotifications={this.getNotifications}
                      userFirstName={this.state.userFirstName}
                      userLastName={this.state.userLastName}
                      state={{ from: "the-page-id" }}
                      loggedInUsername={this.state.loggedInUsername}
                      userProfilePicture={this.state.userProfilePicture}
                    />
                  }
                  exact
                 ></Route>
                 <Route path="myAccount"
                  element={
                    <MyAccountPage
                    getNotifications={this.getNotifications}
                      userFirstName={this.state.userFirstName}
                      userProfilePicture={this.state.userProfilePicture}
                      loggedInUsername={this.state.loggedInUsername}
                    />
                  }
                />
              </Routes>
            </div> 
          :        
            <SignIn onRouteChange={this.onRouteChange} route={this.state.route} updateSession={this.updateSession} />
         }  
      </div>
      </DocumentMeta>
      </ThemeProvider>
    );
  }
}
