import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadFollowers, loadProfile } from "../../store/user";
import { followButton } from "../../store/session";
import { BsGearWide, BsGrid3X3, BsCollection } from "react-icons/bs";
import "./UserProfile.css";
import Modal from "react-modal";
import { ProfileMenu } from "./ProfileMenu";
import { FollowButton } from "../FollowButton";
export const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {profile, profileFollowers} = useSelector((s) => s.users);
  const {following} = useSelector((s) => s.sessions)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [followerCount, setFollowerCount] = useState(0)
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
      backgroundColor: "black",
      border: "none",
    },
  };

  useEffect(() => {
    dispatch(loadProfile(id));
  }, [dispatch, id]);

  useEffect(() => {if(profileFollowers) setFollowerCount(profileFollowers?.length)}, [profileFollowers?.length])

  useEffect(() => {dispatch(loadFollowers(id))}, [Object.values(following).length])

  return (
    <>
      <div className="profile-container">
        <div className="profile-top">
          <img className="profile-user" src={profile?.image} />

          <div className="profile-header">
            <h1>
              {profile?.username} <BsGearWide onClick={openModal} />
            </h1>
            {id === profile.id ? (
              <button className="editButton">Edit Profile</button>
            ) : (
              <FollowButton followedUserId={id}/>
            )}
          </div>
        </div>
        <div className="name-bio">
          <p>{profile.name}</p>
          <p>{profile.bio}</p>
        </div>
        <hr />
        <div className="post-follows-container">
          <div className="post-follows">
            <span>{profile?.Posts?.length}</span> posts
          </div>
          <div className="post-follows">
            <span>{followerCount}</span> followers
          </div>
          <div className="post-follows">
            <span>{profile?.Followings?.length}</span> following
          </div>
        </div>
        <hr />
        <div className="post-follows-container">
          <BsGrid3X3 />
          <BsCollection />
        </div>
        <div className="post-grid">
          {profile?.Posts?.map((post) => {
            return (
              <div className="post-square" key={post.id}>
                <Link to={`/posts/${post.id}`}>
                  <img src={post.image} />
                </Link>
              </div>
            );
          })}
        </div>
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
