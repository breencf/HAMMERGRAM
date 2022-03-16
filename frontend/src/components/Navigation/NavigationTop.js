import {FaCamera, FaCommentDots} from 'react-icons/fa'
import "./Navigation.css"
import {Link} from 'react-router-dom'

export const NavigatonTop = () => {
    return (
        <nav className='nav-top'>
            <FaCamera/>
            <Link to="/"><h2>Hammergram</h2></Link>
            <FaCommentDots/>
        </nav>
    )
}
