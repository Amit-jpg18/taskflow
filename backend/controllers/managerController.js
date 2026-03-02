
import * as Manager from "../models/Manager.js"
import { loginEmployee } from "../models/Employee.js";
import bcrypt from "bcryptjs";
import db from "../database/db.js"
import jwt from "jsonwebtoken"
import path from "path";
var securitykey=1234;
export const registerManager = async (req, res) => {
  try {
    const { name, email, teamName, phoneNumber, password } = req.body;
    const [rows] = await db.query('SELECT id FROM Managers WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "Email already exists, use another email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePicture = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const userId = await Manager.registerManager({
      name,
      email,
      teamName,
      phoneNumber,
      password: hashedPassword,
      profilePicture,
    });

    res.status(201).json({
      message: "Manager registered successfully",
      userId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


export const  logoutManager=(req,res)=>{
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // true in production
    path: "/",
  });

  return res.status(200).json({
    message: "Logout successful",
  });
}


export const detailsManager = async (req, res) => {
  try {
    
    var managerId=req.user.id

    if (!managerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const manager = await Manager.getManagerDetailsById(managerId);

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    if (manager.profilePicture) {
      manager.profilePicture = "/uploads/" + path.basename(manager.profilePicture);
    }

    res.status(200).json({
      success: true,
      manager
    });
  } catch (error) {
    console.error("Controller error (detailsManager):", error);
    res.status(500).json({ message: "Server error" });
  }
};

 


export const updateManagerController = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      teamName: req.body.teamName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };

  
    if (req.body.password && req.body.password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      data.password = hashedPassword;
    }

    if (req.file) {
      data.profilePicture = req.file.filename;
    }


    await Manager.updateManager(req.user.id, data);

    res.json({ message: "Manager details updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed!" });
  }
};

export const getManagerDetails = async (req, res) => {
  try {
    const managerId = req.params.id;
    const manager = await Manager.getManagerDetailsById(managerId);

    if (!manager) return res.status(404).json({ message: "Manager not found" });

    res.json({ manager });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};