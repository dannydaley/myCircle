import Feed from "../components/feed";
import * as React from 'react';

export default class FeedPage extends React.Component {    
     constructor({ changeCircle, changeMailNotifications, props }) {
        super(props);
        this.state = {
             circle: 'general'   
          }
     }

     render()   {  
     const { onRouteChange, userFirstName, userLastName, userUserName, userProfilePicture } = this.props;
               return (
                    <div >
                         <Feed
                              circle={this.state.circle}
                              changeMailNotifications={this.changeMailNotifications}
                              onRouteChange={onRouteChange} userFirstName={userFirstName}
                              userLastName={userLastName} userUserName={userUserName} 
                              userProfilePicture={userProfilePicture} 
                         />  
                    </div>
               )    
          } 
     }
