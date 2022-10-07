import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Components/Navbar';
//pages
import Start from './Pages/Start';
import Home from './Pages/Home';
import Lesson from './Pages/Lesson';
import Course from './Pages/Course';
import Homework from './Pages/Homework';

const App = () => {
  const user = useSelector(store => store.users.newUser);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Start/>}/>
        <Route exact path='/home' element={user ? <Home/> : <Start />}/>
        <Route path='/home/courses/:id' element={user ? <Course/> : <Start />}/>
        <Route path='/lessons/:id' element={user ? <Lesson/> : <Start />}/>
        <Route path='/homeworks/:id' element={user && user.isAdmin ? <Homework/> : <Start />}/>
      </Routes>
    </>
  )
}

export default App;