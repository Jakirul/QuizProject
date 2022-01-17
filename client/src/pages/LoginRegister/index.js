import React, { useState } from "react";
import { Login, Register, NavBar } from "../../components";

function LoginRegister() {
  function displayRegister() {}
  const [showRegisterForm, setRegisterForm] = useState(false);
  return (
    <>
      <NavBar />
      <div className="login-register">
        {!showRegisterForm && <Login />}
        {showRegisterForm && <Register />}
        <button
          onClick={() =>
            setRegisterForm((showRegisterForm) => !showRegisterForm)
          }
        >
          Haven't got an account?
        </button>
      </div>
    </>
  );
}

export default LoginRegister;
