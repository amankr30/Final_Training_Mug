import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Like {
    postId: number;
    liked: boolean;
}

const savedLikes = JSON.parse(localStorage.getItem('savedLikes') || '[]');

const initialState: Like[] = savedLikes;

const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        toggleLike(state, action: PayloadAction<number>) {
            const postId = action.payload;
            console.log('Toggling like for post:', postId);
            const existingLike = state.find(like => like.postId === postId);
            if (existingLike) {
                existingLike.liked = !existingLike.liked;
            } else {
                state.push({ postId, liked: true });
            }
            localStorage.setItem('savedLikes', JSON.stringify(state));
        },
        toggleUnlike(state, action: PayloadAction<number>) {
            const postId = action.payload;
            console.log('Toggling unlike for post:', postId);
            const existingLike = state.find(like => like.postId === postId);
            if (existingLike) {
                existingLike.liked = false;
                localStorage.setItem('savedLikes', JSON.stringify(state));
            }
        },
    }
});

export const { toggleLike, toggleUnlike } = likesSlice.actions;

export default likesSlice.reducer;
