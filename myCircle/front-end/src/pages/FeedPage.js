import Feed from "../components/feed";
import Overlay from "../components/overlay";

export default function FeedPage({ onRouteChange, route }) {
    return (
        <div >
            <Overlay />
            <Feed />    
        </div>
    )
}