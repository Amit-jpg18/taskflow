// redux/taskActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000";

export const createTask = createAsyncThunk(
  "task/create",
  async (taskData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API}/create/task`,
        taskData
      );

      return data; // backend se jo aaye
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Task creation failed"
      );
    }
  }
);
// 🔥 FETCH TASKS
export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/get/task`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Fetch failed"
      );
    }
  }
);


// 🔥 DELETE TASK
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/delete/task/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error) {
      return rejectWithValue("Delete failed");
    }
  }
);


// 🔥 UPDATE TASK
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API}/update/task/${id}`,
        formData,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue("Update failed");
    }
  }
);
