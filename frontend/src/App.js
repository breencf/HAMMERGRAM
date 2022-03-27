import { Route, Switch, Redirect } from "react-router-dom";
import {useState, useEffect} from 'react'
import { LoginForm } from "./components/LoginPage";
import { useDispatch, useSelector } from "react-redux";
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

  const user = useSelector((s) => s.sessions.user)
  console.log(user)

  return (
    isLoaded && (
      <>
      {user &&
      <>
      <NavigatonTop/>
      <Main />
      <NavigationBottom/>
      </>}
      <Switch>
        <Route exact path="/">
         {!user &&  <LoginForm />}
         {user && <Redirect to="/feed"/>}
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
