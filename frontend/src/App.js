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
      <hr/>
      <Main />
      <hr/>
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
      </Switch>
      </>
    )
  );
}

export default App;
