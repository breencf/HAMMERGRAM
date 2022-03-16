import { Feed } from "../Feed";
import { Route, Switch } from "react-router-dom";
import { PostPage } from "../SinglePost";
export const Main = () => {
  return (
    <>
      <div id="main">
        <Switch>
          <Route exact path="/">
            <Feed />
          </Route>
          <Route path="/posts/:id">
            <h1>hello</h1>
            {/* <PostPage /> */}
          </Route>
        </Switch>
      </div>
    </>
  );
};
