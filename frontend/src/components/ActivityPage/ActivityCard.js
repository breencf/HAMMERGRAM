import dayjs from "dayjs";
import { Link } from "react-router-dom";
import "../CommentPage/CommentPage.css";
import "./ActivityCard.css"
let relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
// import { LikeButton } from "../LikeButton";

export const ActivityCard = ({ activity }) => {
let phrase
if(activity.followingUserId) {
    phrase = "started following you"
}
else if (activity.content) {
    phrase = `commented : ${activity.content}`
}
else {
    phrase = "liked your post"
}

  return (
    <div className="activity-card">
    <div className="activity-card-left">
      {activity.userId && <img className="userIcon" src={activity?.User?.image} />}
      {activity.followingUserId && <img className="userIcon" src={activity.Followings.image}/>}
      <div>
        {activity.userId && <Link to={`/users/${activity?.userId}`}>{activity?.User?.username}</Link>}
        {activity.followingUserId && <Link to={`/users/${activity?.followingUserId}`}>{activity?.Followings.username}</Link>} {phrase}
        <br />
        {dayjs(activity?.createdAt).fromNow()}
      </div>
    </div>
    <div>
      {phrase === "liked your post" && <img className="activity-image" src={activity.Post.image}/>}
      {phrase[0] === "c" && <img className="activity-image" src={activity.Post.image}/>}
      {phrase[0] === "s" && <button className="submitButton">Follow</button>}

      </div>
    </div>
  );
};
