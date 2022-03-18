import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost } from "../../../store/posts";
import { useState, useEffect } from "react";
import { followButton } from "../../../store/user";

export const OptionsMenu = ({
  content,
  closeModal,
  singlePost,
  setShowEdit,
}) => {
  const { user } = useSelector((state) => state.sessions);
  console.log(content);
  const [followToggle, setFollowToggle] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(profileUserId)
  //   console.log(user.id)
  //   setFollowToggle(profileUser?.Followers?.find(follow => follow.followingUserId === user.id))
  // }, [profileUser])

  const onClickDelete = () => {
    dispatch(deletePost(content.id));
  };

  return (
    <div className="options-menu">
      <ul>
        <li>
          {/* <button className="submitButton" onClick={() => {dispatch(followButton({followingUserId: user.id, followedUserId: profileUser.id}))}}>{followToggle? "Unfollow" : "Follow"}</button> */}
        </li>
        {/* Check the above to toggle follow/follow */}
        {content.userId === user.id && singlePost && (
          <li
            onClick={() => {
              closeModal();
              setShowEdit(true);
            }}
          >
            Edit Post
          </li>
        )}
        {content.userId === user.id && <li onClick={onClickDelete}>Delete</li>}
        <li>
          <Link to={`/posts/${content.id}`}>Go to Post</Link>
        </li>
        {/* <li><Link to=""></Link>Copy Link</li> */}
        <li onClick={() => closeModal()}>Cancel</li>
      </ul>
    </div>
  );
};
