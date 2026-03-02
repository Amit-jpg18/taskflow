// redux/taskSlice.js

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTasks,
  deleteTask,
  updateTask,
  createTask
} from "../action/taskActions";

const taskReducer = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload
        );
      })
           .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })

      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      // UPDATE
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id
            ? action.payload
            : task
        );
      });
  },
});
export const { clearTaskMessage } = taskReducer.actions;
export default taskReducer.reducer;