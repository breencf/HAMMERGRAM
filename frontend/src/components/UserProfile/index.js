import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProfile } from "../../store/user";
import { BsGearWide, BsGrid3X3, BsCollection } from "react-icons/bs";
import "./UserProfile.css";
import Modal from 'react-modal'
import { ProfileMenu } from "./ProfileMenu";
export const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.users);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  return (
    <>
      <div className="profile-container">
        <div className="profile-top">
          <img className="profile-user" src={user?.image} />

          <div className="profile-header">
            <h1>
              {user?.username} <BsGearWide onClick={openModal} />
            </h1>
            <button className="editButton">Edit Profile</button>
          </div>
        </div>
        <div className="name-bio">
          <p>{user.name}</p>
          <p>{user.bio}</p>
        </div>
        <hr/>
        <div className="post-follows-container">
            <div className="post-follows"><span>{user?.Posts?.length}</span> posts</div>
            <div className="post-follows"><span>{user?.Followers?.length}</span> followers</div>
            <div className="post-follows"><span>{user?.Followings?.length}</span> following</div>
        </div>
        <hr/>
        <div className="post-follows-container">
            <BsGrid3X3/>
            <BsCollection/>
        </div>
        <div className="post-grid">
            {user?.Posts?.map((post) => {
                return(<div className="post-square" key={post.id}><Link to={`/posts/${post.id}`}><img src={post.image}/></Link></div>)
            })}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        ariaHideApp={false}
      >
        <ProfileMenu closeModal={closeModal}/>
      </Modal>
    </>
  );
};
