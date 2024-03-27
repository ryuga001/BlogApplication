import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface FormValues {
    username: string;
    password: string;
    email: string;
}

const Register = () => {
    const navigate = useNavigate();
    const BaseUrl = "http://localhost:5000";
    const [formValues, setFormValues] = useState<FormValues>({
        username: '',
        password: '',
        email: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you can handle form submission, e.g., send data to server
        const response = await axios.post(`${BaseUrl}/auth/signup`, formValues);
        console.log(response);
        if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            console.log('Form submitted with values:', formValues);
            navigate("/login");
        }
    };

    return (
        <div className="login_page">
            <div>
                <div className='logo'>
                    <img src="../images/Logo.png" alt="LOGO" />
                    <h2>Register</h2>
                </div>
                <div className="form">

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder='username'
                                value={formValues.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                placeholder='email'
                                type="email"
                                id="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                placeholder='password'
                                type="password"
                                id="password"
                                name="password"
                                value={formValues.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <span>Already have an account?<Link to={"/login"}>Login</Link></span>
                        </div>
                        <button type="submit">Register</button>
                    </form>
                </div >
            </div>
        </div >
    );
};

export default Register;
