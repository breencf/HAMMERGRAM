import {FaCamera, FaCommentDots} from 'react-icons/fa'
import "./Navigation.css"
import {Link} from 'react-router-dom'

export const NavigatonTop = () => {
    return (
        <nav className='nav-top'>
            <FaCamera/>
            <Link to="/"><img className='logo' src="https://hammergram.s3.amazonaws.com/icons/hammergram-logo.png"/></Link>
            <FaCommentDots/>
        </nav>
    )
}
