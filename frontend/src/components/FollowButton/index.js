import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { followButton } from "../../store/session";
import { loadFollowers } from "../../store/user";

export const FollowButton = ({ followedUserId, options}) => {
  const dispatch = useDispatch();
  const [followToggle, setFollowToggle] = useState(false);
  const { user, following } = useSelector((s) => s.sessions);



useEffect (() => {
  setFollowToggle(following[followedUserId])
},[Object.values(following).length])

  return (
    <>
      {!options && <button
        className={followToggle? "submittedButton": "submitButton"}
        onClick={() => {
          dispatch(
            followButton({
              followingUserId: user.id,
              followedUserId,
            })
          );
        }}
      >
        {followToggle ? "Unfollow" : "Follow"}
      </button>}
      {options && <button
        className={followToggle? "button-none red": "button-none op-fol"}
        onClick={() => {
          dispatch(
            followButton({
              followingUserId: user.id,
              followedUserId,
            })
          );
        }}
      >
        {followToggle ? "Unfollow" : "Follow"}
      </button>}
    </>
  );
};
