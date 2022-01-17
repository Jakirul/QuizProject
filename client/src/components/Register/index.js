import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestLogin, logout } from "../../redux/actions/action.js";

function Register() {
  const dispatch = useDispatch();

  const register = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      const userData = {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value,
      };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      };
      const r = await fetch(`http://localhost:3001/register`, options);
      const data = await r.json();
      if (data.err) {
        throw Error(data.err);
      }
      dispatch(requestLogin(userData));
    } catch (err) {
      console.warn(err);
      dispatch(logout());
    }
  };
  return (
    <form id="register-form" onSubmit={register}>
      <div>
        <label>Email address</label>
        <input
          required
          type="email"
          name="email"
          aria-describedby="emailHelp"
        ></input>
      </div>
      <div>
        <label>Username</label>
        <input
          required
          type="username"
          name="username"
          aria-describedby="usernameHelp"
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          required
          id="password"
          type="password"
          name="password"
          aria-describedby="passwordHelp"
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          required
          id="confirm-password"
          type="password"
          name="confirm-password"
          aria-describedby="confirmPasswordHelp"
        ></input>
      </div>
      <input type="submit" />
    </form>
  );
}

export default Register;
