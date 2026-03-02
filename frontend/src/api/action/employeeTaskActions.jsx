import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://taskflow-q7zy.onrender.com";

// 🔹 1. Fetch Employee Tasks
export const fetchEmployeeTasks = createAsyncThunk(
  "employeeTasks/fetchEmployeeTasks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/employee/task`, {
        withCredentials: true,
      });
      return res.data.task || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch tasks"
      );
    }
  }
);

// 🔹 2. Update Task Status
export const updateEmployeeTaskStatus = createAsyncThunk(
  "employeeTasks/updateEmployeeTaskStatus",
  async ({ taskId, status }, { rejectWithValue }) => {
    try {
      await axios.put(
        `${BASE_URL}/employee/task/update-status/${taskId}`,
        { status },
        { withCredentials: true }
      );
      return { taskId, status };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update status"
      );
    }
  }
);

// 🔹 3. Fetch Manager By ID
export const fetchManagerById = createAsyncThunk(
  "employeeTasks/fetchManagerById",
  async (managerId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/manager/${managerId}`,
        { withCredentials: true }
      );
      return { managerId, data: res.data.manager };
    } catch (err) {
      return rejectWithValue({
        managerId,
        message: "Manager fetch failed",
      });
    }
  }
);