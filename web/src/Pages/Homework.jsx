import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import CodeCard from '../Components/CodeCard';
import {useLocation} from 'react-router-dom';
import { getHomeworkByIdAsync, updateMarkedAsync } from '../Context/homeworks';

const Homework = () => {
  const homework = useSelector(store => store.homeworks.byId);
  const location = useLocation();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);

  const markHandler = () => {
    dispatch(updateMarkedAsync(homework._id, {message, score}))
    .then(() => {
      document.querySelector("body").scrollTo({top: 0,left:0, behavior: 'smooth'})
    })
  }

  useEffect(() => {
    const id = location.pathname.replace('/homeworks/', '');
    dispatch(getHomeworkByIdAsync(id));

  }, []);

  return (
    <div className='homework-page'>
      <h1 className='title underline'>Homework </h1>
      {
        homework ? (
          <div className='lesson-submission'>
            <div className="status-info">
              <p 
                className='status' 
                style={!homework.isMarked ? {color :'red'} : {color: 'green'}}
              >
                {!homework.isMarked ? "Status: not marked" : "Status: marked"}
              </p>
              {
                homework.isMarked ? (
                  <>
                    <p className='status'>Score: {homework.score}</p>
                  </>
                ) : (
                  <></>
                )
              }
            </div>
            <h2 style={homework.message ? {marginTop: '1.5rem', marginBottom: '0.5rem'} : {display: 'none'}}>Feedback:</h2>
            <p className='status-message'>{homework.message ? `${homework.message}` : ''}</p>
              
            {   
              homework.files.map((file, index) => {
                  return( 
                      <CodeCard key={index} file={file}/>
                  )
              })
            }

          </div>
        ) : (<p>Loading</p>)
      }     
      <h1 className="title underline">Your feedback </h1> 
      <div className="feedback">
        <input 
            type="text" 
            className='inp' 
            placeholder='add a message' 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input 
            type="number" 
            placeholder='score'
            className='inp'
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
          <button className='button clicked' onClick={markHandler}> Send feedback ! </button>
      </div>
     
    </div>
  )
}

export default Homework;