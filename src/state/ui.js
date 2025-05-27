import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    snackbar: { show: false, message: "", severity: "success" },
    showBackdrop: false,
    backdropMessage: "",
  },
  reducers: {
    showSnackbar: (state, action) => {
      state.snackbar.message = action.payload.message;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.show = true;
    },
    hideSnackbar: (state) => {
      state.snackbar = { ...state.snackbar, show: false };
    },
    showBackdrop: (state) => {
      state.showBackdrop = true;
    },
    hideBackdrop: (state) => {
      state.showBackdrop = false;
    },
    setBackdropMessage: (state, action) => {
      state.backdropMessage = action.payload;
    },
  },
});

export const {
  showSnackbar,
  hideSnackbar,
  showBackdrop,
  hideBackdrop,
  setBackdropMessage,
} = uiSlice.actions;

export default uiSlice.reducer;
