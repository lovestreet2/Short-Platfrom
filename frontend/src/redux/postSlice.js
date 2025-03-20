{
  /*import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Example API fetch action
export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const response = await fetch("/api/posts");
  return await response.json();
});

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
  },
  reducers: {
    //actions
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});
export const { setPosts } = postSlice.actions;

export default postSlice.reducer;*/
}

import { createSlice } from "@reduxjs/toolkit";
const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    selectedPost: null,
  },
  reducers: {
    //actions
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
});
export const { setPosts, setSelectedPost } = postSlice.actions;
export default postSlice.reducer;
