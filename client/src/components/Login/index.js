import React from "react";
import { requestLogin } from "../../redux/actions/action";
import { useDispatch } from "react-redux";
import "./Login.css";

function Login({ error }) {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    dispatch(
      requestLogin({
        username: form.username.value,
        password: form.password.value,
      })
    );
  };
  return (
    <form id="login-form" role="login" onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          className="login-input"
          required
          type="text"
          name="username"
          aria-describedby="emailHelp"
          className="login-input"
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          required
          type="password"
          name="password"
          className="login-input"
        ></input>
      </div>
      {error && <p className="error">{error}</p>}
      <input type="submit" />
    </form>
  );
}

export default Login;
