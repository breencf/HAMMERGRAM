import {
  FaRegCommentDots,
  FaEllipsisH,
  FaRegPaperPlane,
  FaRegBookmark,
} from "react-icons/fa";
import {BsChat} from 'react-icons/bs'
import "./Post.css";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { OptionsMenu } from "./OptionsMenu";
import { useEffect, useState } from "react";
import { LikeButton } from "../../LikeButton";
import { useSelector } from "react-redux";

export const Post = ({ content }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(content?.Likes.length);
  const likes = useSelector((state) => state.posts.feed[content.id].Likes);
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
    if (likes) setLikeCount(likes.length);
  }, [likes.length]);

  return (
    <div className="post-container">
      <div className="post-top">
        <div className="post-top-left">
          <img className="userIcon" src={content.User.image} />
          <div className="post-top-user-loc">
            <Link to={`/users/${content.User.id}`}>
              {content.User.username}
            </Link>
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
            <LikeButton likes={content?.Likes} postId={content.id} />
            <Link to={`/posts/${content.id}/comments`}><FaRegCommentDots /></Link>
            <FaRegPaperPlane />
          </div>
          <FaRegBookmark />
        </div>
        <div className="post-bottom-bottom">
          <div>{likeCount} likes</div>
          <div>
            <Link to={`/users/${content.User.id}`}>
              {content.User.username}
            </Link>
            {content.caption}
          </div>
          <div className="comments">
            {content?.Comments?.map((comment) => {
              return (
                comment && (
                  <div key={comment.id}>
                    <Link to={`/users/${comment.userId}`}>
                      {comment?.User?.username}
                    </Link>{" "}
                    {comment?.content}
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        ariaHideApp={false}
      >
        <OptionsMenu content={content} />
      </Modal>
    </div>
  );
};
