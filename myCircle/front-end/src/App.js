import logo from './logo.svg';
import './App.css';
import React , { Component } from "react";
import DocumentMeta from 'react-document-meta';
import Button from '@mui/material/Button'
import SignIn from './pages/SignIn';
import NavBar from './components/navBar';
import FeedPage from './pages/FeedPage';

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
      mailNotifications: 10,
      alertNotifications: 50
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

  render() {
    return (
      <DocumentMeta >      
      <div className="App"  >
        { this.state.isSignedIn === true ? <div><NavBar onRouteChange={this.onRouteChange} mailNotifications={this.state.mailNotifications} alertNotifications={this.state.alertNotifications} /> <FeedPage /></div> :        
        <SignIn onRouteChange={this.onRouteChange} route={this.state.route} />
         }      
      </div>
      </DocumentMeta>
    );
  }
}
