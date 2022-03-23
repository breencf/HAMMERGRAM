import { useState } from "react";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { createPost, loadPosts } from "../../store/posts";
import { useHistory } from "react-router-dom";

export const SimpleCreateForm = () => {
  const { id } = useSelector((s) => s.sessions.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ id, caption, location, image })).then(() =>
      dispatch(loadPosts(id))
    );
    history.push(`/users/${id}`);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div className="post-container">
      <hr />
      <form onSubmit={onSubmit} id="createPostForm">
        <div className="form-bottom">
          <label htmlFor="image" className={image ? null : "red"}>
            Add Image
          </label>
          <input
            type="file"
            onChange={updateFile}
            accept=".jpg, .jpeg, .gif, .png, .tiff"
          />
          <hr />

          <label htmlFor="caption">Add a Caption</label>

          <textarea
            id="caption"
            label="text"
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
            placeholder="Optional"
          />
          <hr />

          <label htmlFor="location">Add Location</label>
          <input
            id="location"
            label="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="Optional"
          />
        </div>
        <hr />
        <div>
          <button
            className="button-submit"
            type="submit"
            disabled={image ? false : true}
          >
            Share
          </button>
        </div>
      </form>
    </div>
  );
};
