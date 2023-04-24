import React from 'react'

export default function Nav() {

    const handleLogout = () => {
        localStorage.removeItem('userInfo')
        window.location.reload()
    }


    return (
        <div className='flex flex-row p-5 justify-between'>
            <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 md:ml-12'>Sociali</h1>
            <button onClick={handleLogout} className='md:mr-12 font-medium hover:underline'>Logout</button>
        </div>
    )
}
