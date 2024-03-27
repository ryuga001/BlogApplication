import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface FormValues {
    password: string;
    email: string;
}
const Login = () => {
    const navigate = useNavigate();
    const BaseUrl = "http://localhost:5000";
    const [formValues, setFormValues] = useState<FormValues>({

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
        const response = await axios.post(`${BaseUrl}/auth/signin`, formValues);
        console.log(response);
        if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            navigate("/");
        }
    };

    return (
        <div className="login_page">
            <div>
                <div className='logo'>
                    <img src="../images/Logo.png" alt="LOGO" />
                    <h2>Login</h2>
                </div>
                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder='email'
                                value={formValues.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder='password'
                                value={formValues.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <span>Don't have an account? <Link to={"/register"}>Register</Link></span>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
