const sharp = require('sharp')
const crypto = require('crypto')

const ErrorResponse = require('../utils/errorResponse')
const Post = require('../models/Post')
const User = require('../models/User')

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
        totalLikes,
        user: req.user._id
    })

    res.status(201).send(post)
}




// GET
// route: /api/posts/:id
// access: public 
const getPost = async (req, res) => {
    const { id } = req.params

    const post = await Post.findById(id);
    if (!post) {
        return new ErrorResponse(`Post not found with id of ${id}`, 404)
    }

    res.status(200).send(post)
}





const cloudFront = new CloudFrontClient({
    region: process.env.BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }
})

// DELETE
// route: /api/posts/:id
// access: public 
const deletePost = async (req, res) => {
    const { id } = req.params

    const post = await Post.findById(id);
    await deleteFile(post.imageName)


    //nullify the cloudfront cache for that image
    const cfCommand = new CreateInvalidationCommand({
        DistributionId: cloudfrontDistributionId,
        InvalidationBatch: {
            CallerReference: post.imageName,
            Paths: {
                Quantity: 1,
                Items: [
                    "/" + post.imageName
                ]
            }
        }
    })
    await cloudFront.send(cfCommand)

    await Post.deleteOne({ _id: ObjectId(id) })
    res.send(post)
}




//update likes
//PUT /api/v1/posts/:id
//public
const updateLikes = async (req, res) => {
    let post = await Post.findById(req.params.id)

    if (!post) {
        return new ErrorResponse(`Post not found with id of ${id}`, 404)
    }

    post = await Post.findByIdAndUpdate(req.params.id, { $inc: { totalLikes: 1 } })

    res.status(200)
}




module.exports = {
    getPosts,
    createPost,
    getPost,
    deletePost,
    updateLikes
}