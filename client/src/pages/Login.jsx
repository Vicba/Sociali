import React from 'react'
import axios from 'axios';
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const user = await axios.post('http://localhost:8080/api/users/login', { email, password })
            console.log(user)
            localStorage.setItem('userInfo', JSON.stringify(user))
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
