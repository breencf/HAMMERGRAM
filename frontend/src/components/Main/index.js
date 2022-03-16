import { Feed } from "../Feed";
import { Route, Switch } from "react-router-dom";
import { PostPage } from "../SinglePost";
import { SimpleCreateForm } from "../Navigation/SimpleCreateForm";
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
        </Switch>
      </div>
    </>
  );
};
