import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Nav from '../components/Nav'

export default function Dashboard() {
    const [file, setFile] = useState()
    const [caption, setCaption] = useState("")




    /*home*/
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function getPosts() {
            const result = await axios.get("http://localhost:8080/api/posts")
            console.log(result.data)
            setPosts(result.data)
        }
        getPosts()
    }, [])
    //////////////////////////////////////////
    console.log(posts)

    const submit = async event => {
        const formData = new FormData();
        formData.append("image", file)
        formData.append("caption", caption)
        console.log(formData.keys)
        console.log(formData)

        /*await fetch('/api/posts', {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: 'POST',
            body: formData,
        });*/


        await axios.post("http://localhost:8080/api/posts", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    }

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }



    return (
        <div className="Dashboard">
            <Nav />


            <form onSubmit={submit} style={{ width: 650 }}>
                <input onChange={fileSelected} type="file" accept="image/*"></input>
                <input value={caption} onChange={e => setCaption(e.target.value)} type="text" placeholder='Caption'></input>
                <button type="submit">Submit</button>
            </form>




            <div className="posts" style={{ marginTop: '5rem' }}>
                {posts.map(post => (
                    <div key={`post-${post.id}`} className="post">

                        <img src={'https://d3vh9lvfq43oov.cloudfront.net/' + post.imageName} style={{ width: '450px', height: '350px', objectFit: 'cover' }} />
                        <h3>{post.caption}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}
