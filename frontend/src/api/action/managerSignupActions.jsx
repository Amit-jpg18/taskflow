import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const managerSignup = createAsyncThunk(
  "manager/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/manager/signup",
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