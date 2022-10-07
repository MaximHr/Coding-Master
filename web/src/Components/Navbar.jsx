import React from 'react';
import logo from '../images/logo.png';
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setClicked } from '../Context/other';

const Navbar = () => {
  const user = useSelector(store => store.users.newUser);
  const clicked = useSelector(store => store.others.clicked);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToHome = () => {
    if(user) {
      navigate('/home')
    }
  }
  const logInHandler = () => {
    dispatch(setClicked(1))
  }
  const signInHandler = () => {
    dispatch(setClicked(2))
  }

  return (
    <div className='navbar'>
        <div className="logo" onClick={goToHome}>
          <img src={logo} alt="Coding Master Logo" />
          <h3>Coding Master</h3>
        </div>
        {
          user ? (
            <img className='avatar' src={`https://avatars.dicebear.com/api/bottts/${user.name}.svg`} alt="Avatar"/>
          ) : (
            <div>
              <button className={(clicked === 2 || clicked === 0) ? `button` : 'button clicked'} onClick={logInHandler}>Log In</button>
              <button className={(clicked === 1 ) ? `button` : 'button clicked'} onClick={signInHandler}>Sign Up</button>
            </div>
          )
        }
    </div>
  )
}

export default Navbar;