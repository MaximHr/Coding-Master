import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const userSlice = createSlice({
    name:'user',
    initialState: {
        all: [],
        byTeacher: [],
        byCourse: [],
        byId: undefined,
        newUser: undefined,
        updatedUser: undefined
    },
    reducers: {
        getAllUsers: (state, action) => {
            state.all = action.payload;
        },
        getByTeacher: (state, action) => {
            state.byTeacher = action.payload;
        },
        getByCourse: (state, action) => {
            state.byCourse = action.payload;
        },
        getById: (state, action) => {
            state.byId = action.payload;
        },
        createUser: (state, action) => {
            state.newUser = action.payload;
        },
        updateUser: (state, action) => {
            state.newUser = action.payload;
        }
    }
});

export const getAllUsersAsync = (data) => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:3001/api/users/', {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getAllUsers(response.data))

    }catch(err) {
        throw err;
    }
}
export const getUsersByTeacherAsync = (teacher) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/users/teacher/${teacher}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getByTeacher(response.data))

    }catch(err) {
        throw err;
    }
}
export const getUsersByCourseAsync = (course) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/users/course/${encodeURIComponent(course)}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getByCourse(response.data))

    }catch(err) {
        throw err;
    }
}
export const getUserByIdAsync = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/users/id/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getById(response.data))

    }catch(err) {
        throw err;
    }
}
export const logInUserAsync = (name, pass) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/users/login/${name}/${pass}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(updateUser(response.data))

    }catch(err) {
        throw err;
    }
}

export const createUserAsync = (data) => async (dispatch) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/users/`, data, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(createUser(response.data))

    }catch(err) {
        throw err;
    }
}
export const updateUserAsync = (id, data) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:3001/api/users/${id}`, data, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(updateUser(response.data))

    }catch(err) {
        throw err;
    }
}

export const {getAllUsers, getByTeacher, getByCourse, getById, createUser, updateUser} = userSlice.actions;
export default userSlice.reducer;

