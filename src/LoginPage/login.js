import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Login.css';
import backgroundImage from '../images/new.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.email && location.state.password) {
      setEmail(location.state.email);
      setPassword(location.state.password);
    }
  }, [location.state]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // Add your password validation logic here
    return password.length >= 6; // Example: Check if the password length is at least 6 characters
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Please enter a password with at least 6 characters");
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);
    navigate('/landing');
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='login-container'>
        <h1 className="text-center mb-4">Login Page</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'>Email</label>
            <input type='email' placeholder='Enter Email' className='form-control' id='email' value={email} onChange={handleEmailChange} />
          </div>

          <div className='mb-3'>
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='Enter password' className='form-control' id='password' value={password} onChange={handlePasswordChange} />
          </div>

          <button type="submit" className="btn btn-outline-primary">Login</button>
          &nbsp;&nbsp;&nbsp;
          <Link to="/signup" className="btn btn-outline-primary">Sign-Up</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
