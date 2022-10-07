import React, {useEffect, useRef} from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LessonCard from './LessonCard';
import {getUsersByCourseAsync} from '../Context/users';
import {createLessonAsync} from '../Context/lessons';
import { CKEditor } from 'ckeditor4-react';
import {calculateScoreAsync, clearScore} from '../Context/homeworks';

const MainT = () => {
  const lessons = useSelector((store) => store.lessons.byCourse);
  const course = useSelector(store => store.courses.byName);
  const partcipants = useSelector(store => store.users.byCourse);
  const [section, setSection] = useState(0);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [info, setInfo] = useState('<h1>About</h1>');
  const [homework, setHomework] = useState('<h1>Homework</h1>');
  const getScore = useSelector(store => store.homeworks.getScore)

  const addLesson = () => {
    dispatch(createLessonAsync({
      title: title, 
      date: date, 
      whichCourse: course.name, 
      information: info, 
      homework: homework
    })).then(() => {
      setSection(0);
      setTitle('');
      setDate('');
    })
    // add new lesson
  }
  useEffect(() => {
    if(course) {
      dispatch(getUsersByCourseAsync(course.name));
    }
  }, [course && course.name]);

  useEffect(() => {
    if(section === 1 && course.name && partcipants) {
      dispatch(clearScore())
      for(let i = 0; i < partcipants.length;i++) { 
          dispatch(calculateScoreAsync(partcipants[i]._id, encodeURIComponent( course.name)));
      }
    }
  }, [section]);


  return (
    <div className='main'>
      <div className="container">
        <button 
          style={{backgroundColor: '#4c2ee2', borderColor: '#4c2ee2'}}
          className={`button ${section === 0 ? 'clicked' : 'unfilled'}`}
          onClick={() => setSection(0)}
        >Your Lessons 
        </button>
        <button 
          style={{backgroundColor: '#4c2ee2', borderColor: '#4c2ee2'}}
          className={`button ${section === 1 ? 'clicked' : 'unfilled'}`}
          onClick={() => setSection(1)}
        >Partcipants
        </button>
        <button 
          style={{backgroundColor: '#4c2ee2', borderColor: '#4c2ee2'}}
          className={`button ${section === 2 ? 'clicked' : 'unfilled'}`}
          onClick={() => setSection(2)}
        >Add a lesson
        </button>
      </div>
      {
        section === 0 ? (
          <div className="lessons">
          <h1 className='count'>{lessons.length} Lessons :</h1>
          <div className='courses signed'>
              {
                lessons.slice(0).reverse().map((lesson) => {
                  return( 
                    <LessonCard 
                      key={lesson._id} 
                      id={lesson._id}
                      title={lesson.title}
                      date={lesson.date}
                    />
                  )
                })
              }
              {
                lessons.length === 0 ? <h1 style={{marginTop: '3rem'}}>No Lessons Yet</h1> : <></>
              }
            
            </div>
          </div>
        ) : section === 1 ? (
          <div className='participants'>
            <h1 className='count'>{partcipants.length} Participants :</h1>
            {
              partcipants.map((user, index) => {
                if(user.isAdmin) {
                    return(
                      <div className='particpantCard' key={user._id}>
                        <div>
                          <h1>{user.name}</h1>
                          <p>Teacher</p>
                        </div>
                        <img 
                          className='avatar' 
                          src={`https://avatars.dicebear.com/api/bottts/${user.name}.svg`} 
                          alt="Avatar"
                        />
                      </div>
                    )
                } else {
                  return (
                    <div className='particpantCard' key={user._id}>
                      <div>
                        <h1>{user.name}</h1>
                        <p>Student</p>
                        <p>Score: {getScore.filter(f => f.id == user._id)[0]?.score}</p>
                      </div>
                      <img 
                        className='avatar' 
                        src={`https://avatars.dicebear.com/api/bottts/${user.name}.svg`} 
                        alt="Avatar"
                      />
                    </div>
                  )
                }
              })
            }
          </div>
        ) : (
          <div className="addLesson" style={{marginTop: '1rem'}}>
            <h1 className='title'>Add a lesson !</h1>
            <div className="form">
              <div className="section" style={{paddingLeft: 0, marginBottom: '2rem'}}>
                <input 
                  style={{width: '350px'}}
                  type="text" 
                  className='inp' 
                  placeholder='Title'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <input 
                  style={{width: '350px'}}
                  type="text" 
                  className='inp' 
                  placeholder='date (optional)'
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
             
              <CKEditor
                onChange={ ( { editor } ) => {
                  setInfo(editor.getData())
                } }
                initData={<h1>About</h1>}
              />
              <CKEditor
                onChange={ ( { editor } ) => {
                  setHomework(editor.getData())
                } }
                initData={<h1>Homework</h1>}
              />
              <button className='button clicked' onClick={addLesson}>Add Lesson!</button>
            </div>
          </div>
        )
      }
    
    </div>
  )
}

export default MainT;