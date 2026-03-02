import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const managerSignup = createAsyncThunk(
  "manager/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://taskflow-q7zy.onrender.com/manager/signup",
        formData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Manager Signup Failed!"
      );
    }
  }
);