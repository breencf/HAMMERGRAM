import {FaCamera, FaCommentDots} from 'react-icons/fa'
import "./Navigation.css"

export const NavigatonTop = () => {
    return (
        <nav className='nav-top'>
            <FaCamera/>
            <h2>Hammergram</h2>
            <FaCommentDots/>
        </nav>
    )
}
