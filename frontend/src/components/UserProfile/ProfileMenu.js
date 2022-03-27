import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import { clearUsers } from "../../store/user";
import { clearPosts } from "../../store/posts";

export const ProfileMenu = ({ closeModal }) => {
  const { user } = useSelector((state) => state.sessions);
  const dispatch = useDispatch();
  const history = useHistory();

  const onClickLogout = () => {
    dispatch(logout())
      .then(() => {
        dispatch(clearPosts());
        dispatch(clearUsers());
      })
      .then(() => history.push("/"));
  };

  return (
    <div className="options-menu">
      <ul>
        {/* <li>
            Edit Profile
        </li> */}
        <li onClick={onClickLogout}>
          <p className="red">Log out</p>
        </li>
        <li onClick={() => closeModal()}>Cancel</li>
      </ul>
    </div>
  );
};
