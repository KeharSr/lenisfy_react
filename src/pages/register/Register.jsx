


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/images/profile.png';
import { Toaster,toast } from 'react-hot-toast';
import { registerUserApi } from '../../apis/Api'
import './Register.css';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleFirstname = (e) => {
        setFirstName(e.target.value);
    };
    const handleLastname = (e) => {
        setLastName(e.target.value);
    };
    const handleUsername = (e) => {
        setUsername(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const validate = () => {
        let isValid = true;

        if (firstName.trim() === '') {
            setFirstNameError('First Name is required');
            isValid = false;
        }

        if (lastName.trim() === '') {
            setLastNameError('Last Name is required');
            isValid = false;
        }

        if (userName.trim() === '') {
            setUsernameError('Username is required');
            isValid = false;
        }

        if (email.trim() === '') {
            setEmailError('Email is required');
            isValid = false;
        }

        if (password.trim() === '') {
            setPasswordError('Password is required');
            isValid = false;
        }

        if (confirmPassword.trim() === '') {
            setConfirmPasswordError('Confirm Password is required');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault()
    
        //validate
        var isValidated = validate();
        if(!isValidated){
          return
        }
        // Sending request to the api
    
        // Making json object
        const data ={
          "firstName" : firstName,
          "lastName" : lastName,
          "userName" : userName,
          "email" : email,
          "password" : password
        
        }
        registerUserApi(data).then((res) =>{
          // Receive data : sucess, message
          if(res.data.sucess === false){
            toast.error(res.data.message)
          }else{
            toast.success(res.data.message)
          }
        })
      }
    
    return (
        <div className="register-container mx-auto flex items-center justify-center h-50 ">
            <Toaster />
            <div className="register-glass py-9 px-6">
                <div className="register-title flex flex-col items-center"style={{ marginTop: '-20px' }}>
                    <h4 className="text-5xl  font-bold mb-3 ">Hello, Please Register!</h4>
                    <span className="py-2 text-2xl text-center text-gray-500">
                        To keep connected with us please login with your personal info
                    </span>
                </div>
                <form className="py-8" onSubmit={handleSubmit}>
                    <div className="register-profile flex justify-center py-3">
                        <img src={avatar} className="register-profile_img " alt="avatar" />
                    </div>
                    <div className="register-textbox flex flex-col items-center gap-4">
                        <div className="flex w-full gap-4">
                            <div className="flex-1 relative">
                                <input 
                                    onChange={handleFirstname}
                                    type="text "
                                    placeholder="First Name "
                                    className="register-textbox-input w-full py-2 px-2"
                                />
                                {firstNameError && <p className="text-red-500 text-sm absolute">{firstNameError}</p>}
                            </div>
                            <div className="flex-1 relative">
                                <input
                                    onChange={handleLastname}
                                    type="text"
                                    placeholder="Last Name"
                                    className="register-textbox-input w-full py-2 px-2"
                                />
                                {lastNameError && <p className="text-red-500 text-sm absolute">{lastNameError}</p>}
                            </div>
                        </div>
                        <div className="w-full relative">
                            <input 
                                onChange={handleUsername}
                                type="text"
                                placeholder="Username"
                                className="register-textbox-input w-full py-2 px-2"
                            />
                            {usernameError && <p className="text-red-500 text-sm absolute">{usernameError}</p>}
                        </div>
                        <div className="w-full relative">
                            <input
                                onChange={handleEmail}
                                type="email"
                                placeholder="Email"
                                className="register-textbox-input w-full py-2 px-2"
                            />
                            {emailError && <p className="text-red-500 text-sm absolute">{emailError}</p>}
                        </div>
                        <div className="w-full relative">
                            <input
                                onChange={handlePassword}
                                type="password"
                                placeholder="Password"
                                className="register-textbox-input w-full py-2 px-2"
                            />
                            {passwordError && <p className="text-red-500 text-sm absolute">{passwordError}</p>}
                        </div>
                        <div className="w-full relative">
                            <input
                                onChange={handleConfirmPassword}
                                type="password"
                                placeholder="Confirm Password"
                                className="register-textbox-input w-full py-2 px-2"
                            />
                            {confirmPasswordError && <p className="text-red-500 text-sm absolute">{confirmPasswordError}</p>}
                        </div>
                        <button type="submit" className="register-btn w-full">Register</button>
                    </div>
                    <div className="text-center py-4">
                        <span className="text-gray-500">
                            Already have an account?{' '}
                            <Link className="text-red-400" to="/login">
                                Login Now
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
