import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute({ children }) {
    const user = localStorage.getItem('userInfo')

    return user ? <Outlet /> : <Navigate to='/login' />
}
