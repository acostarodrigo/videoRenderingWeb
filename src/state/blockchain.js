import { createSlice } from "@reduxjs/toolkit";

export const blockchainSlice = createSlice({
  name: "blockchain",
  initialState: {
    wallet: "",
    network: "",
    antes: [],
  },
  reducers: {
    setConnection: (state, action) => {
      state.wallet = action.payload.wallet;
      state.network = action.payload.network;
    },
    addAnte: (state, action) => {
      state.antes = [...state.antes, action.payload].sort(sortByTimestamp);
    },
    updateAnte: (state, action) => {
      state.antes = [
        ...state.antes.filter(
          (val) => val.anteHash !== action.payload.anteHash
        ),
        action.payload,
      ].sort(sortByTimestamp);
    },
  },
});

const sortByTimestamp = (a, b) => {
  if (a.creationTimestamp > b.creationTimestamp) return -1;
  if (a.creationTimestamp < b.creationTimestamp) return 1;
  return 0;
};

export const { setConnection, addAnte, updateAnte } = blockchainSlice.actions;

export default blockchainSlice.reducer;
