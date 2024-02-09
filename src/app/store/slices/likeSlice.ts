import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Like {
    postId: number;
    liked: boolean;
}

const loadSavedLikes = (): Like[] => {
    if (typeof window !== 'undefined') {
        const savedLikesJSON = localStorage.getItem('postsavedLikes');
        return savedLikesJSON ? JSON.parse(savedLikesJSON) : [];
    }
    return [];
}

const initialState: Like[] = loadSavedLikes();

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
            if (typeof window !== 'undefined') {
                localStorage.setItem('postsavedLikes', JSON.stringify(state));
            }
        },
        toggleUnlike(state, action: PayloadAction<number>) {
            const postId = action.payload;
            console.log('Toggling unlike for post:', postId);
            const existingLikeIndex = state.findIndex(like => like.postId === postId);
            if (existingLikeIndex !== -1) {
                state[existingLikeIndex].liked = false;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('postsavedLikes', JSON.stringify(state));
                }
            }
        },
    }
});

export const { toggleLike, toggleUnlike } = postlikesSlice.actions;

export default postlikesSlice.reducer;
