import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";

export const ProfileMenu = ({closeModal }) => {
  const {user} = useSelector((state) => state.sessions);
  const dispatch = useDispatch()

  return (
    <div className="options-menu">
      <ul>
        <li>
            Edit Profile
        </li>
        <li onClick={() => {dispatch(logout())}}>
            Log Out
        </li>
        <li onClick={() => closeModal()}>Cancel</li>
      </ul>
    </div>
  );
};
