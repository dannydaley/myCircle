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
      alertNotifications: 0,
      userFirstName: '',
      userLastName: '',
      userUserName: '',
      userProfilePicture: '',
      UIColor: ''
    }
  }
  // const isLoggedIn = useSelector(state => state.isLoggedIn),

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
    this.setState({ userFirstName: firstName, userLastName: lastName, userUserName: userName, userProfilePicture: userProfilePicture })
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
              <NavBar onRouteChange={this.onRouteChange} onColorChange={this.onColorChange} UIColor={this.state.UIColor} mailNotifications={this.state.mailNotifications} changeMailNotifications={this.changeMailNotifications} changeAlertNotifications={this.changeAlertNotifications} alertNotifications={this.state.alertNotifications} />              
              {/* {this.router(this.state.route)} */}              
              <Routes>
                <Route path="/" 
                element={
                    <FeedPage
                      changeMailNotifications={this.changeMailNotifications}
                      onRouteChange={this.onRouteChange}
                      userFirstName={this.state.userFirstName}
                      userLastName={this.state.userLastName}
                      userUserName={this.state.userUserName}
                      userProfilePicture={this.state.userProfilePicture}
                    />
                  }
                />                 
                <Route path="myProfile"
                  element={
                    <ProfilePage
                    user={this.state.userUserName}
                      userFirstName={this.state.userFirstName}
                      userLastName={this.state.userLastName}
                      userUserName={this.state.userUserName}
                      changeAlertNotifications={this.changeAlertNotifications}
                      userProfilePicture={this.state.userProfilePicture}
                    />
                  }
                />
                <Route path="myProfile"
                  element={
                    <ProfilePage
                      userFirstName={this.state.userFirstName}
                      userLastName={this.state.userLastName}
                      userUserName={this.state.userUserName}
                      changeAlertNotifications={this.changeAlertNotifications}
                      userProfilePicture={this.state.userProfilePicture}
                    />
                  }
                />
                <Route path="/:username" component={ProfilePage}
                element={
                    <ProfileGate
                    state={{ from: "the-page-id" }}
                    />
                } exact
                 ></Route>
                  

                  
               
                {/* <Route path="users/:username"
                  element={
                    <ProfilePage
                      userFirstName={this.state.userFirstName}
                      userLastName={this.state.userLastName}
                      userUserName={this.state.userUserName}
                      changeAlertNotifications={this.changeAlertNotifications}
                      userProfilePicture={this.state.userProfilePicture}
                    />
                  }
                /> */}
                <Route path="myAccount"
                  element={
                    <MyAccountPage
                      userFirstName={this.state.userFirstName}
                      userProfilePicture={this.state.userProfilePicture}
                      userUserName={this.state.userUserName}
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
