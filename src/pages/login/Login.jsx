
import React, { useState,  } from 'react';
import { Link } from 'react-router-dom';
import loginui from '../../assets/images/loginui.png';
import './Login.css';
import { Toaster, toast } from 'react-hot-toast';
import { loginUserApi } from '../../apis/Api';

import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const validation = () => {
    let isValid = true;

    if (email.trim() === '' || !email.includes('@')) {
      setEmailError('Email is empty or invalid');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Password is empty');
      isValid = false;
    }

    return isValid;
  };

 

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validation()) {
        return;
    }

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

        
        localStorage.setItem('token', res.data.token)

        
        const convertedData = JSON.stringify(res.data.userData)

       
        localStorage.setItem('user', convertedData)

        if(res.data.userData.isAdmin){
          navigate('/admin');
        }
        else if(!res.data.userData.isAdmin){
          navigate('/homepage');
        }

        else{
          navigate('/login');
        }

      }
    })
}

  return (
    <div className="login-container">
      <Toaster />
      <div className="login-box">
        <div className="login-form">
          <h2 className="login-title">Login</h2>
          <p className="login-subtitle">Please Login to Continue</p>

          <form onSubmit={handleLogin} className="login-fields">
            <div className="input-container">

              <input
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                type="text"


                name="email"

                value={email}

                placeholder="Email"
              />
              {emailError && <p className="login-error-message">{emailError}</p>}
            </div>
            <div className="input-container">
              <input
                className="login-input"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="login-error-message">{passwordError}</p>}
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <div className="register-link">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>

        <div className="login-image">
          <img src={loginui} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
