import { Link } from "react-router-dom";
import { FaHeart, FaRegTimesCircle } from "react-icons/fa";
import "./CommentPage.css";
import { LikeButton } from "../LikeButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteAComment, loadOnePost } from "../../store/posts";
import { useState, useEffect } from "react";

export const CommentPageComment = ({ comment, setUpdated }) => {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const { id } = useSelector((s) => s.sessions.user);

  const onDelete = (e) => {
    e.preventDefault();
    const d = dispatch(deleteAComment(comment.id));
    // if (d) setUpdated(d);
  };

//   useEffect(() => {
//     if (deleted) {
//         console.log('=============')
//         console.log('=============')
//         console.log('=============')
//         console.log('=============')
//         console.log('=============')
//         console.log('calling loadOnePost in single comment component')
//     //   dispatch(loadOnePost(comment.postId));
//       setDeleted(false);
//     }
//   }, [deleted]);


  return (
    <div className="comment-page-comment">
      <img className="userIcon" src={comment?.User?.image} />
      <div>
        <Link to={`/users/${comment?.userId}`}>{comment?.User?.username}</Link>{" "}
        {comment?.content ? comment?.content : comment?.caption}
        <br />
        {comment?.createdAt}
      </div>
      {comment?.content && <LikeButton likes={[]} postId={comment?.postId} />}
      {comment?.content && comment.userId === id && (
        <FaRegTimesCircle onClick={onDelete} />
      )}
    </div>
  );
};
