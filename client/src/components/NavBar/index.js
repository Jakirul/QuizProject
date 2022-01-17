import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";
import HomeIcon from "@mui/icons-material/Home";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ExtensionIcon from "@mui/icons-material/Extension";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <nav className="nav-wrap">
        <div className="Home-wrap">
          <Link to="/">
            <HomeIcon /> <div className="home-icon">Home </div>
          </Link>
        </div>
        <span>
          <ExtensionIcon />
          inQUIZitive
          <ExtensionIcon />
        </span>
        <div className="account">
          {location.pathname === "/" ? (
            <Link to="/LoginRegister">
              <AccountCircleIcon />
              <div className="log-reg">Login / Register</div>
            </Link>
          ) : (
            <span>
              <button onClick={() => navigate(-1)}>
                <NavigateBeforeIcon />
              </button>
            </span>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
