import {configureStore} from '@reduxjs/toolkit';
import userReducer from './users';
import courseReducer from './courses';
import lessonReducer from './lessons';
import homeReducer from './homeworks';
import otherReducer from './other';

export const store = configureStore({
    reducer: {
        users: userReducer,
        courses: courseReducer,
        lessons: lessonReducer,
        homeworks: homeReducer,
        others: otherReducer
    }
})
