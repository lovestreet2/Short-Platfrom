import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    suggestedUsers: [],
    userProfile: null,
    selectedUser: null,
  },
  reducers: {
    // actions
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    followOrUnfollowUser: (state, action) => {
      const { targetUserId, followed } = action.payload;

      // Update suggested users list
      const updatedSuggestedUsers = state.suggestedUsers.map((user) => {
        if (user._id === targetUserId) {
          user.followers = followed
            ? [...user.followers, state.user._id] // Add logged-in user to followers list
            : user.followers.filter((id) => id !== state.user._id); // Remove logged-in user from followers list
        }
        return user;
      });

      state.suggestedUsers = updatedSuggestedUsers;

      // Update user profile (only if the target user is the logged-in user)
      if (state.userProfile?._id === state.user._id) {
        state.userProfile.following = followed
          ? [...state.userProfile.following, targetUserId] // Add to following list
          : state.userProfile.following.filter((id) => id !== targetUserId); // Remove from following list
      }
    },
  },
});
export const {
  setAuthUser,
  setSuggestedUsers,
  setUserProfile,
  setSelectedUser,
  followOrUnfollowUser,
} = authSlice.actions;
export default authSlice.reducer;
