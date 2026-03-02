import { createSlice } from "@reduxjs/toolkit";
import {
  fetchEmployeeTasks,
  updateEmployeeTaskStatus,
  fetchManagerById,
} from "../action/employeeTaskActions";

const initialState = {
  tasks: [],
  managers: {},
  loading: false,
  updatingId: null,
  error: null,
};

const employeeTaskSlice = createSlice({
  name: "employeeTasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔹 Fetch Tasks
      .addCase(fetchEmployeeTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchEmployeeTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Update Status
      .addCase(updateEmployeeTaskStatus.pending, (state, action) => {
        state.updatingId = action.meta.arg.taskId;
      })
      .addCase(updateEmployeeTaskStatus.fulfilled, (state, action) => {
        state.updatingId = null;
        const { taskId, status } = action.payload;

        state.tasks = state.tasks.map((task) =>
          task.id === taskId ? { ...task, status } : task
        );
      })
      .addCase(updateEmployeeTaskStatus.rejected, (state) => {
        state.updatingId = null;
      })

      // 🔹 Fetch Manager
      .addCase(fetchManagerById.fulfilled, (state, action) => {
        const { managerId, data } = action.payload;
        state.managers[managerId] = data;
      })
      .addCase(fetchManagerById.rejected, (state, action) => {
        const { managerId } = action.payload;
        state.managers[managerId] = {
          full_name: "Unknown",
          email: "-",
        };
      });
  },
});

export default employeeTaskSlice.reducer;