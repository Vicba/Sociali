import React, { useEffect, useState } from 'react'

export default function Nav() {
    const [user, setUser] = useState('')


    const handleLogout = () => {
        localStorage.removeItem('userInfo')
        window.location.reload()
    }


    return (
        <div style={{ display: 'flex' }}>
            <h3>Sociali</h3>

            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
