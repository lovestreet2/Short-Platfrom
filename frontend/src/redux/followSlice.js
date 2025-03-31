import { createSlice } from "@reduxjs/toolkit";

const followSlice = createSlice({
  name: "follow",
  initialState: {
    following: [],
  },
  reducers: {
    followUser: (state, action) => {
      const userId = action.payload.userId;

      if (!state.following.includes(userId)) {
        state.following.push(userId);
      }
    },
    unfollowUser: (state, action) => {
      const userId = action.payload.userId;

      state.following = state.following.filter((id) => id !== userId);
    },
  },
});

export const { followUser, unfollowUser } = followSlice.actions;

export default followSlice.reducer;
