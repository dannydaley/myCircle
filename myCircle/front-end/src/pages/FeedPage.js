import Feed from "../components/feed";
import Overlay from "../components/overlay";
import * as React from 'react';



export default class FeedPage extends React.Component {
    
     constructor({ onRouteChange, route }) {
        super();

     }
delay = ms => new Promise(res => setTimeout(res, ms));

reload = async () => {
    while (true) {
      await this.delay(5000);   
        
         return       
    }
  // await this.delay(5000);
  // console.log("Waited an additional 5s");
};
     render() {
       return (
        <div >
            <Overlay />
            <Feed />  
        </div>
    )      
     }

}