import { createTask , getAllTask,deleteTask,updateTask} from "../models/Task.js";
import { transporter } from "../database/emailTransporter.js";
export const createTaskController = async (req, res) => {
  try {
    const taskData = req.body;
    const managerid = req.user.id;
    const managerName = req.user.name;

    if (!taskData.title || !taskData.assignedTo || !taskData.dueDate) {
      return res.status(400).json({ message: "Title, Assigned To and Due Date are required." });
    }

    // 1️⃣ Save task in DB
    const result = await createTask(taskData, managerid);

    // 2️⃣ Send Email to Employee
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: taskData.assignedEmail, 
      subject: `New Task Assigned: ${taskData.title}`,
      html: `
        <p>Hello,</p>
        <p>You have been assigned a new task: <b>${taskData.title}</b></p>
        <p>Description: ${taskData.description || "No description provided"}</p>
        <p>Priority: ${taskData.priority || "Medium"}</p>
        <p>Due Date: ${taskData.dueDate}</p>
        <p>Assigned By: ${managerName}</p>
        <p>-- Task Flow Manager</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Task created and email sent successfully", taskId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating task or sending email" });
  }
};



/*
export const createTaskController = async (req, res) => {
  try {
    const taskData = req.body;
    const managerid=req.user.id;
  
    if (!taskData.title || !taskData.assignedTo || !taskData.dueDate) {
      return res.status(400).json({ message: "Title, Assigned To and Due Date are required." });
    }

    const result = await createTask(taskData,managerid);
    res.status(201).json({ message: "Task created successfully", taskId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating task" });
  }
};

*/
export const getAllTaskController = async (req, res) => {
  try {
    const managerid = req.user.id; 
    const result = await getAllTask(managerid);
    return res.send(result);
  } catch (err) {
    console.error("Error in getAllTaskController:", err);
    res.status(500).json({ message: "Server error fetching tasks" });
  }
};

export const deleteTaskController = async (req, res) => {
  const { id } = req.params; 
  try {
    const result = await deleteTask(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error deleting task" });
  }
};

export const updateTaskController = async (req, res) => {
  const taskId = req.params.id;
  try {
    const updatedTask = await updateTask(taskId, req.body);
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task" });
  }
};



