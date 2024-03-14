import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Addusers.css';

export default function AddUsers() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    department: "", // Add the department field to the state
  });

  const [users, setUsers] = useState([]);
  const { name, username, email, department } = user;
  const [showForm, setShowForm] = useState(true);
  const [responseData,setResponseData]= useState(null);
  
  const onInputChange = (e) => {
    const { name, value } = e.target;

    // Validate only alphabets and spaces for name and username
    if (name === 'name' || name === 'username') {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        alert(`${name.charAt(0).toUpperCase() + name.slice(1)} should contain only alphabets and spaces`);
        return;
      }
    }

    setUser({ ...user, [name]: value });
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
  
    // Check if name is empty
    if (!name) {
      alert("please enter valid Name");
      return;
    }
  
    // Check if username is empty
    if (!username) {
      alert("please enter valid Username");
      return;
    }
  
   
     // Validate email format
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
}

function isValidEmail(email) {
  // Regular expression for validating email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

    // Check if department is empty
    if (!department) {
      alert("please select valid Department ");
      return;
    }
  
    // Check if name exceeds character limit
    if (name.length > 30) {
      alert("Name should not exceed 30 characters");
      return;
    }
  
    // Check if username exceeds character limit
    if (username.length > 60) {
      alert("Username should not exceed 60 characters");
      return;
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email is not in the correct format");
      return;
    }
  
    try {
      // Add the user to the database
      const response = await axios.post(`http://localhost:8080/user`, user);
      console.log(response.data);
      setResponseData(response.data);
      // Extract the ID of the newly added user from the response
      const newUserId = response.data.id;
  
      // Navigate to the user details page for the newly added user
      setShowForm(false);
    } catch (error) {
      console.error("Error adding user:", error);
      // Handle error gracefully, e.g., display a notification to the user
    }
  };
  
  const handleBack=()=>{
    setShowForm(true);
    setResponseData(null);
  }
  
  const loadUsers = async () => {
    try {
        const result = await axios.get("http://localhost:8080/users");
        setUsers(result.data);
    } catch (error) {
        console.error('Error loading users:', error);
        // Handle error gracefully, e.g., display a notification to the user
    }
  };
  
  const deleteUser = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/user/${id}`);
        // Refresh the user list after successful deletion
        loadUsers();
        navigate('/landing');
    } catch (error) {
        console.error('Error deleting user:', error);
        // Handle error gracefully, e.g., display a notification to the user
    }
  };

  return (
    <>
    {showForm?(
    <div className="home-container" style={{ backgroundImage: `url(${'src\images\new3.jpg'})` }}>
      {/* <div className="container"> */}
        <div className="row">
          <div className="col-md-8 offset-md-2 border rounded p-2 mt-3 shadow">
            <h2 className="text-center m-4">Register User</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="Name" className="form-lable">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  name="name"
                  value={name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="username" className="form-lable">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  name="username"
                  value={username}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Email" className="form-lable">
                  E-mail
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your e-mail address"
                  name="email"
                  value={email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="department" className="form-lable">
                  Department
                </label>
                <select
                  name="department"
                  className="form-control"
                  value={department}
                  onChange={(e) => onInputChange(e)}
                >
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="NON-IT">NON-IT</option>
                </select>
              </div>

              <div className="button-container d-flex justify-content-between">
                <button type="submit" className="btn btn-outline-primary btn-lg p-2.5 w-4">
                  Submit
                </button>
             <Link className="btn btn-outline-danger btn-lg p-2 w-4" to="/landing">
                 Cancel
             </Link>
            </div>
          
            </form>
          </div>
        </div>
      </div>
    // </div>
    ):(
    <div>
      <div className="home-container" style={{ backgroundImage: `url(${'src\images\new3.jpg'})` }}>
      <table className="table border shadow">
          <thead>
              <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Department</th>
                  <th scope="col">Action</th>
              </tr>
          </thead>
          <tbody>
              
                  <tr>
                      <th scope="row">{responseData.id}</th>
                      <td>{responseData.name}</td>
                      <td>{responseData.username}</td>
                      <td>{responseData.email}</td>
                      <td>{responseData.department}</td>
                      <td className="button-cell d-flex align-items-center">
                      {/* <Link className="btn btn-outline-primary btn-sm mx-4 p-2 d-flex align-items-center justify-content-center" to={`/edituser/${responseData.id}`}>
                        <span>Edit</span>
                      </Link> */}
                      <Link className="btn btn-outline-primary btn-sm mx-4 p-2 d-flex align-items-center justify-content-center" to={`/edituser/${responseData.id}`}style={{ width: '200px' }}>
                        <span>Edit</span> 
                      </Link>
                      <button className="btn btn-danger mx-4" style={{ width:'200px', fontSize: '20px' }} onClick={() => deleteUser(responseData.id)}>Delete</button>

                    </td>


                  </tr>
            
          </tbody>
      </table>
    
  </div>
        <button onClick={handleBack}>back</button>
     </div>   
        
        
    )}
    </>
  );
}
