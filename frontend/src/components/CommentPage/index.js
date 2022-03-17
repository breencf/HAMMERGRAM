import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createAComment, loadOnePost } from "../../store/posts";
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
    created.then(obj => setUpdated(created));
    setComment("")
  };

  useEffect(() => {
    if (updated) {
      dispatch(loadOnePost(id));
      setUpdated(false)
    }
  }, [updated]);

  return (
    <div className="comment-page">
      <div>
        <CommentPageComment comment={post} />
        <hr />
        {post?.Comments.map((comment) => {
          return <CommentPageComment key={comment.id} comment={comment} setUpdated={setUpdated} />;
        })}
      </div>
      <div>
        <hr />
        <div className="comment-form">
          <img src={user.image} className="userIcon" />
          <form onSubmit={onSubmit}>
            <input
              type="text"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit" className="button-submit">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
