import { createSlice } from "@reduxjs/toolkit";
import { managerSignup } from "../action/managerSignupActions";

const managerSignupSlice = createSlice({
  name: "managerSignup",
  initialState: {
    loading: false,
    message: "",
    error: null,
  },
  reducers: {
    clearManagerSignupState: (state) => {
      state.loading = false;
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(managerSignup.pending, (state) => {
        state.loading = true;
        state.message = "";
        state.error = null;
      })
      .addCase(managerSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(managerSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearManagerSignupState } = managerSignupSlice.actions;
export default managerSignupSlice.reducer;