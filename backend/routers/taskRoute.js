import express from "express";
import { createTaskController, getAllTaskController , deleteTaskController ,updateTaskController} from "../controllers/taskController.js";
import { verifyAuth } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create/task",createTaskController);
router.get("/get/task",getAllTaskController );
router.delete("/delete/task/:id", deleteTaskController);
router.put("/update/task/:id",updateTaskController );
export default router;
