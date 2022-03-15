import {FaRegHeart, FaRegCommentDots, FaEllipsisH, FaRegPaperPlane, FaRegBookmark} from 'react-icons/fa'
import "./Post.css"

export const Post = ({content}) => {
    return(
        <div className="post-container">
            <div className="post-top">
                <div className='post-top-left'>
                <img className='userIcon' src={content.User.image}/>
                {content.User.username}
                </div>
                <FaEllipsisH/>
            </div>
            <div className="post-image">
                <img src={content.image}/>
            </div>
            <div className="post-bottom">
                <div className='post-bottom-top'>
                <div className='post-bottom-top-left'>
                <FaRegHeart/>
                <FaRegCommentDots/>
                <FaRegPaperPlane/>
                </div>
                <FaRegBookmark/>
                </div>
            </div>
        </div>
    )
}
