import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogList: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogList: (state, { payload }) => {
      state.blogList = payload;
    },
  },
});
export const { setBlogList } = blogSlice.actions;
export default blogSlice.reducer;
