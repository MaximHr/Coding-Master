import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const HomeworkSlice = createSlice({
    name: 'homework',
    initialState: {
        byId: undefined,
        byUser: [],
        byLesson: [],
        hasHomework: undefined, // push in there and maybe it can be object with both people with and without homework
        hasHomeworkUser: undefined,
        getScore: []
    },
    reducers: {
        getById: (state, action) => {
            state.byId = action.payload;
        },
        getByUserId: (state, action) => {
            state.byUser = action.payload;
        },
        getByLesson: (state, action) => {
            state.byLesson = action.payload;
        },
        clearHasHomework: (state) => {
            state.hasHomework = [];
        },
        hasHomeworkUser: (state, action) => {
            state.hasHomeworkUser = action.payload;
        },
        calculateScore: (state, action) => {
            state.getScore.push(action.payload);
        },
        clearScore: (state) => {
            state.getScore = [];
        }
    }
});

export const calculateScoreAsync = (userId, courseName) => async(dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/homeworks/calculateScore/${userId}/${courseName}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(calculateScore(response.data))

    }catch(err) {
        throw err;
    }
}

export const getHomeworkByIdAsync = (id) => async(dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/homeworks/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getById(response.data))

    }catch(err) {
        throw err;
    }
}
export const getHomeworkByUserIdAsync = (id) => async(dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/homeworks/user/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getByUserId(response.data))

    }catch(err) {
        throw err;
    }
}
export const getHomeworkByLessonIdAsync = (id) => async(dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/homeworks/lesson/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getByLesson(response.data))

    }catch(err) {
        throw err;
    }
}
export const getHasHomeworkAsync = (lessonId, userId) => async(dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/homeworks/hasHomework/${lessonId}/${userId}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(hasHomeworkUser(response.data));

    }catch(err) {
        throw err;
    }
}

export const updateSeenAsync = (id, seenValue) => async(dispatch) => {
    try {
        const response = await axios.put(`http://localhost:3001/api/homeworks/seen/${id}`, seenValue , {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getById(response.data))

    }catch(err) {
        throw err;
    }
}
export const updateMarkedAsync = (id, data) => async(dispatch) => {
    try {
        const response = await axios.put(`http://localhost:3001/api/homeworks/marked/${id}`, data , {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getById(response.data))

    }catch(err) {
        throw err;
    }
}

export const postHomeworkAsync = (data) => async(dispatch) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/homeworks/`, data , {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getById(response.data))

    }catch(err) {
        throw err;
    }
}

export const deleteHomeworkAsync = (id) => async(dispatch) => {
    try {
        const response = await axios.delete(`http://localhost:3001/api/homeworks/${id}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        dispatch(getById(response.data))

    }catch(err) {
        throw err;
    }
}


export const {getById, getByUserId, getByLesson, hasHomeworkUser, clearHasHomework, calculateScore, clearScore} = HomeworkSlice.actions;
export default HomeworkSlice.reducer;