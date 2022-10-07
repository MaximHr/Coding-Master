import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getLessonByIdAsync} from '../Context/lessons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const LessonCard = ({id, title, date}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clickedHandler = () => {
        dispatch(getLessonByIdAsync(id))
        .then(() => {
            navigate(`/lessons/${id}`)
        })
    }

    return (
        <div className='overview' title={date}>
            <h1>{title}</h1>
            <button className='button clicked' onClick={clickedHandler}>Go <FontAwesomeIcon icon={faArrowRight}/></button>
        </div>
    )
}

export default LessonCard;