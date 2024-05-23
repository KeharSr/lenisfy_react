


import{
  BrowserRouter as Router,
  Routes,
  Route
  
}from 'react-router-dom';





//Toast Config
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

  


function App() {
  return(
    <Router>
      
      <ToastContainer/>
      <Routes>
      
        <Route path ='/login'element={<Login/>}/>
        <Route path ='/register'element={<Register/>}/>
        

      </Routes>
    </Router>
  );
}

export default App;