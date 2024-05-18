import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Home.css"

const Signup = (props) => {

    const host = "https://s-notebook-backend.onrender.com"

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json)

        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken)
            history("/")
            props.showAlert("Account created successfully", "success")

        }
        else {
            props.showAlert("Invalid credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='container'>
            <div class="login-box">
                <p>Sign Up</p>
                <form onSubmit={handleSubmit}>
                    <div class="user-box">
                        <input type="text" id="name" name='name' onChange={onChange} required/>
                        <label htmlFor="name" >Name</label>
                    </div>
                    <div class="user-box">
                        <input type="email" id="email" name='email' onChange={onChange} required />
                        <label htmlFor="email" >Email address</label>
                    </div>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    <div class="user-box">
                        <input type="password" id="password" name='password' onChange={onChange} minLength={5} required />
                        <label htmlFor="password" >Password</label>
                    </div>
                    <div class="user-box">
                        <input type="password" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
                        <label htmlFor="cpassword" >Confirm Password</label>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Sign Up
                    </button>
                </form>
                <p>Already have an account? <Link to="/login" class="a2">Log In</Link></p>
            </div>

        </div>
    )
}

export default Signup
