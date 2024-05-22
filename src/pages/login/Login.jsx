// import React,{useState} from 'react'
// import { Link } from 'react-router-dom'
// import avatar from '../../assets/images/profile.png'
// import './Login.css'
// import { Toaster,toast } from 'react-hot-toast'







// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const errors = {};
//     if (!username) {
//       errors.username = 'Username is required';
//     }
//     if (!password) {
//       errors.password = 'Password is required';
//     } else if (password.length < 6) {
//       errors.password = 'Password must be at least 6 characters long';
//     }
//     return errors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       setErrors({});
//       // Perform login logic here
//       toast.success('Logged in successfully!');
//     }
//   };
  
//   return (
//     <div className="container mx-auto flex items-center justify-center h-screen">
//       <Toaster />
//       <div className="glass py-3">
//         <div className="title flex flex-col items-center">
//           <h4 className="text-5xl font-bold">Hello Again!</h4>
//           <span className="py-4 text-xl w-2/3 text-center text-gray-500">
//             To keep connected with us please login with your personal info
//           </span>
//         </div>
//         <form onSubmit={handleSubmit} className="py-0">
//           <div className="profile flex justify-center py-1">
//             <img src={avatar} className="profile_img" alt="avatar" />
//           </div>
//           <div className="textbox flex flex-col items-center px-2 gap-6">
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="textbox"
//             />
//             {errors.username && (
//               <div className="text-red-500 text-sm">{errors.username}</div>
//             )}
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="textbox"
//             />
//             {errors.password && (
//               <div className="text-red-500 text-sm">{errors.password}</div>
//             )}
//             <button type="submit" className="btn">
//               Lets Go
//             </button>
//           </div>
//           <div className="text-center py-4">
//             <span className="text-grey-500">
//               Not a member{' '}
//               <Link className="text-red-400" to="/register">
//                 Register Now
//               </Link>
//             </span>
//           </div>
//         </form>
//       </div>
//     </div>
//   );


// }

// export default Login



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/images/profile.png';
import './Login.css';
import { Toaster, toast } from 'react-hot-toast';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!username) {
      errors.username = 'Username is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
     
      toast.success('Logged in successfully!');
    }
  };

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
        <form onSubmit={handleSubmit} className="py-0">
          <div className="profile flex justify-center py-1">
            <img src={avatar} className="profile_img" alt="avatar" />
          </div>
          <div className="textbox flex flex-col items-center px-2 gap-6">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="textbox"
            />
            {errors.username && (
              <div className="text-red-500 text-sm">{errors.username}</div>
            )}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="textbox"
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
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
}

export default Login;
