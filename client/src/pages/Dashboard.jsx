import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Modal from '../components/Modal'


export default function Dashboard() {
    const [openModal, setOpenModal] = useState(false)


    /*home*/
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function getPosts() {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            }

            const result = await axios.get("http://localhost:8080/api/posts", config)
            console.log(result.data)
            setPosts(result.data)
        }
        getPosts()
    }, [])



    return (
        <div>
            <Nav />
            <div className="min-h-screen w-full bg-dashboardBackground flex flex-col items-center justify-center">
                <div className='w-4/5 md:w-1/2 bg-white flex flex-col items-center'>
                    <div>
                        <button onClick={() => setOpenModal(true)} className="bg-gradient-to-r from-purple-400 to-pink-600 text-white py-2 px-4 rounded-xl">Create a Post</button>
                        <Modal open={openModal} onClose={() => setOpenModal(false)} />
                    </div>




                    <div className="posts" style={{ marginTop: '3rem' }}>
                        {posts.map(post => ( //TODO make component of post
                            <div key={`post-${post.id}`} className="post">

                                <img src={'https://d3vh9lvfq43oov.cloudfront.net/' + post.imageName} style={{ width: '450px', height: '350px', objectFit: 'cover' }} />
                                <h3>{post.caption}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}
