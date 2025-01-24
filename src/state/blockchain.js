import { createSlice } from "@reduxjs/toolkit";

export const blockchainSlice = createSlice({
  name: "blockchain",
  initialState: {
    address: "",
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setAddress } = blockchainSlice.actions;

export default blockchainSlice.reducer;
