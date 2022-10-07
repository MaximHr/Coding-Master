import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const lessonsSlice = createSlice({
    name:"lessons",
    initialState: {
        all: [],
        byCourse: [],
        byId: undefined
    },
    reducers: {
        getAll: (state, action) => {
            state.all = action.payload;
        },
        getByCourse: (state, action) => {
            state.byCourse = action.payload;
        },
        getById: (state, action) => {
            state.byId = action.payload;
        },
        getNewLesson: (state, action) => {
            state.byCourse.push(action.payload)
            state.all.push(action.payload)
        }
    }
})

export const getAllLessonsAsync = (data) => async(dispatch) => {
    try {
        const response = await axios.get('http://localhost:3001/api/lessons/', {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getAll(response.data))

    }catch(err) {
        throw err;
    }
}
export const getLessonByCourseAsync = (name) => async(dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/lessons/course/${encodeURIComponent(name)}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getByCourse(response.data))

    }catch(err) {
        throw err;
    }
}
export const getLessonByIdAsync = (id) => async(dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/lessons/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getById(response.data))

    }catch(err) {
        throw err;
    }
}
export const createLessonAsync = (data) => async(dispatch) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/lessons/`, data, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getNewLesson(response.data));
    }catch(err) {
        throw err;
    }
}
export const updateLessonAsync = (id, data) => async(dispatch) => {
    try {
        const response = await axios.put(`http://localhost:3001/api/lessons/${id}`, data, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getById(response.data));
    }catch(err) {
        throw err;
    }
}

export const {getAll, getByCourse, getById, getNewLesson} = lessonsSlice.actions;
export default lessonsSlice.reducer;