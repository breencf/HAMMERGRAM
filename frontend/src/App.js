import { Route, Switch } from "react-router-dom";
import {useState, useEffect} from 'react'
import { LoginForm } from "./components/LoginPage";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import { SignupForm } from "./components/SignupPage";
import {NavigationBottom} from "./components/Navigation/NavigationBottom"
import { NavigatonTop } from "./components/Navigation/NavigationTop";
import {Main} from "./components/Main"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <>
      <NavigatonTop/>
      <Main />
      <NavigationBottom/>
      <Switch>
        <Route exact path="/">
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SignupForm/>
        </Route>
        <Route>
          <h1>this page doesn't exist!</h1>
        </Route>
      </Switch>
      </>
    )
  );
}

export default App;
