import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import Button from '../login/Button';

const Logout = () => {

const navigate = useNavigate();
const {setIsLoggedin} = useUserStore();

  return (
    <Button onClick={(e) => {
        localStorage.removeItem('token');
        setIsLoggedin(false);
        navigate('/signin')}
    } label={"Log Out"}/>
  )
}

export default Logout
