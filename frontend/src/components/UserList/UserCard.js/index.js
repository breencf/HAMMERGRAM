import { Link } from "react-router-dom";
import "../../CommentPage/CommentPage.css";
import { FollowButton } from "../../FollowButton";
import "../../ActivityPage/ActivityCard.css";
import { useSelector } from "react-redux";

export const UserCard = ({ user }) => {
  const {id} = useSelector(s => s.sessions.user)
  return (
    <div className="activity-card">
      <div className="activity-card-left">
        {user.id && <img className="userIcon" src={user.image} />}
        <div>
          {user.id && <Link to={`/users/${user.id}`}>{user.username}</Link>}
          {user.id && <p>{user.name}</p>}
        </div>
      </div>
      <div className="userCardFollowButton">
      {user.id !== id && <FollowButton followedUserId={user.id} />}
      </div>
    </div>
  );
};
