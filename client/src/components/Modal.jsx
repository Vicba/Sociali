import React from 'react'
import axios from 'axios'
import { useState } from 'react'

function Modal({ open, onClose }) {
    const [file, setFile] = useState()
    const [caption, setCaption] = useState("")


    const submit = (e) => {

        const formData = new FormData();
        formData.append("image", file)
        formData.append("caption", caption)


        const userInfo = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        axios.post("http://localhost:8080/api/posts", formData, config)
            .then(response => window.location.reload())
            .catch(err => console.log(err.message))
    }

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }



    if (!open) return null
    return (
        <div className='top-0 left-0 bg-modalBackground fixed w-full h-screen flex items-center justify-center' onClick={onClose}>
            <div className="max-w-6xl bg-white flex flex-col p-12 rounded-lg border-none" onClick={(e) => e.stopPropagation()}> {/*zonder dit zou de modal weggaan als je er op klikt*/}
                <h3 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Create a post</h3>
                <form onSubmit={submit} className="w-full flex flex-col items-start justify-center">
                    <div className='mb-4 text-left flex flex-col'>
                        <label className='font-bold'>Image:</label>
                        <input onChange={fileSelected} type="file" accept="image/*" className='border border-solid  rounded'></input>
                    </div>

                    <div className='mb-4 text-left flex flex-col'>
                        <label className='font-bold'>Description:</label>
                        <input value={caption} onChange={e => setCaption(e.target.value)} type="text" placeholder='Description' className='border border-solid py-1 px-8 rounded'></input>
                    </div>

                    <button type="submit" className="w-full bg-blue text-white font-bold py-1 px-3 rounded hover:bg-darkBlue">Submit</button>
                    <button className='mt-2 hover:underline mx-auto' onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    )
}



export default Modal