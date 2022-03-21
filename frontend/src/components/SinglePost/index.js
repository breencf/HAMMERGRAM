import {
  FaRegCommentDots,
  FaEllipsisH,
  FaRegPaperPlane,
  FaRegBookmark,
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

export const PostPage = () => {
  const { id } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const content = useSelector((state) => state.posts.current);
  const likes = useSelector((state) => state.posts.feed[id]?.Likes);
  const [likeCount, setLikeCount] = useState(likes?.length);
  const [showEdit, setShowEdit] = useState(false)
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
      padding: "0px"
    },
  };


  useEffect(() => {
    dispatch(loadOnePost(id));
  }, [dispatch, content?.id]);

  useEffect(() => {
    if (likes) setLikeCount(likes.length);
  }, [likes?.length]);

  return (
    <>
    {showEdit && <EditPost content={content} hideForm={setShowEdit}/>}
    {!showEdit && <div className="post-container">
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
        <img src={content?.image} />
      </div>
      <div className="post-bottom">
        <div className="post-bottom-top">
          <div className="post-bottom-top-left">
          {content && <LikeButton postId={content?.id} />}
          <Link to={`/posts/${content?.id}/comments`}><FaRegCommentDots /></Link>            <FaRegPaperPlane />
          </div>
          <FaRegBookmark />
        </div>
        <div className="post-bottom-bottom">
        <div>{likeCount} likes</div>
          <div>
            <Link to={`/users/${content?.User?.username}`}>
              {content?.User?.username}
            </Link>
            {content?.caption}
          </div>
          <div className="comments">
            {content?.Comments?.map((comment) => {
              return comment && (
                <div key={comment.id}>
                  <Link to={`/users/${comment.userId}`}>{comment?.User?.username}</Link> {comment?.content}
                </div>
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
        {content && <OptionsMenu content={content} singlePost={true} closeModal={closeModal} setShowEdit={setShowEdit} />}
      </Modal>
    </div>}
    </>
  );
};
