import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivityCard } from "../../ActivityPage/ActivityCard";
import { Link } from "react-router-dom";
import { Grid } from "../../UserProfile/Grid";
import { loadRandomPosts } from "../../../store/posts";

export const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((s) => s.sessions.user);
  const results = useSelector((s) => s.search);
  const posts = useSelector((s) => s.posts.explore);
  const [explore, setExplore] = useState([]);
  const [loadedExplore, setLoadedExplore] = useState(false);

  useEffect(() => {
    dispatch(loadRandomPosts(user.id));
    setLoadedExplore(true);
  }, []);

  useEffect(() => {
   setExplore(Object.values(posts));
  }, [loadedExplore, posts]);


  const shuffleArray = (array) => {
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
      // Pick a remaining element
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      // Swap it with the current element.
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  };



  return (
    <div>
      {results.length === 0 && <div className="empty-list"><p>No results available for the given search.</p></div> }
      {window.searchName.length > 2 &&
        results.map((result) => {
          return (
            <Link key={result.id} to={`/users/${result.id}`}>
              <div className="activity-card">
                <div className="activity-card-left">
                  <img className="userIcon" src={result.image} />
                  {result.username}
                </div>
              </div>
              <hr />
            </Link>
          );
        })}
      {window.searchName.length < 2 &&
      <><Grid posts={shuffleArray(explore)} /></>}
    </div>
  );
};
