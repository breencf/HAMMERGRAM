import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProfile } from "../../store/user";
import { BsGearWide, BsGrid3X3, BsCollection } from "react-icons/bs";
import "./UserProfile.css";

export const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.users);

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
              {user?.username} <BsGearWide />
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
        <hr/>
        <div className="post-grid">
            {user?.Posts?.map((post) => {
                return(<div className="post-square" key={post.id}><img src={post.image}/></div>)
            })}
        </div>
      </div>
    </>
  );
};
