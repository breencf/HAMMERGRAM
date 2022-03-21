import { useState } from "react";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../store/posts";
import { useHistory } from "react-router-dom";

export const SimpleCreateForm = () => {
  const { id } = useSelector((s) => s.sessions.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [caption, setCaption] = useState(undefined);
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ id, caption, location, image }));
    history.push("/");
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
    console.log(image);
  };

  return (
    <div className="post-container">
      <h4>New Post</h4>
      <hr />
      <form onSubmit={onSubmit} id="createPostForm">
        <div className="form-top">
          <textarea
            id="caption"
            label="text"
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
            placeholder="Write a caption..."
          />
        </div>
        <hr />
        <div className="form-bottom">
          <label htmlFor="location">Add Image URL</label>
          <hr />
          <input type="file" onChange={updateFile} />
          <hr />
          <hr />
          <label htmlFor="location">Add Location</label>
          <input
            id="location"
            label="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="..."
          />
        </div>
        <hr />
        <div>
          <button className="button-submit" type="submit">
            Share
          </button>
        </div>
      </form>
    </div>
  );
};
