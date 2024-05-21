import React from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


const Login = () => {
  return (
    <div className="login-container">
      <div className="image-section">
        <img src="https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-hipster-lambersexual-model_158538-17710.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1715040000&semt=ais" alt="Login" />
      </div>
      <div className="form-section">
        <h1>Login</h1>
        <p>Welcome back! Enter your details</p>
        <div className="input-container">
          <FontAwesomeIcon icon={faEnvelope} />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input-container">
          <FontAwesomeIcon icon={faLock} />
          <input type="password" placeholder="Password" />
        </div>
        <div className="options-container">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="/" className="forgot-password">Forgot Password?</a>
        </div>
        <button type="submit">Login</button>
        <button type="submit">Register</button>
        <div className="divider">or</div>
        <button type="button" className="google-login">
          <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
