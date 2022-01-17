import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { LoginRegister } from "../../pages";

function NavBar() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="nav-wrap">
        <Link to="/">Home</Link>
        <span>InQUIZitive</span>
        <Link to="/LoginRegister">Login/Register</Link>
        <span>
          <button onClick={() => navigate(-1)}>Go back</button>
        </span>
      </nav>
    </div>
  );
}

{
  /* page = 'Home' ? <Link to="/LoginRegister">Login/Register</Link> :{" "} */
}
export default NavBar;