import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createAComment, loadOnePost, loadPosts } from "../../store/posts";
import { CommentPageComment } from "./CommentPageComment";

export const CommentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((s) => s.posts.current);
  const user = useSelector((s) => s.sessions.user);
  const [comment, setComment] = useState("");
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    dispatch(loadOnePost(id));
  }, [dispatch, id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const created = dispatch(
      createAComment({ postId: id, userId: user.id, content: comment })
    );
    created.then((obj) => setUpdated(created)).then(() => dispatch(loadPosts(user.id)));
    setComment("");
  };

  useEffect(() => {
    if (updated) {
      dispatch(loadOnePost(id));
      setUpdated(false);
    }
  }, [updated]);

  return (
    <div className="comment-page">
      <div>
        <CommentPageComment comment={post} />
        <hr />
        {post?.Comments.map((comment) => {
          return (
            <CommentPageComment
              key={comment.id}
              comment={comment}
              setUpdated={setUpdated}
            />
          );
        })}
      </div>
      <div>
        <hr />
        <div className="comment-form">
          <img src={user.image} className="userIcon" />
          <form onSubmit={onSubmit}>
            <input
              required
              type="text"
              id="comment"
              value={comment}
              // maxLength="255"
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit" className="button-submit" disabled={comment? false: true}>
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
