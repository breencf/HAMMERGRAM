import { Feed } from "../Feed";
import { Redirect, Route, Switch } from "react-router-dom";
import { PostPage } from "../SinglePost";
import { SimpleCreateForm } from "../Navigation/SimpleCreateForm";
import { UserProfile } from "../UserProfile";
import { CommentPage } from "../CommentPage";
import { ActivityPage } from "../ActivityPage";
import { SearchResults } from "../SearchPage/SearchResults";
import { UserList } from "../UserList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadPosts } from "../../store/posts";
export const Main = () => {

  const dispatch = useDispatch();
  const posts = useSelector((s) => s.posts.feed);
  const user = useSelector((s) => s.sessions.user);
  console.log(user)
  useEffect(() => {
    dispatch(loadPosts(user.id));
  }, [dispatch, posts?.length]);

  return (
    <>
      <div id="main">
        <Switch>
          <Route exact path="/feed">
            {user && <Feed posts={Object.values(posts)}/>}
            {!user && <Redirect to="/"/>}
          </Route>
          <Route exact path="/posts/:id">
            <PostPage />
          </Route>
          <Route exact path="/create">
            <SimpleCreateForm />
          </Route>
          <Route exact path="/users/:id">
            <UserProfile />
          </Route>
          <Route exact path="/posts/:id/comments">
            <CommentPage />
          </Route>
          <Route exact path="/activity">
            <ActivityPage />
          </Route>
          <Route exact path="/search">
            <SearchResults />
          </Route>
          <Route exact path="/users/:id/followers">
            <UserList/>
          </Route>
          <Route exact path="/users/:id/following">
            <UserList/>
          </Route>
          <Route exact path="/posts/:id/likes">
            <UserList/>
          </Route>
        </Switch>
      </div>
    </>
  );
};
