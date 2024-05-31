


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import loginui from '../../assets/images/loginui.png';
import './Login.css';
import { Toaster, toast } from 'react-hot-toast';
import { loginUserApi } from '../../apis/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validation = () => {
    let isValid = true;

    if (email.trim() === '' || !email.includes('@')) {
      setEmailError('Email is empty or invalid');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is empty');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    

    // Validation
    if (!validation()) {
      return;
    }

    // make a json object
    const data = {
      email: email,
      password: password
    };

    loginUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);

        // Setting token and user data in local storage
        localStorage.setItem('token', res.data.token);

        // Setting user data
        const convertedData = JSON.stringify(res.data.userData);

        // local storage set
        localStorage.setItem('user', convertedData);
      }
    });
  };

  return (
    <div className="login-container">
      <Toaster />
      <div className="login-box">
        <div className="login-form">
          <h2 className="login-title">Login</h2>
          <p className="login-subtitle">Please Login to Continue</p>

          <form onSubmit={handleLogin} className="login-fields">
            <div className="input-container">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <input
                className="login-input"
                type="text"
                
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
