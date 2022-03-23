import { useDispatch, useSelector } from "react-redux";
import { loadPosts } from "../../store/posts";
import { useEffect } from "react";
import { Post } from "./Post";
import "./Feed.css";

export const Feed = ({posts}) => {

  console.log(posts)
  return (
    <div className="feed">
      {posts
        .sort((a, b) => b.id - a.id)
        .map((content) => {
          return <Post key={content.id} content={content} />;
        })}
    </div>
  );
};
