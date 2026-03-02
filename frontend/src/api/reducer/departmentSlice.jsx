import { createSlice } from "@reduxjs/toolkit";
import { fetchDepartmentsRoles, addDepartment } from "../action/departmentActions";

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    departmentsData: {},
    loading: false,
    error: null,
    message: null, // ✅ unified message field
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔹 Fetch Departments + Roles
      .addCase(fetchDepartmentsRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDepartmentsRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentsData = action.payload;
      })
      .addCase(fetchDepartmentsRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Add Department
      .addCase(addDepartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDepartment.fulfilled, (state) => {
        state.loading = false;
        state.message = "Department added successfully!";
      })
      .addCase(addDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = departmentSlice.actions;
export default departmentSlice.reducer;