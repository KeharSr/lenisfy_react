



import{
  BrowserRouter as Router,
  Routes,
  Route
  
}from 'react-router-dom';
import Login from './pages/login/Login';










//Toast Config
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  
  


function App() {
  return(
    <Router>

      
      <ToastContainer/>
      
      <Routes>
        
      {/* <Route path ='/'element={<Homepage/>}/> */}
        
        <Route path ='/login'element={<Login/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;

