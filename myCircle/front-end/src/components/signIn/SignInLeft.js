import myCircle from '../../Images/myCircle.svg'
import myCircleStamp from '../../Images/myCircleLogoStamp.svg'

export default function SignInLeft() {
    return (
        <div style={{backgroundColor: '#217cd8', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src={myCircle} style={{width: '30vw'}}/>
        </div>
    )
}