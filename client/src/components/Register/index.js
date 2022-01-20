import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestLogin, logout } from "../../redux/actions/action.js";

function Register({setError, error}) {
  const dispatch = useDispatch();
  const register = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.password.value !== form.confirmPassword.value) {
      setError("Please make sure your passwords match");
    } else {
      try {
        const userData = {
          username: form.username.value,
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
        console.log(err);
        if(err.Error === "Username taken"){
          setError("That username is already taken")
        } else  {
          setError("Something went wrong")
        }
        // dispatch(logout());
      }
    }
  };
  return (
    <form id="register-form" role="register" onSubmit={register}>
      <div>
        <label>Username</label>
        <input
          required
          type="username"
          name="username"
          maxLength="15"
          minLength="3"
          aria-describedby="usernameHelp"
          required
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          required
          id="password"
          type="password"
          name="password"
          maxLength="20"
          minLength="4"
          aria-describedby="passwordHelp"
          required
        ></input>
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          required
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          aria-describedby="confirmPasswordHelp"
        ></input>
      </div>
      {error && (
        <p className="error">{error}</p>
      )}
      <input type="submit" id="submitButton" />
    </form>
  );
}

export default Register;
