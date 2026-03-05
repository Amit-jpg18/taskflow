import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = " http://localhost:5000";

// 🔹 Fetch All Employees
export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/list`, {
        withCredentials: true,
      });
      return res.data.result || res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch employees"
      );
    }
  }
);

// 🔹 Add Employee
export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/register`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add employee"
      );
    }
  }
);

// 🔹 Update Employee
export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API}/update/${id}`,
        data,
        { withCredentials: true }
      );
      return res.data.employee;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update employee"
      );
    }
  }
);

// 🔹 Delete Employee
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/delete/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete employee"
      );
    }
  }
);

// 🔹 Update Profile
export const updateProfile = createAsyncThunk(
  "employee/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API}/profile`,
        data,
        { withCredentials: true }
      );
      return res.data.employee;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Profile update failed"
      );
    }
  }
);


export const getProfile = createAsyncThunk(
  "employee/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/employee/profile",
        { withCredentials: true }
      );
      return res.data.employee;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);