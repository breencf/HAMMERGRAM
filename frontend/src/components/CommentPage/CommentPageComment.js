import {Link} from 'react-router-dom'
import {FaHeart, FaRegTimesCircle} from 'react-icons/fa'
import "./CommentPage.css"
import { LikeButton } from '../LikeButton'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAComment } from '../../store/posts'


export const CommentPageComment = ({comment}) => {
    const dispatch = useDispatch()
    const {id} = useSelector((s) => s.sessions.user)
    return (
        <div className="comment-page-comment">
            <img className="userIcon" src={comment?.User?.image}/>
            <div>
                <Link to={`/users/${comment?.userId}`}>{comment?.User?.username}</Link> {comment?.content ? comment?.content : comment?.caption}
                <br/>
                {comment?.createdAt}
            </div>
            {comment?.content && <LikeButton likes={[]} postId={comment?.postId}/>}
            {comment?.content && comment.userId === id &&  <FaRegTimesCircle onClick={() => dispatch((deleteAComment(comment.id)))}/>}

        </div>
    )
}
