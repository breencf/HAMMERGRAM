import {
  FaRegHeart,
  FaRegCommentDots,
  FaEllipsisH,
  FaRegPaperPlane,
  FaRegBookmark,
  FaHeart,
} from "react-icons/fa";
import "../Feed/Post/Post.css";
import { Link, useParams } from "react-router-dom";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadOnePost } from "../../store/posts";
import { OptionsMenu } from "../Feed/Post/OptionsMenu";

export const EditPostPage = () => {
  const { id } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const content = useSelector((state) => state.posts.current);
  const dispatch = useDispatch();
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

  console.log(id);

  useEffect(() => {
    dispatch(loadOnePost(id));
  }, [dispatch, content?.id]);

  return (
    <div className="post-container">
      <div className="post-top">
        <div className="post-top-left">
          <img className="userIcon" src={content?.User?.image} />
          <div className="post-top-user-loc">
            {content?.User?.username}
            {content.location}
          </div>
        </div>
        <button className="button-none" onClick={() => openModal()}>
          <FaEllipsisH />
        </button>
      </div>
      <div className="post-image">
        <img src={content?.image} />
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
            <FaHeart /> {content?.Likes.length} likes
          </div>
          <div>
            <Link to={`/users/${content?.User?.username}`}>
              {content?.User?.username}
            </Link>
            {content?.caption}
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        ariaHideApp={false}
      >
        {content && <OptionsMenu content={content} />}
      </Modal>
    </div>
  );
};
