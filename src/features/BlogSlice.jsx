import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { blogListListener } from "../helpers/firebase";

const initialState = {
  blogList: [],
};

// export const getPosts = createAsyncThunk(
//   "getPosts",
//   async (thunkAPI, { rejectWithValue }) => {
//     try {
//       console.log("getPosts çalıştı");
//       console.log(blogListListener());
//       return blogListListener();
//     } catch (error) {
//       return rejectWithValue("Something went wrong");
//     }
//   }
// );

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogList: (state, { payload }) => {
      state.blogList = payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(getPosts.pending, (state) => {
  //         state.loading = true;
  //       })
  //       .addCase(getPosts.fulfilled, (state, { payload }) => {
  //         console.log("payload : ", payload);
  //         state.blogList = payload;
  //         state.loading = false;
  //       })
  //       .addCase(getPosts.rejected, (state, { payload }) => {
  //         state.loading = false;
  //         state.error = payload;
  //       });
  //   },
});
export const { setBlogList } = blogSlice.actions;
export default blogSlice.reducer;
