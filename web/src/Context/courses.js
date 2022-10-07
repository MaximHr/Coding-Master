import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const courseSlice = createSlice({
    name:'course',

    initialState: {
        all: [],
        byId: undefined,
        byName: undefined,
        deletedCourse: undefined,
        updatedCourse: undefined,
        newCourse: undefined
    },
    reducers: {
        getAllCourses: (state, action) => {
            state.all = action.payload;
        },
        getById: (state, action) => {
            state.byId = action.payload;
        },
        getByName: (state, action) => {
            state.byName = action.payload;
        },
        getDeletedCourse: (state, action) => {
            state.deletedCourse = action.payload;
        },
        getUpdatedCourse: (state, action) => {
            state.updatedCourse = action.payload;
        },
        getNewCourse: (state, action) => {
            state.newCourse = action.payload;
        },
    }
})

export const getAllCoursesAsync = (data) => async(dispatch) => {
    try {
        const response = await axios.get('http://localhost:3001/api/courses/', {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getAllCourses(response.data));

    }catch(err) {
        throw err;
    }
}

export const getByIdAsync = (id) => async(dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/courses/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getById(response.data));
    }catch(err) {
        throw err;
    }
}

export const getByNameAsync = (name) => async(dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/courses/name/${encodeURIComponent(name)}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getByName(response.data));
    }catch(err) {
        throw err;
    }
}

export const deleteCourseAsync = (id) => async(dispatch) => {
    try {
        const response = await axios.delete(`http://localhost:3001/api/courses/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getDeletedCourse(response.data));
    }catch(err) {
        throw err;
    }
}

export const addNewParticipantAsync = (name) => async(dispatch) => {
    try {
        const response = await axios.put(`http://localhost:3001/api/courses/addParticipant/${encodeURIComponent(name)}` , {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getUpdatedCourse(response.data));
    }catch(err) {
        throw err;
    }
}
export const updateCourseAsync = (id, data) => async(dispatch) => {
    try {
        const response = await axios.put(`http://localhost:3001/api/courses/${id}`, data, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getUpdatedCourse(response.data));
    }catch(err) {
        throw err;
    }
}

export const createCourseAsync = (data) => async(dispatch) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/courses/`, data, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getNewCourse(response.data));
    }catch(err) {
        throw err;
    }
}

export const {getAllCourses, getById, getByName, getDeletedCourse, getUpdatedCourse, getNewCourse} = courseSlice.actions
export default courseSlice.reducer;