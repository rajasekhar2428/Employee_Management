import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewUsers() {

    const[user, setUser] = useState({
        name:"",
        username:"",
        email:"",
        department:""
        
    })


    const {id}=useParams();
    useEffect(()=>{
        loadUser()

    },[]
        );
        const loadUser =async ()=>{
            const result=await axios.get(`http://localhost:8080/user/${id}`)
            setUser(result.data);
        }
        return (
            <div className="home-container" style={{ backgroundImage: `url(${'src\images\new3.jpg'})` }}>
            {/* <div className="container"> */}
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center m-4"> User Details</h2>
    
                        <div className='card'>
                            <div className='Card-header'>
                                Details of User id: {user.id}
                                <ul className='list-group list-group-flush'>
                                    <li className='list-group-item'>
                                        <b>Name:</b> {user.name}
                                    </li>
                                    <li className='list-group-item'>
                                        <b>Username:</b> {user.username}
                                    </li>
                                    <li className='list-group-item'>
                                        <b>Email:</b> {user.email}
                                    </li>
                                    <li className='list-group-item'>
                                        <b>department:</b> {user.department}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* <Link className='btn btn-primary my-2' to={"/home"} style={{ padding: '0.5rem 1rem', fontSize: '14px' }}>
                 Back to Home
                </Link> */}
                <Link to="/home" className="btn btn-outline-danger btn-lg mx-4 p-2" style={{ width: '200px' }}>
                Back to Home
                </Link>

            </div>
            // </div>
        );
    }
