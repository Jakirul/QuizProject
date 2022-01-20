import React, { useState, useEffect } from "react";
import { Login, Register, NavBar } from "../../components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./log.css";
function LoginRegister() {
  const [showRegisterForm, setRegisterForm] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]);

  return (
    <>
      <NavBar />
      <div className="login-register" role="login-register">
        {!showRegisterForm && (
          <>
            <Login />
            <button
              id="got-account"
              onClick={() =>
                setRegisterForm((showRegisterForm) => !showRegisterForm)
              }
              role="btn"
            >
              Haven't got an account?
            </button>
          </>
        )}
        {showRegisterForm && <Register />}
      </div>
    </>
  );
}

export default LoginRegister;
