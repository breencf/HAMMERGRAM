import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import "./LikeButton.css";
import { likeButton, loadPosts } from "../../store/posts";

export const LikeButton = ({ likes, postId }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.sessions?.user);
  const likesState = useSelector((state) => state.posts.feed[postId]?.Likes);
  const [dispatched, setDispatched] = useState(false)

  const [liked, setLiked] = useState(
    likes.filter((likeObj) => likeObj.userId === id).length
  );
  const history = useHistory();

  const onClick = async (e) => {
    e.preventDefault();
    if (id) {
      const dispatched = dispatch(likeButton({ userId: id, postId }));
      setLiked(!liked);
      setDispatched(dispatched)
    } else {
      history.push("/signup");
    }
  };

  useEffect(() => {
     if(dispatched) dispatch(loadPosts());
     setDispatched(false)
  }, [dispatched]);

  return (
    <div>
      <button className="likeButton" type="button" onClick={onClick}>
        {liked ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
};
