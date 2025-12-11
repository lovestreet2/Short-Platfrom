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
    // Set logged-in user
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },

    // Suggested users list
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },

    // Set profile of viewed user
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },

    // Select a user (optional)
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    // Follow/Unfollow user
    followOrUnfollowUser: (state, action) => {
      const { targetUserId, followed } = action.payload;

      // Update suggested users
      state.suggestedUsers = state.suggestedUsers.map((user) => {
        if (user._id === targetUserId) {
          user.followers = followed
            ? [...user.followers, state.user._id]
            : user.followers.filter((id) => id !== state.user._id);
        }
        return user;
      });

      // Update userProfile following if logged-in user profile
      if (state.userProfile?._id === state.user._id) {
        state.userProfile.following = followed
          ? [...state.userProfile.following, targetUserId]
          : state.userProfile.following.filter((id) => id !== targetUserId);
      }
    },

    // ---------- NEW ACTIONS ----------

    // Add a post to the logged-in user's profile
    addPostToProfile: (state, action) => {
      if (state.userProfile) {
        state.userProfile.posts = [action.payload, ...state.userProfile.posts];
      }
    },

    // Update userProfile posts (replace all posts)
    setProfilePosts: (state, action) => {
      if (state.userProfile) {
        state.userProfile.posts = action.payload;
      }
    },

    // Update userProfile bookmarks
    setProfileBookmarks: (state, action) => {
      if (state.userProfile) {
        state.userProfile.bookmarks = action.payload;
      }
    },

    // Update userProfile general info (bio, username, avatar, etc.)
    updateUserProfileInfo: (state, action) => {
      if (state.userProfile) {
        state.userProfile = { ...state.userProfile, ...action.payload };
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
  addPostToProfile,
  setProfilePosts,
  setProfileBookmarks,
  updateUserProfileInfo,
} = authSlice.actions;

export default authSlice.reducer;
