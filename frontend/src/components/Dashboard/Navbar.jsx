import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./style.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [employeeName, setEmployeeName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Extract employee name from token when component mounts
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setEmployeeName(decodedToken.name); // Assuming employee name is stored in token
    }
  }, []);

  const handleLogout = () => {
    // Handle logout logic here
    localStorage.removeItem('token');
    navigate('/login')
    // Redirect user to login page or perform other logout actions
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/">
        <h1 className="company-name">DealsDray</h1>
        </Link>
        <div className="navbar-right">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/employee-list" className="nav-link">Employee List</Link>
            </li>
            <li className="nav-item">
              <span className="nav-link">{employeeName}</span>
            </li>
            <li className="nav-item">
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
