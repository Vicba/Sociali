import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'


export default function Post({ post }) {
    const [liked, setLiked] = useState(false)
    const [owner, setOwner] = useState(false)


    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if (post.user == userInfo._id) {
            setOwner(true)
        }

        const posts = JSON.parse(localStorage.getItem('likedPosts'))
        for (let likedPost of posts) {
            console.log(likedPost)
            if (likedPost._id === post._id) {
                setLiked(true)
            }
        }
    }, [liked])



    const handleLiked = () => {
        const posts = JSON.parse(localStorage.getItem('likedPosts'))

        if (!posts || posts.length == 0) {
            localStorage.setItem('likedPosts', JSON.stringify([post]))
            setLiked(true)
        } else {
            for (let likedPost of posts) {
                console.log(likedPost)
            }
        }

        for (let likedPost of posts) {
            if (likedPost._id === post._id) {
                setLiked(true)
                console.log('clicked')
                localStorage.setItem('likedPosts', JSON.stringify([...posts, post]))
            }
        }
    }

    const handleUnliked = () => {
        let posts = JSON.parse(localStorage.getItem('likedPosts'))
        posts = posts.filter(likedPost => likedPost._id != post._id)
        localStorage.setItem('likedPosts', JSON.stringify(posts))
        setLiked(false)

    }



    const handleDelete = () => {

    }

    return (
        <div className="bg-white p-8 my-6 rounded-xl">
            <img src={'https://d3vh9lvfq43oov.cloudfront.net/' + post.imageName} style={{ width: '450px', height: '350px', objectFit: 'cover' }} />
            <div className='flex flex-row py-6 justify-between'>
                <h3 className='text-lg font-semibold'>{post.caption}</h3>
                <div className='flex flex-row gap-2'>
                    {liked ? <AiFillHeart color='red' size={30} onClick={handleUnliked} /> : <AiOutlineHeart size={30} onClick={handleLiked} />}
                    {owner ? <BsFillTrashFill size={30} onClick={handleDelete} /> : null}
                </div>
            </div>
        </div>
    )
}
