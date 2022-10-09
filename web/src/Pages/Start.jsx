import React, {useRef} from 'react';
import { useEffect, useState } from 'react';
import { getAllCoursesAsync, addNewParticipantAsync } from '../Context/courses';
import { createUserAsync, logInUserAsync } from '../Context/users';
import { setClicked } from '../Context/other';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import ReactTypingEffect from 'react-typing-effect';
//images

import team from '../images/team.jpeg'
import carousel2 from '../images/carousel2.jpeg';
import carousel3 from '../images/carousel3.jpeg';
import carousel4 from '../images/carousel4.jpeg';
import carousel5 from '../images/carousel5.JPG';
import georgiev from '../images/georgiev.jpg';
import me from '../images/me2.jpeg';
import mina from '../images/mina.jpg';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Start = () => {
  const courseForm = useRef();
  const form1 = useRef();
  const form2 = useRef();
  const form3 = useRef();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(new Array(20));
  const dispatch = useDispatch();
  const clicked = useSelector(store => store.others.clicked);
  const [signInText,setSignInText] = useState('');
  const [signInPass,setSignInPass] = useState('');
  const [logInText,setLogInText] = useState('');
  const [logInPass,setLogInPass] = useState('');
  const courses = useSelector(store => store.courses.all);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorMsg2, setErrorMsg2] = useState('');

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 2000 },
      items: 5
    },
    desktop: {
      breakpoint: { min: 1300, max: 2000 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1300, min: 800 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 800, min: 0 },
      items: 1
    }
  };
  useEffect(() => {
    dispatch(getAllCoursesAsync());
  }, []);

  const checkBoxHandler = (e, index) => {
    const newIsChecked = [...isChecked];
    newIsChecked.splice(index, 1, !isChecked[index]);
    setIsChecked(newIsChecked);
  }
  const registerHandler = () => {
    let newUserCourses = [];
    for(let i = 0;i < courseForm.current.children.length;i++) {
      for(let j = 0;j < courses.length;j++) {
          if(courseForm.current.children[i].children[0].children[0].checked && courseForm.current.children[i].children[0].children[0].value == courses[j].name) {
            newUserCourses.push(courses[j]);
          }
      }
    }
    if(newUserCourses.length > 0) {
      if(signInPass.length > 5) {
        dispatch(createUserAsync({
          courses: newUserCourses, 
          name: signInText, 
          password: signInPass,
          isAdmin: false
        })).then(() => {
          for(let i = 0;i < newUserCourses.length;i++){ 
            dispatch(addNewParticipantAsync(newUserCourses[i].name))
            .then(() => {
              if(i === newUserCourses.length - 1) {
                navigate('/home')
              }
            })
          }

        }).catch(err => {
          setErrorMsg(err.response.data.errors[0].msg)
        })

      } else {
        setErrorMsg('Password is too short')
      }
    } else {
      setErrorMsg('Please Choose A course');
    }
  }
  const closeHandler = (e) => {
    if(e.target.classList.contains('dark')) {
      dispatch(setClicked(0));
      setErrorMsg('');
      setErrorMsg2('');
    }
  }

  const moveRight = () => {
    form1.current.style.transform = 'translateX(-150%)'
    form2.current.style.transform = 'translateX(0%)'
    form3.current.style.transform = 'translateX(150%)'
  }
  const moveLeft = () => {
    form1.current.style.transform = 'translateX(0%)'
    if(form2.current.style.transform === 'translateX(0%)') {
      form2.current.style.transform = 'translateX(150%)'
    } else {
      form2.current.style.transform = 'translateX(150%)'
    }
    form3.current.style.transform = 'translateX(150%)'
  }
  const nextHandler = () => {
    form2.current.style.transform = 'translateX(-150%)'
    form3.current.style.transform = 'translateX(0)'
  }

  useEffect(() => {
    if(clicked === 2) {
      moveRight();
    } else if(clicked === 1) {
      moveLeft();
    }
  }, [clicked]);
  const logInHandler = () => {
    if(logInText && logInPass) {
      dispatch(logInUserAsync(logInText, logInPass))
      .then(() => {

        navigate('/home')
      }).catch(err => {
        setErrorMsg2(err.response.data.errors[0].msg)
      })
    } else {
      setErrorMsg2('Please fill out the fields')
    }
  }


  return (
    <div className='start'>
      
      <div className={clicked === 0 ? "" : "dark"} onClick={(e) => closeHandler(e)}></div>
      <h1>Become a programmer </h1>
      <p className='typeEffect'>Learn  <ReactTypingEffect
        text={["JavaScript", "HTML", "CSS"]}
        startDelay={0}
        typingDelay={1250}
        eraseDelay={1250}
      /></p>
      <a href='#about' className="modern-button">About us</a>
      <div className="about container" id='about'>
        <div>

          <h2>За Клубът</h2>
          <p>Coding master е клуб по програмиране в Първа английска езикова гимназия. В него ученици от всякаква възраст и без предварителни знания могат да научат за ИТ света. </p>
          <p>В края на учебната година, учениците ще могат да разработват модерни уебсайтове и приложения. Те ще получат сертификат подписан от директора на училището, който може да им помогне за кандидатсване в чужбина или за работа. Срещите ще се провеждат всеки вторник от 11:30 до 13:00 в 221-ви кабинет. Очакваме Ви !</p>
        </div>
        <div className="img-container">
          <img src={team} alt="Team" />
        </div>
      </div>
      <div className="teachers container">
        <h2>Нашият екип</h2>
        <div className="teacher-container">
          <div className="img-container hovered">
            <img src={georgiev} alt="G. Georgiev" />
            <div>
              <h3>Георги Георгиев</h3>
              <p>Учител по информационни технологии в Първа Английска Езикова Гиманзия. Създател и ръководител на Coding Master.</p>
            </div>
          </div>
        </div>
        <div className="teacher-container">
          <div className="img-container hovered">
            <img src={me} alt="M. Hristov" />
            <div>
              <h3>Максим Христов</h3>
              <p>Преподавател по Javascript, HTML и CSS. Има пет годишен опит в разработването на уеб приложения и сайтове.</p>
            </div>
          </div>
        </div>
        <div className="teacher-container">
          <div className="img-container hovered">
            <img src={mina} alt="M. Jeleva" />
            <div>
              <h3>Мина Желева</h3>
              <p style={{maxWidth: '100%'}}>Президент на клуба.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="gallery">
        <h1>Галерия</h1>
        <Carousel 
          responsive={responsive} 
          containerClass="carousel"
          autoPlay={true}
          infinite={true}
          itemClass='carousel-item'
        >
              <img src={team} />
              <img src={carousel2} />
              <img src={carousel5} />
              <img src={carousel3} />
              <img src={carousel4} />
        </Carousel>
      </div>
      <div className="footer">
        <p>&copy; Coding Master 2022. All Rights Reserved.</p>
      </div>
      <div 
        className="card" 
        style={clicked === 0 ? {display: 'none'} : {display: 'flex'}}
      >
        <div className="form" ref={form1}>
          <h2>Log In to Coding Master</h2>
          <div className="input-container">
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              className='inp'
              name="username"
              value={logInText}
              onChange={(e) => setLogInText(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              name="password"
              className='inp'
              value={logInPass}
              onChange={(e) => setLogInPass(e.target.value)}
            />
          </div>
          <button className="button clicked" onClick={logInHandler}>Log in</button>
          <p>Don't have an account ? <span onClick={moveRight}>Sign up for free</span></p>
          <p className='error'>{errorMsg2}</p>
        </div>
        <div className="form form2" ref={form2}>
          <h2>Create an account</h2>
          <div className="input-container">
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              className='inp'
              name="username"
              value={signInText}
              onChange={(e) => setSignInText(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              name="password"
              className='inp'
              value={signInPass}
              onChange={(e) => setSignInPass(e.target.value)}
            />
          </div>
          <button className="button clicked" onClick={nextHandler}>Next <FontAwesomeIcon icon={faArrowRight}/></button>
          <p>Already have an account ? <span onClick={moveLeft}>Log In</span></p>
          <p className='error'>{errorMsg}</p>
        </div>
        <div className="form form3" ref={form3}>
          <h2>Enroll a course</h2>
          <form className="courses" ref={courseForm}>
            {
              courses?.map((course, index) => {
                return(
                  <div key={course._id}>
                    <div onClick={(e) => checkBoxHandler(e, index)}>
                     <input 
                        type="checkbox" 
                        name={course.name}
                        value={course.name}
                      />
                    </div>
                    {
                      isChecked[index] ? 
                      <FontAwesomeIcon className='icon' icon={faCheck} /> : <div></div>
                    }   
                    <label>{course.name}</label>
                  </div>
                )
              })
            }
          </form>
          <button className="button clicked" onClick={registerHandler}>Sign up</button>
          <p>Incorrect name or password? <span onClick={moveRight}>Go back</span></p>
          <p className='error'>{errorMsg}</p>
        </div>
      </div>
      
    </div>
  )
}

export default Start;