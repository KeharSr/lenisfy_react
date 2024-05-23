

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/images/profile.png';
import './Login.css';
import { Toaster, toast } from 'react-hot-toast';
import { loginUserApi } from '../../apis/Api'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validation = () => {
    let isValid = true;

    if (email.trim() === '' || !email.includes('@')) {
      setEmailError('Email is empty or invalid ');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Password is empty ');
      isValid = false;
    }
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault()

    // Validation
    if(!validation()) {
      return;
    }


    // make a json object
    const data = {
      "email": email,
      "password": password
    }

    loginUserApi(data).then((res)=>{
      if(res.data.sucess===false){
        toast.error(res.data.message)
      }
      else{
        toast.success(res.data.message)

        //  Sucess-bool, message, token-text, user data -json 
        // Setting token and user data in local storage
        localStorage.setItem('token', res.data.token)

        // Setting user data
        const convertedData = JSON.stringify(res.data.userData)

        // local storage set
        localStorage.setItem('user', convertedData)

      }
    })


   
  }

  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <Toaster />
      <div className="glass py-2">
        <div className="title flex flex-col items-center">
          <h4 className="text-5xl font-bold">Hello Again!</h4>
          <span className="py-4 text-xl w-2/3 text-center text-gray-500">
            To keep connected with us please login with your personal info
          </span>
        </div>
        <form onSubmit={handleLogin} className="py-0">
          <div className="profile flex justify-center py-1">
            <img src={avatar} className="profile_img" alt="avatar" />
          </div>
          <div className="textbox   flex flex-col items-center px-2 gap-6">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="textbox"
            />
            {emailError && <p className="text-danger">{emailError}</p>}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="textbox"
            />
            {passwordError && <p className="text-danger">{passwordError}</p>}
            <button type="submit" className="btn">
              Let's Go
            </button>
          </div>
          <div className="text-center py-4">
            <span className="text-grey-500">
              Not a member{' '}
              <Link className="text-red-400" to="/register">
                Register Now
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
