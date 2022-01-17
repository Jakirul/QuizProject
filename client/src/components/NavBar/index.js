import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="nav-wrap">
        <Link to="/">Home</Link>
        <Link to="/LoginRegister">Login </Link>
        {/* <span>InQUIZitive</span>
        {navigate() === "./" ? (
          <Link to="/LoginRegister">Login/Register</Link>
        ) : (
          <span>
            <button onClick={() => navigate(-1)}>Go back</button>
          </span>
        )} */}
      </nav>
    </div>
  );
}

export default NavBar;
