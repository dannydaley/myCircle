import Feed from "../components/feed";
import Overlay from "../components/overlay";
import * as React from 'react';

export default class FeedPage extends React.Component {    
     constructor({ changeCircle, changeMailNotifications }) {
        super();
        this.state = {
             circle: 'general'   
          }
     }

     render()   {  
     const { onRouteChange } = this.props;
     
          // changeMailNotifications = this.props;
               return (
                    <div >
                         <Feed circle={this.state.circle} changeCircle={this.changeCircle} changeMailNotifications={this.changeMailNotifications} onRouteChange={onRouteChange} />  
                    </div>
               )    
          } 
     }
