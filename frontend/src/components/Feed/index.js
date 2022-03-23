import { useDispatch, useSelector } from "react-redux";
import { loadPosts } from "../../store/posts";
import { useEffect } from "react";
import { Post } from "./Post";
import "./Feed.css";

export const Feed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((s) => s.posts.feed);
  const user = useSelector((s) => s.sessions.user);
  useEffect(() => {
    dispatch(loadPosts(user.id));
  }, [dispatch, posts?.length]);

  return (
    <div className="feed">
      {Object.values(posts)
        .sort((a, b) => b.id - a.id)
        .map((content) => {
          return <Post key={content.id} content={content} />;
        })}
    </div>
  );
};
