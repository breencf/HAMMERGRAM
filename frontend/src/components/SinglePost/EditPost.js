import "../Feed/Post/Post.css";
import { Link, useParams } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../store/posts";

export const EditPost = ({ content, hideForm }) => {
  const { id } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [caption, setCaption] = useState(content.caption);
  const [location, setLocation] = useState(content.location);
  // const openModal = () => setModalIsOpen(true);
  // const closeModal = () => setModalIsOpen(false);

  // const modalStyle = {
  //   content: {
  //     top: "50%",
  //     left: "50%",
  //     right: "auto",
  //     bottom: "auto",
  //     marginRight: "-50%",
  //     transform: "translate(-50%, -50%)",
  //     backgroundColor: "black",
  //     border: "none",
  //   },
  // };

  // useEffect(() => {
  //   dispatch(loadOnePost(id));
  // }, [dispatch, content?.id]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost({ location, caption, id: content.id }));
    hideForm();
  };

  return (
    <div className="post-container">
      <form onSubmit={onSubmit} id="updatePostForm">
        <div className="post-top">
          <div className="post-top-left">
            <img className="userIcon" src={content?.User?.image} />
            <div className="post-top-user-loc">
              {content?.User?.username}
              <input
                id="location"
                label="text"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                placeholder="Add Location"
              />
            </div>
          </div>
          <button type="submit" className="button-none">
            Done
          </button>
        </div>
        <div className="post-image">
          <img src={content?.image} />
        </div>
        <div className="post-bottom">
          {/* <div className="post-bottom-bottom"> */}
            <div>
              <textarea
                id="caption"
                label="text"
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
                placeholder="Write a caption..."
              />
            {/* </div> */}
          </div>
        </div>
        {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        ariaHideApp={false}
      >
        <p>update location modal</p>
      </Modal> */}
      </form>
    </div>
  );
};
