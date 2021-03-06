import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadFollowers, loadProfile } from "../../store/user";
import { followButton } from "../../store/session";
import {
  BsGearWide,
  BsGrid3X3,
  BsCollection,
  BsBookmark,
} from "react-icons/bs";
import { Grid } from "./Grid";
import "./UserProfile.css";
import Modal from "react-modal";
import { ProfileMenu } from "./ProfileMenu";
import { FollowButton } from "../FollowButton";
import { Feed } from "../Feed";

export const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, profileFollowers } = useSelector((s) => s.users);
  const { following, user, bookmarks } = useSelector((s) => s.sessions);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [gridFeed, setGridFeed] = useState("g");
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid var(--ig-light-gray)",
      padding: "0px",
    },
  };

  useEffect(() => {
    dispatch(loadProfile(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(loadFollowers(id));
  }, [following, id]);

  useEffect(() => {
    if (profileFollowers) setFollowerCount(profileFollowers?.length);
  }, [profileFollowers?.length, id]);

  return (
    <>
      <div className="profile-container">
        <div className="profile-top">
          <div className="profile-user">
            <img src={profile?.image} />
          </div>

          <div className="profile-header">
            <h1>
              {profile?.username}{" "}
              {parseInt(id) === user.id && <BsGearWide onClick={openModal} />}
            </h1>
            {parseInt(id) === user.id ? null : ( // <button className="editButton">Edit Profile</button>
              <FollowButton followedUserId={id} />
            )}
          </div>
        </div>
        <div className="name-bio">
          <p>{profile.name}</p>
          {profile.bio}
        </div>
        <hr />
        <div className="post-follows-container">
          <div className="post-follows">
            <span>{profile?.Posts?.length}</span> <p>posts</p>
          </div>
          <Link
            to={`/users/${id}/followers`}
            disabled={followerCount > 0 ? false : true}
          >
            <div className="post-follows">
              <span>{followerCount}</span> <p>followers</p>
            </div>
          </Link>
          <Link to={`/users/${id}/following`}>
            <div className="post-follows">
              <span>{profile?.Followings?.length}</span> <p>following</p>
            </div>
          </Link>
        </div>
        <hr />
        <div className="post-follows-container">
          <BsGrid3X3 onClick={() => setGridFeed("g")} />
          <BsCollection onClick={() => setGridFeed("f")} />
          {/* {user.id === parseInt(id) && <BsBookmark onClick={() => setGridFeed("b")}/>} */}
        </div>
        {gridFeed === "g" && (
          <Grid posts={profile?.Posts?.sort((a, b) => b.id - a.id)} />
        )}
        {gridFeed === "f" && (
          <Feed posts={profile?.Posts?.sort((a, b) => b.id - a.id)} />
        )}
        {/* {gridFeed === "b" && (
          <Grid posts={Object.values(bookmarks).map((bookmark) => bookmark.Post)}/>
        )} */}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        ariaHideApp={false}
      >
        <ProfileMenu closeModal={closeModal} />
      </Modal>
    </>
  );
};
