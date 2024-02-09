import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
    id: number;
    title: string;
    body: string;
}

// Load saved posts from local storage or initialize with an empty array
const savedTexts = JSON.parse(localStorage.getItem('savedTexts') || '[]');

const initialState: Post[] = savedTexts;

const textpostSlice = createSlice({
    name: 'texts',
    initialState,
    reducers: {
        addPost(state, action: PayloadAction<Post>) {
            console.log("Adding post:", action.payload);
            state.push(action.payload);
            // Update local storage with the updated posts array
            localStorage.setItem('savedTexts', JSON.stringify(state));
        },
        deletePost(state, action: PayloadAction<number>) {
            console.log("Deleting post with ID:", action.payload);
            const postIdToDelete = action.payload;
            const updatedPosts = state.filter(post => post.id !== postIdToDelete);
            // Update local storage with the updated posts array
            localStorage.setItem('savedTexts', JSON.stringify(updatedPosts));
            // Return the new state
            return updatedPosts;
        }
        
        // Define other reducers as needed
    }
});

export const { addPost , deletePost } = textpostSlice.actions;

export default textpostSlice.reducer;
