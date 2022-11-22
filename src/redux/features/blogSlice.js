import {createSlice} from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: "blogs",
    initialState: {
        blogList : []
    },
    reducers: {
        setBlogList: (state, actions) => {
            state.blogList = actions.payload;
        },

    },
});
export const {setBlogList} = blogSlice.actions;
export default blogSlice.reducer;