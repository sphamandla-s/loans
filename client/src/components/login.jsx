import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { email, password };

        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        // Store the user's data for use by other components
        localStorage.setItem('userData', JSON.stringify(responseData));
        if (response.ok) {
            navigate('/home');
        } else {
            alert('Invalid credentials');
        }
        console.log(responseData);
    };

    return (
        <div id="auth" className="flex flex-col justify-center items-center text-center h-screen">
            <h1 className="text-4xl py-3">Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" >LOGIN</button>
            </form>
        </div>
        );
}

export default LogIn;