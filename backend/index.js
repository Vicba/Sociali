const express = require('express')

const multer = require('multer')
const sharp = require('sharp')
const crypto = require('crypto')
const cors = require('cors');

const { PrismaClient } = require('@prisma/client')

const { uploadFile, deleteFile, getObjectSignedUrl } = require('./utils/s3.js')

const { CloudFrontClient, CreateInvalidationCommand } = require("@aws-sdk/client-cloudfront")

const cloudfrontDistributionId = process.env.CLOUD_FRONT_DIST_ID


const app = express()
const prisma = new PrismaClient()

app.use(cors())
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

app.get("/api/posts", async (req, res) => {
    const posts = await prisma.posts.findMany({ orderBy: [{ created: 'desc' }] })
    for (let post of posts) {
        //post.imageUrl = await getObjectSignedUrl(post.imageName)    dit kan ook maar zonder cloudfront
        post.imageUrl = "https://d3vh9lvfq43oov.cloudfront.net/" + post.imageName //cloudfront

    }
    res.send(posts)
})

//https://d3vh9lvfq43oov.cloudfront.net/
app.post('/api/posts', upload.single('image'), async (req, res) => {
    const file = req.file
    const caption = req.body.caption
    const imageName = generateFileName()

    const fileBuffer = await sharp(file.buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer()

    await uploadFile(fileBuffer, imageName, file.mimetype)

    const post = await prisma.posts.create({
        data: {
            imageName,
            caption,
        }
    })

    res.status(201).send(post)
})


const cloudFront = new CloudFrontClient({
    region: process.env.BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }
})

app.delete("/api/posts/:id", async (req, res) => {
    const id = +req.params.id
    const post = await prisma.posts.findUnique({ where: { id } })

    await deleteFile(post.imageName)

    //invalidate the cloudfront cache for that image
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


    await prisma.posts.delete({ where: { id: post.id } })
    res.send(post)
})

app.listen(8080, () => console.log("listening on port 8080"))