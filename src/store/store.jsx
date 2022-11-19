import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice";
import postReducer from "../features/BlogSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});
export default store;
