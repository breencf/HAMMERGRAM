import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost } from "../../../store/posts";

export const OptionsMenu = ({ content, closeModal }) => {
  const {user} = useSelector((state) => state.sessions);
  const dispatch = useDispatch()

  const onClickDelete = () => {
      dispatch(deletePost(content.id))
  }
  return (
    <div className="options-menu">
      <ul>
        <li>
          <Link to=""></Link>Unfollow
        </li>
        {/* Check the above to toggle follow/follow */}
        {user && content.userId === user.id && <li onClick={onClickDelete}>Delete</li>}
        <li>
          <Link to={`/posts/${content.id}`}></Link>Go to Post
        </li>
        {/* <li><Link to=""></Link>Copy Link</li> */}
        <li onClick={() => closeModal()}>Cancel</li>
      </ul>
    </div>
  );
};
