import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import ManagerLayout from "./Manager/ManagerLayout";
import Dashboard from "./Manager/Dashboard";
import EmployeeForm from "./Employee/EmployeeForm.";
import AddDepartment from "./Employee/AddDepatment";
import  Update from "./Manager/Upate";
import  CreateTask from "./tasks/CreateTask"
import EmployeeDashboard from "./Employee/EmployeeDashboard";
import EmployeeLayout from "./Employee/EmployeeLayout";
import EmployeeUpdate from "./Employee/EmployeeUpdate";
import EmployeeList from "./Employee/EmployeeList";
function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signuppage" element={<Signup />} />
        <Route path="/loginpage" element={<Login />} />
        <Route path="/manager" element={<ManagerLayout />}>
          <Route path="/manager/dashboard" element={<Dashboard />} />
           <Route path="employee/register" element={<EmployeeForm />} />
              <Route path="employee/list" element={<EmployeeList />} />
              <Route path="/manager/department" element={<AddDepartment/>} />
              <Route path="/manager/update" element={<Update/>} />
                 <Route path="task/create" element={<CreateTask/>} />
              </Route> 
          <Route path ="employee" element={<EmployeeLayout/>}>
            <Route path="/employee/dashboard" element={<EmployeeDashboard/>}></Route>
                   <Route path="/employee/profile" element={<EmployeeUpdate/>}></Route>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
