import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import "./LikeButton.css";
import { loadPosts } from "../../store/posts";
import { likeButton } from "../../store/session";

export const LikeButton = ({ postId }) => {
  const dispatch = useDispatch();
  const { user, likes } = useSelector((state) => state.sessions);
  const likeCount = useSelector((state) => state.posts.feed[postId]?.Likes);
  const [dispatched, setDispatched] = useState(false)
  const [likeToggle, setLikeToggle] = useState(false)
  const history = useHistory();


  useEffect(() => setLikeToggle(likes[postId]), [Object.values(likes).length])



  const onClick = async (e) => {
    e.preventDefault();
    if (user.id) {
      const dispatched = dispatch(likeButton({ userId: user.id, postId }));
      dispatched.then((e) => setDispatched(e))
      setLikeToggle(!likeToggle);
    } else {
      history.push("/signup");
    }
  };

  useEffect(() => {
     if(dispatched) dispatch(loadPosts(user.id));
     setDispatched(false)
  }, [dispatched]);

  return (
    <div>
      <button className="likeButton" type="button" onClick={onClick}>
        {likeToggle ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
};
