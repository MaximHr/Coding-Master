import React, {useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CourseCard from './CourseCard';
import { updateUserAsync } from '../Context/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Teacher = () => {
    const user = useSelector(store => store.users.newUser);
    const [createCard, setCreateCard] = useState(false);
    const dispatch = useDispatch();
    const courses = useSelector(store => store.courses.all);
    const checkBoxForm = useRef();

    const showCardHandler = () => {
        setCreateCard(true);
        setTimeout(() => {    
            for(let i = 0;i < checkBoxForm.current.children.length;i++) {
                for(let j = 0;j < user.courses.length;j++) {
                    if(checkBoxForm.current.children[i].children[0].value == user.courses[j].name) {
                        checkBoxForm.current.children[i].children[0].checked = true;
                    }
                }
            }
        }, 200)
    }

    const newCourseHandler = () => {
        let newUserCourses = []
        for(let i = 0;i < checkBoxForm.current.children.length;i++) {
          for(let j = 0;j < courses.length;j++) {
              if(checkBoxForm.current.children[i].children[0].checked && checkBoxForm.current.children[i].children[0].value == courses[j].name) {
                newUserCourses.push(courses[j]);
              }
          }
        }
        
        dispatch(updateUserAsync(user._id, {
            courses: newUserCourses
        }))
        console.log(newUserCourses);
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
                            <h1>Join or leave a course !</h1>
                            <button 
                                onClick={(e) => setCreateCard(false)} 
                                className='close-btn unfilled'><FontAwesomeIcon icon={faXmark}/>
                            </button>
                            <div className='signedCheckBox' ref={checkBoxForm}>
                            {
                                courses.map(course => {
                                    return (
                                    <div key={course._id} className='form-group'>
                                        <input 
                                            type="checkbox" 
                                            value={course.name}
                                        />
                                        <label htmlFor={course.name}>{course.name}</label>
                                    </div>
                                    )
                                })
                            }
                            </div>
                            
                            <button onClick={newCourseHandler} className='button clicked'>Join</button>
                        </div>
                    </div>
                </div>
            ) : (<></>)
            }
            <h1 className='title'>Hello {user.name} ! </h1>
            <div className="section">
                <button className={`button clicked ${createCard ? 'unfilled' : ''}`}>Your courses</button>
                <button className={`button clicked ${!createCard ? 'unfilled' : ''}`} onClick={showCardHandler}>Join new courses</button>
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