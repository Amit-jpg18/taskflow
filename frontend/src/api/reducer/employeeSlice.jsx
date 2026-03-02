import { createSlice } from "@reduxjs/toolkit";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  updateProfile,
  getProfile
} from "../action/employeeActions";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔹 FETCH
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 ADD
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state) => {
        state.loading = false;
        state.message = "Employee added successfully!";
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 UPDATE
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.message = "Employee updated successfully!";
        state.employees = state.employees.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        );
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🔹 DELETE
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.message = "Employee deleted successfully!";
        state.employees = state.employees.filter(
          (emp) => emp.id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🔹 PROFILE UPDATE
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.loading = false;
        state.message = "Profile updated successfully!";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
  state.loading = true;
})
.addCase(getProfile.fulfilled, (state, action) => {
  state.loading = false;
  state.profile = action.payload;
})
.addCase(getProfile.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});
 
  },
});

export const { clearEmployeeMessage} = employeeSlice.actions;
export default employeeSlice.reducer;