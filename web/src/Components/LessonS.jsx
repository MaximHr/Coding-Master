import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import parse from 'html-react-parser';
import CodeEditor from './CodeEditor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postHomeworkAsync, getHasHomeworkAsync, deleteHomeworkAsync } from '../Context/homeworks';
import CodeCard from './CodeCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const LessonS = () => {
    const lesson = useSelector(store => store.lessons.byId);
    const user = useSelector(store => store.users.newUser);
    const [createCard, setCreateCard] = useState(false);
    const hasHomeworkUser = useSelector(store => store.homeworks.hasHomeworkUser);
    const dispatch = useDispatch();
    const [section, setSection] = useState(0);
    const [files, setFiles] = useState([{
        language: 'HTML',
        text: '<h1>Paste your code here</h1>'
    }]);

    const deleteHandler = () => {
        dispatch(deleteHomeworkAsync(hasHomeworkUser?.homework._id))
        .then(() => {  
            dispatch(getHasHomeworkAsync(lesson._id, user._id));
            setSection(0);
            setCreateCard(false);
            toast('Homework deleted !', {
                position: 'top-center',
                type: 'success',
                autoClose: 2000
            });
        })
    }
    useEffect(() => {
        if(lesson && user) {
            dispatch(getHasHomeworkAsync(lesson._id, user._id));
        }
    }, []);
    useEffect(() => {
        console.log(hasHomeworkUser)
    }, [hasHomeworkUser]);
    
    const leaveHandler = (e) => {
        if(e.target.classList.contains('dark') ) {
            setCreateCard(false)
        }
    }
    const submitHandler = () => {
        dispatch(postHomeworkAsync({
            userId: user._id,
            lessonId: lesson._id,
            files: files
        })).then(() => {
            dispatch(getHasHomeworkAsync(lesson._id, user._id));
            setFiles([{
                language: 'HTML',
                text: '<h1>Paste your code here</h1>'
            }])
            setSection(0)
            toast('Homework added !', {
                position: 'top-center',
                type: 'success',
                autoClose: 2000
            });
        })
    };

    return (
        <div>
            <ToastContainer />
            
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
                            className={`button ${section === 2 ? 'clicked' : 'unfilled'}`}
                        >{hasHomeworkUser?.hasHomework ? "Your submission" : "Submit"}
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
                            <button 
                              onClick={() => setSection(2)} 
                              style={{margin: '2rem 0'}}
                              className='button clicked'
                            >{hasHomeworkUser?.hasHomework ? "Your submission" : "Submit"}
                            </button>
                        </div>

                    ) : (
                        
                    !hasHomeworkUser?.hasHomework ? (
                        <div className="submitSection">
                            {   
                                files.map((file, index) => {
                                    return( 
                                        <CodeEditor
                                            files={files} 
                                            setFiles={setFiles} 
                                            index={index} 
                                            key={index}
                                        />
                                    )
                                })
                            }
                            <button 
                                className='button clicked'
                                onClick={() => setFiles([...files, {
                                    language: 'HTML',
                                    text: '<h1>Paste your code here</h1>'
                                }])}
                                style={{display: 'block', marginBottom: '2rem'}}
                            >Add new file</button>

                            <button onClick={submitHandler} className='button clicked' style={{marginBottom: '3rem', fontSize: '20px'}}>Submit</button>
                        </div>
                    ) : (
                        <div className='lesson-submission'>
                             <div className="status-info">
                                <p 
                                    className='status' 
                                    style={!hasHomeworkUser?.homework.isMarked ? {color :'red'} : {color: 'green'}}
                                >
                                    {!hasHomeworkUser?.homework.isMarked ? "Status: not marked" : "Status: marked"}
                                </p>
                                {
                                    hasHomeworkUser?.homework.isMarked ? (
                                    <>
                                        <p className='status'>Score: {hasHomeworkUser?.homework.score}</p>
                                    </>
                                    ) : (
                                    <></>
                                    )
                                }
                            </div>
                            <h2 style={hasHomeworkUser?.homework.message ? {marginTop: '1.5rem', marginBottom: '0.5rem'} : {display: 'none'}}>Feedback:</h2>
                            <p className='status-message'>{hasHomeworkUser?.homework.message ? `${hasHomeworkUser?.homework.message}` : ''}</p>
                            {   
                                hasHomeworkUser.homework.files.map((file, index) => {
                                    return( 
                                       <CodeCard key={index} file={file}/>
                                    )
                                })
                            }
                            {
                            createCard ? (
                                <div>
                                    <div className="dark" onClick={(e) => leaveHandler(e)}>
                                        <div className="create-card" style={{backgroundColor: 'white'}}>
                                            <h1>Are you sure ?</h1>
                                            <button 
                                                onClick={(e) => setCreateCard(false)} 
                                                className='close-btn unfilled delete-card' 
                                            ><FontAwesomeIcon icon={faXmark}/>
                                            </button>
                                            <div className='flex'>
                                                <button 
                                                    className='button btn-delete' 
                                                    onClick={deleteHandler}>Yes
                                                </button>
                                                <button 
                                                    className='button btn-no' 
                                                    onClick={()=> setCreateCard(false)}>No
                                                </button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            ) : (<></>)
                            }
                            <button className='button btn-delete' onClick={()=> setCreateCard(true)}>Delete This Homework</button>
                        </div>
                    )
                        
                   
                    )
                    }
                </div>
            ) : (<h1>Loading...</h1>)}
        </div>
    )
}

export default LessonS;