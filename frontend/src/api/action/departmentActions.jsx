import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 1️⃣ Get Departments + Roles
export const fetchDepartmentsRoles = createAsyncThunk(
  "department/fetchDepartmentsRoles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://taskflow-q7zy.onrender.com/api/departments-roles"
      );
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch departments");
    }
  }
);

// 2️⃣ Add Department
export const addDepartment = createAsyncThunk(
  "department/addDepartment",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://taskflow-q7zy.onrender.com/api/departments",
        data
      );
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to add department");
    }
  }
);