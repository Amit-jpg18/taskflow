import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getManagerDetails, logoutManager } from "../api/action/managerActions";

function AppNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { manager } = useSelector(
    (state) => state.managerState
  );

  // 🔥 Fetch Manager from Redux
  useEffect(() => {
    dispatch(getManagerDetails());
  }, [dispatch]);

  // 🔥 Logout
  const handleLogout = () => {
    dispatch(logoutManager());
    navigate("/loginpage");
  };

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
  });
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      className="shadow-lg py-2 fixed-top border-0 m-0"
      style={{ backgroundColor: "#002366", borderBottom: "3px solid #FFD700", zIndex: 1100 }}
    >
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/manager/dashboard" className="d-flex align-items-center fw-bold fs-4">
          <div style={{ backgroundColor: "#FFD700", color: "#002366", padding: "2px 10px", borderRadius: "5px", marginRight: "10px" }}>
            CP
          </div>
          <span style={{ letterSpacing: "1px", color: "#fff" }}>
            COMPANY<span style={{ color: "#FFD700" }}>PORTAL</span>
          </span>
        </Navbar.Brand>

        {/* Hamburger */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0 shadow-none" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* Main Links */}
            <Nav.Link as={Link} to="/manager/dashboard" style={getLinkStyle("/manager/dashboard")}>
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/manager/employee/register" style={getLinkStyle("/manager/employee/register")}>
              Registration
            </Nav.Link>
            <Nav.Link as={Link} to="/manager/department" style={getLinkStyle("/manager/department")}>
              Departments
            </Nav.Link>

               <Nav.Link as={Link} to="task/create" style={getLinkStyle("task/create")}>
             Task
            </Nav.Link>  

            {/* Manager Dropdown */}
            {manager && (
              <NavDropdown
                title={
                  <span className="px-3 py-1 rounded-pill shadow-sm" style={{ backgroundColor: "#FFD700", color: "#002366", fontWeight: "600" }}>
                    {manager.name}
                  </span>
                }
                id="manager-nav-dropdown"
                className="ms-lg-3 mt-2 mt-lg-0"
              >
                {/* Update Link */}
                <NavDropdown.Item
                  as={Link}
                  to="/manager/update"
                  style={{
                    fontWeight: location.pathname === "/manager/update" ? "bold" : "normal",
                    color: location.pathname === "/manager/update" ? "#002366" : "#000",
                  }}
                >
                  Update
                </NavDropdown.Item>

                     <NavDropdown.Item
                  as={Link}
                  to="employee/list"
                  style={{
                    fontWeight: location.pathname === "employee/list" ? "bold" : "normal",
                    color: location.pathname === "/employee/list" ? "#002366" : "#000",
                  }}
                >
                  Employee
                </NavDropdown.Item>
                <NavDropdown.Divider />

                {/* Logout */}
                <NavDropdown.Item onClick={handleLogout} className="text-danger fw-bold">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
