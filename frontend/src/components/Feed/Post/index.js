import {
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
import { useEffect, useState } from "react";
import { LikeButton } from "../../LikeButton";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { likeButton } from "../../../store/session";
import { loadOnePost, loadPosts } from "../../../store/posts";
import { useDoubleTap } from "use-double-tap";

let relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export const Post = ({ content }) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(content?.Likes.length);
  const user = useSelector((s) => s.sessions.user);
  const likes = useSelector((state) => state.posts.feed[content.id]?.Likes);
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
      border: "1px solid var(--ig-light-gray",
      padding: "0px",
    },
  };

  useEffect(() => {
    if (likes) setLikeCount(likes.length);
  }, [likes?.length]);

  const [showHeart, setShowHeart] = useState(false);
  const bind = useDoubleTap((event) => {
    onDClick();
  });
  const onDClick = () => {
    console.log("double clicked");
    setShowHeart(true);
    dispatch(likeButton({ userId: user.id, postId: content.id })).then(() =>
      dispatch(loadPosts(user.id))
    );
    setTimeout(() => setShowHeart(false), 1000);
  };

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
        <img src={content.image} {...bind} onDoubleClick={onDClick} />
        {showHeart && (
          <div className="bigHeart">
            <FaHeart />
          </div>
        )}
      </div>
      <div className="post-bottom">
        <div className="post-bottom-top">
          <div className="post-bottom-top-left">
            <LikeButton postId={content.id} />
            <Link to={`/posts/${content.id}/comments`}>
              <FaRegCommentDots />
            </Link>
            <FaRegPaperPlane />
          </div>
          <FaRegBookmark />
        </div>
        <div className="post-bottom-bottom">
          <div>
            <Link to={`/posts/${content.id}/likes`}>{likeCount} likes</Link>
          </div>
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
          <p className="from-now">{dayjs(content?.createdAt).fromNow()}</p>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        ariaHideApp={false}
      >
        <OptionsMenu content={content} closeModal={closeModal} />
      </Modal>
    </div>
  );
};
