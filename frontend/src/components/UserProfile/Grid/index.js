import { Link } from "react-router-dom";
import "../UserProfile.css";

export const Grid = ({ posts }) => {
  return (
    <div className="post-grid">
      {posts?.map((post) => {
        return (
          <div className="post-square" key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <img src={post.image} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
