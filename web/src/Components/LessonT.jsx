import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import parse from 'html-react-parser';
import { CKEditor } from 'ckeditor4-react';
import { useNavigate } from 'react-router-dom';
import {updateLessonAsync} from '../Context/lessons';
import {getHomeworkByLessonIdAsync} from '../Context/homeworks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const LessonT = () => {
    const lesson = useSelector(store => store.lessons.byId);
    const [section, setSection] = useState(0);
    const [title, setTitle] = useState(lesson && lesson.title);
    const [date, setDate] = useState(lesson && lesson.date);
    const [info, setInfo] = useState(lesson && lesson.information);
    const [homework, setHomework] = useState(lesson && lesson.homework);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hasHomework = useSelector(store => store.homeworks.byLesson);

    const goToSubmission = (id) => {
        navigate(`/homeworks/${id}`)
    }
    const updateLesson = () => {
        // console.log(title, date, info, homework)
        dispatch(updateLessonAsync(lesson._id, {
            title,
            date,
            information: info,
            homework
        })).then(() => {
            setSection(0);
        })
    };

    useEffect(() => {
        dispatch(getHomeworkByLessonIdAsync(lesson?._id))
    }, []);

    return (
        <div>
            {lesson ? (
                <div className='lessonPage'>
                    <h1 className='title'>{lesson.title}</h1>
                    <div className="section">
                        <button 
                            onClick={() => setSection(0)}
                            className={`button ${section === 0 ? 'clicked' : 'unfilled'}`}>About</button>
                        <button 
                            onClick={() => setSection(1)} 
                            className={`button ${section === 1 ? 'clicked' : 'unfilled'}`}>HomeWork
                        </button>
                        <button 
                            onClick={() => setSection(2)} 
                            className={`button ${section === 2 ? 'clicked' : 'unfilled'}`}>Update
                        </button>
                        <button 
                            onClick={() => setSection(3)} 
                            className={`button ${section === 3 ? 'clicked' : 'unfilled'}`}>Submissions
                        </button>
                    </div>
                    {
                    section === 0 ? (
                        <div className='container'>
                            {parse(lesson.information)}
                        </div>

                    ) : section === 1 ? (
                        <div className='container'>
                            {parse(lesson.homework)}
                        </div>

                    ) : section === 2 ? (
                        <div className="addLesson">
                            <h1 className='title'>Update the lesson !</h1>
                            <div className="form">
                            <div className="section" style={{paddingLeft: 0, marginBottom: '2rem'}}>
                                <input 
                                    defaultValue={lesson.title}
                                    type="text" 
                                    className='inp' 
                                    style={{width: '350px'}}
                                    placeholder='Title'
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                                <input 
                                    type="text" 
                                    className='inp' 
                                    style={{width: '350px'}}
                                    placeholder='date'
                                    defaultValue={lesson.date}
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                />
                                </div>
                                <CKEditor
                                    onChange={ ( { editor } ) => {
                                        setInfo(editor.getData())
                                    } }
                                    initData={lesson.information}
                                />
                                <CKEditor
                                    onChange={ ( { editor } ) => {
                                        setHomework(editor.getData())
                                    } }
                                    initData={lesson.homework}
                                />
                                <button onClick={updateLesson} className='button clicked'>Update !</button>
                            </div>
                        </div>
                    ) : (
                        <div className="submissions">
                            <h1>Submissions: </h1>
                            {
                                hasHomework?.homeworks.map((homework, index) => {
                                    return (
                                        <div 
                                            className='particpantCard submission-card' 
                                            key={homework.userId} 
                                        >
                                            <div>   
                                                <h1>{hasHomework.users[index].name}</h1>
                                                <p className="status">{homework.isMarked ? 'Marked' : "Not marked"}</p>
                                            </div>
                                            <button className='button unfilled' 
                                            onClick={() => goToSubmission(homework._id)}>Go <FontAwesomeIcon icon={faArrowRight}/></button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                    }
                </div>
            ) : (<h1>Loading...</h1>)}
        </div>
    )
}

export default LessonT;