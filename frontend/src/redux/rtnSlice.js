import { createSlice } from "@reduxjs/toolkit";

const rtnSlice = createSlice({
  name: "realTimeNotification",
  initialState: {
    likeNotification: [], // array of notifications
  },
  reducers: {
    // Add new like/dislike notification
    setLikeNotification: (state, action) => {
      const payload = action.payload;

      if (payload.type === "like") {
        // Ensure no duplicate
        if (!state.likeNotification.some((n) => n.id === payload.id)) {
          state.likeNotification.unshift({ ...payload, read: false });
        }
      } else if (payload.type === "dislike") {
        state.likeNotification = state.likeNotification.filter(
          (item) => item.userId !== payload.userId
        );
      }
    },

    // Mark a notification as read
    markAsRead: (state, action) => {
      const id = action.payload;
      const notif = state.likeNotification.find((n) => n.id === id);
      if (notif) notif.read = true;
    },

    // Clear all notifications
    clearNotifications: (state) => {
      state.likeNotification = [];
    },
  },
});

export const { setLikeNotification, markAsRead, clearNotifications } =
  rtnSlice.actions;

export default rtnSlice.reducer;
