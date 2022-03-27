import { Link } from "react-router-dom";
import { FaHeart, FaRegTimesCircle } from "react-icons/fa";
import "./CommentPage.css";
import { LikeButton } from "../LikeButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteAComment, loadOnePost, loadPosts } from "../../store/posts";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
let relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export const CommentPageComment = ({ comment, setUpdated }) => {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const { id } = useSelector((s) => s.sessions.user);

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteAComment(comment.id))
      .then((obj) => setDeleted(true))
      .then(() => dispatch(loadPosts(id)));
  };

  useEffect(() => {
    if (deleted) {
      dispatch(loadOnePost(comment.postId));
      setDeleted(false);
    }
  }, [deleted]);

  return (
    <div className="comment-page-comment">
      <img className="userIcon" src={comment?.User?.image} />
      <div className="comment-body">
        <Link to={`/users/${comment?.userId}`}>{comment?.User?.username}</Link>
        {comment?.content ? comment?.content : comment?.caption}
        <br />
        {dayjs(comment?.createdAt).fromNow()}
      </div>
      {/* {comment?.content && <LikeButton likes={[]} postId={comment?.postId} />} */}
      {comment?.content && comment.userId === id && (
        <FaRegTimesCircle onClick={onDelete} />
      )}
    </div>
  );
};
