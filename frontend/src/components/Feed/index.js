import { useDispatch, useSelector } from "react-redux";
import { loadPosts } from "../../store/posts";
import { useEffect } from "react";
import { Post } from "./Post";
import "./Feed.css";

export const Feed = ({posts}) => {

  return (
    <div className="feed">

      {!posts.length && <div className="nofollowing"><h1>Check out the search page to discover some users to follow!</h1></div>}
      {posts
        .sort((a, b) => b.id - a.id)
        .map((content) => {
          return <Post key={content.id} content={content} />;
        })}
    </div>
  );
};
