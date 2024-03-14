import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import backgroundImage from '../images/backgroundImage.jpg'; // Import your background image

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidName = (name) => {
    // Add your name validation logic here
    return name.trim() !== ""; // Example: Check if the name is not empty
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

    if (!isValidName(name)) {
      alert("Please enter your name");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Please enter a password with at least 6 characters");
      return;
    }

    // Pass email and password as state parameters to the login page
    navigate('/login', { state: { email, password } });
  };

  return (
    <div className='container' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
      <div className='header'>
      <div className='text' style={{ color: 'white' }}>Sign Up</div>

        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <input
            type="text"
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='input'>
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='input'>
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className='submit-container'>
        <button type="submit" className="btn btn-outline-primary" onClick={handleSubmit}>Sign In</button>
      </div>
    </div>
  );
}

export default SignUp;
