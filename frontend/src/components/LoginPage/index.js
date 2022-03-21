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
      if (data && data.errors) {
        setErrors(data.errors);
      } else history.push("/");
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
      <img
        className="login-logo"
        src="https://hammergram.s3.amazonaws.com/icons/hammergram-logo.png"
      />
      <form onSubmit={onSubmit}>
        <div>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
        <div>
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
        </div>
        {/* <Link to="/signup">
          <h5>Click here to Signup</h5>
        </Link> */}
        <div>
          <button className="submitButton" onClick={onSubmitDemo}>
            Demo User
          </button>
          <br />
          <button
            type="submit"
            disabled={password && credential ? false : true}
            className="submitButton"
          >
            Log in
          </button>
        </div>
      </form>
      <p>
        Don't have an account?{" "}
        <Link className="lb" to="/signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
};
