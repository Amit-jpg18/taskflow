import express from "express";
import { handleRegister,getAllEmployees,
    updateEmployeeProfile,getAllTask,getEmployeeDetails, 
    taskUpdateByEmployee,fetchManagerEmployees,deleteEmployee,updateEmployee}from "../controllers/employeeController.js";
import { verifyAuth } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/register", verifyAuth ,handleRegister);
router.get("/getallemployee",getAllEmployees);
router.get("/list", verifyAuth ,fetchManagerEmployees);
router.get("/task",verifyAuth ,getAllTask );
router.get("/profile",verifyAuth ,getEmployeeDetails );
router.put("/profile",verifyAuth ,updateEmployeeProfile);
router.put("/task/update-status/:taskId", verifyAuth, taskUpdateByEmployee);
router.delete("/delete/:id",deleteEmployee)
router.put("/update/:id", verifyAuth,updateEmployee);
export default router;