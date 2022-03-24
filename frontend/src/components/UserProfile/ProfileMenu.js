import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";

export const ProfileMenu = ({closeModal }) => {
  const {user} = useSelector((state) => state.sessions);
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <div className="options-menu">
      <ul>
        {/* <li>
            Edit Profile
        </li> */}
        <li onClick={() => {dispatch(logout()); history.push("/")}}>
            <p className="red">Log out</p>
        </li>
        <li onClick={() => closeModal()}>Cancel</li>
      </ul>
    </div>
  );
};
