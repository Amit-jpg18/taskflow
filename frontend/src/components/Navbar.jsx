import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navyBlue = "#002366";
  const goldAccent = "#FFD700";

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark shadow-lg fixed-top" 
      style={{ backgroundColor: navyBlue, borderBottom: `3px solid ${goldAccent}` }}
    >
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <div style={{ backgroundColor: goldAccent, color: navyBlue, padding: "2px 10px", borderRadius: "5px", marginRight: "10px" }}>
            CP
          </div>
          <span style={{ letterSpacing: "1px" }}>COMPANY<span style={{ color: goldAccent }}>PORTAL</span></span>
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-lg-3 my-2 my-lg-0">
              <Link 
                className="btn fw-bold px-4" 
                to="/loginpage"
                style={{ 
                  color: goldAccent, 
                  border: `2px solid ${goldAccent}`,
                  borderRadius: "20px",
                  transition: "0.3s"
                }}
                onMouseOver={(e) => { e.target.style.backgroundColor = goldAccent; e.target.style.color = navyBlue; }}
                onMouseOut={(e) => { e.target.style.backgroundColor = "transparent"; e.target.style.color = goldAccent; }}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="btn fw-bold px-4" 
                to="/signuppage"
                style={{ 
                  backgroundColor: goldAccent, 
                  color: navyBlue, 
                  borderRadius: "20px",
                  border: `2px solid ${goldAccent}`
                }}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;