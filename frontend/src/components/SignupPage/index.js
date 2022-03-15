import { signup } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";

import "../LoginPage/LoginForm.css";

export const SignupForm = () => {
  const user = useSelector((state) => state.sessions.user);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (user) return <Redirect to="/" />;

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(signup({ email, name, username, password })).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <div className="loginPage">
      <h1>Hammergram</h1>
      <h4>Sign up to see hammers and bottle shots from your friends</h4>
      <form onSubmit={onSubmit}>
        <div>
          <ul className="signupErrors">
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
        <div>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Full Name"
          />
        </div>
        <div>
          <input
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
          />
        </div>
        <div>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </div>
        <div>
          <input
            id="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirm Password"
          />
        </div>
        <button className="submitButton">Sign up</button>
      </form>
      Have an account? <Link to="/login">Log in</Link>
    </div>
  );
};