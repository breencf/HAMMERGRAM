import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
import "./LoginForm.css";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const sessionUser = useSelector((state) => state.sessions.user);
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login({ credential, password })).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
      else history.push("/");
    });
  };

  const onSubmitDemo = async (e) => {
    e.preventDefault();
    return dispatch(
      login({ credential: "jimmysuckling", password: "password" })
    );
  };

  return (
    <div className="loginPage">
      {/* <img src="../../../public/logo.png" /> */}
      <h1>Hammergram</h1>
      <form onSubmit={onSubmit}>
        <div>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
        <div>
          <input
            id="credential"
            type="text"
            onChange={(e) => setCredential(e.target.value)}
            value={credential}
            required
            placeholder="Username or email"
          />
        </div>
        <div>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="Password"
          />
        </div>
        {/* <Link to="/signup">
          <h5>Click here to Signup</h5>
        </Link> */}
        <button className="submitButton" onClick={onSubmitDemo}>
          Demo User
        </button>
        <button
          type="submit"
          disabled={password && credential ? false : true}
          className="submitButton"
        >
          Login
        </button>
      </form>
      Don't have an account? <Link to="/signup">Sign Up</Link>
    </div>
  );
};
