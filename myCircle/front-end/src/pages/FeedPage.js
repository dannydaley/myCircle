import Feed from "../components/feed";
import Overlay from "../components/overlay";
import * as React from 'react';

export default class FeedPage extends React.Component {    
     constructor({ changeCircle }) {
        super();
        this.state = {
             circle: 'general'   
          }
     }

     render() {
               return (
                    <div >
                         <Feed circle={this.state.circle} changeCircle={this.changeCircle} />  
                    </div>
               )    
          } 
     }
