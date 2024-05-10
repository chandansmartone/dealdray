import React, { useState } from 'react';
import axios from 'axios';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate } from 'react-router-dom';
import ButtonLoader from "../Loader/ButtonLoader";
import "./style.css"
function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading,setloading]=useState(false);
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
  
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.trim()) {
      setError('Email is required');
      return;
    } else if (!emailPattern.test(email.trim())) {
      setError('Invalid email format');
      return;
    }
  
    // Password validation
    if (!password || !password.trim()) {
      setError('Password is required');
      return;
    }
  
    try {
      setloading(true);
      console.log({ email, password });
  
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      navigate("/");
    } catch (error) {
      setloading(false);
      console.log(error);
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password");
        return;
      } else {
        setError(error.message || 'An error occurred');
      }
    }
  };
  

  return (
    <>
      <div className="auth-page">
        <div className="auth-box">
          <h2 className="auth-box-title">LOGIN</h2>

          <form className="auth-form" onSubmit={loginSubmit}>
            <div className="auth-email">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="auth-password">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="auth-btn" >
              {loading && <ButtonLoader />} Login
            </button>
            <span>{error}</span>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;