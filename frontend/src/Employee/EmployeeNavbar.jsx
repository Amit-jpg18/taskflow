import React from "react";
import { Link, useNavigate, useLocation, replace } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import axios from "axios";

const EmployeeNavbar = ({ employeeName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/manager/logout",
        {},
        { withCredentials: true }
      );

      navigate("/loginpage" ,{replace:true}); 
    
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // ✅ Active link styling
  const getLinkStyle = (path) => ({
    color: location.pathname === path ? "#FFD700" : "#ffffff",
    fontWeight: location.pathname === path ? "bold" : "normal",
    backgroundColor:
      location.pathname === path
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    borderRadius: "8px",
    padding: "8px 15px",
    transition: "0.3s",
    textDecoration: "none",
  });

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      fixed="top"
      className="shadow-lg border-0"
      style={{
        backgroundColor: "#002366",
        borderBottom: "3px solid #FFD700",
        zIndex: 1100,
      }}
    >
      <Container>
        {/* 🔹 Brand */}
        <Navbar.Brand
          as={Link}
          to="/employee/dashboard"
          className="d-flex align-items-center fw-bold fs-4"
        >
          <div
            style={{
              backgroundColor: "#FFD700",
              color: "#002366",
              padding: "2px 10px",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          >
            EP
          </div>
          <span style={{ letterSpacing: "1px", color: "#fff" }}>
            EMPLOYEE<span style={{ color: "#FFD700" }}>PORTAL</span>
          </span>
        </Navbar.Brand>

        {/* 🔹 Toggle */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* 🔹 Links */}
            <Nav.Link
              as={Link}
              to="/employee/dashboard"
              style={getLinkStyle("/employee/dashboard")}
            >
              Home
            </Nav.Link>

            {/* 🔹 Profile Dropdown (Logout always visible) */}
            <NavDropdown
              title={
                <span
                  className="px-3 py-1 rounded-pill shadow-sm"
                  style={{
                    backgroundColor: "#FFD700",
                    color: "#002366",
                    fontWeight: "600",
                  }}
                >
                  {employeeName || "Account"}
                </span>
              }
              id="employee-nav-dropdown"
              className="ms-lg-3 mt-2 mt-lg-0"
            >
              <NavDropdown.Item as={Link} to="/employee/profile">
                My Profile
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item
                onClick={handleLogout}
                className="text-danger fw-bold"
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default EmployeeNavbar;
