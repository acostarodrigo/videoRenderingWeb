import { createSlice } from "@reduxjs/toolkit";

export const videoRenderingSlice = createSlice({
  name: "videoRendering",
  initialState: {
    tasks: [],
    workers: [],
    averageRenderTime: 0,
    totalFramesRendered: 0,
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addWorker: (state, action) => {
      if (!state.workers.find((val) => val.address == action.payload.address)) {
        state.workers.push(action.payload);
      }
    },
    setAverageRenderTime: (state, action) => {
      state.averageRenderTime = action.payload;
    },
    setTotalFramesRendered: (state, action) => {
      state.totalFramesRendered = action.payload;
    },
  },
});

export const {
  setTasks,
  addWorker,
  setAverageRenderTime,
  setTotalFramesRendered,
} = videoRenderingSlice.actions;

export default videoRenderingSlice.reducer;
