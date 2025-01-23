import { createSlice } from "@reduxjs/toolkit";

export const blockchainSlice = createSlice({
  name: "blockchain",
  initialState: {
    address: "",
    client: undefined,
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setClient: (state, action) => {
      state.client = action.payload;
    },
  },
});

export const { setAddress, setClient } = blockchainSlice.actions;

export default blockchainSlice.reducer;
