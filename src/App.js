

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

// Toast Config
import { Toaster } from 'react-hot-toast';

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import HomePage from './pages/homepage/HomePage';
import Onboarding from './pages/onboarding/Onboarding';
import AdminPage from './pages/admin/AdminPage';
// import AddProduct from './pages/admin/AddProduct';

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path='/' element={<Onboarding />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/admin' element={<AdminPage />} />
        {/* <Route path='/add-product' element={<AddProduct />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
