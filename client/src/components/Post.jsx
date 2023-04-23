import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'

export default function Post({ post }) {
    const [liked, setLiked] = useState(false)
    const [owner, setOwner] = useState(false)

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const userId = userInfo._id
    const likedPostsKey = `likedPosts_${userId}`

    const [likedPosts, setLikedPosts] = useState(() => {
        const likedPostsString = localStorage.getItem(likedPostsKey)
        return likedPostsString ? JSON.parse(likedPostsString) : []
    })


    useEffect(() => {
        if (post.user === userInfo._id) {
            setOwner(true)
        }
        setLiked(likedPosts.some((likedPost) => likedPost._id === post._id))
    }, [post, userInfo._id, likedPosts])


    const handleLiked = () => {
        const posts = [...likedPosts, post]
        setLikedPosts(posts)
    }

    const handleUnliked = () => {
        const posts = likedPosts.filter((likedPost) => likedPost._id !== post._id)
        setLikedPosts(posts)
    };


    const handleDelete = () => {

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        axios.delete(`http://localhost:8080/api/posts/${post._id}`, config)
            .then(response => window.location.reload())
            .catch(err => console.log(err.message))
    }


    useEffect(() => {
        localStorage.setItem(likedPostsKey, JSON.stringify(likedPosts))
    }, [likedPosts, likedPostsKey])

    return (
        <div className="bg-white p-8 my-6 rounded-xl">
            <img src={`https://d1wt6smfo9bxbi.cloudfront.net/${post.imageName}`} style={{ width: '450px', height: '350px', objectFit: 'cover' }} />
            <div className="flex flex-row py-6 justify-between">
                <h3 className="text-lg font-semibold">{post.caption}</h3>
                <div className="flex flex-row gap-2">
                    {liked ? <AiFillHeart color="red" size={30} onClick={handleUnliked} /> : <AiOutlineHeart size={30} onClick={handleLiked} />}
                    {owner ? <BsFillTrashFill size={30} onClick={handleDelete} /> : null}
                </div>
            </div>
        </div>
    )
}
