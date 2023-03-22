import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Image from '../assets/registerSociali.png'

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const user = await axios.post('https://sociali.onrender.com/api/users/', { name, email, password })

            localStorage.setItem('userInfo', JSON.stringify(user.data))
            navigate('/')

        } catch (err) {
            setError(err)
        }

    }


    return (
        <div className="min-h-screen w-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="flex flex-row rounded-xl shadow-lg w-3/4 md:w-1/2">
                <div className='hidden lg:block lg:w-1/2' >
                    <img src={Image} alt="sociali" className='h-full object-cover rounded-l-xl' />
                </div>
                <div className='rounded-r-xl bg-white p-8 w-full lg:w-1/2'>
                    <h3 className="text-3xl font-bold mb-4">Create your account</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 text-left">
                            <label className="block text-gray-700 font-medium mb-2">Username*</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full border border-gray-400 p-2 rounded"
                            />
                        </div>
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
                        <button type="submit" className="bg-blue text-white font-bold py-2 px-4 rounded hover:bg-darkBlue">
                            Create account
                        </button>
                    </form>
                    <p className="mt-4">
                        Have an account?
                        <Link to='/login' className="text-blue-500"> Sign in</Link>
                    </p>
                    {error ? <p className="text-red-500">{error.message}</p> : null}
                </div>
            </div>
        </div>
    )
}
