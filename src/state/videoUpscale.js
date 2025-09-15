import { createSlice } from "@reduxjs/toolkit";

export const videoUpscaleSlice = createSlice({
  name: "videoUpscale",
  initialState: {
    tasks: [],
    workers: [],
    averageRenderTime: 0,
    totalFramesRendered: 0,
    loading: true,
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setTasks,
  addWorker,
  setAverageRenderTime,
  setTotalFramesRendered,
  setLoading,
} = videoUpscaleSlice.actions;

export default videoUpscaleSlice.reducer;
