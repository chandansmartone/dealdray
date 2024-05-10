import React from 'react';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes';
import "./App.css"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployList from './components/Dashboard/EmployList';
import UpdateEmployee from './components/Dashboard/UpdateEmployee';
const isAuthenticated = localStorage.getItem('token');

function App( ) {
  return (
    <Router>
    <Routes>
      <Route element={<PrivateRoutes/>}>
          <Route path='/' element={<Dashboard/>} />
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/employee-list' element={<EmployList/>}/>
      <Route path='/employee/:employeeId'element={<UpdateEmployee/>}/>
    </Routes>
    <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
</Router>
  );
}

export default App;