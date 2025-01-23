import { createSlice } from "@reduxjs/toolkit";

export const videoRenderingSlice = createSlice({
  name: "videoRendering",
  initialState: {
    tasks: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTasks } = videoRenderingSlice.actions;

export default videoRenderingSlice.reducer;
