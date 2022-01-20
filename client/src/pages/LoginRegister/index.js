import React, { useState, useEffect } from "react";
import { Login, Register, NavBar } from "../../components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetError } from "../../redux/actions/action";
import "./log.css";

function LoginRegister() {
  const [showRegisterForm, setRegisterForm] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const error = useSelector(state => state.auth.error)
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetError())
  }, [])

  useEffect(() => {
    console.log(error)
    setErrorMessage(error)
  }, [error])

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
            <Login error={errorMessage} />
            <button
              id="got-account"
              onClick={() =>
                setRegisterForm((showRegisterForm) => !showRegisterForm)
                dispatch(resetError())
              }
              }
              role="btn"
            >
              Haven't got an account?
            </button>
          </>
        )}
        {showRegisterForm && <Register error={errorMessage} setError={setErrorMessage} />}
      </div>
    </>
  );
}

export default LoginRegister;
