import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CourseCard from './CourseCard';
import {createCourseAsync} from "../Context/courses"
import { updateUserAsync } from '../Context/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Teacher = () => {
    const user = useSelector(store => store.users.newUser);
    const [createCard, setCreateCard] = useState(false);
    const dispatch = useDispatch();
    const [inpValue, setInpValue] = useState('');

    const newCourseHandler = () => {
        if(inpValue) {
            dispatch(createCourseAsync({
                name: inpValue,
                teacher: user.name
            })).then(() => {
                const updatedUser = JSON.parse(JSON.stringify(user));
                updatedUser.courses.push({
                    name: inpValue,
                    teacher: user.name
                })
                console.log('Updated User ', updatedUser)
                dispatch(updateUserAsync(user._id, updatedUser))
                .then(() => {
                    setCreateCard(false);
                })
            })
        }
    }
    const leaveHandler = (e) => {
        if(e.target.classList.contains('dark') ) {
            setCreateCard(false)
        }
    }
    return (
        <div className='home'>
            {
            createCard ? (
                <div>
                    <div className="dark" onClick={(e) => leaveHandler(e)}>
                        <div className="create-card">
                            <button 
                                onClick={(e) => setCreateCard(false)} 
                                className='close-btn unfilled'><FontAwesomeIcon icon={faXmark}/>
                            </button>
                            <h1>Create a Course !</h1>
                            <input 
                                type="text" 
                                className='inp' 
                                placeholder='Name of the course'
                                value={inpValue}
                                onChange={(e) => setInpValue(e.target.value)}    
                            />
                            <button onClick={newCourseHandler} className='button clicked'>Create</button>
                        </div>
                    </div>
                </div>
            ) : (<></>)
            }
            <h1 className='title'>Hello {user && user.name} ! </h1>
            <div className="section">
                <button className={`button clicked ${createCard ? 'unfilled' : ''}`}>Your courses</button>
                <button 
                    className={`button clicked ${!createCard ? 'unfilled' : ''}`} 
                    onClick={() => setCreateCard(true)}>Create new course
                </button> 
            </div>
            <div className="courses signed">
            {
                user.courses.map(course => {
                    return (
                        <CourseCard name={course.name} key={course._id}/>
                    )
                })
            }
            </div>
            
        </div>
    )
}

export default Teacher;