import React from 'react'
import {getByNameAsync} from '../Context/courses';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const CourseCard = ({name, id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clickedHandler = () => {
        dispatch(getByNameAsync(name))
        .then(() => {
            navigate(`/home/courses/${name}`);
        })
    }
    return (
        <div className='overview' >
            <h1>{name}</h1>
            <button className='button clicked' onClick={clickedHandler}>Go <FontAwesomeIcon icon={faArrowRight}/></button>
        </div>
    )
}

export default CourseCard;