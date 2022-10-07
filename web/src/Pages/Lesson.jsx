import React from 'react';
import {useSelector} from 'react-redux';
import LessonS from '../Components/LessonS';
import LessonT from '../Components/LessonT';

const Lesson = () => {
    const user = useSelector(store => store.users.newUser);
  return (
    <>
        {
            user && user.isAdmin ? (
                <LessonT />
            ) : (
                <LessonS />
            )
        }
    </>
  )
}

export default Lesson;