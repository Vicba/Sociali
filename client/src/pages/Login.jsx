import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Image from '../assets/sociali.jpg'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

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
        <div className="min-h-screen w-screen bg-gray-100 flex flex-col items-center justify-center space-y-10">
            <h1 className='text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 md:ml-12'>Welcome to Sociali !</h1>

            <div className="rounded-xl flex flex-row shadow-lg w-3/4 md:w-1/2 md:h-96">
                <div className='hidden lg:block lg:w-1/2 h-full' >
                    <img src={Image} alt="sociali" className='h-full object-cover rounded-l-xl' />
                </div>
                <div className='rounded-r-xl bg-white p-8 md:w-full lg:w-1/2'>
                    <h3 className="text-3xl font-bold mb-4">Sign in</h3>
                    <form onSubmit={handleSubmit} >
                        <div className="mb-4 text-left">
                            <label className="block text-gray-700 font-medium mb-2">Email*</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border border-gray-400 p-2 rounded"
                            />
                        </div>
                        <div className="mb-4 text-left">
                            <label className="block text-gray-700 font-medium mb-2">Password*</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full border border-gray-400 p-2 rounded"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                            Continue
                        </button>
                    </form>
                    <p className="mt-4">
                        Don't have an account?
                        <Link to='/register' className="text-blue-500"> Sign up</Link>
                    </p>
                    {error ? <p className="text-red-500">{error.message}</p> : null}
                </div>
            </div>
        </div>
    )

}
