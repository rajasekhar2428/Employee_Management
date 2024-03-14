import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import './Addusers.css';

export default function EditUsers() {
    let navigate = useNavigate();
    const { id } = useParams();

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        department: "" // Added department field
    });

    const { name, username, email, department } = user;

    const onInputChange = (e) => {
        const { name, value } = e.target;

        // Validate only alphabets and spaces for name and username
        if (name === 'name' || name === 'username') {
            if (!/^[a-zA-Z\s]*$/.test(value)) {
                alert(`${name.charAt(0).toUpperCase() + name.slice(1)} should contain only alphabets and spaces`);
                return;
            }
        }

        // Check length limit for name and username
        if (name === 'name' && value.length > 30) {
            alert("Name should not exceed 30 characters");
            return;
        }

        if (name === 'username' && value.length > 60) {
            alert("Username should not exceed 60 characters");
            return;
        }

        // Set the updated state
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields to ensure they are not empty
        if (!name.trim() || !username.trim() || !email.trim() || !department.trim()) {
            alert("Enter valid input fields");
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

        try {
            // Add the user to the database
            await axios.put(`http://localhost:8080/user/${id}`, user);
            navigate(`/viewuser/${id}`);
        } catch (error) {
            console.error("Error updating user:", error);
            // Handle error appropriately, e.g., display an error message to the user
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(result.data);
    };

    return (
        <div className="home-container" style={{ backgroundImage: `url(${'src\images\new3.jpg'})` }}>
            {/* <div className="container"> */}
                <div className="row">
                    <div className="col-md-8 offset-md-2 border rounded p-2 mt-3 shadow">
                        <h2 className="text-center m-4">Edit User</h2>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="name" className='form-lable'>
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
                                <label htmlFor="username" className='form-lable'>
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
                                <label htmlFor="email" className='form-lable'>
                                    E-mail
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your email address"
                                    name="email"
                                    value={email}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="department" className='form-lable'>
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

                            <button type="submit" className="btn btn-outline-primary btn-lg p-2.5" style={{ width: '200px' }}>
                             Submit
                            </button>
                            <Link to="/landing" className="btn btn-outline-danger btn-lg mx-4 p-2" style={{ width: '200px' }}>
                            Cancel
                            </Link>

                        </form>
                    </div>
                </div>
            </div>
        // </div>
    )
}
