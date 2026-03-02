// redux/managerSlice.js

import { createSlice } from "@reduxjs/toolkit";
import {
  getManagerDetails,
  updateManager,
  logoutManager,
} from "../action/managerActions";

const managerSlice = createSlice({
  name: "manager",
  initialState: {
    manager: null,
    loading: false,
    error: null,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET DETAILS
      .addCase(getManagerDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getManagerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.manager = action.payload;
      })
      .addCase(getManagerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateManager.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateManager.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(updateManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logoutManager.fulfilled, (state) => {
        state.manager = null;
      });
  },
});

export default managerSlice.reducer;