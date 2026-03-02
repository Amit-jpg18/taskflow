import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./EmployeeNavbar";

function EmployeeLayout() {
  return (
    <div>
      {/* Navbar always visible at top */}
      <Navbar />

      {/* Page content below navbar */}
      <div style={{ paddingTop: "70px" }}> {/* adjust height to navbar */}
        <Outlet /> {/* child routes render here */}
      </div>
    </div>
  );
}

export default EmployeeLayout;
