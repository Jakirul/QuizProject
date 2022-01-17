import React from "react";

function Login() {
  return (
    <form id="login-form">
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
        <label>Password</label>
        <input required type="password" name="password"></input>
      </div>
      <button type="submit" class="btn btn-secondary">
        Login
      </button>
    </form>
  );
}

export default Login;
