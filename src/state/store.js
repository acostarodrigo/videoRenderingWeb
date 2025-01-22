import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui";
import blockchainReducer from "./blockchain";

export default configureStore({
  reducer: {
    ui: uiReducer,
    blockchain: blockchainReducer,
  },
});
