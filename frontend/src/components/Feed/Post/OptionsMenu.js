import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { deletePost, loadPosts } from "../../../store/posts";
import { useState, useEffect } from "react";
import { followButton } from "../../../store/session";
import { FollowButton } from "../../FollowButton";
import { loadProfile } from "../../../store/user";

export const OptionsMenu = ({
  content,
  closeModal,
  singlePost,
  setShowEdit,
}) => {
  const history = useHistory();
  const params = useParams()
  const { user } = useSelector((state) => state.sessions);
  const [followToggle, setFollowToggle] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(profileUserId)
  //   console.log(user.id)
  //   setFollowToggle(profileUser?.Followers?.find(follow => follow.followingUserId === user.id))
  // }, [profileUser])

  const onClickDelete = () => {
    dispatch(deletePost(content.id)).then(() => dispatch(loadProfile(content.userId)));
    closeModal();
    history.push(`/users/${content.userId}`);
  };

  return (
    <div className="options-menu">
      <ul>
        {user.id !== content.userId && (
          <li>
            <FollowButton followedUserId={content.userId} options={true} />
          </li>
        )}

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
        {+params.id !== content.id &&<li>
          <Link to={`/posts/${content.id}`}>Go to Post</Link>
        </li>}
        {/* <li><Link to=""></Link>Copy Link</li> */}
        <li onClick={() => closeModal()}>Cancel</li>
      </ul>
    </div>
  );
};
