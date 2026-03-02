// redux/managerActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000";

axios.defaults.withCredentials = true;


// 🔥 Get Manager Details
export const getManagerDetails = createAsyncThunk(
  "manager/getDetails",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/manager/details`);
      return data.manager;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unauthorized"
      );
    }
  }
);


// 🔥 Update Manager
export const updateManager = createAsyncThunk(
  "manager/update",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API}/manager/update`,
        formData
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Update Failed"
      );
    }
  }
);


// 🔥 Logout
export const logoutManager = createAsyncThunk(
  "manager/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API}/manager/logout`);
      return true;
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);