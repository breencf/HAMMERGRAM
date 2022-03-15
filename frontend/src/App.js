import {Route, Switch} from 'react-router-dom'
import {LoginForm} from './components/LoginPage'
function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginForm />
      </Route>
    </Switch>
  );
}

export default App;
