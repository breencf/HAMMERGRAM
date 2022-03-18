import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { followButton } from "../../store/session";
import { loadFollowers } from "../../store/user";

export const FollowButton = ({ followedUserId }) => {
  const dispatch = useDispatch();
  const [followToggle, setFollowToggle] = useState(false);
  const { user } = useSelector((s) => s.sessions);



  useEffect(() => {
    setFollowToggle(
      user?.Followings?.find((follow) => follow.followedUserId === followedUserId)
    );
  }, [user?.Followings.length]);

  return (
    <>
      <button
        className="submitButton"
        onClick={() => {
          dispatch(
            followButton({
              followingUserId: user.id,
              followedUserId,
            })
          ).then(()=> dispatch(loadFollowers(followedUserId)));
        }}
      >
        {followToggle ? "Unfollow" : "Follow"}
      </button>
    </>
  );
};
