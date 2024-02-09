import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./slices/postsSlice";
import likesSlice from "./slices/likeSlice";
import textpostSlice from "./slices/textpostSlice";
import postlikesSlice from "./slices/postlikeSlice";
export const store = configureStore({
    reducer: {
        posts: postsSlice,
        likes: likesSlice,
        texts:textpostSlice,
        postlikes:postlikesSlice,


    }
})