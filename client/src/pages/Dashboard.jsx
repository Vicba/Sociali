import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Modal from '../components/Modal'
import Post from '../components/Post'



export default function Dashboard() {
    const [openModal, setOpenModal] = useState(false)


    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function getPosts() {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            }

            const result = await axios.get("https://sociali.onrender.com/api/posts", config)

            setPosts(result.data)
        }
        getPosts()
    }, [])






    return (
        <div>
            <Nav />
            <div className="min-h-screen w-full bg-dashboardBackground flex flex-col items-center justify-center">
                <div className='h-full w-4/5 mt-5 md:w-1/2 flex flex-col items-center'>
                    <div>
                        <button onClick={() => setOpenModal(true)} className="bg-gradient-to-r from-purple-400 to-pink-600 text-white py-2 px-4 rounded-xl">Create a Post</button>
                        <Modal open={openModal} onClose={() => setOpenModal(false)} />
                    </div>




                    <div className="mt-2" >
                        {posts.map(post => (
                            <Post key={post._id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}
