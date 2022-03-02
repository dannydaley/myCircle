import SignInForm from "../components/signIn/SignInForm"
import SignUpForm from "../components/signIn/SignUpForm";
import SignInLeft from "../components/signIn/SignInLeft"
import Divider from '@mui/material/Divider';

export default function SignIn({ onRouteChange, route, updateSession }) {
    
    if (route === 'signin' || route === 'signout'){
        
            return (        
                <div style={{backgroundColor: '#217cd8',display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh',justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <SignInLeft />
                    <Divider orientation="vertical" variant="middle" style={{height: '50%'}}/>
                    <SignInForm onRouteChange={onRouteChange} updateSession={updateSession} />               
                </div>
        )   
    } else if (route === 'signup'){
            return (
                <div style={{backgroundColor: '#217cd8',display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh',justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <SignInLeft />
                    <Divider orientation="vertical" variant="middle" style={{height: '50%'}}/>
                    <SignUpForm onRouteChange={onRouteChange}/>               
                </div>
        )
    }
}

