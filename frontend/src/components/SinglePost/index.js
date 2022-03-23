import {
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
import { EditPost } from "./EditPost";
import { LikeButton } from "../LikeButton";
import { likeButton } from "../../store/session";
import { useDoubleTap } from "use-double-tap";

export const PostPage = () => {
  const { id } = useParams();
  const user = useSelector((s) => s.sessions.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const content = useSelector((state) => state.posts.current);
  const likes = useSelector((state) => state.posts.current)?.Likes;
  const [likeCount, setLikeCount] = useState(likes?.length);
  const [showEdit, setShowEdit] = useState(false);
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
      border: "1px solid var(--ig-light-gray)",
      padding: "0px",
    },
  };

  useEffect(() => {
    dispatch(loadOnePost(id));
  }, [dispatch, content?.id]);

  useEffect(() => {
    if (likes) setLikeCount(likes.length);
  }, [likes?.length]);

  const [showHeart, setShowHeart] = useState(false);
  const bind = useDoubleTap((event) => {
    // Your action here
    onDClick();
  });
  const onDClick = () => {
    console.log("double clicked");
    setShowHeart(true);
    dispatch(likeButton({ userId: user.id, postId: content.id })).then(() =>
      dispatch(loadOnePost(content.id))
    );
    setTimeout(() => setShowHeart(false), 1000);
  };

  return (
    <>
      {showEdit && <EditPost content={content} hideForm={setShowEdit} />}
      {!showEdit && (
        <div className="post-container">
          <div className="post-top">
            <div className="post-top-left">
              <img className="userIcon" src={content?.User?.image} />
              <div className="post-top-user-loc">
                <Link to={`/users/${content?.User?.id}`}>
                  {content?.User?.username}
                </Link>
                {content?.location && <p>{content?.location}</p>}
              </div>
            </div>
            <button className="button-none" onClick={() => openModal()}>
              <FaEllipsisH />
            </button>
          </div>
          <div className="post-image">
            <img src={content?.image} {...bind} onDoubleClick={onDClick} />
            {showHeart && (
              <div className="bigHeart">
                <FaHeart />
              </div>
            )}
          </div>
          <div className="post-bottom">
            <div className="post-bottom-top">
              <div className="post-bottom-top-left">
                {content && <LikeButton postId={content?.id} />}
                <Link to={`/posts/${content?.id}/comments`}>
                  <FaRegCommentDots />
                </Link>{" "}
                <FaRegPaperPlane />
              </div>
              <FaRegBookmark />
            </div>
            <div className="post-bottom-bottom">
              <div><Link to={`/posts/${content?.id}/likes`}>{likeCount} likes</Link></div>
              <div>
                <Link to={`/users/${content?.User?.username}`}>
                  {content?.User?.username}
                </Link>
                {content?.caption}
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
            {content && (
              <OptionsMenu
                content={content}
                singlePost={true}
                closeModal={closeModal}
                setShowEdit={setShowEdit}
              />
            )}
          </Modal>
        </div>
      )}
    </>
  );
};
