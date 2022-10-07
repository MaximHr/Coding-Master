import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
    name:'others',

    initialState: {
        clicked: 0
    },
    reducers: {
        setClicked: (state, action) => {
            state.clicked = action.payload
        }
    }
})


export const {setClicked} = courseSlice.actions
export default courseSlice.reducer;