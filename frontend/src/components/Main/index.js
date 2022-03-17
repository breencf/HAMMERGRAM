import { Feed } from "../Feed";
import { Route, Switch } from "react-router-dom";
import { PostPage } from "../SinglePost";
import { SimpleCreateForm } from "../Navigation/SimpleCreateForm";
import { UserProfile } from "../UserProfile";
import { CommentPage } from "../CommentPage";
export const Main = () => {
  return (
    <>
      <div id="main">
        <Switch>
          <Route exact path="/">
            <Feed />
          </Route>
          <Route exact path="/posts/:id">
            <PostPage />
          </Route>
          <Route exact path ="/create">
            <SimpleCreateForm />
          </Route>
          <Route exact path="/users/:id">
            <UserProfile/>
          </Route>
          <Route exact path ="/posts/:id/comments">
            <CommentPage/>
          </Route>
        </Switch>
      </div>
    </>
  );
};
