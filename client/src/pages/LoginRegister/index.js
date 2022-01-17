import React, { useState } from "react";
import { Login } from "../../components";

function LoginRegister() {
  const [showRegisterForm, setRegisterForm] = useState(false);
  return (
    <div class="login-register">
      <Login />
      <button onClick={displayRegister}>Haven't got an account?</button>
    </div>
  );
}

export default LoginRegister;