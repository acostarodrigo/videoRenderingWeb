import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui";
import blockchainReducer from "./blockchain";
import videoRenderingReducer from "./videoRendering";
import audioStemReducer from "./audioStem";

export default configureStore({
  reducer: {
    ui: uiReducer,
    blockchain: blockchainReducer,
    videoRendering: videoRenderingReducer,
    audioStem: audioStemReducer,
  },
});
