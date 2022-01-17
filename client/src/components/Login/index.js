import React from "react";
import { requestLogin } from "../../redux/actions/action";
import { useDispatch } from "react-redux";

function Login() {
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
    <form id="login-form" onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          required
          type="text"
          name="username"
          aria-describedby="emailHelp"
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input required type="password" name="password"></input>
      </div>
      <input type="submit" />
    </form>
  );
}

export default Login;
