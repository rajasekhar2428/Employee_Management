
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import './Home.css';

export default function Home() {
    const [users, setUsers] = useState([]);
    const { id } = useParams();



    function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Example usage
const email = "johndoe@example.com";
if (validateEmail(email)) {
  console.log("Valid email address");
} else {
  console.log("Invalid email address");
}


    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const result = await axios.get("https://modify-3.onrender.com/users");
            setUsers(result.data);
        } catch (error) {
            console.error('Error loading users:', error);
            // Handle error gracefully, e.g., display a notification to the user
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`https://modify-3.onrender.com/user/${id}`);
            // Refresh the user list after successful deletion
            loadUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle error gracefully, e.g., display a notification to the user
        }
    };

    return (
        <div className="home-container" style={{ backgroundImage: `url(${'src\images\new1.jpg'})` }}>
            <h1>List Of Users</h1>
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
                    {users.map((user, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.department}</td>
                            <td>
                            <Link className="btn btn-outline-primary mx-3" to={`/viewuser/${user.id}`} style={{ width:'200px' }}>View</Link>
                            <Link className="btn btn-outline-primary mx-3" to={`/edituser/${user.id}`} style={{  width:'200px'  }}>Edit</Link>
                            <button className="btn btn-danger mx-3" onClick={() => deleteUser(user.id)} style={{  width:'200px' }}>Delete</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
