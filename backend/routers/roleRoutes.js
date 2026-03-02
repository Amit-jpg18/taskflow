import express from "express";
import { fetchDepartmentsRoles ,addDepartment} from "../controllers/roleController.js";

const router = express.Router();
router.get("/api/departments-roles", fetchDepartmentsRoles);
router.post("/api/departments", addDepartment);

export default router;
