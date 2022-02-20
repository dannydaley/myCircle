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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      route: 'signin',
      isSignedIn: false
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
        { this.state.isSignedIn ? <div><NavBar onRouteChange={this.onRouteChange} /> <FeedPage /></div> :        
        <SignIn onRouteChange={this.onRouteChange} route={this.state.route} />
         }      
      </div>
      </DocumentMeta>
    );
  }
}




// function App() {
//   return (
//     <DocumentMeta >
    
//     <div className="App"  >
//       <SignIn />
//       {/* <NavBar />
//       <FeedPage /> */}

//     </div>
//     </DocumentMeta>
//   );
// }

export default App;


/*


import React, { Fragment, Suspense, lazy } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import Pace from "./shared/components/Pace";
import ReactGA from 'react-ga';
import { Person } from "schema-dts";
import { JsonLd } from "react-schemaorg";


function App() {
  return (
    <BrowserRouter>
      <PreLoader2>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {/* Loading bar at top of page /}
        <Pace color={theme.palette.primary.light} />
        <Suspense fallback={<Fragment />}>
        {/ Organisational Schema /}
        <JsonLd Organization item={{
        "@context": "https://schema.org/",
        "@type": "Organization",
        name: "Social Thirst", }}/>
          {/ Main application routes and pages }
          <Switch>
            <Route path="/c">
              <LoggedInComponent />
            </Route>
            <Route>
              <LoggedOutComponent />
            </Route>
          </Switch>
        </Suspense>
      </MuiThemeProvider>
      </PreLoader2>
    </BrowserRouter>
  );
}

export default App;

*/
