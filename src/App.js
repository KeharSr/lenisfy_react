


import{
  BrowserRouter as Router,
  Routes,
  Route
  
}from 'react-router-dom';





//Toast Config
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/login/Login';

  


function App() {
  return(
    <Router>
      
      <ToastContainer/>
      <Routes>
      
        <Route path ='/login'element={<Login/>}/>
        

      </Routes>
    </Router>
  );
}

export default App;