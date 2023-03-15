const sharp = require('sharp')
const crypto = require('crypto')

const ErrorResponse = require('../utils/errorResponse')
const Post = require('../models/Post')

const { uploadFile, deleteFile, getObjectSignedUrl } = require('../utils/s3')


const { CloudFrontClient, CreateInvalidationCommand } = require("@aws-sdk/client-cloudfront")
const cloudfrontDistributionId = process.env.CLOUD_FRONT_DIST_ID





// GET
// route: /api/posts
// access: public 
const getPosts = async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 })
    for (let post of posts) {
        //post.imageUrl = await getObjectSignedUrl(post.imageName)    dit kan ook maar zonder cloudfront
        post.imageUrl = "https://d3vh9lvfq43oov.cloudfront.net/" + post.imageName //cloudfront
    }
    res.send(posts)
}





// POST
// route: /api/posts
// access: public 
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const createPost = async (req, res) => {
    const file = req.file
    const { caption } = req.body
    const imageName = generateFileName()
    const totalLikes = 0

    const fileBuffer = await sharp(file.buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer()

    await uploadFile(fileBuffer, imageName, file.mimetype)

    const post = await Post.create({
        imageName,
        caption,
        totalLikes
    })

    res.status(201).send(post)
}




// GET
// route: /api/posts/:id
// access: public 
const getPost = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const post = await Post.findById(id);

    if (!post) {
        return new ErrorResponse(`Post not found with id of ${id}`, 404)
    }

    res.status(200).send(post)
}




module.exports = {
    getPosts,
    createPost,
    getPost
}