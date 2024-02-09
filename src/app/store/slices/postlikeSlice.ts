import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Like {
    postId: number;
    liked: boolean;
}

const savedLikesJSON = localStorage.getItem('postsavedLikes');
const savedLikes: Like[] = savedLikesJSON ? JSON.parse(savedLikesJSON) : [];

// Ensure localStorage is updated if 'postsavedLikes' is not found
if (!savedLikesJSON) {
  localStorage.setItem('postsavedLikes', JSON.stringify(savedLikes));
}

const initialState: Like[] = savedLikes;

const postlikesSlice = createSlice({
    name: 'postlikes',
    initialState,
    reducers: {
        toggleLike(state, action: PayloadAction<number>) {
            const postId = action.payload;
            console.log('Toggling like for post:', postId);
            const existingLikeIndex = state.findIndex(like => like.postId === postId);
            if (existingLikeIndex !== -1) {
                state[existingLikeIndex].liked = !state[existingLikeIndex].liked;
            } else {
                state.push({ postId, liked: true });
            }
            localStorage.setItem('postsavedLikes', JSON.stringify(state));
        },
        toggleUnlike(state, action: PayloadAction<number>) {
            const postId = action.payload;
            console.log('Toggling unlike for post:', postId);
            const existingLikeIndex = state.findIndex(like => like.postId === postId);
            if (existingLikeIndex !== -1) {
                state[existingLikeIndex].liked = false;
                localStorage.setItem('postsavedLikes', JSON.stringify(state));
            }
        },
    }
});

export const { toggleLike, toggleUnlike } = postlikesSlice.actions;

export default postlikesSlice.reducer;
