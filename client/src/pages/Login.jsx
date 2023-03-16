import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const user = await axios.post('http://localhost:8080/api/users/login', { email, password })

            localStorage.setItem('userInfo', JSON.stringify(user))

            navigate('/')
        } catch (err) {
            setError(err)
        }

    }


    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <label>email*</label>
                <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />

                <label>password*</label>
                <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit">Login</button>
            </form>
            {error ? <p>{error.message}</p> : null}
        </div>
    )
}
