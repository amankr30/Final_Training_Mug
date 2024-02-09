import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
    id: number;
    title: string;
    url: string;
}

// Load saved posts from local storage or initialize with an empty array
const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');

const initialState: Post[] = savedPosts;

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost(state, action: PayloadAction<Post>) {
            state.push(action.payload);
            // Update local storage with the updated posts array
            localStorage.setItem('savedPosts', JSON.stringify(state));
        },
        deletePost(state, action: PayloadAction<number>) {
            const postIdToDelete = action.payload;
            const updatedPosts = state.filter(post => post.id !== postIdToDelete);
            // Update local storage with the updated posts array
            localStorage.setItem('savedPosts', JSON.stringify(updatedPosts));
            return updatedPosts;
        },
        // Define other reducers as needed
    }
});

export const { addPost , deletePost } = postsSlice.actions;

export default postsSlice.reducer;