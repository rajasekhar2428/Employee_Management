import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';



export default function Navbar() {
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Full Stack Frontend Application-Employee Management
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="d-flex">
  <Link
    to="/adduser"
    style={{ color: 'white', backgroundColor: 'blue', width: '200px', }}
    className="btn btn-outline-light me-2">
    Add User
  </Link>
  <Link
    to="/logout"
    style={{ color: 'white', backgroundColor: 'blue' }}
    className="btn btn-outline-light">
    Logout
  </Link>
</div>

        </div>
      </nav>
    </div>
  );
}
