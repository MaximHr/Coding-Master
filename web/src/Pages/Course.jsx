import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import MainT from '../Components/MainT';
import MainS from '../Components/MainS';
import {getLessonByCourseAsync} from '../Context/lessons';
import { useEffect } from 'react';

const Course = () => {
    const user = useSelector(store => store.users.newUser);
    const course = useSelector(store => store.courses.byName);
    const dispatch = useDispatch();

    useEffect(() => {
        if(course) {
            dispatch(getLessonByCourseAsync(course.name));
        }
    }, [course && course.name]);
    return (
        <div>
            <h1 className='title'>{course && course.name}</h1>
            {
                user.isAdmin ? <MainT /> : <MainS />
            }
        </div>
    )
}

export default Course;