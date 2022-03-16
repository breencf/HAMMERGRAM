import {
  FaRegHeart,
  FaRegCommentDots,
  FaEllipsisH,
  FaRegPaperPlane,
  FaRegBookmark,
  FaHeart,
} from "react-icons/fa";
import "./Post.css";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { OptionsMenu } from "./OptionsMenu";
import { useState } from "react";

export const Post = ({ content }) => {
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

  return (
    <div className="post-container">
      <div className="post-top">
        <div className="post-top-left">
          <img className="userIcon" src={content.User.image} />
          <div className="post-top-user-loc">
          <Link to={`/users/${content.User.id}`}>{content.User.username}</Link>
          {content.location && <p>{content.location}</p>}
          </div>
        </div>
        <button className="button-none" onClick={() => openModal()}>
          <FaEllipsisH />
        </button>
      </div>
      <div className="post-image">
        <img src={content.image} />
      </div>
      <div className="post-bottom">
        <div className="post-bottom-top">
          <div className="post-bottom-top-left">
            <FaRegHeart />
            <FaRegCommentDots />
            <FaRegPaperPlane />
          </div>
          <FaRegBookmark />
        </div>
        <div className="post-bottom-bottom">
          <div>
            <FaHeart /> likes
          </div>
          <div>
            <Link to={`/users/${content.User.username}`}>
              {content.User.username}
            </Link>
            {content.caption}
          </div>
        </div>
      </div>
      <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={modalStyle}
            ariaHideApp={false}
          >
            <OptionsMenu content={content}/>
          </Modal>
    </div>
  );
};
