import React from 'react';
import { useSelector } from 'react-redux';
import Teacher from '../Components/Teacher';
import Student from '../Components/Student';

const Home = () => {
    const user = useSelector(store => store.users.newUser);

    return (
        <>
        {
            user.isAdmin ?  <Teacher /> : <Student />
        }
        </>
    )
}

export default Home;