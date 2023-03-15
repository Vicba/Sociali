const multer = require('multer')
const sharp = require('sharp')
const crypto = require('crypto')

const Post = require('../models/Post')

const { uploadFile, deleteFile, getObjectSignedUrl } = require('../utils/s3')

const { CloudFrontClient, CreateInvalidationCommand } = require("@aws-sdk/client-cloudfront")

const cloudfrontDistributionId = process.env.CLOUD_FRONT_DIST_ID

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')


// get post
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



module.exports = {
    getPosts
}