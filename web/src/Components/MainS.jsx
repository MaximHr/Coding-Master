import React, {useEffect} from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LessonCard from './LessonCard';
import {getUsersByCourseAsync} from '../Context/users';
import {calculateScoreAsync} from '../Context/homeworks';

const MainS = () => {
  const lessons = useSelector((store) => store.lessons.byCourse);
  const course = useSelector(store => store.courses.byName);
  const partcipants = useSelector(store => store.users.byCourse);
  const [section, setSection] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if(course) {
      dispatch(getUsersByCourseAsync(course.name));
    }
  }, [course && course.name]);
  return (
    <div className='main'>
      <div className="section">
        <button 
          className={`button ${section === 0 ? 'clicked' : 'unfilled'}`}
          onClick={() => setSection(0)}
        >Your Lessons 
        </button>
        <button 
          className={`button ${section === 1 ? 'clicked' : 'unfilled'}`}
          onClick={() => setSection(1)}
        >Partcipants
        </button>
      </div>
      {
        section === 0 ? (
          <div className="lessons">
          <h1 className='count'>{lessons.length} Lessons :</h1>
          <div className="courses signed" >
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
        ) : (
          <div className='participants'>
            <h1 className='count'>{partcipants.length} Participants :</h1>
            {
              partcipants.map(user => {
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
        )
      }
    </div>
  )
}

export default MainS;