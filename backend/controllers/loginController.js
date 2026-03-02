import { loginEmployee } from "../models/Employee.js";
import { loginManager } from "../models/Manager.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Securitykey = "1234";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

 
    const employee = await loginEmployee(email);
    const manager = await loginManager(email);

    let employeeMatch = false;
    let managerMatch = false;

    
    if (employee) {
      employeeMatch = await bcrypt.compare(password, employee.password);
    }

    if (manager) {
      managerMatch = await bcrypt.compare(password, manager.password);
    }

   
    if (employeeMatch && managerMatch) {
      return res.status(400).json({
        message: "Duplicate account conflict. Contact admin."
      });
    }

    let user = null;
    let role = null;

  
    if (employeeMatch) {
      user = employee;
      role = "employee";
    } else if (managerMatch) {
      user = manager;
      role = "manager";
    } else {
      return res.status(401).json({
        message: "Invalid Email or Password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: role,
        email: user.email,
        name: user.name
      },
      Securitykey,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        role: role
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};