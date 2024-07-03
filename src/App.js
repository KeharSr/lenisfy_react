

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
import AdminRoutes from './protected_routes/AdminRoutes';
import UserRoutes from './protected_routes/UserRoutes';
import Addtocart from './pages/Cart/Cart';
import Products from './pages/Products/Products';
import Sunglasses from './pages/Sunglasses/Sunglasses';
import Navbar from './components/navbar/Navbar';
import PowerGlasses from './pages/Sunglasses/PowerGlasses';

// import AddProduct from './pages/admin/AddProduct';

function App() {
  return (
    <Router>
            <Navbar  />
      <Toaster />
      <Routes>
        <Route path='/' element={<Onboarding />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Admin Protected Routes */}
        <Route element={<AdminRoutes/>}>
        <Route path='/admin' element={<AdminPage />} />
        {/* <Route path='/add-product' element={<AddProduct />} /> */}
        </Route>

        {/* User Protected Routes */}
        <Route  element={<UserRoutes />} >
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/addtocart' element={<Addtocart />} />
        <Route path='/sunglasses' element={<Sunglasses />} />
        <Route path='/powerglasses' element={<PowerGlasses />} />
        
        
      

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
