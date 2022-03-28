import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import "../LikeButton/LikeButton.css";
import { loadOnePost, loadPosts } from "../../store/posts";
import { bookmarkButton } from "../../store/session";

export const BookmarkButton = ({ postId }) => {
  const dispatch = useDispatch();
  const { user, bookmarks } = useSelector((state) => state.sessions);
  //   const likeCount = useSelector((state) => state.posts.feed[postId]?.Likes);
  const [dispatched, setDispatched] = useState(false);
  const [bmToggle, setBmToggle] = useState(bookmarks[postId]);
  const history = useHistory();

  useEffect(
    () => setBmToggle(bookmarks[postId]),
    [Object.values(bookmarks).length]
  );

  const onClick = async (e) => {
    e.preventDefault();
    if (user.id) {
      const dispatched = dispatch(bookmarkButton({ userId: user.id, postId }));
      dispatched.then((e) => setDispatched(e));
      setBmToggle(!bmToggle);
    } else {
      history.push("/signup");
    }
  };

//   useEffect(() => {
//     if (dispatched) {
//       dispatch(loadPosts(user.id));
//       dispatch(loadOnePost(postId));
//     }
//     setDispatched(false);
//   }, [dispatched]);

  return (
    <div>
      <button className="likeButton" type="button" onClick={onClick}>
        {bmToggle ? <FaBookmark /> : <FaRegBookmark />}
      </button>
    </div>
  );
};
